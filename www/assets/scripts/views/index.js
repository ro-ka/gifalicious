var App = App || {};

App.IndexView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.view = 'index';

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
  }
});
