import React from 'react';
import Layout from './Hoc/Layout';
import {Switch} from 'react-router-dom';
import Home from './Components/home/Home';
import SignIn from './Components/signIn/SignIn';
import history from './history';
import Dashboard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/PrivateRoutes';
import PublicRoutes from './Components/authRoutes/PublicRoutes';

function Routes(props) {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoutes {...props} history={history} restricted={true} path="/sign_in" exact component={SignIn}/>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
      </Switch>
    </Layout>
  );
}

export default Routes;
