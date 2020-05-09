const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

function handleDisconnect() {
  const app = express();
  app.use(cors());

  const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'leavecountry',
  });

  db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log("Mysql connected...");
  });

  db.on("error", function (err) {
    console.log("db error", err);
    server.close();
    handleDisconnect();
  });

  app.get('/tours', (req, res) => {
    let sql = 'SELECT hotel.name AS hotel, hotel.description AS hotelDescription, city.name AS city, country.name AS country, tourticket.idTourTicket AS id ' +
    'FROM tourticket ' + 
    'JOIN booktable ON tourticket.idBookTable = booktable.idBookTable ' +
    'JOIN room ON booktable.idRoom = room.idRoom ' + 
    'JOIN hotel ON room.idHotel = hotel.idHotel ' +
    'JOIN city ON hotel.idCity = city.idCity ' + 
    'JOIN country ON city.idCountry = country.idCountry';
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

  app.get("/country/:idCountry", (req, res) => {
    // console.log(req);
    // res.send(req.query);
    let sql =
      "SELECT country.name AS countryName, city.name AS cityName, hotel.name AS hotelName, hotel.description AS hotelDescription " +
      "FROM hotel " +
      "JOIN city ON hotel.idCity = city.idCity " +
      "JOIN country ON city.idCountry = country.idCountry " +
      "WHERE hotel.idCity IN (SELECT city.idCity FROM city WHERE idCountry=" +
      req.params.idCountry +
      ")";
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

  app.get("/city/:idCity", (req, res) => {
    let sql =
      "SELECT country.name AS countryName, city.name AS cityName, hotel.name AS hotelName, hotel.description AS hotelDescription " +
      "FROM hotel " +
      "JOIN city ON hotel.idCity = city.idCity " +
      "JOIN country ON city.idCountry = country.idCountry " +
      "WHERE hotel.idCity = " +
      req.params.idCity;
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

  let server = app.listen("3000", () => {
    console.log("Ya est sila");
  });
}

handleDisconnect();
