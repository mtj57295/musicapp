import React, { Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const NavBar = ({ auth: { isAuthenticated, loading }, logout }) => {

   const authLinks = (
      <li></li>
   );

   const guestLinks = (
      <Fragment>
         <li className="nav-item">
           <Link className="nav-link" to='/register'>SignUp</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link" to='/login'>Login</Link>
         </li>
      </Fragment>
   );


   return (
      <nav className="navbar navbar-expand-lg">
        <Link className="" style={{color: 'white', textDecoration: 'overline'}} to='/'>MusicFinder</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
             <li className="nav-item">
              <Link className="nav-link" to="/topcharts">Top Charts</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
            {! loading && (<Fragment>{ isAuthenticated ? authLinks: guestLinks}</Fragment>)}
          </ul>
        </div>
      </nav>
   )
}

NavBar.propTypes = {
   logout: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, { logout })(NavBar);
