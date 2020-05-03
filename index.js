const express = require('express')
const app = express()
const db = require('./db')

//middleware to use for all request
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// endpoint for testimondials 
app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
})

app.get('/testimonials/random', (req, res) => {
    const id = Math.floor(Math.random() * db.testimonials.length)
    res.json(dbdb.testimonials[id])
})

app.get('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(db.testimonials[id]);
})

app.post('/testimonials', (req, res) => {
    db.testimonials.push({
        id: db.testimonials.length + 1,
        author: req.body.author,
        text: req.body.text,
    })
    res.send({ message: 'OK' });
})

app.put('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.testimonials.forEach((item, i) => {
        if (item.id === id)
            db.testimonials[i] = {
                id: id,
                author: req.body.author,
                text: req.body.text,
            };


        res.send({ message: 'OK' });
    })
})
app.delete('/testimonials/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.testimonials.splice(db.testimonials.findIndex(item => item.id === id), 1);

    res.send({ message: 'OK' });
})

// endpoint for concerts

app.get('/concerts', (req, res) => {
    res.json(db.concerts);
})

app.get('/concerts/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(db.concerts[id]);
})

app.post('/concerts', (req, res) => {
    db.concerts.push({
        id: db.concerts.length + 1,
        performer: req.body.performer,
        genre: req.body.genre,
        price: req.body.price,
        day: req.body.day,
        image: req.body.image,
    })
    res.send({ message: 'OK' });
})

app.put('/concerts/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.concerts.forEach((item, i) => {
        if (item.id === id)
            db.concerts[i] = {
                id: id,
                performer: req.body.performer,
                genre: req.body.genre,
                price: req.body.price,
                day: req.body.day,
                image: req.body.image,
            };

        res.send({ message: 'OK' });
    })
})

app.delete('/concerts/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.concerts.splice(db.concerts.findIndex(item => item.id === id), 1);

    res.send({ message: 'OK' });
})

// endpoint for seats
app.get('/seats', (req, res) => {
    res.json(db.seats);
})

app.get('/seats/:id', (req, res) => {
    const id = parseInt(req.params.id) - 1;
    res.json(db.seats[id]);
})

app.post('/seats', (req, res) => {
    db.seats.push({
        id: db.seats.length + 1,
        day: req.body.day,
        seat: req.body.seat,
        client: req.body.client,
        email: req.body.email,
    })
    res.send({ message: 'OK' });
})

app.put('/seats/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.seats.forEach((item, i) => {
        if (item.id === id)
            db.seats[i] = {
                id: id,
                day: req.body.day,
                seat: req.body.seat,
                client: req.body.client,
                email: req.body.email,
            };

        res.send({ message: 'OK' });
    })
})

app.delete('/seats/:id', (req, res) => {
    const id = parseInt(req.params.id);

    db.seats.splice(db.seats.findIndex(item => item.id === id), 1);

    res.send({ message: 'OK' });
})

// catch error link
app.use((req, res) => {
    res.status(404).send({ message: 'Not found...' });
})


app.listen(3000, () => {
    console.log('Server is running on port: 3000')
})