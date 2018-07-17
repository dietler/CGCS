const gulp = require("gulp");
const zip = require("gulp-zip");
const replace = require("gulp-token-replace");
const userHome = require("user-home");

// Mashup name
const mashup = "ipc-template-bootstrap";
const qvffile = "FEMA Disaster Assistance Analysis (June 2018) (App Load)";
// Local Extension Path
const extensionpath = userHome + "\\Documents\\Qlik\\Sense\\Extensions";
// Local App Path
const apppath = userHome + "\\Documents\\Qlik\\Sense\\Apps";

gulp.task("html", function() {
  // const replaceStringsLocal = require("./src/config/replace_local.json");
  // const replaceStringsProd = require("./src/config/replace_prod.json");
  gulp
    .src("src/*.html")
    // .pipe(replace({ global: replaceStringsLocal }))
    .pipe(gulp.dest(extensionpath + `/${mashup}`));
  gulp
    .src("src/*.html")
    // .pipe(replace({ global: replaceStringsProd }))
    .pipe(gulp.dest(`dist/${mashup}`));
});

gulp.task("css", function() {
  gulp
    .src("src/*.css")
    .pipe(gulp.dest(`dist/${mashup}`))
    .pipe(gulp.dest(extensionpath + `/${mashup}`));
});

gulp.task("js", function() {
  // const replaceStringsLocal = require("./src/config/replace_local.json");
  // const replaceStringsProd = require("./src/config/replace_prod.json");
  gulp
    .src("src/*.js")
    // .pipe(replace({ global: replaceStringsLocal }))
    .pipe(gulp.dest(extensionpath + `/${mashup}`));
  gulp
    .src("src/*.js")
    // .pipe(replace({ global: replaceStringsProd }))
    .pipe(gulp.dest(`dist/${mashup}`));
});

gulp.task("qext", function() {
  gulp
    .src("src/*.qext")
    .pipe(gulp.dest(`dist/${mashup}`))
    .pipe(gulp.dest(extensionpath + `/${mashup}`));
});

gulp.task("wbl", function() {
  gulp
    .src("src/*.wbl")
    .pipe(gulp.dest(`dist/${mashup}`))
    .pipe(gulp.dest(extensionpath + `/${mashup}`));
});

gulp.task("preview", function() {
  gulp
    .src("src/preview.png")
    .pipe(gulp.dest(`dist/${mashup}`))
    .pipe(gulp.dest(extensionpath + `/${mashup}`));
});

gulp.task("assets", function() {
  gulp
    .src("src/assets/**")
    .pipe(gulp.dest(`dist/${mashup}/assets`))
    .pipe(gulp.dest(extensionpath + `/${mashup}/assets`));
});

gulp.task("qliksenseapp", function() {
  gulp.src(apppath + `/${qvffile}.qvf`).pipe(gulp.dest(`qlik sense apps`));
});

//watch - monitor folders for changes
gulp.task("watch", function() {
  gulp.watch("src/*.html", ["html"]);
  gulp.watch("src/*.css", ["css"]);
  gulp.watch("src/*.js", ["js"]);
  gulp.watch("src/*.qext", ["qext"]);
  gulp.watch("src/*.wbl", ["wbl"]);
  gulp.watch("src/assets/**", ["assets"]);
});

//zip
gulp.task("zip", function() {
  gulp
    .src(`dist/${mashup}/**`)
    .pipe(zip(`${mashup}.zip`))
    .pipe(gulp.dest(`dist`));
});

//default
gulp.task("default", [
  "html",
  "css",
  "js",
  "qext",
  "wbl",
  "preview",
  "assets",
  "qliksenseapp",
  "zip"
]);

gulp.task("runwatch", ["default", "watch"]);
