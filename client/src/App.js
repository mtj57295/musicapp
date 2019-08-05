import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';

import NavBar from './components/layout/NavBar';
import Landing from './components/layout/Landing';
import TopCharts from './components/topcharts/TopCharts';
import Search from './components/search/Search';
import ArtistProfile from './components/artistprofile/ArtistProfile';
import Register from './components/auth/Register';
//import Login from './components/auth/Login';
//import Alert from './components/layout/Alert';
//import PrivateRoute from './components/routing/PrivateRoute';

//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token)
   setAuthToken(localStorage.token);

const App = () => {

   useEffect(() => {
         store.dispatch(loadUser());
   }, []);

   return(
      <Provider store={store}>
         <Router>
            <Fragment>
               <NavBar />
               <Route exact path='/' component={Landing} />
               <section>
                  <Switch>
                     <Route exact path='/register' component={Register}/>
                     <Route exact path='/topcharts' component={TopCharts} />
                     <Route exact path='/search' component={Search} />
                     <Route exact path='/artistprofile' component={ArtistProfile} />
                  </Switch>
               </section>
            </Fragment>
         </Router>
      </Provider>
   );
}

export default App;
