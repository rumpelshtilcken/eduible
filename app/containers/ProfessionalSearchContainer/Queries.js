import { gql } from 'react-apollo';

export const getUniveristies = gql`
  query allUniversities {
    allUniversities {
      id
      name
    }
  }
`;

export const getJobTitles = gql`
  query jobTitles {
    allJobTitles {
      id
      title
    }
  }
`;

export const getProfessionals = gql`
  query allProfessionals(
    $filter: ProfessionalFilter
    $orderBy: ProfessionalOrderBy
  ) {
      allProfessionals(
        filter: $filter
        orderBy: $orderBy
    ) {
        id
        price
        user {
          id
          name
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
        educations {
          id
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
        location {
          id
          country
        }
      }
  }
`;
