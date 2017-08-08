import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App.jsx';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC_rO0--ONGExk3qJh97-VysdStwzMI1wo",
  authDomain: "chatroom-5b6ca.firebaseapp.com",
  databaseURL: "https://chatroom-5b6ca.firebaseio.com",
  projectId: "chatroom-5b6ca",
  storageBucket: "",
  messagingSenderId: "312120087761"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
