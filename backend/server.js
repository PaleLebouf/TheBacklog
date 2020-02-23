const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userRouter = require('./routes/user');
const showRouter = require('./routes/show');
const mangaRouter = require('./routes/manga');
const gameRouter = require('./routes/game');

app.use('/user', userRouter);
app.use('/show', showRouter);
app.use('/manga', mangaRouter);
app.use('/game', gameRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});