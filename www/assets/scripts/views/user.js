var App = App || {};

App.UserView = Backbone.View.extend({
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

    this.render();
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.user();

    this.$el.html(html);
    App.$content.html(this.$el);
  }
});
