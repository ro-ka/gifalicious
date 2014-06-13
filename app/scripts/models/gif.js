var app = app || {};

app.Gif = Backbone.Model.extend({
  /**
   * Necessary type for backbone-hoodie
   * @type {String}
   */
  type: 'gif',

  /**
   * Default values for the model
   * @type {Object}
   */
  defaults: {
    url: null
  }
});

/**
 * Returns when the gif is animated
 * @param  {String}  url The urls
 * @return {Boolean}     Whether it is an animate gif or not
 */
app.isAnimatedGif = function(url, callback) {
  if (!url) {
    callback('', false);
    return;
  }

  var encodedUrl = 'https://doesthisgifcontainananimation.com/' +
    encodeURIComponent(url);

  $.getJSON(encodedUrl, function(response) {
    callback(url, response.containsananimation || false);
  });
};
