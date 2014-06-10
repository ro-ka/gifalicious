var app = app || {};

app.Settings = Backbone.Model.extend({
  /**
   * Default settings
   * @type {Object}
   */
  defaults: {
    view: 'index'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);
  }
});

app.settings = new app.Settings();
