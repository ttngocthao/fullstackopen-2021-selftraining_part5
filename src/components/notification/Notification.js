import React from 'react'

const Notification = ({successful,message}) => {
    const styles ={
        color: successful ? 'green': 'red',
        borderRadius:'5px',
        padding:'15px',
        margin:'20px 0',
        border:`2px solid ${successful ? 'green' : 'red'}`
    }
    return (
        <div style={styles}>
          {message}
         </div>
    )
}

export default Notification
