import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  providersReducer,
  providerDetailsReducer,
} from './reducers/providerReducer';

// combine all reducers into one root reducer
const reducer = combineReducers({
  providers: providersReducer,
  providerDetails: providerDetailsReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
