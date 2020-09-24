import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import ListDetails from './components/ListDetails/ListDetails';
import Book from './components/Book/Book';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout/Logout';
import * as actions from './store/actions/index';
import Register from './components/Register/Register';
import RegisterSuccess from './components/Register/RegisterSuccess/RegisterSuccess';

function App(props) {
  const {onAutoSignIn} = props;

  useEffect(() => {
    onAutoSignIn();
  }, [onAutoSignIn]);

  return (
    <Layout>
      <Switch>
        <Route path='/list' component={ListDetails} />
        <Route path='/login' component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/registerSuccess' component={RegisterSuccess} />
        <Route path='/logout' exact component={Logout} />
        <Route path='/:slug' component={Book} />
        <Route path='/' exact component={Home} />
        <Redirect to='/' />
      </Switch>
    </Layout>
  );
}

const mapDispatchToProps = dispatch => {
  return {
    onAutoSignIn: () => dispatch(actions.checkLoginState())
  }
}

export default connect(null, mapDispatchToProps)(App);
