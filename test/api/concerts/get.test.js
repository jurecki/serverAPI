const chai = require('chai');
const chaiHttp = require('chai-http');
const Concert = require('../../../models/concert.model');

chai.use(chaiHttp);
const server = require('../../../server');
const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {
    before(async () => {
        const testConOne = new Concert({ _id: '5d9f1140f10a81216cfd4408', performer: 'John Doe', genre: 'Rock', price: '25', day: '1', image: '/img/uploads/1fsd324fsdg.jpg' });
        await testConOne.save();

        const testConTwo = new Concert({ _id: '5d9f1159f81ce8d1ef2bee48', performer: 'Rebekah Parker', genre: 'R&B', price: '25', day: '1', image: '/img/uploads/1fsd324fsdg.jpg' });
        await testConTwo.save();
    });


    it('/ should return all concerts', async () => {
        const res = await request(server).get('/api/concerts');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/:id should return one concerts by :id ', async () => {
        const res = await request(server).get('/api/concerts/5d9f1140f10a81216cfd4408');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('/ should return concerts by performer name', async () => {
        const res = await request(server).get('/api/concerts/performer/performerName');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;
    });

    it('/ should return concerts by genre', async () => {
        const res = await request(server).get('/api/concerts/genre/genreName');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.not.be.null;

    });

    it('/ should return concerts by min/max price', async () => {
        const res = await request(server).get('/api/concerts/price/20/30');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    it('/ should return concerts by day', async () => {
        const res = await request(server).get('/api/concerts/day/dayName');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);
    });

    after(async () => {
        await Concert.deleteMany();
    });
});