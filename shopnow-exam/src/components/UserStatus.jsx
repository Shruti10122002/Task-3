import React from 'react'
import PropTypes from 'prop-types'

class UserStatus extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Fetching user status…'
    }
  }

  componentDidMount() {
    this.timeoutId = setTimeout(() => {
      this.setState({ message: 'Active User' })
    }, 2000)
  }

  componentWillUnmount() {
    clearTimeout(this.timeoutId)
  }

  render() {
    return (
      <div className="card card-wide">
        <h3>User ID: {this.props.userId}</h3>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

UserStatus.propTypes = {
  userId: PropTypes.number.isRequired
}

export default UserStatus