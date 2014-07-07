var app = app || {};

app.GifAbstractView = Backbone.View.extend({
  // /**
  //  * Share the gif
  //  */
  // shareGif: function(event) {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   var data = {
  //     shareUrl: document.location.origin + '#public/' + encodeURIComponent(this.model.get('url')),
  //     gif: this.model.toJSON()
  //   };

  //   this.$shareOverlay = $(app.template.gifShare(data));
  //   this.$gif.append(this.$shareOverlay);

  //   this.$shareOverlayInput = this.$shareOverlay.find('.gif__share__input');
  //   this.$shareOverlayInput.focus();

  //   this.$shareOverlay.on('click', '.overlay__close', this.hideShareOverlay);
  // },

  // /**
  //  * Hide the share overlay
  //  */
  // hideShareOverlay: function(event) {
  //   this.$shareOverlay.remove();
  // },

  /**
   * Show the overlay to delete the gif
   */
  showDeleteOverlay: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.$deleteOverlay = $(this.templates.delete(this.model.toJSON()));
    this.$gif.append(this.$deleteOverlay);

    this.$deleteOverlayButton = this.$deleteOverlay.find('.gif__delete__button');

    this.$deleteOverlay.on('click', '.overlay__close', this.hideDeleteOverlay);
    this.$deleteOverlay.on('submit', this.deleteGif);
  },

  /**
   * Hide the delete overlay
   */
  hideDeleteOverlay: function(event) {
    this.$deleteOverlay.remove();
  },

  /**
   * Delete the gif
   */
  deleteGif: function(event) {
    event.preventDefault();

    this.$deleteOverlayButton.addClass('loading');
    this.model.destroy();
  }
});
