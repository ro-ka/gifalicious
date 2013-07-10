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

    this.$accountStati = this.$('.hoodie-account-status');
    this.$username = this.$('.hoodie-username');

    if (App.loggedin()) {
      this.setAccountStatus('signedin');
    } else {
      this.setAccountStatus('signedout');
    }
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
   * Set the account status in the header
   * @param  {String} status The current status
   */
  setAccountStatus: function(status) {
    this.$accountStati.hide();
    this.$username.text(App.hoodie.account.username);
    this.$el.find('.hoodie-account-' + status).show();
  }
});
