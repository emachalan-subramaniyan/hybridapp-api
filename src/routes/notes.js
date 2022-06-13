var express = require("express");
var router = express.Router();
const notes = require("../models/notes");

router.get("/", function (req, res, next) {
  if (Object.keys(req.query).length === 0) {
    notes.getNotes((error, response) => {
      if (error) {
        res.send({ message: error, data: null });
        return;
      }
      res
        .status(200)
        .send({ message: "notes get successfully", data: response });
    });
  } else if (req.query.name) {
    notes.getNotesBySearch(req?.query?.name, (error, response) => {
      if (error) {
        res.send({ message: error, data: null });
        return;
      }
      res
        .status(200)
        .send({ message: "search notes get successfully", data: response });
    });
  }
});

router.get("/:id", function (req, res, next) {
  notes.getNoteById(req.params.id, (error, response) => {
    if (error) {
      res.send({ message: error, data: null });
      return;
    }
    res.status(200).send({ message: "note get successfully", data: response });
  });
});

router.post("/", function (req, res, next) {
  notes.createNote(req.body, (error, response) => {
    if (error) {
      res.send({ message: error, data: null });
      return;
    }
    res
      .status(201)
      .send({ message: "note created successfully", data: response });
  });
});

router.put("/:id", function (req, res, next) {
  notes.updateNote(
    { ...req.body, id: req.params.id },
    (error, response) => {
      if (error) {
        res.send({ message: error, data: null });
        return;
      }
      res
        .status(200)
        .send({ message: "note updated successfully", data: response });
    }
  );
});

router.delete("/:id", function (req, res, next) {
  notes.deleteNote(
    req.params.id,
    (error, response) => {
      if (error) {
        res.send({ message: error, data: null });
        return;
      }
      res
        .status(200)
        .send({ message: "note delete successfully", data: response });
    }
  );
});

module.exports = router;
