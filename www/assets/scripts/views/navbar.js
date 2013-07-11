var App = App || {};

App.NavbarView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .navbar__signup': 'signup',
    'click .navbar__signin': 'signin',
    'click .navbar__signout': 'signout',
    'click .navbar__user': 'user'
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
   * @param {JQueryEvent} event The JQuery Event
   */
  signup: function(event) {
    event.preventDefault();

    App.router.navigate('/signup', {trigger: true});
  },

  /**
   * Navigate to signin
   * @param {JQueryEvent} event The JQuery Event
   */
  signin: function(event) {
    event.preventDefault();

    App.router.navigate('/signin', {trigger: true});
  },

  /**
   * Sign out
   * @param {JQueryEvent} event The JQuery Event
   */
  signout: function(event) {
    event.preventDefault();

    App.hoodie.account.signOut();
  },

  /**
   * Go to user
   * @param {JQueryEvent} event The JQuery Event
   */
  user: function(event) {
    event.preventDefault();

    App.router.navigate('/user', {trigger: true});
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
