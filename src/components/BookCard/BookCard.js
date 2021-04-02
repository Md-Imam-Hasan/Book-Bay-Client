import React from 'react';
import { Link } from 'react-router-dom';
import './BookCard.css'

const BookCard = (props) => {
  const { imageURL, bookName, author, price, _id } = props.book
  return (
    <div className='book'>
      <div className="card text-dark p-5">
        <img src={imageURL} className='' alt="" />
        <h5 className='mt-3'>{bookName}</h5>
        <p className="m-0 text-muted">{author}</p>
        <div className="mt-4">
          <div className="d-flex justify-content-between">
            <h4 className='text-primary'><b>${price}</b></h4>
            <Link to={'/checkout/book/' + _id}>
              <button className="btn btn-primary">Buy Now</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;