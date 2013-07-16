var App = App || {};

App.UserView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'submit .user__change-password': 'changePassword',
    'submit .user__delete': 'showDeleteForm'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.render();
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.user();

    this.$el.html(html);
    App.$content.html(this.$el);

    this.$currentPassword = this.$('.user__change-password__password--current');
    this.$newPassword = this.$('.user__change-password__password--new');
    this.$changePasswordError = this.$('.user__change-password__error');
  },

  /**
   * Change the user password
   */
  changePassword: function(event) {
    event.preventDefault();

    var currentPassword = this.$currentPassword.val(),
      newPassword = this.$newPassword.val();

    App.hoodie.account.changePassword(currentPassword, newPassword)
      .done(this.handleChangePasswordDone)
      .fail(this.handleChangePasswordFail);
  },

  /**
   * Handle a signin fail
   * @param  {Object} response The server response
   */
  handleChangePasswordDone: function(response) {
    this.$changePasswordError.hide();
  },

  /**
   * Handle a signin fail
   * @param  {Object} response The server response
   */
  handleChangePasswordFail: function(response) {
    this.$changePasswordError.text(response.reason).show();
  },

  /**
   * Show the form to delete the gif
   */
  showDeleteForm: function(event) {
    event.preventDefault();

    this.$deleteForm = $(App.template.userDelete());
    App.$content.append(this.$deleteForm);

    window.TukTuk.Modal.show('modal--delete');

    this.$deleteForm.on('click', '.modal__close', this.hideDeleteForm);
    this.$deleteForm.on('submit', this.deleteUser);
  },

  /**
   * Hide the delete form
   */
  hideDeleteForm: function(event) {
    window.TukTuk.Modal.hide();
    this.$deleteForm.remove();
  },

  /**
   * Delete the user
   */
  deleteUser: function(event) {
    event.preventDefault();
    this.hideDeleteForm();
    App.hoodie.account.destroy();
  }
});