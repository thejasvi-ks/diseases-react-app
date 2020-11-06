const Disease = require('../models/disease');
const State = require('../models/state');
const Resident = require('../models/resident');
const io = require('../socket');

exports.getDisease = (req, res, next) => {
    res.json({ message: "Hello World."});
};

exports.putDisease = async (req, res,next) => {
    const disease = new Disease({
        title: req.body.title,
        description: req.body.description
    });

    const result = await disease.save();

    res.json({
        message: "Created Successfully",
        disease: result
    });
}

exports.putState = async (req, res,next) => {

    console.log(stateId);

    const state = new State({
        stateName: req.body.stateName,
        diseaseCount: req.body.diseaseCount 
    });

    const result = await state.save();

    res.json({
        message: "Created Successfully",
        disease: result
    });
}

exports.putResident = (req, res, next) => {
  const resident = new Resident({
    name: req.body.name,
    // age: req.body.age ,
    // disease: req.body.disease,
    // state: req.body.state
    age: 12,
    disease: "5f9889bd8eaeb23d3816d6b3",
    state: "5f988c76f26f5f0514df30dd",
  });

  resident.save().then((result) => {
    io.getIO().emit("residents", {
      data: req.body.name,
    });
  }).catch(err => console.log(err));

  res.json({
    message: "Created Successfully",
    // disease: result,
  });
};

exports.getResidents = async (req, res, next) => {
    const residents = await Resident.find();
    res.json({
        residents: residents.map(p => p.name)
    });
}

exports.getDiseaseAge = (req, res, next) => {
    res.json({ message: " Hello from diseaseage"});
};

exports.getStateDiseaseAge = (req, res, next) => {
    res.json({ message: " Hello from statediseaseage "});
};