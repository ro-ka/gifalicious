var App = App || {};

App.loggedin = function() {
  return App.hoodie.account.username;
};

App.Main = Backbone.View.extend({
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
    App.hoodie = Backbone.hoodie;
    App.hoodie.account.authenticate();

    App.$content = this.$('#content');

    App.settings = new App.Settings();
    App.gifs = new App.Gifs();

    App.navbar = new App.NavbarView({ el: this.$('#navbar') });

    this.initTemplates();
    this.initEvents();

    App.router = new App.Router();
    Backbone.history.start();
  },

  /**
   * Initialize templates
   */
  initTemplates: function() {
    App.template = {
      gif: Handlebars.compile($('#template__gif').html()),
      gifShare: Handlebars.compile($('#template__gif__share').html()),
      gifDelete: Handlebars.compile($('#template__gif__delete').html()),
      gifPublic: Handlebars.compile($('#template__gif--public').html()),
      user: Handlebars.compile($('#template__user').html()),
      userDelete: Handlebars.compile($('#template__user__delete').html()),
      index: Handlebars.compile($('#template__index').html()),
      signup: Handlebars.compile($('#template__signup').html()),
      signin: Handlebars.compile($('#template__signin').html()),
      collection: Handlebars.compile($('#template__collection').html()),
      collectionTitle: Handlebars.compile($('#template__collection__title').html()),
      collectionGif: Handlebars.compile($('#template__collection__gif').html())
    };
  },

  /**
   * Initialize events
   */
  initEvents: function() {
    App.hoodie.account
      .on('signup', this.handleUserAuthenticated);
    App.hoodie.account
      .on('signin', this.handleUserAuthenticated);
    App.hoodie.account
      .on('signout', this.handleUserUnauthenticated);
    App.hoodie.account
      .on('authenticate', this.handleUserAuthenticated);
    App.hoodie.account
      .on('unauthenticated', this.handleUserUnauthenticated);
    App.hoodie
      .on('account:error:unauthenticated remote:error:unauthenticated', this.handleUserAuthenticationError);
  },

  /**
   * Handle it, when the user got authenticated
   * @param  {String} username The username
   */
  handleUserAuthenticated: function(username) {
    App.router.navigate('/collection', {trigger: true});
    App.navbar.setAccountStatus('signedin');
  },

  /**
   * Handle it, when the user got unauthenticated
   */
  handleUserUnauthenticated: function() {
    App.router.navigate('/', {trigger: true});
    App.navbar.setAccountStatus('signedout');
  },

  /**
   * Handle it, when there was an authentication error
   */
  handleUserAuthenticationError: function() {
    // App.router.navigate('/signin', {trigger: true});
    // App.navbar.setAccountStatus('error');

    App.hoodie.account.signOut();
  }
});
new App.Main();
