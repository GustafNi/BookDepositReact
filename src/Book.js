import React from 'react'

function Book(props) {
    return(
        <li className="list-item list-group-item d-flex align-items-center">
        <div className="title">{props.book.title}</div>

        <div className="author">{props.book.author}</div>

        <div className="buttons">
          <button type="button" className="btn btn-success">
            Editera
          </button>
          <button type="button" className="btn btn-danger">
            Ta bort
          </button>
        </div>
      </li> 
    )
}

export default Book