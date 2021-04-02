import { CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import BookCard from '../BookCard/BookCard';

const Home = () => {
  const [books,setBooks] = useState([])
  useEffect(()=>{
    const url = 'http://localhost:5000/allBook'
    fetch(url)
    .then(res=>res.json())
    .then(data=>setBooks(data))
  },[])
  return (
    <div className='home mt-4 flex-wrap d-sm-flex flex-sm-row d-flex flex-column justify-content-around align-items-sm-start align-items-center'>
      {
        books.length === 0 && <div className='mt-5 pt-5'><CircularProgress /></div>
      }
      {
        books.map(book=> <BookCard key={book._id} book={book}></BookCard>)
      }
    </div>
  );
};

export default Home;