import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Router from './router/router'

export default class App extends Component {
  componentDidMount() {
    // some
  }

  render() {
    return (
      <section>
        <Link to="/user" key="link-user">user</Link>
        <br key="br" />
        <Link to="/dashboard" key="link-dash">dashboard</Link>
        <Router />
      </section>
    )
  }
}
