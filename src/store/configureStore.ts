import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ApplicationState } from '.';
import { leaderReducer } from '../reducers/leaderReducer';
import { waifuReducer } from '../reducers/waifuReducer';
import { statsReducer } from '../reducers/statsReducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  // store creation
  const store = createStore(
    combineReducers<ApplicationState>({
      leaderState: leaderReducer,
      waifuState: waifuReducer,
      soraStats: statsReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
  return store;
};

