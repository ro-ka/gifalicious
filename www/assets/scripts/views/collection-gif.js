var App = App || {};

App.CollectionGifView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .collection__gif__delete': 'showDeleteForm',
    'click .collection__gif__share': 'shareGif',
    'click .collection__gif__show': 'showGif',
    'click': 'showGif'
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

    this.$gifShow = $(App.template.collectionGifShow(this.model.toJSON()));
    App.$content.append(this.$gifShow);

    this.$gifShow.on('click', '.gif-show__close', this.hideGif);
  },

  /**
   * Hide the fullbrowser gif
   */
  hideGif: function(event) {
    event.preventDefault();

    this.$gifShow.remove();
  },

  /**
   * Share the gif
   */
  shareGif: function(event) {
    event.stopPropagation();
  },

  /**
   * Show the form to delete the gif
   */
  showDeleteForm: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.$deleteForm = $(App.template.collectionGifDelete(this.model.toJSON()));
    App.$content.append(this.$deleteForm);

    window.TukTuk.Modal.show('modal--delete');

    this.$deleteForm.on('click', '.modal__close', this.hideDeleteForm);
    this.$deleteForm.on('submit', this.deleteGif);
  },

  /**
   * Hide the delete form
   */
  hideDeleteForm: function(event) {
    window.TukTuk.Modal.hide();
    this.$deleteForm.remove();
  },

  /**
   * Delete the gif
   */
  deleteGif: function(event) {
    event.preventDefault();
    this.hideDeleteForm();
    this.model.destroy();
  },

  /**
   * Delete the gif
   */
  onRemove: function() {
    this.remove();
  }
});
