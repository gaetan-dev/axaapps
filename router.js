Router.configure({
  layoutTemplate: 'main'
});

Router.route('/', function() {
  this.render('home');
});

Router.route('/store', function() {
  this.render('appsStore');
});

Router.route('/admin', function() {
  this.render('admin');
});
