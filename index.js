const express = require('express')
const app = express()
const db = require('./db')
const cors = require('cors')
const path = require('path')
const socket = require('socket.io');

//import routes
const testimonialsRoutes = require('./routes/testimodials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')

//middleware to use for all request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use('/api', testimonialsRoutes); // add testimonialsRoutes routes to server
app.use('/api', concertsRoutes);// add concertsRoutes routes to server
app.use('/api', seatsRoutes);// add seatsRoutes routes to server

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});


// catch error link
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
})

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New socket', socket.id)

});