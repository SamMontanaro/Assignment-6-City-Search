import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const [posts, setPosts] = useState([]);

  const fetchPost = async () => {
    let input = document.getElementById("city").value.toUpperCase();

    await axios
      .get('http://ctp-zip-api.herokuapp.com/city/' + input)
      .then(response => {
        console.log(response.data);
        setPosts(response.data);
      })
      .catch(error => {
        console.log(error.response.data.error);
        setPosts(["No results"]);
      })
  }

  return (
    <div className="App text-center">
      <h1 className='p-3 bg-dark text-light'>City Search</h1>
      <div className='d-flex flex-row justify-content-center align-items-center'>
        <label htmlFor="city" className="form-label px-3"><b>City:</b></label>
        <div className='row d-flex justify-content-center'>
          <div>
            <input type="text" id="city" className="form-control text-center my-2" onChange={fetchPost}/>
          </div>
        </div>
      </div>

      <div className='card col-9 col-md-6 col-lg-3 mx-auto mt-1 mb-3'>
        <div className='card-header'>Zip Codes Associated With This City:</div>
        <div className='card-body'>
          <div className='card-text text-start'>
            <ul className='p-0 m-2'>
              {
                posts.map((e, i) => {
                  return e === "No results" ? <p className='text-center fw-bold' key={i}>No results</p> : <li className='ms-3' key={i}>{e}</li>
                })
              }
            </ul>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
