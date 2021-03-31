import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = (props) => {
  const { imageURL, bookName, author, price, _id } = props.book
  return (
    <div className='book'>
      <div className="card text-dark text-center p-5">
        <img src={imageURL} className='img-fluid' alt="" />
        <h3 className='mt-3'>{bookName}</h3>
        <p className="m-0 text-muted">{author}</p>
        <div className="d-flex">
          <p>${price}</p>
          <Link to={'/checkout/book/' + _id}>
            <button className="btn btn-primary">Buy Now</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookCard;