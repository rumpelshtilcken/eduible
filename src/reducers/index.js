export default {
  example: (state = { hello: 'world' }, { type, payload }) => {
    switch (type) {
      case 'EXAMPLE_ACTION':
        return {
          ...state
        };
      default:
        return state;
    }
  }
};
