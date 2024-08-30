const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const mediaRoutes = require('./routes/mediaroutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/api', mediaRoutes);

mongoose.connect('mongodb+srv://anjuvenu2005:anjuvenu2005@cluster0.av0dp.mongodb.net/users?retryWrites=true&w=majority&appName=Cluster0');

mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
