import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import Reducer from './_reducers/index';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise';
import { applyMiddleware, createStore } from 'redux';

const createStoreMiddleware = applyMiddleware(
	promiseMiddleware,
	ReduxThunk
)(createStore);
ReactDOM.render(
	<Provider
		store={createStoreMiddleware(
			Reducer,
			window.__REDUX_DEVTOOLS_EXTENSION__ && // redux devtool 사용하기 위해서 추가하는 코드
				window.__REDUX_DEVTOOLS_EXTENSION__()
		)}>
		{/* <React.StrictMode> */}

		<App />
		{/* </React.StrictMode>, */}
	</Provider>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
