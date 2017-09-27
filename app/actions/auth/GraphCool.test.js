import chai from 'chai';
import GraphCool from './GraphCool'
  ;

const expect = chai.expect;

describe('GraphCool', () => {
  let graphCool;
  beforeEach(() => {
    graphCool = new GraphCool();
  });

  describe('constructMutationArguments', () => {
    it('should construct proper string', () => {
      const fields = {
        userType: 'student',
        name: 'Andy',
        birthday: '10/02/2017',
        email: 'asdasd@gmail.com'
      };

      const result = graphCool.constructMutationArguments(fields);
      expect(result).to.equal('mutation ($userType: UserType!, $student: UserstudentStudent, $name: String!, $birthdate: DateTime!, $email: String!)');
    });
  });

  describe('constructCreateUserQuery', () => {
    it('should construct proper string', () => {
      const fields = {
        userType: 'student',
        name: 'Andy',
        birthday: '10/02/2017',
        email: 'asdasd@gmail.com'
      };

      const result = graphCool.constructCreateUserQuery(fields);
      console.log(result);
      expect(result).to.equal('{createUser (userType: $userType, student: $student, name: $name, birthdate: $birthdate, email: $email){id, student {id}}}');
    });
  });
});
