const express = require('express') // Require in express
const db = require("../db/db");
const router = express.Router();


router.post('/api/v1/list', (req, res) => {
    if(!req.body.item && !req.body.notes) {
        return res.status(400).send({
            success: "false",
            message: "item and notes are required"
        });
    }
    const list = {
        id: db.length + 1,
        item: req.body.item,
        notes: req.body.notes
    }
    db.push(list);
    return res.status(201).send({
        success: "true",
        message: "item successfully added",
        list
    })
})

router.get('/api/v1/list', (req, res) => {
    res.status(200).send({
        success: "true",
        message: "list retrieved successfully",
        list: db
    })
});

router.get('/api/v1/list/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((list) => {
      if (list.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'list retrieved successfully',
          list,
        });
      } 
  });
   return res.status(404).send({
     success: 'false',
     message: 'list does not exist',
  });
});

router.delete('/api/v1/list/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  db.map((list, index) => {
    if (list.id === id) {
       db.splice(index, 1);
       return res.status(200).send({
         success: 'true',
         message: 'List deleted successfully',
       });
    }
  });

    return res.status(404).send({
      success: 'false',
      message: 'list not found',
    });
});

module.exports = router;