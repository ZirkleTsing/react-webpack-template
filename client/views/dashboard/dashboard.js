import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'

/* eslint-disable */
class Dashboard extends React.Component {
  componentDidMount() {
    // some
    console.log(this.props)
  }

  render() {
    return (
      <section>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Nested component" />
          <link rel="canonical" href="http://mysite.com/example" />
        </Helmet>
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
