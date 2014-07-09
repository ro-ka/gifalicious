var app = app || {};

app.SiteHeaderView = Backbone.View.extend({
  /**
   * The templates for this view
   * @type {Object}
   */
  templates: {
    userNav: Handlebars.compile($('#template__site-header__user-nav').html())
  },

  /**
   * The view element
   * @type {String}
   */
  el: '.site-header',

  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .user-nav__avatar': 'onAvatarClick'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.$document = $(document);
    this.$userNavContainer = this.$('.user-nav-container');
    this.$authenticationError = $('.authentication-error');

    this.render();

    app.router.on('route', this.hideUserNav);
  },

  /**
   * Render the view
   */
  render: function() {
    var data = {
        isLoggedIn: app.loggedin(),
        username: app.hoodie.account.username
      },
      html = this.templates.userNav(data);

    this.$userNavContainer.html(html);

    this.$userNav = this.$('.user-nav');
    this.$userNavItems = this.$('.user-nav__items');

    this.hideAuthenticationError();
  },

  /**
   * Show the authentication error message
   */
  showAuthenticationError: function() {
    console.log('Show');
    this.$authenticationError.removeClass('authentication-error--hidden');
  },

  /**
   * Hide the authentication error message
   */
  hideAuthenticationError: function() {
    console.log('Hide');
    this.$authenticationError.addClass('authentication-error--hidden');
  },

  /**
   * When the user avatar got clicked
   * @param  {Event} event The event
   */
  onAvatarClick: function(event) {
    event.preventDefault();
    event.stopPropagation();

    var isHidden = this.$userNavItems.hasClass('user-nav__items--hidden');

    if (isHidden) {
      this.showUserNav();
    } else {
      this.hideUserNav();
    }
  },

  /**
   * Show the user navigation menu
   */
  showUserNav: function() {
    this.$userNavItems.removeClass('user-nav__items--hidden');
    this.$document.on('click', this.onDocumentClick);
  },

  /**
   * Hide the user navigation menu
   */
  hideUserNav: function() {
    this.$userNavItems.addClass('user-nav__items--hidden');
    this.$document.off('click', this.onDocumentClick);
  },

  /**
   * When anywhere on the page is clicked
   * @param  {Event} event The event
   */
  onDocumentClick: function(event) {
    var $el = $(event.target),
      isUserNav = $el.hasClass('user-nav') || $el.parents('.user-nav').length;

    if (!isUserNav) {
      this.hideUserNav();
    }
  },

  /**
   * Set the account status in the header
   * @param  {String} status The current status
   */
  setAccountStatus: function(status) {
    this.$el.removeClass('user-nav--signed-in user-nav--signed-out');
    this.$el.addClass('user-nav--' + status);
  }
});
