import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// component: Component accepts a component prop, like <Route/>
// takes any other prop that gets passed in by spreading in ...rest
const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (localStorage.getItem('token')) {
          return <Component {...rest} />
        } else {
          return <Redirect to='/' />
        }
      }}
    />
  )
}

export default PrivateRoute
