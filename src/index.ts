import express from 'express';
import { json } from 'body-parser';
import 'reflect-metadata';
import OrderController from './service-layer/controllers/OrdersController';

const app = express();
const port = 3001;

app.use(json());
var cors = require('cors');
app.use(cors())

const orderController =new OrderController();

orderController.mount(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
