
import { Redirect, Route } from 'react-router-dom'
import useToken from './../hooks/useToken.js';

const PublicRoute = ({ component: Component, ...rest }) => {
    const { token, setToken } = useToken();
    if (token) {
        return <Redirect to={{ pathname: '/home' }} />;
    }
  return (
    <Route
      {...rest}
      render={props =>
        !token ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/home', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PublicRoute