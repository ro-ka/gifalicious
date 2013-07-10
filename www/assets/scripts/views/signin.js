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

    this.view = 'signin';

    this.$username = this.$('#signin__username');
    this.$password = this.$('#signin__password');

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
