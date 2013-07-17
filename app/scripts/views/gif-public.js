var App = App || {};

App.GifPublicView = Backbone.View.extend({
  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.url = this.options.url;

    this.render();
  },

  /**
   * Render the view
   */
  render: function() {
    var data = {
        url: this.url
      },
      html = App.template.gifPublic(data);

    this.$el.html(html);
    App.$content.html(this.$el);
  }
});
