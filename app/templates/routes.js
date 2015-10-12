module.exports = {
  bind : function (app) {

    app.get('/', function (req, res) {
      res.render('helloworld');
    });

   app.get('/wmp', function (req, res) {
      res.render('/wmp/search');
    });

    app.post('/wmp/search', function(req, res){
        res.redirect(301, '/wmp/check_post');
    });

    app.get('/get_all_check_post', function (req, res) {
      res.render('/wmp/get_all_check_post');
    });

    app.get('/sms', function (req, res) {
      res.render('/sms/page_one');
    });

    app.post('/sms/page_one', function(req, res){
        res.redirect(301, '/sms/page_two');
    });

   app.post('/sms/page_two', function(req, res){
        res.redirect(301, '/sms/page_summary');
    });

    app.get('/examples/template-data', function (req, res) {
      res.render('examples/template-data', { 'name' : 'Foo' });
    });

    // add your routes here

  }
};
