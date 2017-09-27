import { gql } from 'react-apollo';

import { convertDateToISO, decodeJwtToken, parseHash } from 'utils/auth';
import initApollo from 'lib/initApollo';

export default class GraphCool {
  apolloClient = initApollo();

  constructUpdateUserQuery = (fields) => {
    // extract and prepare all needed variables
    const { userType } = fields;
    const lowercasedUserType = userType.toLowerCase();
    // run throw object keys
    let updateUserQueryString = Object.keys(fields).map((key) => {
      if (key === 'birthday' || key === 'birthdate') {
        return 'birthday: $birthday';
      }
      if (key === 'userType') {
        return `${key}: $${key}, ${lowercasedUserType}: $${lowercasedUserType}`;
      }
      if (key === 'location' || key === 'job') {
        return '';
      }
      return `${key}: $${key}`;
    })
      .reduce((acc, s) => (acc === '{updateUser (' ? `${acc}${s}` : `${acc}, ${s}`), '{updateUser (');

    // close brackets and define return data
    updateUserQueryString += `){id, ${lowercasedUserType === 'student' ? 'student' : 'professional'} {id}}}`;
    return updateUserQueryString;
  }
  constructMutationArguments = (fields) => {
    let mutationArgumentsString = Object.keys(fields).map((key) => {
      if (key === 'id') {
        return '$id: ID!';
      }
      if (key === 'birthday' || key === 'birthdate') {
        return '$birthday: DateTime!';
      }
      if (key === 'userType') {
        const typeString = fields[key] === 'Student' ? 'UserstudentStudent' : 'UserprofessionalProfessional';
        return `$${key}: UserType!, $${fields[key].toLowerCase()}: ${typeString}`;
      }
      if (key === 'location' || key === 'job') {
        return '';
      }
      return `$${key}: String!`;
    }).reduce((acc, s) => (acc === 'mutation (' ? `${acc}${s}` : `${acc}, ${s}`), 'mutation (');
    mutationArgumentsString += ')';
    return mutationArgumentsString;
  }
  constructCreateUserQuery = (fields) => {
    const userType = fields.userType;
    const lowercasedUserType = userType.toLowerCase();
    let createUserQueryString = Object.keys(fields).map((key) => {
      if (key === 'birthday' || key === 'birthdate') { // check if date
        return 'birthday: $birthday';
      }
      if (key === 'userType') {
        return `${key}: $${key}, ${lowercasedUserType}: $${lowercasedUserType}`;
      }
      if (key === 'location' || key === 'job') {
        return '';
      }
      return `${key}: $${key}`;
    })
      .reduce((acc, s) => (acc === '{createUser (' ? `${acc}${s}` : `${acc}, ${s}`), '{createUser (');

    createUserQueryString += `){id, ${lowercasedUserType === 'student' ? 'student' : 'professional'} {id}}}`;
    return createUserQueryString;
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
    const mutationArgumentsString = this.constructMutationArguments(fields);
    const updateUserQueryString = this.constructUpdateUserQuery(fields);

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

  updateSocialProfessionalUser = async (userId, attrs) => {
    // extract all data from attributes
    const { name, email, birthday, location, positions } = attrs;

    // prepare attributes for mutation
    // mustn't contain any nested variables
    const preparedAttr = { id: userId, userType: 'Professional', name };
    // prepare attibutes for mutation variables
    // in this variables we should create all nested objects
    // Example professional: {job: {jobTitle: { title }}}
    const mutationArguments = { id: userId, userType: 'Professional', name, professional: {} };
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
      preparedAttr.location = {
        country: `${location.name}i`
      };
      mutationArguments.professional.location = preparedAttr.location;
    }

    if (positions) {
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

    const updateUserMutation = gql`${this.constructMutationUpdate(preparedAttr)}`;

    try {
      await this.apolloClient.mutate({
        mutation: updateUserMutation,
        variables: mutationArguments
      });
    } catch (err) {
      throw err;
    }
  }

  // linkedin
  createSocialProfessionalUser = async (attrs) => {
    // extract all needed data from attributes
    const { name, email, birthday, sub, location, positions } = attrs;

    // prepare attribute for mutation
    const preparedAttr = { auth0UserId: sub, userType: 'Professional', name };
    // add optional data
    if (email) {
      preparedAttr.email = email;
    }

    if (birthday) {
      const birthdayISO = convertDateToISO(attrs.birthday);
      preparedAttr.birthday = birthdayISO;
    }

    if (location) {
      preparedAttr.location = {
        country: location.name
      };
    }

    if (positions) {
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

        return position;
      });
    }

    try {
      await this.createUser(preparedAttr);
    } catch (err) {
      throw err;
    }
  };

  upsertUser = async (hash) => {
    // decode hole hash getted from url
    const authResult = parseHash(hash);
    // decode idToken and take all data in token
    const attrs = decodeJwtToken(authResult.idToken);
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
      return await isStudent
        ? this.updateSocialStudentUser(userId, attrs)
        : this.updateSocialProfessionalUser(userId, attrs);
    }
    // create new user
    return await isStudent
      ? this.createSocialStudentUser(attrs)
      : this.createSocialProfessionalUser(attrs);
  };
}
