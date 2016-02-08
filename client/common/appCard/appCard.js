Template.appCard.helpers({
  /* Helper - Return if the current app is deleted
   * @method: isDeleted
   * @return: true or false
   */
  isDeleted: function () {
    return this.app.deleted;
  }
});

Template.appCard.events({
  /*
   * Event - Push current app in user.apps[] and push user._id in
   * app.followers[] when user click on the follow button
   * @method: 'click #remove'
   * @param: event
   */
  'click #follow': function (event) {
    event.preventDefault();
    var app_id = this.app._id;
    var myLink = $('#myLink_' + app_id).val();

    if (myLink === '') {
      console.log('Personal link missed');
      return;
    }

    // The user is already following the application (1st test)
    var user = Apps.find({
      '_id': app_id,
      'followers': Meteor.userId()
    }).fetch();
    if (user.length > 0) {
      console.log('The user is already following the application');
      return;
    }

    var profile = Meteor.user().profile || {};
    var apps = profile.apps || [];
    var app;

    for (var i = 0; i < apps.length; i++) {
      if (apps[i]._id === app_id) {
        app = apps[i];
        app.myLink = myLink;
      }
    }

    // The user has already followed this application
    if (app) {
      // The user is already following the application (2nd test)
      if (app.deleted === false) {
        console.log('The user is already following the application');
        return;
      }

      app.followed = true;
      app.followedAt = Date.now();

      // Update user.apps[] with the new apps[]
      Meteor.call('updateUserApps', apps);

    } else {
      // Push the new app in user.apps[]
      Meteor.call('pushUserApp', {
        '_id': app_id,
        'myLink': myLink,
        'size': 1,
        'rank': apps.length,
      });
    }
    // Push current user in app.followers[]
    Meteor.call('pushFollower', app_id);
  },

  /*
   * Event - Pull current app in user.apps[] and pull user._id in
   * app.followers[] when user click on the notFollowAnyMore button
   * @method: 'click #notFollowAnyMore'
   * @param: event
   */
  'click #notFollowAnyMore': function (event) {
    event.preventDefault();
    var app_id = this.app._id;
    var apps = Meteor.user().profile.apps;
    var app;

    for (var i = 0; i < apps.length; i++) {
      if (apps[i]._id === app_id) {
        app = apps[i];
        break;
      }
    }

    app.followed = false;
    app.followedAt = Date.now();

    // Update user.apps[] with the new apps[]
    Meteor.call('updateUserApps', apps);
    // Pull current user in app.followers[]
    Meteor.call('pullFollower', app_id);
  }
});
