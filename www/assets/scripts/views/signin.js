var App = App || {};

App.SigninView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'submit form': 'signin',
    'click .signin-view__cancel': 'cancel'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.render();

    this.$username = this.$('#signin__username');
    this.$password = this.$('#signin__password');
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.signin();

    this.$el.html(html);
    App.$content.html(this.$el);
  },

  /**
   * Sign in the user
   * @param {JQueryEvent} event The triggered event
   */
  signin: function(event) {
    event.preventDefault();

    App.hoodie.account.signIn(this.$username.val(), this.$password.val());
  },

  /**
   * Navigate to index
   */
  cancel: function() {
    App.router.navigate('/', {trigger: true});
  }
});
