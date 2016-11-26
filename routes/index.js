var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/:page', function(req, res, next){
	console.log(JSON.stringify(req.body))

	var query= req.body.query
	var type = req.body.type // search or timeline

    // var url = '/twitter/search?term='+query
    var url = null
    if (type == 'search'){
    	url = '/twitter/search?term='+query
    }
    else if (type == 'timeline'){
    	url = '/twitter/timeline?username='+query
    }

	res.redirect(url)

	res.json(req.body)
})

module.exports = router;
