var App = App || {};

App.CollectionView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .collection__add__button': 'onAddButtonClick',
    'submit .collection__add': 'onAddFormSubmit'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.addFormVisible = false;

    this.render();

    this.listenTo(App.gifs, 'add remove change', this.onCollectionChange);
    this.listenTo(App.gifs, 'add', this.addGif);
  },

  /**
   * Render the view
   */
  render: function() {
    var html = App.template.collection();

    this.$el.html(html);
    App.$content.html(this.$el);

    this.$title = this.$('.collection__title');
    this.$addForm = this.$('.collection__add');
    this.$addFormError = this.$('.collection__add__error');
    this.$addFormInput = this.$('.collection__add__input');
    this.$addFormButton = this.$('.collection__add__button');
    this.$addFormInputWrapper = this.$('.collection__add__input-wrapper');
    this.$list = this.$('.collection__list');
    this.$listEmpty = this.$('.collection__list--empty');

    this.renderTitle();
    this.updateListEmptyMessage();
    App.gifs.each(this.addGif);
  },

  /**
   * Render the title
   */
  renderTitle: function() {
    var gifCount = App.gifs.size(),
      data = {
        gifCount: gifCount,
        noGifs: gifCount === 0,
        oneGif: gifCount === 1
      },
      html = App.template.collectionTitle(data);

    this.$title.html(html);
  },

  /**
   * Update the message for an empty list
   */
  updateListEmptyMessage: function() {
    if (App.gifs.isEmpty()) {
      this.$listEmpty.show();
    } else {
      this.$listEmpty.hide();
    }
  },

  /**
   * Add a gif to the list
   * @param  {Model.Gif} gif The GIF
   */
  addGif: function(gif) {
    var gifView = new App.CollectionGifView({
      model: gif
    });

    this.$list.prepend(gifView.$el);
  },

  /**
   * When something in the collection changes
   */
  onCollectionChange: function() {
    this.renderTitle();
    this.updateListEmptyMessage();
  },

  /**
   * When the button gets clicked
   * @param  {JQueryEvent} event The Jquery Event
   */
  onAddButtonClick: function(event) {
    event.preventDefault();

    if (this.addFormVisible) {
      this.submitAddForm();
    } else {
      this.showAddForm();
    }
  },

  /**
   * When the form gets submitted
   * @param  {JQueryEvent} event The Jquery Event
   */
  onAddFormSubmit: function(event) {
    event.preventDefault();

    this.submitAddForm();
  },

  /**
   * Show the add input
   */
  showAddForm: function() {
    this.$addFormError.hide();
    this.$addFormInputWrapper.show();
    this.$addFormInput.val('').focus();
    this.$title.addClass('invisible');
    this.addFormVisible = true;
  },

  /**
   * Hide the add input
   */
  hideAddForm: function() {
    this.$addFormInputWrapper.hide();
    this.$title.removeClass('invisible');
    this.$addFormButton.removeClass('loading');
    this.addFormVisible = false;
  },

  /**
   * Submit the form to add a gif
   */
  submitAddForm: function() {
    var url = this.$addFormInput.val();

    this.$addFormButton.addClass('loading');

    if (App.gifs.alreadyExists(url)) {
      this.showAddError('You already collected that one!');
      return;
    }

    App.isAnimatedGif(url, this.onIsAnimatedGifCheck);
  },

  /**
   * When the check for an animated gif returned
   * @param  {String}  url           The gif url
   * @param  {Boolean} isAnimatedGif If it is animated or not
   */
  onIsAnimatedGifCheck: function(url, isAnimatedGif) {
    if (!isAnimatedGif) {
      this.showAddError('This is not an animated GIF! Shame on you!');
      return;
    }

    App.gifs.create({
        url: url
      }, {
        wait: true
      }
    );

    this.hideAddForm();
  },

  /**
   * Show the error form with a message
   * @param  {String} message The error message
   */
  showAddError: function(message) {
    this.$addFormButton.removeClass('loading');
    this.$addFormError.text(message).show();
  }
});
