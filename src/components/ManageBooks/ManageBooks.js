import React, { useEffect, useState } from 'react';
import deleteIcon from '../../images/icons/Group 33150.png'
import editIcon from '../../images/icons/Group 307.png'

const ManageBooks = () => {
  const [bookList, setBookList] = useState([])
  useEffect(() => {
    setBookList([]);
    const url = 'https://calm-falls-19504.herokuapp.com/allBook'
    fetch(url)
      .then(res => res.json())
      .then(data => setBookList(data))
  }, [])

  function deleteBook(id) {
    const url = `https://calm-falls-19504.herokuapp.com/delete/${id}`;
    fetch(url, {
      method: "delete"
    })
      .then(res => res.json())
      .then(ok => {
        if (ok) {
          alert('Deleted Successfully')
        }
      })
  }
  return (
    <div>
      <h4 className='m-4'>Manage Books</h4>
      <div className="pt-4 d-flex justify-content-center">
        <table style={{ width: '90%' }}>
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author Name</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              bookList.map(book => <tr key={book._id}>
                <td>{book.bookName}</td>
                <td>{book.author}</td>
                <td>${book.price}</td>
                <td>
                  <button className='btn p-0'>
                    <img src={editIcon} className='icon' alt="" />
                  </button>
                  <button className='btn' onClick={() => deleteBook(`${book._id}`)}>
                    <img src={deleteIcon} className='icon' alt="" />
                  </button>
                </td>
              </tr>)
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooks;