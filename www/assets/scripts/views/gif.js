var App = App || {};

App.GifView = Backbone.View.extend({
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
    var html = App.template.gif();

    this.$el.html(html);
    App.$content.html(this.$el);
  }
});
