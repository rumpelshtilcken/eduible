import chai from 'chai';

import { convertDateToISO } from 'utils/auth';

import GraphCool from './index';

const expect = chai.expect;

describe('GraphCool services functionality', () => {
  const graphCool = new GraphCool();

  /* Location */
  it('should return user object', async () => {
    const birthday = new Date();
    const convertedBirthday = convertDateToISO(birthday);
    const result = await graphCool.prepareUserParams('s',
      { birthday, name: 'name', email: 'email', userType: 'Professional' }
    );

    return expect(result).to.deep.equal(
      { auth0UserId: 's', birthday: convertedBirthday, name: 'name', email: 'email', userType: 'Professional' }
    );
  });

  /* JobTitle */
  it('should return jobTitle id', async () => {
    const result = await graphCool.prepareJobTitle('Full Stack Developer');
    return expect(result.jobTitleId).to.deep.equal('cj82ucy1xytll0152xdo80alw');
  });

  it('should return jobTitle object', async () => {
    const result = await graphCool.prepareJobTitle('djasndkjasnkjasn');
    return expect(result.jobTitle.title).to.deep.equal('djasndkjasnkjasn');
  });

  /* Company */
  it('should return company id', async () => {
    const result = await graphCool.prepareCompany('Intellection');
    return expect(result.companyId).to.deep.equal('cj82ucy1nytlk0152bq4na6m0');
  });

  it('should return company object', async () => {
    const { company: { name } } = await graphCool.prepareCompany('djasndkjasnkjasn');
    return expect(name).to.deep.equal('djasndkjasnkjasn');
  });

  /* Location */
  it('should return location id', async () => {
    const result = await graphCool.prepareLocation('Kazakhstan');
    return expect(result.locationId).to.deep.equal('cj82ucy1yytlm0152d4jaofxn');
  });

  it('should return location object', async () => {
    const result = await graphCool.prepareLocation('djasndkjasnkjasn');
    return expect(result.location.country).to.deep.equal('djasndkjasnkjasn');
  });

  /* University */
  it('should return university id', async () => {
    const result = await graphCool.prepareUniversity('IITU');
    return expect(result.universityId).to.deep.equal('cj840gq4dbfpe014814cucbck');
  });

  it('should return university object', async () => {
    const result = await graphCool.prepareUniversity('djasndkjasnkjasn');
    return expect(result.university.name).to.deep.equal('djasndkjasnkjasn');
  });

  /* Linkedin */
  it('should return Linkedin Professional object', async () => {
    const birthday = new Date();
    const convertedBirthday = convertDateToISO(birthday);
    const positions = {
      values: [
        {
          company: { name: 'Intellection' },
          isCurrent: true,
          title: 'Full Stack Developer'
        }
      ]
    };
    const result = await graphCool.prepareLinkedinParams(
      {
        email: 'justtairex@gmail.com',
        name: 'Galym Nussipkhozhin',
        birthday,
        sub: 'sub',
        location: { name: 'location' },
        positions,
        headline: 'Выпускник - Houston Community College',
        industry: 'Computer Software'
      }
    );

    const expectedResult = {
      user: {
        email: 'justtairex@gmail.com',
        name: 'Galym Nussipkhozhin',
        birthday: convertedBirthday,
        auth0UserId: 'sub',
        userType: 'Professional'
      },
      location: { country: 'location' },
      job: {
        jobTitleId: 'cj82ucy1xytll0152xdo80alw',
        companyId: 'cj82ucy1nytlk0152bq4na6m0'
      },
      education: {
        major: {
          name: 'Computer Software',
          school: { universityId: 'cj8vh67hqsiuo0146gq2v6qj9' }
        }
      }
    };

    return expect(result).to.deep.equal(expectedResult);
  });

  /* Linkedin */
  it('should return not full Linkedin Professional object', async () => {
    const positions = {
      values: [
        {
          company: { name: 'dasjnfaskfnjsak' },
          isCurrent: true,
          title: 'dsadnasjdnajs'
        }
      ]
    };
    const result = await graphCool.prepareLinkedinParams(
      {
        email: 'justtairex@gmail.com',
        name: 'Galym Nussipkhozhin',
        sub: 'sub',
        location: { name: 'location' },
        positions,
        headline: 'Выпускник - Houston Community College',
        industry: 'Computer Software'
      }
    );

    const expectedResult = {
      user: {
        email: 'justtairex@gmail.com',
        name: 'Galym Nussipkhozhin',
        auth0UserId: 'sub',
        userType: 'Professional'
      },
      location: { country: 'location' },
      job: {
        jobTitle: { title: 'dsadnasjdnajs' },
        company: { name: 'dasjnfaskfnjsak' }
      },
      education: {
        major: {
          name: 'Computer Software',
          school: { universityId: 'cj8vh67hqsiuo0146gq2v6qj9' }
        }
      }
    };

    return expect(result).to.deep.equal(expectedResult);
  });

  /* Linkedin */
  it('should return not full Linkedin Professional object', async () => {
    const result = await graphCool.prepareLinkedinParams(
      {
        email: 'justtairex@gmail.com',
        name: 'Galym Nussipkhozhin',
        sub: 'sub',
        location: { name: 'location' },
        headline: 'Выпускник - Houston Community College',
        industry: 'Computer Software',
        picture: 'sdasdas'
      }
    );

    const expectedResult = {
      user: {
        email: 'justtairex@gmail.com',
        name: 'Galym Nussipkhozhin',
        auth0UserId: 'sub',
        userType: 'Professional',
        socialImageUrl: 'sdasdas'
      },
      location: { country: 'location' },
      education: {
        major: {
          name: 'Computer Software',
          school: { universityId: 'cj8vh67hqsiuo0146gq2v6qj9' }
        }
      }
    };

    return expect(result).to.deep.equal(expectedResult);
  });
});
