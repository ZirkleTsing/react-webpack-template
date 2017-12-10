import React from 'react'
import HeadTag from 'react-head'

export default class User extends React.Component {
  componentDidMount() {
    // some
  }

  render() {
    return (
      <div>
        <div>
          <HeadTag tag="title">User</HeadTag>
          <HeadTag tag="meta" name="example" content="whatever" />
        </div>
        user view
      </div>
    )
  }
}
