var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Chat' });
});

module.exports = router;
