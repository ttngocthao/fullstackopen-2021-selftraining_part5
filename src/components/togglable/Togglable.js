import React,{ useState,useImperativeHandle } from 'react'
import PropTypes from 'prop-types'


//!wrap the component inside of a forwardRef function call. This way the component can access the ref that is assigned to it.
const Togglable = React.forwardRef((props,ref) => {

  const [visible,setVisible]=useState(false)

  const hideWhenVisible = { display: visible ? 'none' :'' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility =() => {
    setVisible(!visible)
  }
  //!The useImperativeHandle hook makes its toggleVisibility function available outside of the component.
  useImperativeHandle(ref,() => {
    return{
      toggleVisibility
    }
  })


  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <br/>
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
})

Togglable.displayName = 'Togglable'

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
