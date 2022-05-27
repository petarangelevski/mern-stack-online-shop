import React from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { isAuthenticated, logout } from '../helpers/auth'

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const Header = () => {

  const navigate = useNavigate();

  const handleLogout = evt => {
    logout(() => {
      navigate('/signin');
    });
  }
  const showNavigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link to='/' className="navbar-brand">Logo</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto mt-2 mt-lg-0">

          {!isAuthenticated() && (
            <>
              <li className="nav-item">
                <Link to='/' className="nav-link">
                  <i className='fas fa-home'></i> Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/signup' className="nav-link">
                  <i className='fas fa-edit'></i> SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link to='/signin' className="nav-link">
                  <i className='fas fa-sign-in-alt'></i> SignIn
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && isAuthenticated().role === 0 && (
            <>
              <li className="nav-item">
                <Link to='/user/dashboard' className="nav-link">
                  <i className='fas fa-home'></i> Dashboard
                </Link>
              </li>
            </>
          )}

          {isAuthenticated() && isAuthenticated().role === 1 && (
            <>
              <li className="nav-item">
                <Link to='/admin/dashboard' className="nav-link">
                  <i className='fas fa-home'></i> Dashboard
                </Link>
              </li>
            </>
          )}


          {isAuthenticated() && (
            <>
              <li className="nav-item">
                <button
                  className="btn btn-link text-secondary text-decoration-none pl-0"
                  onClick={handleLogout}
                  >

                  <i className='fas fa-sign-out-alt'></i> LogOut
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );

  //render the view
  return (
    <header id='header'>
      {showNavigation()}
    </header>
  )
}

export default withRouter(Header);