var app = app || {};

app.SettingsView = Backbone.View.extend({
  /**
   * The templates for this view
   * @type {Object}
   */
  templates: {
    el: Handlebars.compile($('#template__settings').html())
  },

  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'submit .settings__change-password': 'changePassword',
    'submit .settings__delete-user': 'deleteUser'
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
    var html = this.templates.el();

    this.$el.html(html);
    app.$content.html(this.$el);

    this.$currentPassword = this.$(
      '.settings__change-password__password--current'
    );
    this.$newPassword = this.$('.settings__change-password__password--new');
    this.$changePasswordError = this.$('.settings__change-password__error');
    this.$changePasswordSuccess = this.$('.settings__change-password__success');
    this.$changePasswordSubmit = this.$('.settings__change-password__submit');

    this.$currentPassword.hideShowPassword({
      innerToggle: true,
      hideToggleUntil: 'focus'
    });
    this.$newPassword.hideShowPassword({
      innerToggle: true,
      hideToggleUntil: 'focus'
    });
  },

  /**
   * Change the user password
   */
  changePassword: function(event) {
    event.preventDefault();

    var currentPassword = this.$currentPassword.val(),
      newPassword = this.$newPassword.val();

    this.$changePasswordSubmit.addClass('button--loading');

    app.hoodie.account.changePassword(currentPassword, newPassword)
      .done(this.handleChangePasswordDone)
      .fail(this.handleChangePasswordFail);
  },

  /**
   * Handle a signin fail
   * @param  {Object} response The server response
   */
  handleChangePasswordDone: function(response) {
    this.$changePasswordError.hide();
    this.$changePasswordSuccess.show();
    this.$changePasswordSubmit.removeClass('button--loading');
    this.$currentPassword.val('');
    this.$newPassword.val('');
  },

  /**
   * Handle a signin fail
   * @param  {Object} response The server response
   */
  handleChangePasswordFail: function(response) {
    this.$changePasswordError.text(response.reason).show();
    this.$changePasswordSuccess.hide();
    this.$changePasswordSubmit.removeClass('button--loading');
  },

  /**
   * Confirm user delete and delete them
   */
  deleteUser: function(event) {
    event.preventDefault();

    if (confirm('Delete? You sure?')) {
      app.hoodie.account.destroy();
    }
  }
});
