import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const loggerMiddleware =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    console.log(action);
    return next(action);
  };

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  // redux-saga, redux-thunk 등을 넣는다.
  const middlewares = [sagaMiddleware, loggerMiddleware];
  //개발 모드임을 확인
  const enhancer =
    process.env.NODE_ENV === 'production'
      ? // 개발 모드일 경우 redux-devtools 실행
        compose(applyMiddleware(...middlewares))
      : // 개발 모드일 경우 redux-devtools 실행 안됨
        composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
