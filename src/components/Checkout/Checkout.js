import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router';
import { UserContext } from '../../App';

const Checkout = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [book, setBook] = useState({})
  let { id } = useParams();

  const placeOrder = () => {
    const orderDate = new Date();
    const newOrder = { ...loggedInUser, bookName: book.bookName, price: book.price, orderDate };
    const url = `http://localhost:5000/addOrder`
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newOrder)
    })
      .then(res => res.json())
      .then(data => {
        data && alert("You Successfully Placed Your Order")
      })
  }

  useEffect(() => {
    const url = `http://localhost:5000/book/${id}`
    fetch(url)
      .then(res => res.json())
      .then(data => setBook(data))
  }, [id])
  return (
    <div className='container'>
      <div className="card mt-5">
        <h3 className='px-4 pt-4'>Checkout</h3>
        <div className="card-body">
          <div className="container">
            <table style={{ width: '100%' }}>
              <thead>
                <tr className='text-muted'>
                  <th>Description</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody className='fw-bold'>
                <tr>
                  <td>{book.bookName}</td>
                  <td>1</td>
                  <td>${book.price}</td>
                </tr>
                <tr>
                  <td>Total</td>
                  <td></td>
                  <td>${book.price}</td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex justify-content-end me-sm-5">
              <button className="btn btn-primary my-4" onClick={placeOrder}>Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;