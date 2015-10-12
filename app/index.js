var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var NodeExpressGenerator = module.exports = function NodeExpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(NodeExpressGenerator, yeoman.generators.Base);

NodeExpressGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [
    {
      name: 'projectName',
      message: 'What would you like to call your project?'
    },
    {
      name: 'features',
      type: 'checkbox',
      message: 'Would you like to use any of these?\n    Use the arrow keys to move and space to check/uncheck.',
      choices: [{
        name: 'Inuit.css',
        value: 'useInuit',
        checked: true
      },
      {
        name: 'Bourbon',
        value: 'useBourbon',
        checked: true
      },
      {
        name: 'Angular',
        value: 'useAngular',
        checked: true
      },
      {
        name: 'jQuery',
        value: 'useJQuery',
        checked: false
      }]
    },
    {
      name: 'editors',
      type: 'checkbox',
      message: 'Which editor will you be developing in?\n    Please select only one.\n    (We use this to launch the project in your editor.)',
      choices: [{
        name: 'Sublime Text 2',
        value: 'useSublimeText2',
        checked: true
      },
      {
        name: 'WebStorm',
        value: 'useWebStorm',
        checked: false
      },
      {
        name: 'Coda2',
        value: 'useCoda2',
        checked: false
      },
      {
        name: 'Chocolat',
        value: 'useChocolat',
        checked: false
      },
      {
        name: 'TextMate',
        value: 'useTextMate',
        checked: false
      },
      {
        name: 'None',
        value: 'useNone',
        checked: false
      }]
    },
    {
      name: 'browsers',
      type: 'checkbox',
      message: 'Which browser do you primarily use in developement?\n    Please select only one.\n    (We use this to launch your project in your browser.)',
      choices: [{
        name: 'Google Chrome',
        value: 'useGoogleChrome',
        checked: true
      },
      {
        name: 'Firefox',
        value: 'useFirefox',
        checked: false
      },
      {
        name: 'Safari',
        value: 'useSafari',
        checked: false
      },
      {
        name: 'Opera',
        value: 'useOpera',
        checked: false
      }]
    },
    {
      name: 'heroku',
      type: 'confirm',
      message: 'Will you be deploying to Heroku?',
      default: true
    } 
  ];

  this.prompt(prompts, function (answers) {
  // this.prompt(prompts, function (answers) {

    this.projectName = answers.projectName;

    // features
    var features = answers.features;
    function hasFeature(feat) { return features.indexOf(feat) !== -1; }
    
    this.useInuit = hasFeature('useInuit');
    this.useBourbon = hasFeature('useBourbon');
    this.useAngular = hasFeature('useAngular');
    this.useJQuery = hasFeature('useJQuery');

    // editors
    var editors = answers.editors;
    function hasEditor(edit) { return editors.indexOf(edit) !== -1; }

    this.useSublimeText2 = hasEditor('useSublimeText2');
    this.useWebStorm = hasEditor('useWebStorm');
    this.useCoda2 = hasEditor('useCoda2');
    this.useChocolat = hasEditor('useChocolat');
    this.useTextMate = hasEditor('useTextMate');
    this.useNone = hasEditor('useNone');

    // browsers
    var browsers = answers.browsers;
    function hasBrowser(browse) { return browsers.indexOf(browse) !== -1; }

    this.useGoogleChrome = hasBrowser('useGoogleChrome');
    this.useFirefox = hasBrowser('useFirefox');
    this.useSafari = hasBrowser('useSafari');
    this.useOpera = hasBrowser('useOpera');

    // heroku
    this.heroku = answers.heroku;

    cb();
  }.bind(this));
};


NodeExpressGenerator.prototype.gruntfile = function gruntfile() {
  this.copy('Gruntfile.js', 'Gruntfile.js');
};

NodeExpressGenerator.prototype.packageJSON = function packageJSON() {
  this.copy('_package.json', 'package.json');
};

//TODO
NodeExpressGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
};


NodeExpressGenerator.prototype.editorConfig = function editorConfig() {
  this.copy('editorconfig', '.editorconfig');
};

