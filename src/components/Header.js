import useToken from './../hooks/useToken.js';
import { Link, useHistory } from 'react-router-dom';
import useLogout from './../hooks/useLogout.js';
import { useQuery, gql, useMutation } from "@apollo/client";
import Logo from './../logo.svg';
import { OnlineStatusProvider } from "./../hooks/useOnlineStatus.js";

const LOGOUT_QUERY = gql`
mutation {
  revokeCustomerToken {
    result
  }
}`;

function AppNav() {
  const { token, setToken } = useToken();
  const [ isLogout, setLogout ] = useLogout();
  console.log(token, 'from Header');

  const [logoutUser] = useMutation(LOGOUT_QUERY, {
      onError: (err) => {
          console.log(err.message);
      }
    });

  const handleLogout = async e => {
    e.preventDefault();
   logoutUser()
   setLogout()
    window.location.href = '/';
    }


  return (
    <OnlineStatusProvider>
    <header className=" mb-3 border-bottom">
    <div className="raw">
    <div className="col">
    <nav className="navbar d-flex navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          <img src={Logo} className="App-logo" alt="logo" width="150" />
        </a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          {/*<ul className="navbar-nav flex-row flex-wrap bd-navbar-nav pt-2 py-md-0">
            {token && <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>}
            
            {!token && <li className="nav-item col-6 col-md-auto">
              <Link className="nav-link" to="/login">Login</Link>
            </li>}
            {token && <li className="nav-item col-6 col-md-auto">
               <a className="nav-link" href="#" >Log out</a>
            </li>}
          </ul>*/}
          <ul className="navbar-nav flex-row flex-wrap ms-md-auto">
            {token && <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>}
            
            {!token && <li className="nav-item col-6 col-md-auto">
              <Link className="nav-link" to="/login">Login</Link>
            </li>}

            {token && <li className="nav-item"> <span className="nav-link" > Welcome, Jack Sparrow </span></li>}
            {token && <li className="nav-item">
               <a className="nav-link" href="/" onClick={handleLogout} >Log out</a>
            </li>}
          </ul>
          
        </div>
      </div>
    </nav>
    </div>
    </div>
  </header>
  </OnlineStatusProvider>

  );
}

export default AppNav;
