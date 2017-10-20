import { gql } from 'react-apollo';

// export const createAppointment = gql`

// `;

export const getProfessional = gql`
  query getProfessional ($id: ID) {
    Professional (id: $id) {
      id
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
