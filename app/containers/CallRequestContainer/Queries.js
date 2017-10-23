import { gql } from 'react-apollo';

export const getStudentId = gql`
  query getStudentId( $id: ID!) {
    User (auth0UserId: $id) {
      student { id }
    }
  }
`;

export const createAppointment = gql`
  mutation createAppointment(
    $dateTime: DateTime!
    $message: String!
    $professionalId: ID!
    $studentId: ID!
  ) {
    createAppointment(
      dateTime: $dateTime
      message: $message
      professionalId: $professionalId
      studentId: $studentId
    ) {
      id
    }
  }
`;

export const getProfessional = gql`
  query getProfessional ($id: ID) {
    Professional (id: $id) {
      id
      price
      user {
        id
        name
      }
      educations {
        id
        startYear
        endYear
        major {
          id
          name
          school {
            id
            university {
              id
              name
            }
          }
        }
      }
      job {
        id
        jobTitle { 
          id
          title 
        }
        company { 
          id
          name 
        }
      }
    }
  }
`;
