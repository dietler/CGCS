/*
 * Basic responsive mashup template
 * @owner Enter you name here (xxx)
 */
/*
 *    Fill in host and port for Qlik engine
 */
var qsprefix = window.location.pathname.substr(
  0,
  window.location.pathname.toLowerCase().lastIndexOf("/extensions") + 1
);
var config = {
  host:
    window.location.hostname === "localhost"
      ? "rnd-sense.ipc-global.com"
      : window.location.hostname,
  prefix: window.location.hostname === "localhost" ? "/" : qsprefix,
  port: window.location.hostname === "localhost" ? "443" : window.location.port,
  isSecure:
    window.location.hostname === "localhost"
      ? true
      : window.location.protocol === "https:"
};

require.config({
  baseUrl:
    (config.isSecure ? "https://" : "http://") +
    config.host +
    (config.port ? ":" + config.port : "") +
    config.prefix +
    "resources"
});

require(["js/qlik"], function(qlik) {
  qlik.setOnError(function(error) {
    $("#popupText").append(error.message + "<br>");
    $("#popup").fadeIn(1000);
  });

  $("#closePopup").click(function() {
    $("#popup").hide();
  });

  //callbacks -- inserted here --
  //open apps -- inserted here --
  var app = qlik.openApp("{{app.app-guid}}", config);

  //get objects -- inserted here --
  app.getObject("kpi_project_amount", "fuShND");

  //create cubes and lists -- inserted here --

  if (app) {
    app.getObject("CurrentSelections", "CurrentSelections");
    $(".filter-drawer-toggle, paper-menu paper-item").click(function() {
      qlik.resize();
    });
  } else {
    $(".current-selections-placeholder span").css("display", "inline-block");
  }

  // $(".navbar-nav a, .nav-tabs a").click(function() {
  //   qlik.resize();
  // });

  // $(document).ready(function() {
  //   $(".sidebarToggle").on("click", function() {
  //     $("#sidebar").toggleClass("active");
  //   });
  // });

  // $().ready(function() {
  //   app.field("Location").clear();
  //   app1.field("Location").clear();
  //   $("#locationname").text(getUrlParameter("Location"));
  // });
});
