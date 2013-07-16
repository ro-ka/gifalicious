var App = App || {};

App.GifView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .gif__delete': 'removeGif'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.render();

    this.listenTo(this.model, 'remove', this.onRemove);
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.gif(this.model.toJSON());

    this.$el.html(html);
    App.$content.html(this.$el);
  },

  /**
   * Delete the gif
   */
  removeGif: function(event) {
    this.model.destroy();
  },

  /**
   * Delete the gif
   */
  onRemove: function() {
    App.router.navigate('/collection', {trigger: true});
  }
});
