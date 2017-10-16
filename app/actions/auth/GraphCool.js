import { gql } from 'react-apollo';

import { convertDateToISO, decodeJwtToken, parseHash } from 'utils/auth';
import initApollo from 'lib/initApollo';

export default class GraphCool {
  apolloClient = initApollo();

  constructCreateUserQuery = (fields) => {
    const userType = fields.userType;
    const lowercasedUserType = userType.toLowerCase();
    let createUserQueryString = Object.keys(fields).map((key) => {
      switch (key) {
        case 'birthday':
          return 'birthday: $birthday';
        case 'userType':
          return `${key}: $${key}, ${lowercasedUserType}: $${lowercasedUserType}`;
        case 'location':
          return '';
        case 'job':
          return '';
        default:
          return `${key}: $${key}`;
      }
    })
      .reduce((acc, s) => (acc === '{createUser (' ? `${acc}${s}` : `${acc}, ${s}`), '{createUser (');

    createUserQueryString += `){id, ${lowercasedUserType === 'student' ? 'student' : 'professional'} {id}}}`;
    return createUserQueryString;
  }

  constructUpdateUserQuery = (fields) => {
    // extract and prepare all needed variables
    const { userType } = fields;
    const lowercasedUserType = userType.toLowerCase();
    // run throw object keys
    let updateUserQueryString = Object.keys(fields).map((key) => {
      switch (key) {
        case 'userId':
          return '';
        case 'userType':
          return `${key}: $${key}, ${lowercasedUserType}: $${lowercasedUserType}`;
        case 'location':
          return '';
        case 'job':
          return '';
        default:
          return `${key}: $${key}`;
      }
    })
      .reduce((acc, s) => (acc === '{updateUser (' ? `${acc}${s}` : `${acc}, ${s}`), '{updateUser (');

    // close brackets and define return data
    updateUserQueryString += `){id, ${lowercasedUserType === 'student' ? 'student' : 'professional'} {id}}}`;
    return updateUserQueryString;
  }
  constructMutationArguments = (fields) => {
    let mutationArgumentsString = Object.keys(fields).map((key) => {
      let typeString;
      switch (key) {
        case 'id':
          return '$id: ID!';
        case 'birthday':
          return '$birthday: DateTime';
        case 'userType':
          typeString = fields[key] === 'Student' ? 'UserstudentStudent' : 'UserprofessionalProfessional';
          return `$${key}: UserType!, $${fields[key].toLowerCase()}: ${typeString}`;
        case 'location':
          return '';
        case 'job':
          return '';
        default:
          return `$${key}: String!`;
      }
    }).reduce((acc, s) => (acc === 'mutation (' ? `${acc}${s}` : `${acc}, ${s}`), 'mutation (');
    mutationArgumentsString += ')';
    return mutationArgumentsString;
  }

  /* 
    fields must not contain any nested objects 
  */
  constructMutationCreate = (fields) => {
    const mutationArgumentsString = this.constructMutationArguments(fields);
    const createUserQueryString = this.constructCreateUserQuery(fields);

    const mutationString = `${mutationArgumentsString}${createUserQueryString}`;
    return mutationString;
  }

  /* 
    fields must not contain any nested objects 
  */
  constructMutationUpdate = (fields) => {
    console.log(fields);
    const mutationArgumentsString = this.constructMutationArguments(fields);
    const updateUserQueryString = this.constructUpdateUserQuery(fields);
    console.log(mutationArgumentsString);
    console.log(updateUserQueryString);
    const mutationString = `${mutationArgumentsString}${updateUserQueryString}`;
    return mutationString;
  }

  createUser = async (fields) => {
    const userType = fields.userType;
    const capitalizedUserType = userType[0].toUpperCase() + userType.slice(1);
    const lowercasedUserType = userType.toLowerCase();
    const createUser = gql`${this.constructMutationCreate(fields)}`;

    const birthdayISO = fields.birthday && convertDateToISO(fields.birthday);

    const variables = {
      ...fields,
      userType: capitalizedUserType,
      [lowercasedUserType]: {}
    };
    if (fields.birthday) {
      variables.birthday = birthdayISO;
    }
    if (fields.location) {
      variables[lowercasedUserType].location = fields.location;
    }

    if (fields.job) {
      variables[lowercasedUserType].job = fields.job;
    }

    try {
      await this.apolloClient.mutate({ mutation: createUser, variables });
    } catch (err) {
      throw err;
    }
  }

