import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { CategoryContext } from '../../App';

const PrivateRoute = ({children, ...rest}) => {
    const [name, setName, place, setPlace, loggedInUser, setLoggedInUser] = useContext(CategoryContext);
    return (
        <Route
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
    );
};

export default PrivateRoute;