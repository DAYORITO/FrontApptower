import React from 'react'

function ModalButton({ name, onClick, disabled }) {
  return (
    <>
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        class="btn mb-2 btn-primary"
        disabled={disabled}
        onClick={onClick}
      >
        {name}
      </button>
    </>
  )
}

export default ModalButton