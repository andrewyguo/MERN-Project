import { createStore, applyMiddleware } from 'redux'; 
import { composeWithDevTools } from 'redux-devtools-extension'; 
import thunk from 'redux-thunk'; 
import rootReducer from './reducers'; 

const initialState = {}; 

const middleware = [thunk]; 

// const store = createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleWare))); 
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store; 