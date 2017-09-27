import { gql } from 'react-apollo';

import { convertDateToISO, decodeJwtToken, parseHash } from 'utils/auth';
import initApollo from 'lib/initApollo';

export default class GraphCool {
  apolloClient = initApollo();

  constructUpdateUserQuery = (fields) => {
    const userType = fields.userType;
    const lowercasedUserType = userType.toLowerCase();
    let updateUserQueryString = Object.keys(fields).map((key) => {
      if (key === 'birthday' || key === 'birthdate') { // check if date
        return 'birthday: $birthday';
      }
      if (key === 'userType') {
        return `${key}: $${key}, ${lowercasedUserType}: $${lowercasedUserType}`;
      }
      if (key === 'location') {
        return '';
      }
      return `${key}: $${key}`;
    })
      .reduce((acc, s) => (acc === '{updateUser (' ? `${acc}${s}` : `${acc}, ${s}`), '{updateUser (');

    updateUserQueryString += `){id, ${lowercasedUserType === 'student' ? 'student' : 'professional'} {id}}}`;
    return updateUserQueryString;
  }

  constructMutationArguments = (fields) => {
    let mutationArgumentsString = Object.keys(fields).map((key) => {
      if (key === 'id') {
        return '$id: ID!';
      }
      if (key === 'birthday' || key === 'birthdate') { // check if date
        return '$birthday: DateTime!';
      }
      if (key === 'userType') {
        const typeString = fields[key] === 'Student' ? 'UserstudentStudent' : 'UserprofessionalProfessional';
        return `$${key}: UserType!, $${fields[key].toLowerCase()}: ${typeString}`;
      }
      if (key === 'location') {
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
      if (key === 'location') {
        return '';
      }
      return `${key}: $${key}`;
    })
      .reduce((acc, s) => (acc === '{createUser (' ? `${acc}${s}` : `${acc}, ${s}`), '{createUser (');

    createUserQueryString += `){id, ${lowercasedUserType === 'student' ? 'student' : 'professional'} {id}}}`;
    return createUserQueryString;
  }

  constructMutationCreate = (fields) => {
    const mutationArgumentsString = this.constructMutationArguments(fields);
    const createUserQueryString = this.constructCreateUserQuery(fields);

    const mutationString = `${mutationArgumentsString}${createUserQueryString}`;
    return mutationString;
  }

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
    console.log(attrs);
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
    console.log(attrs);
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
    console.log(attrs);
    const { name, email, birthday, location, positions } = attrs;

    const preparedAttr = { id: userId, userType: 'Professional', name };
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
      positions.values.map((position) => {
        if (!position.isCurrent) {
          return position;
        }
        const { company, title } = position;
        preparedAttr.job =
          {
            jobTitle: title,
            company: {
              name: company.name
            }
          };

        return position;
      });

      const updateUserMutation = gql`${this.constructMutationUpdate(preparedAttr)}`;

      try {
        await this.apolloClient.mutate({ mutation: updateUserMutation, variables: preparedAttr });
      } catch (err) {
        throw err;
      }
    }
  }

  // linkedin
  createSocialProfessionalUser = async (attrs) => {
    console.log(attrs);
    const { name, email, birthday, sub, location, positions } = attrs;

    const preparedAttr = { auth0UserId: sub, userType: 'Professional', name };
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
      positions.values.map((position) => {
        if (!position.isCurrent) {
          return position;
        }
        const { company, title } = position;
        preparedAttr.job =
        {
          jobTitle: title,
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
    const authResult = parseHash(hash);
    const attrs = decodeJwtToken(authResult.idToken);
    const auth0UserId = attrs.sub;
    const response = await this.getUserByAuth0UserId(auth0UserId);
    const socialAuthenticationType = auth0UserId.split('|')[0];
    const isStudent = socialAuthenticationType !== 'linkedin';

    if (
      response &&
      response.data &&
      response.data.allUsers &&
      response.data.allUsers.length === 1
    ) {
      const userId = response.data.allUsers[0].id;
      return await isStudent
        ? this.updateSocialStudentUser(userId, attrs)
        : this.updateSocialProfessionalUser(userId, attrs);
    }

    return await isStudent
      ? this.createSocialStudentUser(attrs)
      : this.createSocialProfessionalUser(attrs);
  };
}
