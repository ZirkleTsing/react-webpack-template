import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Dashboard from '../views/dashboard/dashboard'
import User from '../views/user/user'

export default class MyRoute extends React.Component {
  render() {
    return [
      <Route path="/" exact render={() => <Redirect to="/dashboard" />} key="root" />,
      <Route path="/dashboard" exact component={Dashboard} key="dashboard" />,
      <Route path="/user" exact component={User} key="user" />,
    ]
  }
}