  getUserByAuth0UserId = async (auth0UserId) => {
    const query = gql`
      query GetUserByAuth0UserId($auth0UserId: String!) {
        allUsers(filter: { auth0UserId: $auth0UserId }) {
          id
          professional {
            id
          }
          student {
            id
          }
        }
      }
    `;

    return this.apolloClient.query({ query, variables: { auth0UserId } });
  }

  updateSocialStudentUser = async (userId, attrs) => {
    const { name, email, birthday } = attrs;
    const preparedAttr = { id: userId, name, userType: 'Student' };
    if (email) {
      preparedAttr.email = email;
    }

    if (birthday) {
      const birthdayISO = convertDateToISO(attrs.birthday);
      preparedAttr.birthday = birthdayISO;
    }

    const updateUserMutation = gql`${this.constructMutationUpdate(preparedAttr)}`;

    try {
      await this.apolloClient.mutate({ mutation: updateUserMutation, variables: preparedAttr });
    } catch (err) {
      throw err;
    }
  }

  // facebook and google
  createSocialStudentUser = async (attrs) => {
    const { name, email, birthday, sub } = attrs;

    const preparedAttr = { auth0UserId: sub, userType: 'Student', name };
    if (email) {
      preparedAttr.email = email;
    }

    if (birthday) {
      const birthdayISO = convertDateToISO(attrs.birthday);
      preparedAttr.birthday = birthdayISO;
    }

    try {
      await this.createUser(preparedAttr);
    } catch (err) {
      throw err;
    }
  };

  updateSocialProfessionalUser = async (userId, professionalId, attrs) => {
    try {
      // extract all data from attributes
      const { name, email, birthday, location, positions } = attrs;

      // prepare attributes for mutation
      // mustn't contain any nested variables
      let preparedAttr = { id: userId, userType: 'Professional', name };
      // prepare attibutes for mutation variables
      // in this variables we should create all nested objects
      // Example professional: {job: {jobTitle: { title }}}
      const mutationArguments = { id: userId,
        userType: 'Professional',
        name,
        professional: {
          userId
        } };
      // add an optional data
      if (email) {
        preparedAttr.email = email;
        mutationArguments.email = email;
      }

      if (birthday) {
        const birthdayISO = convertDateToISO(attrs.birthday);
        preparedAttr.birthday = birthdayISO;
        mutationArguments.birthday = birthdayISO;
      }

      if (location) {
        const locationCountry = await this.getLocation(location.name);
        preparedAttr = { ...preparedAttr, ...locationCountry };
        mutationArguments.professional.location = preparedAttr.location;
      }

      let jobName;
      let companyName;
      if (positions && positions.values) {
        positions.values.map((position) => {
          if (!position.isCurrent) {
            return position;
          }

          jobName = position.title;
          companyName = position.company.name;
          return position;
        });
      }

      let jobTitle;
      if (jobName) jobTitle = await this.getJobTitle(jobName);
      let company;
      if (companyName) company = await this.getCompany(companyName);

      preparedAttr = { ...preparedAttr, ...jobTitle, ...company };
      mutationArguments.professional.job = preparedAttr.job;
      // ${this.constructMutationUpdate(preparedAttr)}
      const updateUser = gql`
        mutation updateUser (
          $name: String
          $email: String
          $birthday: DateTime
          $id: ID!
        ) {
          updateUser( 
            id: $id 
            name: $name
            email: $email
            birthday: $birthday
          ) {
            id
          }
        }
      `;

      const updateProfessional = gql`
        mutation updateProfessional (
          $id: ID!
          $companyId: ID
          $jobTitleId: ID
          $locationId: ID
          $company: JobcompanyCompany
          $jobTitle: JobjobTitleJobTitle
          $location: ProfessionallocationLocation
        ) {
          updateProfessional (
            id: $id
            job: {
              jobTitleId: $jobTitleId
              companyId: $companyId
              jobTitle: $jobTitle
              company: $company
            }
            locationId: $locationId
            location: $location
          ) {
            id
          }
        }
      `;

      await this.apolloClient.mutate({
        mutation: updateUser,
        variables: preparedAttr
      });
      preparedAttr = { ...preparedAttr, id: professionalId };
      await this.apolloClient.mutate({
        mutation: updateProfessional,
        variables: preparedAttr
      });
    } catch (err) {
      throw err;
    }
  }

