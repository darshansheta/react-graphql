import { Redirect, Route } from 'react-router-dom'
import useLogout from './../hooks/useLogout.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const [ isLogout ] = useLogout();

  return (
    <Route
      {...rest}
      render={props =>
        !isLogout ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRoute