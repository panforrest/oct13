var express = require('express')
var router = express.Router()
var Twitter = require('twitter')

router.get('', function(req, res, next){
    var id = req.query.id
    var format = req.query.format
    if (format == null)
    	format = 'html'

    console.log('ID= '+id)

	var client = new Twitter({
	  consumer_key: '2fyOw1DABfCv9O7rCIXCL0NS9',
	  consumer_secret: '7rLPuKm0IM8SS8SVUF8SMdkK8BGg1vA2bvc9eaDlHRHBAE0vxQ',
	  access_token_key: '1118902316-AJXLU9qeaKhskrYCQH7MKGetxM3068mJgtV85IS',
	  access_token_secret: 'KxgCxyupDTq3RTGksqHGH90Uh3tUDTzCJeaZLpZriOfd1'
	})

	var url = 'statuses/show/'+id
    var params = {}

	client.get(url, params, function(error, tweets, response) {
        console.log(JSON.stringify(tweets))
        if (format == 'json'){
        	res.json(tweets)
        }
        else {
        	res.render('tweet', tweets)
        }

        // res.render('tweet', tweets)
	})	

	// res.render('tweet', null)
})


router.get('/:action', function(req, res, next) {
	var actions = ['timeline', 'search']
	var action = req.params.action

	if (actions.indexOf(action) == -1){
		res.json({
			confirmation:'fail',
			message: 'Invalid action. Please select search or timeline.'
		})

		return
	}

	var client = new Twitter({
	  consumer_key: '2fyOw1DABfCv9O7rCIXCL0NS9',
	  consumer_secret: '7rLPuKm0IM8SS8SVUF8SMdkK8BGg1vA2bvc9eaDlHRHBAE0vxQ',
	  access_token_key: '1118902316-AJXLU9qeaKhskrYCQH7MKGetxM3068mJgtV85IS',
	  access_token_secret: 'KxgCxyupDTq3RTGksqHGH90Uh3tUDTzCJeaZLpZriOfd1'
	})

	var params = {}
	var url = null
	if (action == 'timeline'){
		params['screen_name'] = req.query.username
		url = 'statuses/user_timeline'
	}
	else if (action == 'search'){
		params['q'] = req.query.term
		url = 'search/tweets'
	}

	client.get(url, params, function(error, tweets, response) {
	  if (error == null) {
	    console.log(tweets)
	  }

	    var list = (tweets.statuses == null) ? tweets : tweets.statuses
	    var title = (action == 'timeline') ? params['screen_name'] : params['q']
		var content = {
			title: title,
			tweets: list
		}

		var format = (req.query.format == null) ? 'html' : req.query.format
		if (format == 'json'){
			res.json(tweets)
		}
		else {
			res.render('twitter', content)
		}
	})
})


module.exports = router
