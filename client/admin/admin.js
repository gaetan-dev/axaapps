Template.admin.helpers({
  /*
   * Helper - Return apps stored in MongoDB
   * @method: apps
   * @return: apps[] sorted
   */
  apps: function () {
    return Apps.find().fetch().sort(function (a, b) {
      return (a === b) ? 0 : a ? 1 : -1;
    });
  },

  /*
   * Helper - Return if the current app is deleted
   * @method: isDeleted
   * @return: true or false
   */
  isDeleted: function () {
    return this.deleted;
  },
});

Template.admin.events({
  /*
   * Event - Delete current app in MongoDB when user click on the remove button
   * @method: 'click #remove'
   * @param: event
   */
  'click #remove': function (event) {
    event.preventDefault();
    Meteor.call('deleteApp', this._id);
  }
});

Template.addAppForm.events({
  /*
   * Event - Create current app in MongoDB when user click on the create button
   * @method: 'click #create'
   * @param: event
   */
  'click #create': function (event) {
    event.preventDefault();
    var name = $('#name').val();
    var desc = $('#desc').val();
    var link = $('#link').val();
    var image = $('#image').val();

    if (name === '' || desc === '' || link === '') {
      console.log('Missing parameter(s)');
      return;
    }

    if (image === '') {
      console.log('Create without image');
    }

    Meteor.call('createApp', {
      'name': name,
      'desc': desc,
      'link': link,
      'image': image
    });
  },
});
