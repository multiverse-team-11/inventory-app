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
    res.send(item); 
  }
   catch (error) {
    next(error);
  }
}); 

router.use(express.json());
router.use(express.urlencoded({extended: true}))

router.post("/", async (req,res,next) => {
  try {
    const newItem = await Item.create(req.body);
    res.send(newItem);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
