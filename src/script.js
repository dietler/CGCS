/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var qsprefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf('/extensions') + 1
);

//Create a unique ID per tab
var tabID =
  sessionStorage.tabID && sessionStorage.closedLastTab !== '2'
    ? sessionStorage.tabID
    : (sessionStorage.tabID = Math.random());
sessionStorage.closedLastTab = '2';
$(window).on('unload beforeunload', function() {
  sessionStorage.closedLastTab = '1';
});

var config = {
  host: window.location.hostname,
  prefix: qsprefix,
  port: window.location.port,
  isSecure: window.location.protocol === 'https:',
  identity: tabID
};
require.config({
  baseUrl:
    (config.isSecure ? 'https://' : 'http://') +
    config.host +
    (config.port ? ':' + config.port : '') +
    config.prefix +
    'resources'
});

require(['js/qlik'], function(qlik) {
  qlik.setOnError(function(error) {
    $('#popupText').append(error.message + '<br>');
    $('#popup').fadeIn(1000);
  });

  $('#closePopup').click(function() {
    $('#popup').hide();
  });

  //callbacks -- inserted here --
  //open apps -- inserted here --
  var app = qlik.openApp('55aea3ea-90b0-4249-8a80-2901ed9a0b42', config); //CGCS.qvf | 55aea3ea-90b0-4249-8a80-2901ed9a0b42

  //get objects -- inserted here --
  app.getObject('table_top', 'RE');
  app.getObject('table_bottom', 'WYuH');
  app.getObject('table_unranked', 'XbeZCn');
  app.getObject('filter_functionalarea', 'hYzhmVq');
  app.getObject('filter_functionalarea2', 'mwTBpn');
  app.getObject('filter_metric', 'pJAfD');
  app.getObject('title_districtname', 'EMXvy');
  app.getObject('chart_metricvs', 'avBKzh');
  app.getObject('chart_score', 'ZUjSX');
  app.getObject('chart_reporting', 'mXzUPJ');

  //create cubes and lists -- inserted here --

  if (app) {
    app.getObject('CurrentSelections', 'CurrentSelections');
  } else {
    $('.current-selections-placeholder span').css('display', 'inline-block');
  }

  $('.navbar-nav a').click(function() {
    qlik.resize();
  });

  // $(document).ready(function() {
  //   $('.sidebarToggle').on('click', function() {
  //     $('#sidebar').toggleClass('active');
  //     qlik.resize();
  //   });
  // });

  // Get Parameter
  var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
      sURLVariables = sPageURL.split('&'),
      sParameterName,
      i;

    for (i = 0; i < sURLVariables.length; i++) {
      sParameterName = sURLVariables[i].split('=');

      if (sParameterName[0] === sParam) {
        return sParameterName[1] === undefined ? true : sParameterName[1];
      }
    }
  };

  //Pass District ID
  $().ready(function() {
    app.field('District ID').clear();
    app.field('District ID').selectMatch(getUrlParameter('district'), true);
  });

  // $().ready(function() {
  //   app.field("Location").clear();
  //   app1.field("Location").clear();
  //   $("#locationname").text(getUrlParameter("Location"));
  // });
});
