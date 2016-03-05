var auth = {

	ensureUser: function(req, res, next) {
		if(req.user) {
			next()
		} else {
			next(Error('You shall not pass.'));
		}
	},
	
	ensureAdmin: function(req, res, next) {
		if(req.user && req.user.admin) {
			next()
		} else {
			next(Error('You shall not pass.'));
		}
	},

	isCurrentUserOrAdmin: function(user, currentUserId) {
		return user && (user._id.equals(currentUserId)) || user.admin;
	},

	ensureCurrentUserOrAdmin: function(req, res, next) {
		if(auth.isCurrentUserOrAdmin(req.user, req.currentUser._id)) {
			next()
		} else {
			next(Error('You shall not pass.'));
		}
	}

}

module.exports = auth;