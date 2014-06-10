var app = app || {};

app.loggedin = function() {
  return app.hoodie.account.username;
};

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

    // app.$content = this.$('#content');

    app.siteHeader = new app.SiteHeaderView();
    // app.gifs = new app.Gifs();

    // this.initTemplates();
    // this.initEvents();

    // app.router = new app.Router();
    // Backbone.history.start();
  },

//   /**
//    * Initialize templates
//    */
//   initTemplates: function() {
//     app.template = {
//       gif: Handlebars.compile($('#template__gif').html()),
//       gifShare: Handlebars.compile($('#template__gif__share').html()),
//       gifDelete: Handlebars.compile($('#template__gif__delete').html()),
//       gifPublic: Handlebars.compile($('#template__gif--public').html()),
//       user: Handlebars.compile($('#template__user').html()),
//       userDelete: Handlebars.compile($('#template__user__delete').html()),
//       index: Handlebars.compile($('#template__index').html()),
//       signup: Handlebars.compile($('#template__signup').html()),
//       signin: Handlebars.compile($('#template__signin').html()),
//       collection: Handlebars.compile($('#template__collection').html()),
//       collectionTitle: Handlebars.compile($('#template__collection__title').html()),
//       collectionGif: Handlebars.compile($('#template__collection__gif').html())
//     };
//   },

//   /**
//    * Initialize events
//    */
//   initEvents: function() {
//     // app.hoodie.account
//     //   .on('signup', this.handleUserAuthenticated);
//     // app.hoodie.account
//     //   .on('signin', this.handleUserAuthenticated);
//     // app.hoodie.account
//     //   .on('signout', this.handleUserUnauthenticated);
//     app.hoodie.account
//       .on('authenticate', this.handleUserAuthenticated);
//     app.hoodie.account
//       .on('unauthenticated', this.handleUserUnauthenticated);
//     app.hoodie
//       .on('account:error:unauthenticated remote:error:unauthenticated', this.handleUserAuthenticationError);
//   },

//   /**
//    * Handle it, when the user got authenticated
//    * @param  {String} username The username
//    */
//   handleUserAuthenticated: function(username) {
//     console.log('authenticated', arguments);
//     app.router.navigate('/collection', {trigger: true});
//     app.navbar.setAccountStatus('signed-in');
//   },

//   /**
//    * Handle it, when the user got unauthenticated
//    */
//   handleUserUnauthenticated: function() {
//     console.log('unauthenticated', arguments);
//     app.router.navigate('/', {trigger: true});
//     app.navbar.setAccountStatus('signed-out');
//   },

//   /**
//    * Handle it, when there was an authentication error
//    */
//   handleUserAuthenticationError: function() {
//     console.log('authentication:error', arguments);
//     // app.router.navigate('/signin', {trigger: true});
//     // app.navbar.setAccountStatus('error');

//     app.hoodie.account.signOut();
//   }
});
new app.Main();
