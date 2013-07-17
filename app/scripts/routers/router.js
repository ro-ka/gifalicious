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
    'collection': 'showCollection',
    'public/:url': 'showPublicGif'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.currentView = new App.IndexView();
  },

  /**
   * Show the index page
   */
  showIndex: function() {
    if (App.loggedin()) {
      App.router.navigate('/collection', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new App.IndexView();
  },

  /**
   * Show the user page
   */
  showUser: function() {
    if (!App.loggedin()) {
      App.router.navigate('/', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new App.UserView();
  },

  /**
   * Show the collection
   */
  showCollection: function() {
    if (!App.loggedin()) {
      App.router.navigate('/', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new App.CollectionView();
  },

  /**
   * Show a specific gif
   * @param  {String} id The id of the gif
   */
  showGif: function(id) {
    if (!App.loggedin()) {
      App.router.navigate('/', {trigger: true, replace: true});
      return;
    }

    var gif = App.gifs.get(id);

    this.currentView.remove();
    this.currentView = new App.GifView({
      model: gif
    });
  },

  /**
   * Show a specific public gif
   * @param  {String} url The encoded url of the gif
   */
  showPublicGif: function(url) {
    this.currentView.remove();
    this.currentView = new App.GifPublicView({
      url: decodeURIComponent(url)
    });
  },

  /**
   * Show the signup page
   */
  showSignup: function() {
    if (App.loggedin()) {
      App.router.navigate('/collection', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new App.SignupView();
  },

  /**
   * Show the signin page
   */
  showSignin: function() {
    this.currentView.remove();
    this.currentView = new App.SigninView();
  }
});
