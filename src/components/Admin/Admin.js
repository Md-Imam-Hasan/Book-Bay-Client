import React, { useEffect, useState } from 'react';
import gridIcon from '../../images/icons/grid 1.png'
import plusIcon from '../../images/icons/plus 1.png'
import deleteIcon from '../../images/icons/Group 33150.png'
import './Admin.css'
import { useForm } from "react-hook-form";
import axios from 'axios';

const Admin = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const [imageURL, setImageURL] = useState(null)
  const [bookList, setBookList] = useState([])
  const [addBook, setAddBook] = useState({})
  useEffect(() => {
    setBookList([]);
    const url = 'http://localhost:5000/allBook'
    fetch(url)
      .then(res => res.json())
      .then(data => setBookList(data))
  }, [addBook])

  const onSubmit = data => {
    // let newBook = {...addBook}
    const newBook = {
      bookName: data.bookName,
      author: data.author,
      price: data.price,
      imageURL: imageURL
    }
    setAddBook(newBook);
    const url = `http://localhost:5000/addBook`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newBook)
    })
      .then(res => res.json())
      .then(data => {
        data && alert("New Book's Information Added Successfully")
      })
  };

  const handleImageUpload = e => {
    const imageData = new FormData();
    imageData.set('key', 'b3ce459487a7921c3a173fc17b867445');
    imageData.append('image', e.target.files[0])

    axios.post('https://api.imgbb.com/1/upload', imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteBook(id) {
    const url = `http://localhost:5000/delete/${id}`;
    fetch(url, {
      method: "delete"
    })
      .then(res => res.json())
      .then(ok => {
        if(ok){
          console.log('ok');
          // e.target.parentNode.style.display = 'none';
        }
      })
  }
  return (
    <div className='row'>
      <div className="col-3 bg-dark text-light p-3">
        <div className="d-grid gap-2 d-block">
          <button className="btn btn-danger text-light d-flex">
            <img src={gridIcon} className=' icon' alt="" />
            <h5>&nbsp; Manage Books</h5>
          </button>
          <button className="btn btn-danger text-light d-flex">
            <img src={plusIcon} className=' icon' alt="" />
            <h5>&nbsp; Add Book</h5>
          </button>
        </div>

      </div>
      <div className="col-9">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input name="bookName" type='text' ref={register} />
          <br />
          <input name="author" type='text' ref={register} />
          <br />
          <input name="price" type='text' ref={register} />
          <br />
          <input type='file' onChange={handleImageUpload} />
          <br />
          <button type="submit">Save</button>
        </form>
        <div className='mt-5'>
          <table style={{ width: '100%' }}>
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
                    <button onClick={()=>deleteBook(`${book._id}`)}>
                      <img src={deleteIcon} className=' icon' alt="" />
                    </button>
                  </td>
                </tr>)
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;