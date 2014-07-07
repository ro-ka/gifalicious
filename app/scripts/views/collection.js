var app = app || {};

app.CollectionView = Backbone.View.extend({
  /**
   * The templates for this view
   * @type {Object}
   */
  templates: {
    el: Handlebars.compile($('#template__collection').html()),
    title: Handlebars.compile($('#template__collection__title').html())
  },

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

    this.listenTo(app.gifs, 'add remove change', this.onCollectionChange);
    this.listenTo(app.gifs, 'add', this.addGif);
  },

  /**
   * Render the view
   */
  render: function() {
    var html = this.templates.el();

    this.$el.html(html);
    app.$content.html(this.$el);

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
    app.gifs.each(this.addGif);
  },

  /**
   * Render the title
   */
  renderTitle: function() {
    var gifCount = app.gifs.size(),
      data = {
        gifCount: gifCount,
        noGifs: gifCount === 0,
        oneGif: gifCount === 1
      },
      html = this.templates.title(data);

    this.$title.html(html);
  },

  /**
   * Update the message for an empty list
   */
  updateListEmptyMessage: function() {
    if (app.gifs.isEmpty()) {
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
    var gifView = new app.GifListView({
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
    this.$title.addClass('collection__title--invisible');
    this.addFormVisible = true;
  },

  /**
   * Hide the add input
   */
  hideAddForm: function() {
    this.$addFormInputWrapper.hide();
    this.$title.removeClass('collection__title--invisible');
    this.$addFormButton.removeClass('button--loading');
    this.addFormVisible = false;
  },

  /**
   * Submit the form to add a gif
   */
  submitAddForm: function() {
    var url = this.$addFormInput.val();

    this.$addFormButton.addClass('button--loading');

    if (app.gifs.alreadyExists(url)) {
      this.showAddError('You already collected that one!');
      return;
    }

    app.isAnimatedGif(url, this.onIsAnimatedGifCheck);
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

    app.gifs.create({
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
    this.$addFormButton.removeClass('button--loading');
    this.$addFormError.text(message).show();
  }
});
