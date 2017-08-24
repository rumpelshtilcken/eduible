const Theme = require('./app/static');

module.exports = {
  plugins: [
    require('postcss-easy-import')(), // keep this first
    require('postcss-cssnext')({
      features: {
        autoprefixer: false, // turn off autoprefixer, style-jsx already has one
        customProperties: {
          variables: Theme
        }
      }
    })
  ]
};
