module.exports = {

	ensureUser: function(req, res, next) {
		if(req.user) {
			next()
		} else {
			next(Error('You shall not pass.'));
		}
	},
	
	ensureAdmin: function(req, res, next) {
		if(req.user.admin) {
			next()
		} else {
			next(Error('You shall not pass.'));
		}
	},

	ensureCurrentUserOrAdmin: function(req, res, next) {
		if(req.user._id.equals(req.currentUser._id) || req.user.admin) {
			next()
		} else {
			next(Error('You shall not pass.'));
		}
	}

}