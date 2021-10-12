import './App.css';
import React, { useState, useEffect} from "react";
import Axios from "axios";

function App() {

  const [movieName, setMovieName] = useState('');
  const [review, setReview] = useState('');
  const [movieReviewList, setMovieList] = useState([]);

  const [newReview,setNewReview] = useState("");
  const [newName,setNewName] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get").then((response) => {
      // console.log(response);
      setMovieList(response.data);
    });
  }, []);

  const ghostBusters = () => {
    // console.log("It gets into the ghostbusters statement");
    Axios.post("http://localhost:3001/api/insert", {
      movieName: "Ghost Busters",
      movieReview: "Great 80s Movie"
    })
  };

  const submitReview = () => {
    console.log("This is going to make an insert statement with the values of movieName "+movieName+" and Review of "+review);
    Axios.post("http://localhost:3001/api/insert", {
      movieName: movieName, 
      movieReview: review
    });

    setMovieList([
      ...movieReviewList,
      { movieName: movieName, movieReview: review},
    ]);

  }

  const deleteReview = (movie) => {
    Axios.delete(`http://localhost:3001/api/delete/${movie}`);
  }

  const updateReview = (movie) => {
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newReview,
    });
    setNewReview("");
  }

  const updateName = (movie) => {
    console.log("This will be the new name "+newName);
    console.log("This is the value of movie.  I want it to be the value of the existing movie.  Is it?  "+movie);
    Axios.put("http://localhost:3001/api/update", {
      movieName: movie,
      movieReview: newName,
    });
    setNewName("");
  }

  return (
    <div className="App">
      <h1>Create Read Update Delete from a Database</h1>
      <p><a href="https://youtu.be/3YrOOia3-mo" target="_blank" rel="noreferrer">This is a link to the video Tutorial that I followed.</a></p>
      <p>How to start the server and client:</p>
      <p>./CRUD-APPLICATION/server/npm run devStart</p>
      <p>./CRUD-APPLICATION/client/yarn start</p>
      <p>MySQL password is "password"</p>
      <div className="form">
      
      <label>Movie Name:</label>
      <input type="text" name="movieName" onChange={(e)=>{
        setMovieName(e.target.value);
      }}></input>
      <label>Review:</label>
      <input type="text" name="review" onChange={(e)=>{
        setReview(e.target.value);
      }}></input>

      <button onClick={submitReview}>Submit</button>
      <br></br>
      <button onClick={ghostBusters}>Add the movie Ghostbusters and a review</button>
      {movieReviewList.map((val) => {
        return (
          <div className="card">
            <h1>
            {val.movieName}
            </h1>
            <p>
            {val.movieReview}
            </p>
            <p>The id is {val.id}</p>
            
            <p>
            <input type="text" id="updateInput" onChange={(e)=>{
              setNewName(e.target.value);
            }}></input>
            <button onClick={
              () => {updateName(val.movieName)}

            }>
            Update Name</button>
            </p>

            <p>
            <input type="text" id="updateInput" onChange={(e)=>{
              setNewReview(e.target.value);
            }}></input>
            <button onClick={
              () => {updateReview(val.movieName)}

            }>
            Update Review</button>
            </p>
          
            <p>
            <button onClick={
              () => {deleteReview(val.movieName)}              
            }>Delete Entire Movie</button>
            </p>
       
            </div>
            )
      })}


      </div>
      

    </div>
  );
}

export default App;
