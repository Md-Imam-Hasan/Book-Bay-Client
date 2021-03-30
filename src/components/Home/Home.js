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
    <div className='home d-sm-flex flex-sm-row d-flex flex-column justify-content-around align-items-sm-start align-items-center'>
      {
        books.map(book=> <BookCard key={book._id} book={book}></BookCard>)
      }
    </div>
  );
};

export default Home;