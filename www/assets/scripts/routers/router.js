var App = App || {};

App.Router = Backbone.Router.extend({
  /**
   * The routes
   * @type {Object}
   */
  routes: {
    '': 'showIndex',
    'user': 'showUser',
    'gif/:id': 'showGif',
    'signup': 'showSignup',
    'signin': 'showSignin',
    'collection': 'showCollection'
  },

  /**
   * Show the index page
   */
  showIndex: function() {
    App.settings.set('view', 'index');
  },

  /**
   * Show the user page
   */
  showUser: function() {
    App.settings.set('view', 'user');
  },

  /**
   * Show the collection
   */
  showCollection: function() {
    App.settings.set('view', 'collection');
  },

  /**
   * Show a specific gif
   * @param  {String} id The id of the gif
   */
  showGif: function(id) {
    var gif = App.gifs.get(id);

    App.settings.set('view', 'gif');
    // App.settings.trigger('show:reservation', id);
  },

  /**
   * Show the signup page
   */
  showSignup: function() {
    App.settings.set('view', 'signup');
  },

  /**
   * Show the signin page
   */
  showSignin: function() {
    App.settings.set('view', 'signin');
  }
});