NodeExpressGenerator.prototype.views = function views() {
  
  this.mkdir('app/views');
  this.mkdir('app/views/examples');
  this.mkdir('app/views/examples/elements');
  this.mkdir('app/views/includes');
  this.mkdir('app/views/sms');
  this.mkdir('app/views/wmp');

  this.copy('views/helloworld.html', 'app/views/helloworld.html');
  this.copy('views/layout.html', 'app/views/layout.html');
  this.copy('views/original.html', 'app/views/original.html');
  this.copy('views/layout.html', 'app/views/layout.html');
  this.copy('views/unbranded.html', 'app/views/unbranded.html');
  this.copy('views/unbranded_template.html', 'app/views/unbranded_template.html');

  this.copy('views/examples/blank.html', 'app/views/examples/blank.html');
  this.copy('views/examples/index.html', 'app/views/examples/index.html');
  this.copy('views/examples/template-data.html', 'app/views/examples/template-data.html');
  this.copy('views/examples/template-partial-areas.html', 'app/views/examples/template-partial-areas.html');
  this.copy('views/examples/unbranded.html', 'app/views/examples/unbranded.html');

  this.copy('views/examples/blank.html', 'app/views/examples/blank.html');

  this.copy('views/examples/elements/forms.html', 'app/views/examples/elements/forms.html');
  this.copy('views/examples/elements/grid-layout.html', 'app/views/examples/elements/grid-layout.html');
  this.copy('views/examples/elements/typography.html', 'app/views/examples/elements/typography.html');

  this.copy('views/includes/elements_head.html', 'app/views/includes/elements_head.html');
  this.copy('views/includes/elements_scripts.html', 'app/views/includeselements_scripts.html');
  this.copy('views/includes/examples_head.html', 'app/views/includes/examples_head.html');
  this.copy('views/includes/propositional_navigation.html', 'app/views/includes/propositional_navigation.html');
  this.copy('views/includes/propositional_navigation_alpha.html', 'app/views/includes/propositional_navigation_alpha.html');
  this.copy('views/includes/scripts.html', 'app/views/includes/scripts.html');


 this.copy('views/sms/page_one.html', 'app/views/sms/page_one.html');
 this.copy('views/sms/page_two.html', 'app/views/sms/page_two.html');
 this.copy('views/sms/page_summary.html', 'app/views/sms/page_summary.html');

 this.copy('views/wmp/check_post.html', 'app/views/wmp/check_post.html');
 this.copy('views/wmp/get_all_check_post.html', 'app/views/wmp/get_all_check_post.html');
 this.copy('views/wmp/search.html', 'app/views/wmp/search.html');

};


NodeExpressGenerator.prototype.docs = function docs() {
  
  this.mkdir('docs');
 
  // root doc folder
  this.copy('docs/creating-routes.md', 'docs/creating-routes.md');
  this.copy('docs/deploying.md', 'docs/deploying.md');
  this.copy('docs/getting-started.md', 'docs/getting-started.md');
  this.copy('docs/making-pages.md', 'docs/making-pages.md');
  this.copy('docs/principles.md', 'docs/principles.md');
  this.copy('docs/README.md', 'docs/README.md');
  this.copy('docs/tips-and-tricks.md', 'docs/tips-and-tricks.md');
  this.copy('docs/writing-css.md', 'docs/writing-css.md');
 
};


NodeExpressGenerator.prototype.lib = function lib() {
  
  this.mkdir('lib'); 
  // root lib folder
  this.copy('lib/template-config.js', 'lib/template-config.js');
  this.copy('lib/template-conversion.js', 'lib/template-conversion.js');
  this.copy('lib/template-engine.js', 'lib/template-engine.js'); 
};


