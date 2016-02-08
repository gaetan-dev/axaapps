Template.myApps.helpers({
  /*
   * Helper - Return the user's apps sorted by rank (drag&drop)
   * @method: apps
   * @return: apps[] sorted
   */
  apps: function () {
    var apps = Meteor.user().profile.apps;

    // Relational
    apps.forEach(function (app) {
      app.profile = Apps.find(app._id).fetch()[0];
    });

    // Sort by rank
    apps.sort(function (a, b) {
      return a.rank - b.rank;
    });
    return apps;
  },

  // appsFollowed: function () {
  //   var apps = Meteor.user().profile.apps;
  //   var appsFollowed = [];
  //
  //   apps.forEach(function (app) {
  //     if (app.followed) {
  //       app.profile = Apps.find(app._id).fetch()[0];
  //       appsFollowed.push(app);
  //     }
  //   });
  //
  //   return appsFollowed;
  // },

  /*
   * Helper - Return if the current app is followed by the current user
   * @method: isFollowed
   * @return: true or false
   */
  isFollowed: function () {
    return this.followed;
  },

  /* Helper - Return current app
   * @method: currentApp
   * @return: app
   */
  currentApp: function () {
    return {
      '_id': this._id,
      'name': this.profile.name,
      'link': this.myLink,
      'desc': this.profile.desc,
      'image': this.profile.image,
      'followed': this.followed,
      'deleted': this.profile.deleted
    };
  }
});

Template.myApps.events({});

Template.myApps.rendered = function () {
  /*
   * Rendered - Drag & Drop feature
   */
  $('#apps').sortable({
    stop: function (e, ui) {
      // get the dragged html element and the one before and after it
      var newRank;
      el = ui.item.get(0);
      before = ui.item.prev().get(0);
      after = ui.item.next().get(0);

      // Here is the part that blew my mind!
      // Blaze.getData takes as a parameter an html element
      // and will return the data context that was bound when
      // that html element was rendered!
      if (!before) {
        // if it was dragged into the first position grab the
        // next element's data context and subtract one from the rank
        newRank = Blaze.getData(after).rank - 1;
      } else if (!after) {
        // if it was dragged into the last position grab the
        //  previous element's data context and add one to the rank
        newRank = Blaze.getData(before).rank + 1;
      } else {
        // else take the average of the two ranks of the previous
        // and next elements
        previous = Blaze.getData(el).rank;
        a = Blaze.getData(after).rank;
        b = Blaze.getData(before).rank;
        if (previous > a || previous < b) {
          newRank = (a + b) / 2;
        }
      }

      //update the dragged Item's rank
      if (newRank) {
        var apps = Meteor.user().profile.apps;
        var id = Blaze.getData(el)._id;
        var app;

        for (var i = 0; i < apps.length; i++) {
          if (apps[i]._id === id) {
            app = apps[i];
            break;
          }
        }
        app.rank = newRank;

        Meteor.call('updateUserApps', apps);
      }
    }
  });
};
