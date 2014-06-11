var app = app || {};

app.Router = Backbone.Router.extend({
  /**
   * The routes
   * @type {Object}
   */
  routes: {
    '': 'showIndex',
    'user/': 'showUser',
    'gif/:id/': 'showGif',
    'create-account/': 'showCreateAccount',
    'signin/': 'showSignin',
    'collection/': 'showCollection',
    'public/:url/': 'showPublicGif'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.currentView = new app.IndexView();
  },

  /**
   * Show the index page
   */
  showIndex: function() {
    if (app.loggedin()) {
      app.router.navigate('/collection', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new app.IndexView();
  },

  /**
   * Show the user page
   */
  showUser: function() {
    if (!app.loggedin()) {
      app.router.navigate('/', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new app.UserView();
  },

  /**
   * Show the collection
   */
  showCollection: function() {
    if (!app.loggedin()) {
      app.router.navigate('/', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new app.CollectionView();
  },

  /**
   * Show a specific gif
   * @param  {String} id The id of the gif
   */
  showGif: function(id) {
    if (!app.loggedin()) {
      app.router.navigate('/', {trigger: true, replace: true});
      return;
    }

    var gif = app.gifs.get(id);

    this.currentView.remove();
    this.currentView = new app.GifView({
      model: gif
    });
  },

  /**
   * Show a specific public gif
   * @param  {String} url The encoded url of the gif
   */
  showPublicGif: function(url) {
    this.currentView.remove();
    this.currentView = new app.GifPublicView({
      url: decodeURIComponent(url)
    });
  },

  /**
   * Show the create account page
   */
  showCreateAccount: function() {
    if (app.loggedin()) {
      app.router.navigate('/collection', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new app.CreateAccountView();
  },

  /**
   * Show the signin page
   */
  showSignin: function() {
    this.currentView.remove();
    this.currentView = new app.SigninView();
  }
});
