const { createWrapper } = require("next-redux-wrapper");

const configureStore = () => {};

const wrapper = createWrapper(configureStore), {
  debug: process.env.NODE_ENV = 'develropment'
};

export default wrapper;
