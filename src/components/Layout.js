import PublicRoute from './PublicRoute.js'
import PrivateRoute from './PrivateRoute.js'
import Header from './Header.js';
import Footer from './Footer.js';
import { BrowserRouter, Route, Switch, Link, useHistory } from 'react-router-dom';
import Login from './Login.js';
import useToken from './../hooks/useToken.js';
import Home from './Home.js';

function Layout() {
  const { token, setToken } = useToken();
  return (
    <div className="layout">
    <BrowserRouter>
  
      <Header></Header>
      {/*<Login setToken={setToken}></Login>*/}
      <div style={{minHeight:"500px"}}>
      <Switch>
        <PrivateRoute path="/home" component={Home}>
          
        </PrivateRoute>
        <PublicRoute path="/login">
         <Login setToken={setToken} />
        </PublicRoute>
      </Switch>
      </div>
      </BrowserRouter>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
