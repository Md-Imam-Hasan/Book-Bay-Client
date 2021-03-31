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
        <h3 className='p-4'>Checkout</h3>
        <div className="card-body">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{book.bookName}</td>
                <td>1</td>
                <td>{book.price}</td>
              </tr>
              <tr>
                <td><b>Total</b></td>
                <td></td>
                <td>{book.price}</td>
              </tr>
            </tbody>
          </table>
          <button className="btn btn-primary" onClick={placeOrder}>Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;