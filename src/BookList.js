import React from 'react'
import Book from './Book'

    
  function BookList(props) {
       
        const bookComponents = props.bok.map(item => <Book key={item.id} book={item} />)
       
        return (
        <div className="display-books">
        <div className="container">
            <div className="col-12">
              <ul className="list-group">
                <li className="list-item list-group-item d-flex align-items-center">
                  <strong className="title">Titel</strong>

                  <strong className="author">Författare</strong>

                  <div className="buttons">
                    <button type="button" className="btn btn-success">
                      Editera
                    </button>
                    <button type="button" className="btn btn-danger">
                      Ta bort
                    </button>
                  </div>
                </li> 
                  {bookComponents}
              </ul>
            </div>
          </div>
        </div>
        )
    }


export default BookList