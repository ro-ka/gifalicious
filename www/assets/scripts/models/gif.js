var App = App || {};

App.Gif = Backbone.Model.extend({
  /**
   * Necessary type for backbone-hoodie
   * @type {String}
   */
  type: 'gif',

  /**
   * Default values for the model
   * @type {Object}
   */
  defaults: {
    url: null
  }
});