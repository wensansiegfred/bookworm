import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import decode from "jwt-decode";
import '!style-loader!css-loader!semantic-ui-css/semantic.min.css';
import App from "./App";
import rootReducer from "./rootReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoggedIn } from "./actions/auth";

const store = createStore(
	rootReducer,
	composeWithDevTools (
		applyMiddleware(thunk)
	)
);

if (localStorage.bookwormJWT) {
	const payload = decode(localStorage.bookwormJWT);
	const user = { token: localStorage.bookwormJWT, confirmed: payload.confirmed, email: payload.email };
	store.dispatch(userLoggedIn(user));
}

ReactDOM.render(
	<BrowserRouter>
		<Provider store={store}>
			<Route component={App} />
		</Provider>
	</BrowserRouter>,
	document.getElementById("app")
);