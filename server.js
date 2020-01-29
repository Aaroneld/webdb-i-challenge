const express = require('express');

const db = require('./data/dbConfig.js');

const server = express();

server.use(express.json());

server.get('/', async (req, res, next) => {

    try{
        res.status(200).json(await db('accounts'));
    } catch (err) {
        next(err);
    }


});



server.get('/:name', async (req, res, next) => {

        const { name } = req.params 
    try{
        res.status(200).json(await db('accounts').where({name: name}));
    } catch (err) {
        next(err);
    }
});

server.post('/', async (req, res, next) => {

    const {name, budget} = req.body
    try{
        await db('accounts').insert({name: name, budget: budget});
        res.status(200).json(await db('accounts').where({name: name}));
    } catch (err) {
        next(err);
    }
});

server.put('/:name', async (req, res, next) => {
    
    const { name } = req.params;
    const payload = {
        name: req.body.name,
        budget: req.body.budget
    }
   

    try{
 
        await db('accounts').where({name: name})
            .update({name: payload.name, budget: payload.budget});
        
        res.status(201).json(await db('accounts').where({name: payload.name}).first());
    } catch (err) {
        next(err);
    }
});

server.delete('/:name', async (req, res, next) => {
    
    const { name } = req.params;

    try{

        await db('accounts').where({name: name}).del();
        res.status(204).end();

    } catch (err) {
        next(err);
    }
});


module.exports = server;