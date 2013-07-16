var App = App || {};

App.CollectionGifView = App.GifAbstractView.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .gif__delete': 'showDeleteForm',
    'click .gif__share': 'shareGif',
    'click .gif__overlay': 'showGif',
    'click .gif__show': 'showGif'
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
    var html = App.template.collectionGif(this.model.toJSON());

    this.$el.html(html);
  },

  /**
   * Show the gif in fullbrowser
   */
  showGif: function(event) {
    event.preventDefault();
    event.stopPropagation();

    App.router.navigate('/gif/' + this.model.get('id'), {trigger: true});
  },

  /**
   * Delete the gif
   */
  onRemove: function() {
    this.remove();
  }
});
