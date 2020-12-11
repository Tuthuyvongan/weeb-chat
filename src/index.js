import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBW9P-Tz4JYrLvPg4xamNLWDKe0Vsh4QRc",
  authDomain: "weebchat-8cd0d.firebaseapp.com",
  databaseURL: "https://weebchat-8cd0d-default-rtdb.firebaseio.com",
  projectId: "weebchat-8cd0d",
  storageBucket: "weebchat-8cd0d.appspot.com",
  messagingSenderId: "63112649678",
  appId: "1:63112649678:web:85cdd8189bc82b6199299f",
  measurementId: "G-N777DSBPJR",
};

firebase.initializeApp(firebaseConfig);
var database = firebase.database();
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
