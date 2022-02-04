import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from 'react-redux';
import {getDataReducer} from './frontend/Reducers/DataReducer'
import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import thunk from 'redux-thunk'
const all=combineReducers({Data:getDataReducer})
const composeEnhancer=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE||compose;
    var store=createStore(all,composeEnhancer(applyMiddleware(thunk)));
ReactDOM.render(
  <Provider store={store}>
    <App /></Provider>  
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
