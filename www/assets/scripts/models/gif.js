var App = App || {};

App.Gif = Backbone.Model.extend({
  /**
   * Default values for the model
   * @type {Object}
   */
  defaults: {
    url: null,
    created: new Date(),
    updated: new Date()
  }
});