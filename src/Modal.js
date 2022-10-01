import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {
  const { correct, data, modalOpen, closeModal } = useGlobalContext();

  // console.log(modalOpen)
  return (
    <div className={`${modalOpen ? 'modal-container isOpen': 'modal-container'}`}>
      <div className="modal-content">
        <h2>Congratulations!</h2>
        <p>
          You answered {((correct / data.length) * 100).toFixed(0)}% of questions correctly
        </p>
        <button className='close-btn' onClick={closeModal}>
          Start Again
        </button>
      </div>
    </div>
  )
}

export default Modal
