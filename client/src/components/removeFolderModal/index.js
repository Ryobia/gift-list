import React from 'react';

function RemoveFolderModal(props) {
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
        <p>Remove {props.folder.folderName} from list?</p>
        <button onClick={props.handleRemoveFolder}>Remove</button>
        <button onClick={props.hideRemoveFolderModal}>Cancel</button>
      </div>
    );
  }

  export default RemoveFolderModal;