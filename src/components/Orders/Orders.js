import { CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Orders.css'
const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderList, setOrderList] = useState([]);
  useEffect(() => {
    fetch('https://calm-falls-19504.herokuapp.com/orders?email=' + loggedInUser.email)
      .then(res => res.json())
      .then(data => setOrderList(data));
  }, [loggedInUser])
  return (
    <div className='container'>
      {!orderList.length ? <div className='mt-5 pt-5 text-center'><CircularProgress /></div> :
        <div className="card mt-5">
          <h3 className='px-4 pt-4'>Your Order History</h3>
          <div className="card-body">
            <div className="container">
              <table style={{ width: '100%' }}>
                <thead>
                  <tr className='text-muted'>
                    <th>Description</th>
                    <th>Order Time</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody className='fw-bold'>
                  {
                    orderList.map(book => <tr key={book._id}>
                      <td>{book.bookName}</td>
                      <td>{new Date(book.orderDate).toDateString('dd/MM/yyyy')}</td>
                      <td>${book.price}</td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Orders;