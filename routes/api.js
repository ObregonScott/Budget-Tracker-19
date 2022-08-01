const router = require("express").Router();
const Transaction =require('../model/transaction.js');

// router post body
router.post("/api/transaction", ({body}, res) => {
    Transaction.create(body)
    .then(dbTransaction => {
        res.json(dbTransaction)
    })
    .catch(err => {
        res.status(404).json(err)
    })
});
// router post bulk
router.post("/api/transaction/bulk", ({body}, res) => {
   
  });

//   router get