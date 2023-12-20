const express = require('express');
const connectDB = require('./DataBase/DB'); // Import the database connection
const bodyParser = require('body-parser');
const authRouter = require('./index');
const userTypeInitialization = require('./services/userTypeInitialization');
const cors = require('cors');




const app = express();
connectDB().then(async () => {
  await userTypeInitialization();
});
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use('/api', authRouter);
// Enable CORS for all routes
app.use(cors());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
