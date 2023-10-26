import React, { useEffect, useState } from 'react';
import { deleteNote, getNotes } from './auth/context/apiContext';

function NotesDescription({title, description, show, onClose}) {
    
  return (
    <>

<div className="modal fade" id="myModal" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content bg-info">
      <div className="modal-header bg-success p-3">
        <h5 className="modal-title" id="modalLabel">{title}</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body p-4">
      {description}
      </div>
      <div className="modal-footer bg-dark p-1">
        <button type="button" className="btn btn-dark p-2 m-0" style={{width:"100%"}} data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
    </>
  )
}

export default NotesDescription