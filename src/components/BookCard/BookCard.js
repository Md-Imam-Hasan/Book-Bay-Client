import React from 'react';
import { Link } from 'react-router-dom';

const BookCard = (props) => {
  const { imageURL ,bookName, author, price } = props.book
  return (
    <div className='book'>
      <Link to={'/checkout/book' + bookName}>
        <div className="card text-dark text-center p-5">
          <img src={imageURL} alt="" />
          <h3 className='mt-3'>{bookName}</h3>
          <p className="m-0 text-muted">{author}</p>
          <div className="d-flex">
            <p>${price}</p>
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookCard;