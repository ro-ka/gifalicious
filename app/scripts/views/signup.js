var App = App || {};

App.SignupView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'submit form': 'signup',
    'click .signup-view__cancel': 'cancel'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.render();

    this.$username.focus();
    this.$password.hideShowPassword({
      innerToggle: true,
      hideToggleUntil: 'focus'
    });
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.signup();

    this.$el.html(html);
    App.$content.html(this.$el);

    this.$error = this.$('.signup__error');
    this.$username = this.$('#signup__username');
    this.$password = this.$('#signup__password');
    this.$submit = this.$('.signup__submit');
  },

  /**
   * Sign up the new user
   * @param {JQueryEvent} event The triggered event
   */
  signup: function(event) {
    event.preventDefault();

    var username = this.$username.val(),
      password = this.$password.val();

    this.$submit.addClass('loading');

    App.hoodie.account.signUp(username, password)
      .fail(this.handleSignupFail);
  },

  /**
   * Handle a signup fail
   * @param  {Object} response The server response
   */
  handleSignupFail: function(response) {
    this.$submit.removeClass('loading');
    this.$error.text(response.message).show();
  },

  /**
   * Navigate to index
   */
  cancel: function() {
    App.router.navigate('/', {trigger: true});
  }
});
