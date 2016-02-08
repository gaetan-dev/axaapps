Meteor.methods({
  /*
   * Method - Update user.apps[] in MongoDB
   * @method: updateUserApps
   * @param: apps
   */
  updateUserApps: function (apps) {
    Meteor.users.update(Meteor.userId(), {
      $set: {
        'profile.apps': apps
      }
    });
  },

  /*
   * Method - Push app in user.apps[] in MongoDB
   * @method: pushUserApp
   * @param: apps
   */
  pushUserApp: function (app) {
    app.followed = true;
    app.followedAt = Date.now();

    Meteor.users.update(Meteor.userId(), {
      $addToSet: {
        'profile.apps': app
      }
    });
  }
});
