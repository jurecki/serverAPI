const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')

//import routes
const testimonialsRoutes = require('./routes/testimodials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')

//middleware to use for all request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use('/api', testimonialsRoutes); // add testimonialsRoutes routes to server
app.use('/api', concertsRoutes);// add concertsRoutes routes to server
app.use('/api', seatsRoutes);// add seatsRoutes routes to server

// catch error link
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
})

app.listen(8000, () => {
    console.log('Server is running on port: 8000')
})