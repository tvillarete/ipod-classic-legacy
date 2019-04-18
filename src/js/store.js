import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunk from 'redux-thunk';
import viewReducer from './views/reducer';
import apiReducer from './api/reducer';
import audioReducer from './audio/reducer';

const store = createStore(
   combineReducers({
      viewState: viewReducer,
      apiState: apiReducer,
      audioState: audioReducer,
   }),
   composeWithDevTools(applyMiddleware(thunk)),
);

export default store;
