var App = App || {};

App.CollectionView = Backbone.View.extend({
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

    this.view = 'collection';

    this.listenTo(App.settings, 'change:view', this.onViewChange);
  },

  /**
   * When the view in the app got changed
   */
  onViewChange: function() {
    if (App.settings.get('view') === this.view) {
      if (!App.loggedin()) {
        App.router.navigate('/', {trigger: true});
        return;
      }

      this.$el.show();
    } else {
      this.$el.hide();
    }
  }
});
