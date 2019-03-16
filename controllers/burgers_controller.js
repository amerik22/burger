var express = require("express");
var burgers = require ("../models/burger.js");
var router = express.Router();

router.get("/", function(req, res) {
    burgers.selectAll(function(data) {
      var object = {
        burgers: data
      };
      console.log(object);
      res.render("index", object);
    });
  });
  
  router.post("/api/burgers", function(req, res) {
    burgers.insertOne([
      "burger_name", "devoured"
    ], [
      req.body.burger_name, req.body.devoured
    ], function(result) {
      // Send back the ID of the new quote
      res.json({ id: result.insertId });
    });
  });
  
  router.put("/api/burgers/:id", function(req, res) {
    var update = "id = " + req.params.id;
  
    console.log("update", update);
  
    burgers.updateOne({
      devoured: req.body.devoured
    }, update, function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });
  
  router.delete("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    burgers.deleteOne(condition, function(result) {
      if (result.affectedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    });
  });


  module.exports = router;