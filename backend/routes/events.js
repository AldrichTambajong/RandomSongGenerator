const router = require('express').Router();
let Event = require('../models/eventmodels');

router.route('/').get((req,res)=> {
    Event.find()
        .then(events => res.json(events))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    const eventclass = req.body.eventclass;
    const semester = req.body.semester;
    const optionalInfo = req.body.optionalInfo;
    const startDate = Date.parse(req.body.startDate);
    const endDate = Date.parse(req.body.endDate);
    const meeting = req.body.meeting;
    const from = req.body.from;
    const to = req.body.to;

    const newEvent = new Event({eventclass,semester,optionalInfo,startDate,endDate,
        meeting,from,to});

    newEvent.save()
        .then(() => res.json('Event added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req,res) =>{
    Event.findById(req.params.id)
    .then(events => res.json(events))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req,res) => {
    Event.findByIdAndDelete(req.params.id)
    .then(() => res.json('Event deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
});

router.route('/update/:id').post((req,res) =>{
    Event.findById(req.params.id)
    .then(events =>{
        events.eventclass = req.body.eventclass;
        events.semeseter = req.body.semester;
        events.optionalInfo = req.body.optionalInfo;
        events.startDate = Date.parse(req.body.startDate);
        events.endDate = Date.parse(req.body.endDate);
        events.meeting = req.body.meeting;
        events.from = req.body.from;
        events.to = req.body.to;

        events.save()
        .then(() => res.json('Event updated.'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;