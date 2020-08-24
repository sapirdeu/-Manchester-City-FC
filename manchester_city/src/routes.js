import React from 'react';
import Layout from './Hoc/Layout';
import {Switch, Route} from 'react-router-dom';
import Home from './Components/home/Home';
import SignIn from './Components/signIn/SignIn';
import history from './history';

function Routes(props) {
  return (
    <Layout>
      <Switch>
        <Route exact history={history} component={SignIn} path="/sign_in"/>
        <Route exact component={Home} path="/"/>
      </Switch>
    </Layout>
  );
}

export default Routes;
