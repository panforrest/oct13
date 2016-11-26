var express = require('express')
var router = express.Router()
var Yelp = require('yelp')

router.get('/:page', function(req, res, next) {
	var page = req.params.page
	// if (page == 'venue'){
	// res.render(page, { title: 'Express' })
	// 	return
	// }

  res.render(page, { title: 'Express' });
});

router.get('/', function(req, res, next) {
	var term = req.query.term
	var location = req.query.location

	var yelp = new Yelp({
	  consumer_key: 'sMjsmliC9gKiXtvCXSQxCA',
	  consumer_secret: 'teV_SLD48JWA2d2G3UQ7zuL6LdU',
	  token: 'tFbXLcPFBDyb-Qq_TdQLibMiY0DLsaJl',
	  token_secret: 'o0CdBGngWRHsGAq0DJ665OVRYvM',
	})

	yelp.search({ term:term, location:location })
	.then(function (data) {
	  console.log(data)
		var content = {
			title: term+' in '+location,
			data: data
		}

		var format = (req.query.format == null) ? 'html' : req.query.format
		if (format == 'json'){
			res.json(data)
		}
		else {
			res.render('yelp', content)
		}

	  return
	})
	.catch(function (err) {
	  console.error(err)
	})

})

module.exports = router
