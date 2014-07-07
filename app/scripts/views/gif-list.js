var app = app || {};

app.GifListView = app.GifAbstractView.extend({
  /**
   * Classes of the element
   * @type {String}
   */
  className: 'small-12 large-6 columns',

  /**
   * The templates for this view
   * @type {Object}
   */
  templates: {
    el: Handlebars.compile($('#template__gif').html()),
    delete: Handlebars.compile($('#template__gif__delete').html())
  },

  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .gif__delete': 'showDeleteOverlay',
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
    var html = this.templates.el(this.model.toJSON());

    this.$el.html(html);

    this.$gif = this.$('.collection__list__item');
  },

  /**
   * Show the gif in fullbrowser
   */
  showGif: function(event) {
    event.preventDefault();
    event.stopPropagation();

    app.router.navigate('/gif/' + this.model.get('id'), {trigger: true});
  },

  /**
   * Delete the gif
   */
  onRemove: function() {
    this.remove();
  }
});
