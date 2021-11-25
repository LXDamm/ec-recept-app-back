import express from 'express';

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.send('Recept App API, User, TODO\n');
});

export default router;