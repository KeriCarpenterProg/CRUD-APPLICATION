const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "password",
    database: "CRUDDataBase",
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get("/api/get", (req, res) => {
    const sqlSelect = "SELECT * FROM movie_reviews";
    db.query(sqlSelect, (err, result) => {
        res.send(result);
    })
});

app.put("/api/dosomething", (req, res) => {
    newMovieName = "Hi!";
    oldMovieName = "Ghost Busters";
    const updateStatement = "UPDATE movie_reviews SET movieName=? WHERE movieName = ?;";
    db.query(updateStatement, [newMovieName,oldMovieName], (err, result) => {
        console.log(err);
    })

});


app.post("/api/insert", (req, res) =>{
    const movieName = req.body.movieName
    const movieReview = req.body.movieReview

    const sqlInsert = "INSERT INTO movie_reviews (movieName, movieReview) VALUES (?,?)"
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        console.log(err);
    })
});

app.delete("/api/delete/:movieName", (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = "DELETE FROM movie_reviews WHERE movieName = ?";

    db.query(sqlDelete, name, (err, results) => {
        if (err) console.log(err);
    })
    console.log(name);
});

app.put("/api/review", (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    const sqlUpdate = "UPDATE movie_reviews SET movieReview = ? WHERE movieName = ?";

    db.query(sqlUpdate, [review, name], (err, results) => {
        if (err) console.log(err);
    })
    console.log(name);
});

app.put("/api/update", (req, res) => {
    const name = req.body.movieName;
    const newName = req.body.movieNewName;
    let newId=0;
    const getId = "SELECT id FROM movie_reviews where movieName = ?;"
    db.query(getId, name, (err, results) => {
        newId=results[0].id;
        // console.log("The id of the result is "+newId);
        if(err) console.log(err);
        const sqlUpdate = "UPDATE movie_reviews SET movieName = ? WHERE id = ?";
        // console.log(newName);
        // console.log("The id of the result is "+newId);
        db.query(sqlUpdate, [newName, newId], (err, results) => {
        if (err) console.log(err);
    });
    });
    
});

    
app.listen(3001, () => {
    console.log("this is running on port 3001");
})