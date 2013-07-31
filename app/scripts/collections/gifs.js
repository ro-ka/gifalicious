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
  comparator: 'createdAt',

  /**
   * Checks whether a gif already is present or not
   * @param  {String} url The gif url
   * @return {Boolean}    Whether it already is in the collection or not
   */
  alreadyExists: function(url) {
    return this.find(function(gif) {
      return gif.get('url') === url;
    });
  }
});
