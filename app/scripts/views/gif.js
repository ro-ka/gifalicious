var App = App || {};

App.GifView = App.GifAbstractView.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .gif__delete': 'showDeleteOverlay',
    'click .gif__share': 'shareGif'
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

    this.$gif = this.$('.gif');
  },

  /**
   * Delete the gif
   */
  onRemove: function() {
    this.hideDeleteOverlay();
    App.router.navigate('/collection', {trigger: true});
  }
});
