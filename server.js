const express = require('express');
const connectDB = require('./DataBase/DB'); // Import the database connection
const bodyParser = require('body-parser');
const authRouter = require('./UserAuthentication/index');

const app = express();
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', authRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
