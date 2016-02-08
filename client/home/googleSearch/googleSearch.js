Template.googleSearch.events({
  /*
   * Open new tab with google search
   * @method: 'click #search'
   * @param: event
   */
  'click #search': function (event) {
    var search = $('#searchInput').val();
    var url = 'https://www.google.fr/webhp?hl=fr#hl=fr&q=' +
      search.replace(' ', '+');
    window.open(url);
  }
});
