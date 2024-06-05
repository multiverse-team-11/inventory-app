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

// GET /api/items/:id
router.get("/:id", async (req, res, next) => {
  try {
    const itemId = req.params.id; 
    const item = await Item.findByPk(itemId);
    if (item) {
      res.send(item);
    } else {
      res.status(404).send({ error: "Item not found"});
    }
  }
   catch (error) {
    next(error);
  }
}); 

router.use(express.json());
router.use(express.urlencoded({extended: true}))

//ADD NEW Item
router.post("/", async (req,res,next) => {
  try {
    const newItem = await Item.create(req.body);
    res.send(newItem);
  } catch (error) {
    next(error);
  }
})

//UPDATE item
router.put("/:id", async (req,res,next) => {
  try {
      const toUpdate = await Item.findByPk(req.params.id);
       await toUpdate.update(req.body);
      res.json(toUpdate);
  } catch(error) {
      next(error);
  }
})

//DELETE item
router.delete("/:id", async (req, res, next) => {
  try {
    const toDelete = await Item.findByPk(req.params.id)
    await toDelete.destroy();
    res.json(toDelete);
  }
  catch (error) {
    next (error);
  }
})
module.exports = router;
