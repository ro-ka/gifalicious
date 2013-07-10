var App = App || {};

App.NavbarView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .navbar__signup': 'signup',
    'click .navbar__signin': 'signin',
    'click .navbar__signout': 'signout'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);
  },

  /**
   * Navigate to signup
   */
  signup: function() {
    App.router.navigate('/signup', {trigger: true});
  },

  /**
   * Navigate to signin
   */
  signin: function() {
    App.router.navigate('/signin', {trigger: true});
  },

  /**
   * Sign out
   */
  signout: function() {
    App.hoodie.account.signOut();
  },

  /**
   * Set the username in the header
   * @param  {String} username The username
   */
  setUsername: function(username) {
    this.$el.find('.hoodie-username').text(username);
  }
});
