import React from 'react'
import { PropTypes } from 'prop-types'

const User = ({ user, handleLogout }) => {
  const userStyle = {
    paddingBottom: 20
  }

  return (
    <div style={userStyle}>
      {user.name} logged-in  <button onClick={() => handleLogout(user.id)}>Logout</button>
    </div>
  )
}

User.propTypes = {
  handleLogout: PropTypes.func.isRequired,
  user: PropTypes.exact({
    id: PropTypes.string,
    name: PropTypes.string,
    username: PropTypes.string,
    token: PropTypes.string
  }),
}

export default User