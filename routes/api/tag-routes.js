const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// find all tags ---------------------------------------------------------------
router.get('/', (req, res) => {
   // be sure to include its associated Product data
 
   Tag.findAll({
    //  attributes: [ 'id', 'tag_name'],
       include: [
          {
            model: Product,
            attributes: [ 'id', 'product_name', 'price', 'stock', 'category_id']
          },
      //  {
      //       model: ProductTag,
      //       attributes: ['id', 'product_id', 'tag_id']
      //  }
         ]
    })
    .then(dbTagData => res.json(dbTagData))
    .catch(err => { console.log(err);
                    res.status(500).json(err); })
});

// find a single tag by its `id` --------------------------------------------------
router.get('/:id', (req, res) => {
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id
    }, 
  //   attributes: [ 'id', 'tag_name'],
    include: [
          {
            model: Product,
            attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
          }
        ]
  })
  .then(dbTagData => {
    if (!dbTagData) {
      res.status(404).json({ message: 'No Tag found with this ID'});
      return;
    }
    res.json(dbTagData)
  })
  .catch(err => { console.log(err);
                  res.status(500).json(err); })
});

// create a new tag ---------------------------------------------------------------
router.post('/', (req, res) => {

  Tag.create({
     tag_name: req.body.tag_name
  })
 
 .then(dbTagData => res.json(dbTagData))
 .catch(err => { console.log(err);
                 res.status(500).json(err); });
});



// update a tag's name by its `id` value -----------------
router.put('/:id', (req, res) => {





// delete on tag by its `id` value ------------------------
router.delete('/:id', (req, res) => {
});




module.exports = router;
