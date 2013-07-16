var App = App || {};

App.SigninView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'submit form': 'signin',
    'click .signin-view__cancel': 'cancel'
    // 'click .signin-view__resetpassword': 'resetpassword'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.render();

    this.$username.focus();
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.signin();

    this.$el.html(html);
    App.$content.html(this.$el);

    this.$error = this.$('.signin__error');
    this.$username = this.$('#signin__username');
    this.$password = this.$('#signin__password');
  },

  /**
   * Sign in the user
   * @param {JQueryEvent} event The triggered event
   */
  signin: function(event) {
    event.preventDefault();

    var username = this.$username.val(),
      password = this.$password.val();

    App.hoodie.account.signIn(username, password)
      .fail(this.handleSigninFail);
  },

  /**
   * Handle a signin fail
   * @param  {Object} response The server response
   */
  handleSigninFail: function(response) {
    this.$error.text(response.reason).show();
  },

  /**
   * Navigate to index
   * @param {JQueryEvent} event The triggered event
   */
  cancel: function() {
    App.router.navigate('/', {trigger: true});
  },

  /**
   * Reset the password
   */
  resetpassword: function(event) {
    event.preventDefault();

    // hoodie.account.resetPassword('joe@example.com');
  }
});
