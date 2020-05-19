const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');
const helmet = require('helmet');

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes')
const concertsRoutes = require('./routes/concerts.routes')
const seatsRoutes = require('./routes/seats.routes')

//middleware to use for all request
app.use(helmet());
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

// connects our backend code with the database
mongoose.connect('mongodb+srv://' + 'admin' + ':' + 'admin232' + '@cluster0-qe9yg.mongodb.net/NewWaveDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;

db.once('open', () => {
    console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

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

module.exports = server;

const io = socket(server);

io.on('connection', (socket) => {
    console.log('New socket', socket.id)

});