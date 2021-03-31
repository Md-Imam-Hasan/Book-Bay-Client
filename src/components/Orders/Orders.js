import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const Orders = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [orderList,setOrderList] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/orders?email=' + loggedInUser.email)
      .then(res => res.json())
      .then(data => setOrderList(data));
  }, [loggedInUser])
  return (
    <div className='container'>
      <div className="card mt-5">
        <h3 className='p-4'>Your Order History</h3>
        <div className="card-body">
          <table style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Description</th>
                <th>Order Time</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {
                orderList.map(book=><tr key={book._id}>
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
  );
};

export default Orders;