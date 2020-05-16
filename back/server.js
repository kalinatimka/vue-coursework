const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const constants = {
  country: 'country.idCountry',
  wifi: 'facilities.wifi',
  conditioner: 'facilities.conditioner',
  parking: 'facilities.parking',
}

function addFilters(filters) {
  let sql = ' WHERE ';
  console.log(filters);
  Object.keys(filters).forEach((key, index) => {
    if (index != 0) {
      sql += ' AND '; // скорее всего здесь будет AND
    }
    if (Array.isArray(filters[key])) {
      sql += '(';
      filters[key].forEach((filterId, index) => {
        if (index != 0) {
          sql += ' OR ';
        }
        sql += constants[key] + '=' + filterId;
      })
      sql += ')';
    } else {
      sql += constants[key] + '=' + filters[key];
    }
  });
  sql += ' ';
  console.log(sql);
  return sql;
}

function handleDisconnect() {
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

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
    console.log('Mysql connected...');
  });

  db.on('error', function (err) {
    console.log('db error', err);
    server.close();
    handleDisconnect();
  });

  app.get('/tours', (req, res) => {
    let sql = 'SELECT tourticket.idTourTicket AS id, hotel.name AS hotel, hotel.description AS hotelDescription, '+
    'city.name AS city, country.name AS country, facilities.wifi AS wifi, facilities.parking AS parking, ' + 
    'facilities.conditioner AS conditioner, AVG(reviews.rating) AS rating ' +
    'FROM tourticket ' + 
    'JOIN booktable ON tourticket.idBookTable = booktable.idBookTable ' +
    'JOIN room ON booktable.idRoom = room.idRoom ' + 
    'JOIN facilities ON room.idFacilities = facilities.idFacilities ' +
    'JOIN hotel ON room.idHotel = hotel.idHotel ' +
    'JOIN reviews ON hotel.idHotel = reviews.idHotel ' +
    'JOIN city ON hotel.idCity = city.idCity ' + 
    'JOIN country ON city.idCountry = country.idCountry ';
    sql += Object.keys(req.query).length ? addFilters(req.query) : '';
    sql += 'GROUP BY tourticket.idTourTicket'
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

  app.get('/tables', (req, res) => {
    let sql = "SELECT TABLE_NAME AS name FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE' AND TABLE_SCHEMA='leavecountry'";
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

  app.get('/table/:tableName', (req, res) => {
    let sql = "SELECT * FROM " + req.params.tableName;
    let query = db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.send(result);
    });
  });

  app.post('/query', (req, res) => {
    let sql = req.body.query;
    db.query(sql, (err, result) => {
      if (err) {
        console.log('sd');
        res.status(404).send({message: err.sqlMessage});
      } else {
        res.send(result);
      }
    })
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

  app.get("/facilities", (req, res) => {
    let sql = 'SELECT tourticket.idTourTicket AS id, hotel.name AS hotel, hotel.description AS hotelDescription, city.name AS city, country.name AS country ' +
    'FROM tourticket ' + 
    'JOIN booktable ON tourticket.idBookTable = booktable.idBookTable ' +
    'JOIN room ON booktable.idRoom = room.idRoom ' + 
    'JOIN hotel ON room.idHotel = hotel.idHotel ' +
    'JOIN city ON hotel.idCity = city.idCity ' + 
    'JOIN country ON city.idCountry = country.idCountry ' + 
    'WHERE room.idRoom IN (SELECT room_idRoom FROM room_has_facilities WHERE facilities_idFacilities = 1 OR facilities_idFacilities = 2)';
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

  let server = app.listen('3000', () => {
    console.log('Ya est sila');
  });
}

handleDisconnect();