NodeExpressGenerator.prototype.assets = function assets() {

  // make target directories
  

  this.mkdir('app');
  this.mkdir('app/assets');
  this.mkdir('app/assets/images');
  this.mkdir('app/assets/javascripts');
  this.mkdir('app/assets/sass');
  this.mkdir('app/assets/sass/elements');
  this.mkdir('app/assets/sass/elements/forms');
  

  // scaffold these by copying in required items
  this.copy('assets/images/favicon.ico', 'app/assets/images/favicon.ico');
  this.copy('assets/images/hmrc_crest_27px.png', 'app/assets/images/hmrc_crest_27px.png');

  this.copy('assets/javascripts/application.js', 'app/assets/javascripts/application.js');
  this.copy('assets/javascripts/bind.js', 'app/assets/javascripts/bind.js');
  this.copy('assets/javascripts/details.polyfill.js', 'app/assets/javascripts/details.polyfill.js');
  this.copy('assets/javascripts/jquery-1.11.3.js', 'app/assets/javascripts/jquery-1.11.3.js');
  this.copy('assets/javascripts/selection-buttons.js', 'app/assets/javascripts/selection-buttons.js');

  this.copy('assets/sass/application.scss', 'app/assets/sass/application.scss');
  this.copy('assets/sass/elements.scss', 'app/assets/sass/elements.scss');
  this.copy('assets/sass/examples.scss', 'app/assets/sass/examples.scss');

  this.copy('assets/sass/elements/_buttons.scss', 'app/assets/sass/elements/_buttons.scss');
  this.copy('assets/sass/elements/_details.scss', 'app/assets/sass/elements/_details.scss');
  this.copy('assets/sass/elements/_forms.scss', 'app/assets/sass/elements/_forms.scss');
  this.copy('assets/sass/elements/_helpers.scss', 'app/assets/sass/elements/_helpers.scss');
  this.copy('assets/sass/elements/_icons.scss', 'app/assets/sass/elements/_icons.scss');
  this.copy('assets/sass/elements/_layout.scss', 'app/assets/sass/elements/_layout.scss');
  this.copy('assets/sass/elements/_lists.scss', 'app/assets/sass/elements/_lists.scss');
  this.copy('assets/sass/elements/_panels.scss', 'app/assets/sass/elements/_panels.scss');
  this.copy('assets/sass/elements/_reset.scss', 'app/assets/sass/elements/_reset.scss');
  this.copy('assets/sass/elements/_tables.scss', 'app/assets/sass/elements/_tables.scss');
  this.copy('assets/sass/elements/_typography.scss', 'app/assets/sass/elements/_typography.scss');

  this.copy('assets/sass/elements/forms/_form-block-labels.scss', 'app/assets/sass/elements/forms/_form-block-labels.scss');
  this.copy('assets/sass/elements/forms/_form-date.scss', 'app/assets/sass/elements/forms/_form-date.scss');
  this.copy('assets/sass/elements/forms/_form-validation.scss', 'app/assets/sass/elements/forms/_form-validation.scss');


 };


/*
NodeExpressGenerator.prototype.app = function app() {
  this.copy('app.js', 'app.js');
};
*/

/*
NodeExpressGenerator.prototype.procfile = function procfile() {
  if (this.heroku) {
    this.copy('Procfile', 'Procfile');
  }
};
*/

NodeExpressGenerator.prototype.readme = function readme() {
  this.copy('README.md', 'README.md');
};

NodeExpressGenerator.prototype.procfile = function procfile() {
this.copy('Procfile', 'Procfile');
};


NodeExpressGenerator.prototype.changelog = function changelog() {
  this.copy('CHANGELOG.md', 'CHANGELOG.md');
};

NodeExpressGenerator.prototype.contributing = function contributing() {
  this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
};

NodeExpressGenerator.prototype.contributing = function contributing() {
  this.copy('CONTRIBUTING.md', 'CONTRIBUTING.md');
};

NodeExpressGenerator.prototype.licence = function licence() {
  this.copy('LICENCE.txt', 'LICENCE.txt');
};

NodeExpressGenerator.prototype.serverjs = function serverjs() {
  this.copy('server.js', 'server.js');
};

NodeExpressGenerator.prototype.startjs = function startjs() {
  this.copy('start.js', 'start.js');
};

NodeExpressGenerator.prototype.versiontxt = function versiontxt() {
  this.copy('VERSION.txt', 'VERSION.txt');
};

/*deExpressGenerator.prototype.startpid = function startpid() {
  this.copy('start.pid', '.start.pid');
};
*/

