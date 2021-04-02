import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import uploadIcon from '../../images/icons/cloud-upload-outline 1.png'

const AddBook = () => {
  const { register, handleSubmit, errors } = useForm();
  const [imageURL, setImageURL] = useState(null)

  const onSubmit = data => {
    // let newBook = {...addBook}
    const newBook = {
      bookName: data.bookName,
      author: data.author,
      price: data.price,
      imageURL: imageURL
    }
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
  return (
    <div>
      <h4 className='m-4'>Add Book</h4>
      <div className="m-4 pt-4">
        <form className="mx-5 pe-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-4">
            <div className="col-sm-6 col-12">
              <label className='form-label' htmlFor="bookName"><b>Book Name</b></label>
              <input name="bookName" type="text" className='form-control' placeholder='Enter Book Name' ref={register ({ required: true })} />
              {errors.bookName && <small className='text-danger'>Book Name is required</small>}
            </div>
            <div className="col-sm-6 col-12">
              <label className='form-label' htmlFor="author"><b>Author Name</b></label>
              <input name="author" type="text" className='form-control' placeholder='Enter Author Name' ref={register ({ required: true })} />
              {errors.author && <small className='text-danger'>Author Name is required</small>}
            </div>
            <div className="col-sm-6 col-12">
              <label className='form-label' htmlFor="price"><b>Add Price</b></label>
              <input name="price" type="text" className='form-control' placeholder='Enter Price' ref={register ({ required: true })} />
              {errors.price && <small className='text-danger'>Price is required</small>}
            </div>
            <div className="col-sm-6 col-12">
              <label className='form-label d-block'><b>Add Book Cover Photo</b></label>
              <button type='button' className='btn btn-outline-primary' onClick={()=>document.getElementById('image-upload').click()}>
                <img src={uploadIcon} className='icon' alt=""/> Upload Photo
              </button>
              <input type="file" id='image-upload' className='form-control' hidden onChange={handleImageUpload} />
            </div>
          </div>
          <div className="d-flex mt-4 justify-content-end">
            <button className='btn btn-primary' type="submit">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;