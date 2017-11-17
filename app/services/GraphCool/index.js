import _ from 'lodash';
import { convertDateToISO } from 'utils/auth';
import initApollo from 'lib/initApollo';

import {
  createProfessional,
  createStudent,
  getCompanyName,
  getJobTitle,
  getLocation,
  getUniversity,
  getUserByAuth0UserId,
  updateProfessional,
  updateUser
} from './Queries';

export default class GraphCool {
  apolloClient = initApollo();

  /* Local Authentication */
  createUser = async ({ userType, auth0UserId, ...params }) => {
    if (!userType || !auth0UserId) throw new Error('System error');

    try {
      if (userType === 'Professional') {
        await this.createProfessionalUser(
          { auth0UserId, params: { userType, ...params } }
        );
        return;
      }

      if (userType === 'Student') {
        await this.createStudentUser({ auth0UserId, params: { userType, ...params } });
        return;
      }

      throw new Error('System error');
    } catch (err) {
      throw err;
    }
  };

  createProfessionalUser = async ({ auth0UserId, params }) => {
    try {
      const location = params.location && await this.prepareLocation(params.location.country);

      const variables = Object.assign({},
        { user: this.prepareUserParams(auth0UserId, params) },
        location && location
      );

      await this.apolloClient.mutate({ mutation: createProfessional, variables });
    } catch (err) {
      throw err;
    }
  };

  createStudentUser = async ({ auth0UserId, params }) => {
    try {
      const variables = { user: this.prepareUserParams(auth0UserId, params) };
      await this.apolloClient.mutate({ mutation: createStudent, variables });
    } catch (err) {
      throw err;
    }
  };

  /* Social Authentication */
  createSocialProfessionalUser = async (params) => {
    try {
      const variables = await this.prepareLinkedinParams(params);

      await this.apolloClient.mutate({ mutation: createProfessional, variables });
    } catch (err) {
      throw err;
    }
  };

  updateSocialProfessionalUser = async ({ userId, professionalId, params }) => {
    try {
      let professional = await this.prepareLinkedinParams(params);
      professional.id = professionalId;

      // divide into professional and user node
      const user = _.omit({ ...professional.user, id: userId }, ['auth0UserId', 'userType']);
      professional = _.omit(professional, ['user']);

      await this.apolloClient.mutate({ mutation: updateProfessional, variables: professional });
      await this.apolloClient.mutate({ mutation: updateUser, variables: user });
    } catch (err) {
      throw err;
    }
  };

  updateSocialStudentUser = async ({ userId, params }) => {
    try {
      let variables = this.prepareUserParams(null, params);

      variables = _.omit({ ...variables, id: userId }, ['auth0UserId', 'userType']);
      await this.apolloClient.mutate({ mutation: updateUser, variables });
    } catch (err) {
      throw err;
    }
  };

  upsertUser = async (hash, auth0) => {
    try {
      // decode hole hash getted from url
      const { idTokenPayload } = await this.decodeHash(hash, auth0);
      const params = { ...idTokenPayload };

      // extract from params auth0 userId
      const auth0UserId = params.sub;

      // check user type
      const isStudent = auth0UserId.split('|')[0] !== 'linkedin';

      // check is user exist
      const result = await this.apolloClient.query({ query: getUserByAuth0UserId,
        variables: { auth0UserId }
      });

      // update if exist
      if (result.data.User) {
        if (isStudent) {
          const { id: userId, student: { id: studentId } } = result.data.User;
          await this.updateSocialStudentUser({ userId, studentId, params });
          return;
        }

        const { id: userId, professional: { id: professionalId } } = result.data.User;
        await this.updateSocialProfessionalUser({ userId, professionalId, params });
        return;
      }

      // create new user
      if (isStudent) {
        await this.createStudentUser({ auth0UserId, params });
        return;
      }

      await this.createSocialProfessionalUser(params);
    } catch (err) {
      throw err;
    }
  };

  /* Utils */
  decodeHash = async (hash, auth0) => {
    // decode hole hash getted from url
    let authResult;
    if (!auth0) throw new Error('System error hash invalid');

    await auth0.parseHash(hash, (err, result) => {
      if (err) throw err;

      authResult = result;
    });

    return authResult;
  };

  prepareLinkedinParams = async (params) => {
    // extract params
    const { name, email, birthday, sub, location, positions, headline, industry, picture } = params;

    const userType = 'Professional';
    let jobTitle;
    let companyName;
    let locationName = location && location.name;
    let university = headline && headline.split(' - ')[1];

    if (positions && positions.values) {
      positions.values.map((position) => {
        if (!position.isCurrent) { return position; }
        jobTitle = position.title;
        companyName = position.company && position.company.name;
        return position;
      });
    }

    // prepare params
    jobTitle = jobTitle && await this.prepareJobTitle(jobTitle);
    companyName = companyName && await this.prepareCompany(companyName);
    university = university && await this.prepareUniversity(university);
    locationName = locationName && await this.prepareLocation(locationName);

    const user = this.prepareUserParams(sub, { name, email, birthday, userType, picture });

    return Object.assign({},
      { user },
      jobTitle && companyName && { job: { ...jobTitle, ...companyName } },
      university && industry &&
        { education: { major: { name: industry, school: { ...university } } } },
      locationName && { ...locationName },
    );
  };

  prepareUserParams = (auth0UserId, { birthday, name, email, userType, picture }) => {
    if (!name || !email) throw new Error('Required fields does not provided');

    return Object.assign({},
      birthday && { birthday: convertDateToISO(birthday) },
      name && { name },
      email && { email },
      auth0UserId && { auth0UserId },
      userType && { userType },
      picture && { socialImageUrl: picture }
    );
  };

  prepareLocation = async (location) => {
    if (!location) throw new Error('Location not provided');
    const result = await this.apolloClient.query({ query: getLocation,
      variables: { country: location }
    });

    const locationId = result.data.Location && result.data.Location.id;
    return (locationId && { locationId }) || { location: { country: location } };
  };

  prepareJobTitle = async (jobTitle) => {
    if (!jobTitle) throw new Error('JobTitle not provided');
    const result = await this.apolloClient.query({ query: getJobTitle,
      variables: { title: jobTitle }
    });

    const jobTitleId = result.data.JobTitle && result.data.JobTitle.id;
    return (jobTitleId && { jobTitleId }) || { jobTitle: { title: jobTitle } };
  };

  prepareCompany = async (companyName) => {
    if (!companyName) throw new Error('Company name not provided');
    const result = await this.apolloClient.query({ query: getCompanyName,
      variables: { name: companyName }
    });

    const companyId = result.data.Company && result.data.Company.id;
    return (companyId && { companyId }) || { company: { name: companyName } };
  };

  prepareUniversity = async (universityName) => {
    if (!universityName) throw new Error('University name not provided');
    const result = await this.apolloClient.query({ query: getUniversity,
      variables: { name: universityName }
    });

    const universityId = result.data.University && result.data.University.id;
    return (universityId && { universityId })
    || { university: { name: universityName } };
  };
}
