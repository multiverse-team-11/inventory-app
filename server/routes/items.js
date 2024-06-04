const express = require("express");
const router = express.Router();
const { Item } = require("../models");

// GET /items
router.get("/", async (req, res, next) => {
  try {
    const items = await Item.findAll();
    res.send(items);
  } catch (error) {
    next(error);
  }
});

// GET /individual items
router.get("/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id; 
    const item = await Item.findByPk(itemId); 
    if (item) {
      res.send(item); 
    } else {
      res.status(404).send({ error: "Item Not Found"})
    }
  }
   catch (error) {
    next(error);
  }
}); 

// Delete item
/*
const express = require('express');
const app = express();
const itemRouter = require('./???');

router.delete("/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id;
    await Item.destroy({ where: { id: itemId } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
*/
module.exports = router;
