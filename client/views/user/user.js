import React from 'react'
import { Helmet } from 'react-helmet'

export default class User extends React.Component {
  componentDidMount() {
    // some
  }

  render() {
    return (
      <div>
        <div>
          <Helmet>
            <title>User</title>
          </Helmet>
        </div>
        user view
      </div>
    )
  }
}
