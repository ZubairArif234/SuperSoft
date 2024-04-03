import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// reducers

import { studentReducer } from "./reducers/studentReducer";
import { classesReducer } from "./reducers/classesReducers";
import { sectionReducer } from "./reducers/sectionReducers";


const reducer = combineReducers({
  data: studentReducer,
  classes:classesReducer,
  sections:sectionReducer
});

let initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
