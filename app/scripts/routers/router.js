var app = app || {};

app.Router = Backbone.Router.extend({
  /**
   * The routes
   * @type {Object}
   */
  routes: {
    '': 'showIndex',
    'settings/': 'showSettings',
    'gif/:id/': 'showGif',
    'create-account/': 'showCreateAccount',
    'signin/': 'showSignin',
    'signout/': 'showSignout',
    'explore/': 'showExplore',
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
      app.router.navigate('/explore/', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new app.IndexView();
  },

  /**
   * Show the settings page
   */
  showSettings: function() {
    if (!app.loggedin()) {
      app.router.navigate('/', {trigger: true, replace: true});
      return;
    }

    this.currentView.remove();
    this.currentView = new app.SettingsView();
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
   * Show the explore page
   */
  showExplore: function() {
    this.currentView.remove();
    this.currentView = new app.ExploreView();
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
  },

  /**
   * sign the user out
   */
  showSignout: function() {
    app.hoodie.account.signOut();
    app.router.navigate('/', {trigger: true, replace: true});
  }
});
