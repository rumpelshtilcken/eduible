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
          jobTitle { title }
          company { name }
        }
        majors {
          name
          school {
            university {
              name
            }
          }
        }
        location {
          country
        }
      }
  }
`;

const generateQueryArguments = params =>
  Object.keys(params).reduce((acc, key) => {
    if (key.includes('Id')) return { ...acc, [`$${key}`]: 'ID' };
    if (key.includes('price')) return { ...acc, [`$${key}`]: 'FLOAT' };
    if (key.includes('orderBy')) return { ...acc, [`$${key}`]: 'ProfessionalOrderBy' };
    if (key.includes('findInAll')) return '';

    return { ...acc, [`$${key}`]: 'String' };
  }, {});

const bindParamsWithQuery = (params, queryArguments) =>
  Object.keys(params).reduce((acc, key) => {
    if (typeof params[key] === 'object') {
      return { ...acc, ...nestedParams({ [key]: params[key] }, '$findInAll') };
    }
    if (key.includes('findInAll')) return '';
    if (queryArguments[`$${key}`].includes('String')) return { ...acc, [key]: '$findInAll' };

    return { ...acc, [key]: `$${key}` };
  }, {});

const nestedParams = (prop, queryArguments) =>
  Object.keys(prop).reduce((acc, key) => (typeof prop[key] === 'object'
    ? { ...acc, [key]: nestedParams(prop[key], queryArguments) }
    : { ...acc, [key]: queryArguments }), {});

const nestedParamsString = prop =>
  Object.keys(prop).map(key => (typeof prop[key] === 'object'
    ? `\n${key}:{${nestedParamsString(prop[key])}}\n`
    : `\n${key}:${prop[key]}\n`));

export default (params) => {
  let query = 'query allProfessionals(';
  const queryArguments = generateQueryArguments(params);
  Object.keys(queryArguments).map((argKey) => {
    query += `\n${argKey}:${queryArguments[argKey]}`;
    return null;
  });

  const bindedParams = bindParamsWithQuery(params, queryArguments);

  query += ') { allProfessionals(filter: { AND: [';
  Object.keys(bindedParams).map((param) => {
    if (typeof bindedParams[param] === 'object') {
      query += `${param}:{${nestedParamsString(bindedParams[param])}}\n`;
      return query;
    }

    query += '{';
    query += `${param}:${bindedParams[param]}`;
    query += '}\n';
    return query;
  });
};
