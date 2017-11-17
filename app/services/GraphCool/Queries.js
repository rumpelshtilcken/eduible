import { gql } from 'react-apollo';

const getJobTitle = gql`
  query getJobTitle($title: String!) { JobTitle(title: $title) { id } }
`;

const getCompanyName = gql`
  query getCompanyName($name: String!) { Company(name: $name) { id } }
`;

const getUniversity = gql`
  query getUniversity($name: String!) { University(name: $name) { id } }
`;

const getLocation = gql`
  query getLocation($country: String!) { Location(country: $country) { id } }
`;

const getUserByAuth0UserId = gql`
  query GetUserByAuth0UserId($auth0UserId: String!) {
    User(auth0UserId: $auth0UserId) {
      id
      professional { id }
      student { id }
    }
  }
`;

const createStudent = gql`
  mutation createStudent($user: StudentuserUser!) {
    createStudent(user: $user) { id }
  }
`;

const createProfessional = gql`
  mutation createProfessional(
    $jobId: ID
    $educations: [ProfessionaleducationsEducation!]
    $educationsIds: [ID!]
    $job: ProfessionaljobJob
    $location: ProfessionallocationLocation
    $locationId: ID
    $user: ProfessionaluserUser!
  ) {
    createProfessional(
      educations: $educations
      educationsIds: $educationsIds
      job: $job
      jobId: $jobId
      location: $location
      locationId: $locationId
      user: $user
    ) {
      id
    }
  }
`;

const updateProfessional = gql`
  mutation updateProfessional(
    $id: ID!
    $jobId: ID
    $educations: [ProfessionaleducationsEducation!]
    $educationsIds: [ID!]
    $job: ProfessionaljobJob
    $location: ProfessionallocationLocation
    $locationId: ID
  ) {
    updateProfessional(
      educations: $educations
      educationsIds: $educationsIds
      id: $id
      job: $job
      jobId: $jobId
      location: $location
      locationId: $locationId
    ) {
      id
    }
  }
`;

const updateUser = gql`
  mutation updateUser (
    $id: ID!
    $birthday: DateTime
    $email: String
    $name: String
    $socialImageUrl: String
  ) {
    updateUser (
      id: $id
      birthday: $birthday
      email: $email
      name: $name
      socialImageUrl: $socialImageUrl
    ) {
      id
    }
  }
`;

export {
  createProfessional,
  createStudent,
  getCompanyName,
  getJobTitle,
  getLocation,
  getUniversity,
  getUserByAuth0UserId,
  updateProfessional,
  updateUser
};
