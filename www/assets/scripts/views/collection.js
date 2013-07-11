var App = App || {};

App.CollectionView = Backbone.View.extend({
  /**
   * Init the events
   * @type {Object}
   */
  events: {
    'click .collection__add-button': 'onAddButtonClick',
    'submit .collection__add-form': 'onAddFormSubmit'
  },

  /**
   * Initialize
   */
  initialize: function() {
    _.bindAll(this);

    this.addFormVisible = false;

    this.render();

    this.$addForm = this.$('.collection__add');
    this.$addFormTitle = this.$('.collection__title');
    this.$addFormInput = this.$('.collection__add__input');
    this.$list = this.$('.collection__list');

    this.listenTo(App.gifs, 'add remove change', this.render);
  },

  /**
   * Render the view
   */
  render: function() {
    var data = {
        gifs: App.gifs.toJSON()
      },
      html = App.template.collection(data);

    this.$el.html(html);
    App.$content.html(this.$el);
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
    this.$addForm.show();
    this.$addFormTitle.hide();
    this.$addFormInput.val('').focus();
    this.addFormVisible = true;
  },

  /**
   * Hide the add input
   */
  hideAddForm: function() {
    this.$addForm.hide();
    this.$addFormTitle.show();
    this.addFormVisible = false;
  },

  /**
   * Submit the form to add a gif
   */
  submitAddForm: function() {
    var url = this.$addFormInput.val();

    App.gifs.create({
        url: url
      }, {
        wait: true
      }
    );

    this.hideAddForm();
  }
});
