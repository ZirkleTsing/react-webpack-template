import React from 'react'
import { connect } from 'react-redux'

/* eslint-disable */
class Dashboard extends React.Component {
  componentDidMount() {
    // some
    console.log(this.props)
  }

  render() {
    return (
      <div>dashboard view {this.props.count}</div>
    )
  }
}

export default connect(
  state => state,
  null,
)(Dashboard)
/* eslint-enable */
