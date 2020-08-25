import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './Resources/css/app.css';
import Routes from './routes';
import {BrowserRouter} from 'react-router-dom';
import {firebase} from './firebase'

const App = (props) => {
  return(
    <BrowserRouter>
      <Routes {...props}/>
    </BrowserRouter>
  )
}

firebase.auth().onAuthStateChanged((user)=>{
  ReactDOM.render(
    <React.StrictMode>
      <App user={user}/>
    </React.StrictMode>,
    document.getElementById('root')
  );
})

