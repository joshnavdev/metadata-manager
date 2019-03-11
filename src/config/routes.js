const Routes = require('../routes');

module.exports = (app) => {
  app.use('/api', Routes);
};
