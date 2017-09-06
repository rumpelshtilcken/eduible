const models = require('../models');

module.exports = {
  Root: {
    async user(_, { id }) {
      const user = await models.User.findById(id);
      return user;
    },
    emails() {
      return [
        {
          id: 1,
          email: 'almas.akchabayev@gmail.com'
        },
        {
          id: 2,
          email: 'eduible@gmail.com'
        }
      ];
    }
  }
};
