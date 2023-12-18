const express = require('express');
const connectDB = require('./DataBase/DB'); // Import the database connection
const bodyParser = require('body-parser');
const authRouter = require('./index');
const userTypeInitialization = require('./services/userTypeInitialization');

const app = express();
connectDB().then(async () => {
  await userTypeInitialization();
});
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', authRouter);
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