  getJobTitle = async (title) => {
    const query = gql`
      query getJobTitle($title: String!) {
        allJobTitles(filter: {
          title: $title
        }) {
          id
          title
        }
      }
    `;

    const jobTitle = await this.apolloClient.query({ query, variables: { title } });

    return jobTitle.data.allJobTitles[0]
      ? { jobTitleId: jobTitle.data.allJobTitles[0].id }
      : { jobTitle: { title } };
  };

  getCompany = async (name) => {
    const query = gql`
      query getCompany($name: String!) {
        allCompanies(filter: {
          name: $name
        }) {
          id
          name
        }
      }
    `;

    const company = await this.apolloClient.query({ query, variables: { name } });

    return company.data.allCompanies[0]
      ? { companyId: company.data.allCompanies[0].id }
      : { company: { name } };
  };

  getLocation = async (country) => {
    const query = gql`
      query allLocations($country: String!) {
        allLocations(filter: {
          country: $country
        }) {
          id
        }
      }
    `;

    const location = await this.apolloClient.query({ query, variables: { country } });

    return location.data.allLocations[0]
      ? { locationId: location.data.allLocations[0].id }
      : { location: { country } };
  };

  // linkedin
  createSocialProfessionalUser = async (attrs) => {
    // extract all needed data from attributes
    const { name, email, birthday, sub, location, positions } = attrs;

    // prepare attribute for mutation
    const preparedAttr = { auth0UserId: sub, userType: 'Professional', name };

    const mutationArguments = { userType: 'Professional', name, professional: {} };
    // add optional data
    if (email) {
      preparedAttr.email = email;
      mutationArguments.email = email;
    }

    if (birthday) {
      const birthdayISO = convertDateToISO(attrs.birthday);
      preparedAttr.birthday = birthdayISO;
      mutationArguments.birthday = birthdayISO;
    }

    if (location && location.name) {
      preparedAttr.location = {
        country: location.name
      };
      mutationArguments.professional.location = {
        country: location.name
      };
    }

    if (positions && positions.values) {
      // find currently worked position
      positions.values.map((position) => {
        if (!position.isCurrent) {
          return position;
        }
        const { company, title } = position;
        preparedAttr.job =
        {
          jobTitle: { title },
          company: {
            name: company.name
          }
        };

        mutationArguments.professional.job = preparedAttr.job;

        return position;
      });
    }

    try {
      await this.createUser(preparedAttr);
    } catch (err) {
      throw err;
    }
  };

  upsertUser = async (hash, auth0) => {
    // decode hole hash getted from url
    let authResult;
    if (!auth0) throw new Error('Server error');

    await auth0.parseHash(hash, (err, result) => {
      if (err) throw err;

      authResult = result;
    });

    const attrs = { ...authResult.idTokenPayload };
    // extract from attrs auth0 userId
    const auth0UserId = attrs.sub;
    // check user type
    const socialAuthenticationType = auth0UserId.split('|')[0];
    const isStudent = socialAuthenticationType !== 'linkedin';
    // check is user already exist
    const response = await this.getUserByAuth0UserId(auth0UserId);
    if (
      response &&
      response.data &&
      response.data.allUsers &&
      response.data.allUsers.length === 1
    ) {
      // user already exist and should be updated
      const userId = response.data.allUsers[0].id;
      const professionalId = !isStudent && response.data.allUsers[0].professional.id;
      return await isStudent
        ? this.updateSocialStudentUser(userId, attrs)
        : this.updateSocialProfessionalUser(userId, professionalId, attrs);
    }
    // create new user
    return await isStudent
      ? this.createSocialStudentUser(attrs)
      : this.createSocialProfessionalUser(attrs);
  };
}
