var app = app || {};

app.CreateAccountView = Backbone.View.extend({
  /**
   * The templates for this view
   * @type {Object}
   */
  templates: {
    el: Handlebars.compile($('#template__create-account').html())
  },

  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'submit form': 'createAccount',
    'click .create-account__cancel': 'cancel'
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
    var html = this.templates.el();

    this.$el.html(html);
    app.$content.html(this.$el);

    this.$error = this.$('.create-account__error');
    this.$username = this.$('.create-account__username');
    this.$password = this.$('.create-account__password');
    this.$submit = this.$('.create-account__submit');
  },

  /**
   * Sign up the new user
   * @param {Event} event The triggered event
   */
  signup: function(event) {
    event.preventDefault();

    var username = this.$username.val(),
      password = this.$password.val();

    this.$submit.addClass('button--loading');

    app.hoodie.account
      .signUp(username, password)
      .fail(this.handleSignupFail);
  },

  /**
   * Handle a signup fail
   * @param  {Object} response The server response
   */
  handleSignupFail: function(response) {
    this.$submit.removeClass('button--loading');
    this.$error
      .text(response.message)
      .removeClass('message--hidden');
  },

  /**
   * Navigate to index
   */
  cancel: function() {
    app.router.navigate('/', {trigger: true});
  }
});
