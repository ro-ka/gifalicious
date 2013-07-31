var App = App || {};

App.GifPublicView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .gif__add': 'addGif'
  },

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
        url: this.url,
        loggedin: App.loggedin(),
        newgif: !App.gifs.alreadyExists(this.url)
      },
      html = App.template.gifPublic(data);

    this.$el.html(html);
    App.$content.html(this.$el);

    this.$overlay = this.$('.gif__overlay');
    this.$error = this.$('.gif__error');
    this.$success = this.$('.gif__success');
    this.$add = this.$('.gif__add');
    this.$addIcon = this.$add.find('.icon');
    this.$addLoading = this.$add.find('.loading');
  },

  /**
   * Add this gif to the collection
   */
  addGif: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.$error.hide();
    this.$success.hide();
    this.$addIcon.hide();
    this.$addLoading.show();

    App.isAnimatedGif(this.url, this.onIsAnimatedGifCheck);
  },

  /**
   * When the check for an animated gif returned
   * @param  {String}  url           The gif url
   * @param  {Boolean} isAnimatedGif If it is animated or not
   */
  onIsAnimatedGifCheck: function(url, isAnimatedGif) {
    if (!isAnimatedGif) {
      this.$error
        .text('This is not an animated GIF! Shame on you!')
        .show();
      return;
    }

    App.gifs.create({
        url: url
      }, {
        wait: true
      }
    );

    this.$success.text('Added to your collection!').show();
    this.$addIcon.hide();
    this.$addLoading.show();

    this.$overlay.hide();
  }
});
