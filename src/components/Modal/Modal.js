import React from 'react'
import PropTypes from 'prop-types'
import './Modal.css'

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? 'modal display-block' : 'modal display-none'
  return (
    <div className={showHideClassName}>
      <section className={'modal-main'}>
        {children}
        <div className={'closeBtn'} onClick={handleClose}>X</div>
      </section>
    </div>
  )
}

Modal.propTypes = {
  handleClose: PropTypes.func,
  show: PropTypes.bool,
  children: PropTypes.node
}

export default Modal
