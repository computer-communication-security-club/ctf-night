require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();
const dbConnect = require("./db/connect")
const router = require("./routes/main")
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

// basic middleware
app.use(express.static('./public'));
app.use(express.json());

// routing 
app.use("/api/v1",router)

// custom middleware
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);


const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await dbConnect(process.env.MONGO_DB_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
