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

    this.$username = this.$('#signup__username');
    this.$password = this.$('#signup__password');

    this.$username.focus();
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.signup();

    this.$el.html(html);
    App.$content.html(this.$el);
  },

  /**
   * Sign up the new user
   * @param {JQueryEvent} event The triggered event
   */
  signup: function(event) {
    event.preventDefault();

    App.hoodie.account.signUp(this.$username.val(), this.$password.val());
  },

  /**
   * Navigate to index
   */
  cancel: function() {
    App.router.navigate('/', {trigger: true});
  }
});
