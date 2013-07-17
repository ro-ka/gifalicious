var App = App || {};

App.GifAbstractView = Backbone.View.extend({
  /**
   * Share the gif
   */
  shareGif: function(event) {
    event.preventDefault();
    event.stopPropagation();

    var data = {
      shareUrl: document.location.origin + '#public/' + encodeURIComponent(this.model.get('url')),
      gif: this.model.toJSON()
    };

    this.$shareForm = $(App.template.gifShare(data));
    App.$content.append(this.$shareForm);

    window.TukTuk.Modal.show('modal--share');

    this.$shareFormInput = this.$shareForm.find('.gif__share__input');
    this.$shareFormInput.focus();

    this.$shareForm.on('click', '.modal__close', this.hideShareForm);
    // window.open(encodedUrl, '_blank');
    // window.focus();
    // App.router.navigate('/public/' + encodedUrl, {trigger: true});
  },

  /**
   * Hide the share form
   */
  hideShareForm: function(event) {
    window.TukTuk.Modal.hide();
    this.$shareForm.remove();
  },

  /**
   * Show the form to delete the gif
   */
  showDeleteForm: function(event) {
    event.preventDefault();
    event.stopPropagation();

    this.$deleteForm = $(App.template.gifDelete(this.model.toJSON()));
    App.$content.append(this.$deleteForm);

    window.TukTuk.Modal.show('modal--delete');

    this.$deleteFormButton = this.$deleteForm.find('.gif__delete__button');

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

    this.$deleteFormButton.addClass('loading');
    this.model.destroy();
  }
});
