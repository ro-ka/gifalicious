var app = app || {};

app.Main = Backbone.View.extend({
  /**
   * The view element
   * @type {String}
   */
  el: 'body',

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    Backbone.connect();
    app.hoodie = Backbone.hoodie;
    app.hoodie.account.authenticate();
    app.loggedin = app.hoodie.account.hasAccount;

    app.$content = this.$('.content');

    app.router = new app.Router();
    app.siteHeader = new app.SiteHeaderView();
    Backbone.history.start({
      pushState: true
    });

    this.initLinkNavigation();
    this.initEvents();
  },

  /**
   * Override links to use Backbone navigate when internal
   */
  initLinkNavigation: function() {
    if (!Backbone.history || !Backbone.history._hasPushState) {
      return;
    }

    var $document = $(document),
      openLinkInTab = false;

    $document.keydown(function(event) {
      if (event.ctrlKey || event.keyCode === 91) {
        openLinkInTab = true;
      }
    });

    $document.keyup(function(event) {
      openLinkInTab = false;
    });

    $document.delegate('a', 'click', function(event) {
      var href = $(this).attr('href'),
        protocol = this.protocol + '//';

      if (!openLinkInTab && href.slice(protocol.length) !== protocol) {
        event.preventDefault();
        Backbone.history.navigate(href, {trigger: true});
      }
    });
  },

  /**
   * Initialize events
   */
  initEvents: function() {
    // app.hoodie.account
    //   .on('signup', this.handleUserAuthenticated);
    // app.hoodie.account
    //   .on('signin', this.handleUserAuthenticated);
    // app.hoodie.account
    //   .on('signout', this.handleUserUnauthenticated);
    app.hoodie.account
      .on('authenticate', this.handleUserAuthenticated);
    app.hoodie.account
      .on('unauthenticated', this.handleUserUnauthenticated);
    app.hoodie
      .on('account:error:unauthenticated remote:error:unauthenticated',
        this.handleUserAuthenticationError);
  },

  /**
   * Handle it, when the user got authenticated
   * @param  {String} username The username
   */
  handleUserAuthenticated: function(username) {
    console.log('authenticated', arguments);
    app.router.navigate('/collection', {trigger: true});
    app.siteHeader.render();
  },

  /**
   * Handle it, when the user got unauthenticated
   */
  handleUserUnauthenticated: function() {
    console.log('unauthenticated', arguments);
    app.router.navigate('/', {trigger: true});
    app.siteHeader.render();
  },

  /**
   * Handle it, when there was an authentication error
   */
  handleUserAuthenticationError: function() {
    console.log('authentication:error', arguments);
    app.siteHeader.render();
    app.siteHeader.showAuthenticationError();
    // app.router.navigate('/signin', {trigger: true});
    // app.navbar.setAccountStatus('error');

    app.hoodie.account.signOut();
  }
});
new app.Main();
