var App = App || {};

App.Gifs = Backbone.Collection.extend({
  /**
   * The model used in the collection
   * @type {ModelGif}
   */
  model: App.Gif,

  /**
   * What to sort for
   * @type {String}
   */
  comparator: 'createdAt'
});
