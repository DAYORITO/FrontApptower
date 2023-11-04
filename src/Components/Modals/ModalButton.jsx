import React from 'react'

function ModalButton({name, onClick}) {
  return (
    <>
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          class="btn mb-2 btn-primary"
          onClick={onClick}
        >
          {name}
        </button>
    </>
  )
}

export default ModalButton