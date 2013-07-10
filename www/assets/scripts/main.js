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
    App.hoodie.account.authenticate()
      .then(this.handleUserAuthenticated, this.handleUserUnauthenticated);

    App.settings = new App.Settings();
    App.gifs = new App.Gifs();

    App.router = new App.Router();
    Backbone.history.start();

    this.initTemplates();
    this.initViews();
    this.initEvents();
  },

  /**
   * Initialize templates
   */
  initTemplates: function() {
    App.template = {
      // notification: Handlebars.compile($('#template__notifications').html()),
    };
  },

  /**
   * Initialize views
   */
  initViews: function() {
    App.gif = new App.GifView({ el: this.$('#gif-view') });
    App.user = new App.UserView({ el: this.$('#user-view') });
    App.navbar = new App.NavbarView({ el: this.$('#navbar') });
    App.index = new App.IndexView({ el: this.$('#index-view') });
    App.signup = new App.SignupView({ el: this.$('#signup-view') });
    App.signin = new App.SigninView({ el: this.$('#signin-view') });
    App.collection = new App.CollectionView({ el: this.$('#collection-view') });
  },

  /**
   * Initialize events
   */
  initEvents: function() {
    App.hoodie.account
      .on('signin', this.handleUserAuthenticated);
    App.hoodie.account
      .on('signout', this.handleUserUnauthenticated);
    App.hoodie
      .on('account:error:unauthenticated remote:error:unauthenticated', this.handleUserAuthenticationError);
  },

  /**
   * Handle it, when the user got authenticated
   * @param  {String} username The username
   */
  handleUserAuthenticated: function(username) {
    this.setAccountStatus('signedin');
    App.navbar.setUsername(App.hoodie.account.username);
    App.router.navigate('/', {trigger: true});
  },

  /**
   * Handle it, when the user got unauthenticated
   */
  handleUserUnauthenticated: function() {
    this.setAccountStatus('signedout');
    App.router.navigate('/', {trigger: true});
  },

  /**
   * Handle it, when there was an authentication error
   */
  handleUserAuthenticationError: function() {
    this.setAccountStatus('error');
    App.navbar.setUsername(App.hoodie.account.username);
    App.router.navigate('/signin', {trigger: true});
  },

  /**
   * Set the account status to the app
   * @param  {String} status The status
   */
  setAccountStatus: function(status) {
    $('html').attr('data-hoodie-account-status', status);
  }
});
new App.Main();


// // // initial load of all todo items from the store
// // hoodie.store.findAll('todo').then( function(todos) {
// //   todos.sort( sortByCreatedAt ).forEach( addTodo )
// // })

// // // when a new todo gets stored, add it to the UI
// // hoodie.store.on('add:todo', addTodo)
// // // clear todo list when the get wiped from store
// // hoodie.account.on('signout', clearTodos)

// // // handle creating a new task
// // $('#todoinput').on('keypress', function(event) {
// //   if (event.keyCode == 13) { // ENTER
// //     hoodie.store.add('todo', {title: event.target.value});
// //     event.target.value = '';
// //   }
// // })

// // function addTodo( todo ) {
// //   $('#todolist').append('<li>'+todo.title+'</li>');
// // }
// // function clearTodos() {
// //   $('#todolist').html('');
// // }
// // function sortByCreatedAt(a, b) {
// //   return a.createdAt > b.createdAt
// // }