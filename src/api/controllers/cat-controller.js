import {addCat, findCatById, listAllCats, deleteCatById, updateCat} from "../models/cat-model.js";

const getCat = (req, res) => {
  res.json(listAllCats());
};

const getCatById = (req, res) => {
  const cat = findCatById(parseInt(req.params.id, 10));
  if (cat) {
    res.json(cat);
  } else {
    res.sendStatus(404);
  }
};

const postCat = (req, res) => {
  const result = addCat(req.body);
  if (result.cat_id) {
    res.status(201);
    res.json({message: 'New cat added.', result});
  } else {
    res.sendStatus(400);
  }
};

const deleteCat = (req, res) => {
  const cat = deleteCatById(parseInt(req.params.id, 10))
  if (cat) {
    res.json({message: 'Cat item deleted.'});
  } else {
    res.sendStatus(404);
  }
};

const putCat = (req, res) => {
  const result = updateCat(req.body);
  if (result) {
    res.status(201);
    res.json({message: 'Cat item updated.', result});
  }
  res.sendStatus(200);
};

export {getCat, getCatById, postCat, putCat, deleteCat};
