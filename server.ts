// Imports
import { createConnection } from 'typeorm';
import { Bicycle } from './src/entity/Bicycle';
// import {Bicycle} from "./model/Bicycle";

// Connections
createConnection().then((connection) => {
  const bicycleRepository = connection.getRepository(Bicycle);

  // create and setup express app
  const express = require('express');
  const app = express();
  const port = 4000;

  const bodyParser = require('body-parser');
  app.use(bodyParser.json());

  const cors = require('cors');
  app.use(cors());

  // register routes
  app.get('/get_free_bikes', async function(req, res) {
    const freeBikes = await bicycleRepository.find({
      where: { is_rented: false }
    });
    res.json(freeBikes);
  });

  app.get('/get_rented_bikes', async function(req, res) {
    const rentedBikes = await bicycleRepository.find({
      where: { is_rented: true }
    });
    res.send(rentedBikes);
  });

  app.post('/create_rent', async function(req, res) {
    const newBike = await bicycleRepository.create(req.body);
    const results = await bicycleRepository.save(newBike);
    return res.send(results);
  });

  app.put('/rent_bike/:id', async function(req, res) {
    const bike = await bicycleRepository.findOne(req.params.id);
    bike.is_rented = true;
    const results = await bicycleRepository.save(bike);
    return res.send(results);
  });

  app.put('/unrent_bike/:id', async function(req, res) {
    const bike = await bicycleRepository.findOne(req.params.id);
    bike.is_rented = false;
    const results = await bicycleRepository.save(bike);
    return res.status().send(results);
  });

  app.delete('/delete_bike/:id', async function(req, res) {
    const results = await bicycleRepository.delete(req.params.id);
    return res.status(204).send(results);
  });

  // start express server
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});
