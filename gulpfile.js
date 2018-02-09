var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    runSequence = require("run-sequence"),
    htmlmin = require("gulp-htmlmin"),
    imagemin = require("gulp-imagemin"),
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    babel = require('gulp-babel'),
    plumber = require("gulp-plumber"),
    del = require("del");

gulp.task("sass", function() {
    return gulp.src("app/sass/main.scss")
               .pipe(plumber())
               .pipe(sass.sync({
                   outputStyle: "compressed"
               }))
               .pipe(autoprefixer({
                    browsers: ["last 5 version", "IE 10"]
                }))
               .pipe(gulp.dest("app/css"))
               .pipe(browserSync.stream());
});

gulp.task("server", function() {
    browserSync.init({
        server: "app"
    });
});

gulp.task("watch", function() {
    gulp.watch("app/sass/*/*.scss", ["sass"]);
    gulp.watch(["app/*.html", "app/js/*.js"], browserSync.reload);
});

gulp.task("clean", function() {
    return del(["dist/"], {
        force: true
    });
});

gulp.task("html", function() {
  return gulp.src("app/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist/"));
});

gulp.task("uglify", function(cb) {
      pump([
        gulp.src("app/js/*.js"),
        babel({
            presets: ['es2015']
          }),
        uglify(),
        gulp.dest("dist/js")
      ],
      cb
    );     
});

gulp.task("images", function() {

    return gulp.src("app/images/**/*", {
            base: "app"
        })
        .pipe(imagemin())
        .pipe(gulp.dest("dist/"));

});

gulp.task("copy", function() {
    gulp.src("app/css/*.css")
        .pipe(gulp.dest("dist/css/"));
    gulp.src("app/fonts/*")
        .pipe(gulp.dest("dist/fonts/"));
});

gulp.task("default", ["sass", "server", "watch"]);
gulp.task("minify", ["html"]);

gulp.task("build", function(cb) {
    runSequence("clean", "minify", "uglify", "copy", "images", cb);

});

gulp.task("build:server", ["build"], function() {
    browserSync.init({
        server: "dist/"
    });
});
