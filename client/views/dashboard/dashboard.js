import React from 'react'
import { connect } from 'react-redux'
import HeadTag from 'react-head'

/* eslint-disable */
class Dashboard extends React.Component {
  componentDidMount() {
    // some
    console.log(this.props)
  }

  render() {
    return (
      <section>
        <HeadTag tag="title">Dashboard</HeadTag>
        <HeadTag tag="meta" name="example" content="whatever" />
        <div>dashboard view {this.props.count}</div>
      </section>
    )
  }
}

export default connect(
  state => state,
  null,
)(Dashboard)
/* eslint-enable */
