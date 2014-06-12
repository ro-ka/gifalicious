var app = app || {};

app.SigninView = Backbone.View.extend({
  /**
   * The templates for this view
   * @type {Object}
   */
  templates: {
    el: Handlebars.compile($('#template__signin').html())
  },

  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'submit form': 'signin',
    'click .signin__cancel': 'cancel'
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

    this.$error = this.$('.signin__error');
    this.$username = this.$('.signin__username');
    this.$password = this.$('.signin__password');
    this.$submit = this.$('.signin__submit');
  },

  /**
   * Sign in the user
   * @param {JQueryEvent} event The triggered event
   */
  signin: function(event) {
    event.preventDefault();

    var username = this.$username.val(),
      password = this.$password.val();

    this.$submit.addClass('button--loading');

    app.hoodie.account
      .signIn(username, password)
      .fail(this.handleSigninFail);
  },

  /**
   * Handle a signin fail
   * @param  {Object} response The server response
   */
  handleSigninFail: function(response) {
    this.$submit.removeClass('button--loading');
    this.$error
      .text(response.message)
      .removeClass('message--hidden');
  },

  /**
   * Navigate to index
   * @param {JQueryEvent} event The triggered event
   */
  cancel: function() {
    app.router.navigate('/', {trigger: true});
  }
});
