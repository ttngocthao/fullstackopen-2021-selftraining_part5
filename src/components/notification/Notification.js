import React from 'react'
import PropTypes from 'prop-types'


const Notification = ({ successful,message }) => {
  const styles ={
    color: successful ? 'green': 'red',
    borderRadius:'5px',
    padding:'15px',
    margin:'20px 0',
    border:`2px solid ${successful ? 'green' : 'red'}`
  }
  return (
    <div id='notification' style={styles}>
      {message}
    </div>
  )
}

Notification.propTypes ={
  successful: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired
}

export default Notification
