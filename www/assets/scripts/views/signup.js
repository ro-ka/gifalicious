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

    this.view = 'signup';

    this.$username = this.$('#signup__username');
    this.$password = this.$('#signup__password');

    this.listenTo(App.settings, 'change:view', this.onViewChange);
  },

  /**
   * When the view in the app got changed
   */
  onViewChange: function() {
    if (App.settings.get('view') === this.view) {
      this.$el.show();
    } else {
      this.$el.hide();
    }
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
