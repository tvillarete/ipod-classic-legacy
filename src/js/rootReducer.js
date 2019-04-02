import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import viewReducer from './views/reducer';

const store = createStore(
   combineReducers({
      viewState: viewReducer,
   }),
   composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
