Apps = new Mongo.Collection("apps");

Meteor.methods({
  /*
   * Method - Create app in MongoDB
   * @method: createApp
   * @param: app
   */
  createApp: function (app) {
    app.followers = [];
    app.createdAt = Date.now();

    Apps.insert(app);
  },

  /*
   * Method - Delete app in MongoDB
   * @method: deleteApp
   * @param: _id (app)
   */
  deleteApp: function (_id) {
    Apps.update(_id, {
      $set: {
        'deleted': true,
        'deletedAt': Date.now()
      }
    });
  },
  /*
   * Method - Push current user in app.followers[]
   * @method: pushFollower
   * @param: _id (app)
   */
  pushFollower: function (_id) {
      Apps.update(_id, {
        $addToSet: {
          'followers': Meteor.userId()
        }
      });
  },

  /*
   * Method - Pull current user in app.followers[]
   * @method: pullFollower
   * @param: _id (app)
   */
  pullFollower: function (_id) {
      Apps.update(_id, {
        $pull: {
          'followers': Meteor.userId()
        }
      });
  }
});
