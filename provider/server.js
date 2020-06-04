const app = require('express')();
const cors = require('cors');
const authMiddleware = require('./middleware/auth.middleware');
const routes = require('./product/product.routes');

const port = 8080;

const init = () => {
  app.use(cors());
  app.use(authMiddleware);
  app.use(routes);
  return app.listen(port, () => console.log(`Provider API listening on port ${port}...`));
};

init();
