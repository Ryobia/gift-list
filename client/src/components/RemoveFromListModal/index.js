import React from 'react';

function Modal(props) {
    return (
      <div
      className='removeFromListModal'
        style={{
          position: 'absolute',
          top: props.y,
          left: props.x,
          padding: '1rem',
          borderRadius: '5px',
          zIndex: '999',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
        }}
      >
        <p>Remove {props.user.firstName} from list?</p>
        <button onClick={props.handleRemoveUserToList}>Remove</button>
        <button onClick={props.hideModal}>Cancel</button>
      </div>
    );
  }

  export default Modal;