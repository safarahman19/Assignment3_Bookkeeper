let express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
    let ratings = 'Book Ratings';
    res.render('ratings', {title: 'Ratings' });
});
module.exports = router;