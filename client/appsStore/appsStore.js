Template.appsStore.helpers({
  /*
   * Helper - Return apps stored in MongoDB
   * @method: apps
   * @return: apps[]
   */
  apps: function () {
    return Apps.find({});
  },

  /* Helper - Return if the current app is deleted
   * @method: isDeleted
   * @return: true or false
   */
  isDeleted: function () {
    return this.deleted;
  },

  /* Helper - Return current app
   * @method: currentApp
   * @return: app
   */
  currentApp: function () {
    return {
      '_id': this._id,
      'name': this.name,
      'desc': this.desc,
      'link': this.link,
      'image': this.image,
      'followers': this.followers
    };
  }
});
