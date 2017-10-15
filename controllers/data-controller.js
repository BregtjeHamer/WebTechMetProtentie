var Person = require('../models/person');

//personen lijst ophalen
module.exports.getData = function (req, res) {
    Person.find({}, function (err, people) {
        if(err){
          return  res.status(500).send("run query kan niet");
        }
        res.json({data: people});
    });

};

module.exports.postData = function (req,res) {
  var person = new Person(req.body);
  person.save(function (err) {
      if(err) {
          res.status(500).send("kan de user niet opslaan")
      }
      res.status(200).send("user toegevoegd.");
  })
};