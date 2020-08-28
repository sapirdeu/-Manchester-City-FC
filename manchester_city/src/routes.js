import React from 'react';
import Layout from './Hoc/Layout';
import {Switch} from 'react-router-dom';
import Home from './Components/home/Home';
import SignIn from './Components/signIn/SignIn';
import history from './history';
import Dashboard from './Components/admin/Dashboard';
import PrivateRoutes from './Components/authRoutes/PrivateRoutes';
import PublicRoutes from './Components/authRoutes/PublicRoutes';
import AdminMatches from './Components/admin/matches/AdminMatches';
import AddEditMatch from './Components/admin/matches/AddEditMatch';
import AdminPlayers from './Components/admin/players/AdminPlayers';
import AddEditPlayers from './Components/admin/players/AddEditPlayers';
import TheTeam from './Components/theTeam/TheTeam';

function Routes(props) {
  return (
    <Layout>
      <Switch>
        <PrivateRoutes {...props} history={history} path="/admin_players/add_players" exact component={AddEditPlayers}/>
        <PrivateRoutes {...props} path="/admin_players/add_players/:id" exact component={AddEditPlayers}/>
        <PrivateRoutes {...props} path="/admin_players" exact component={AdminPlayers}/>
        <PrivateRoutes {...props} history={history} path="/admin_matches/edit_match" exact component={AddEditMatch}/>
        <PrivateRoutes {...props} path="/admin_matches/edit_match/:id" exact component={AddEditMatch}/>
        <PrivateRoutes {...props} path="/admin_matches" exact component={AdminMatches}/>
        <PrivateRoutes {...props} path="/dashboard" exact component={Dashboard}/>
        <PublicRoutes {...props} history={history} restricted={true} path="/sign_in" exact component={SignIn}/>
        <PublicRoutes {...props} restricted={false} path="/the_team" exact component={TheTeam}/>
        <PublicRoutes {...props} restricted={false} path="/" exact component={Home}/>
      </Switch>
    </Layout>
  );
}

export default Routes;
