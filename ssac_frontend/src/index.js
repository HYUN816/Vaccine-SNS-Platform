import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, useHistory } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import rootReducer, { rootSaga } from "./modules/index";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import AuthProvider from "./context/providers/AuthProvider";
import { createBrowserHistory } from "history";
import PostProvider from "./context/providers/PostProvider";
import ProfileProvider from "./context/providers/ProfileProvider";
import PostsProvider from "./context/providers/PostsProvider";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export const history = createBrowserHistory();
// index.js는 전체를 아우르는 것 이기 때문에 useHistory()로 사용할수 없다

// provider 동시에 사용할 때 문제가 생기는데 이때는 순서가 중요하다. 지금은 상관없을듯

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter history={history}>
			<ProfileProvider>
				<PostsProvider>
					<PostProvider>
						<AuthProvider>
							<Provider store={store}>
								<App />
							</Provider>
						</AuthProvider>
					</PostProvider>
				</PostsProvider>
			</ProfileProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
