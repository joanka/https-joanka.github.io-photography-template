var gulp = require("gulp"),
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    browserSync = require("browser-sync").create(),
    runSequence = require("run-sequence"),
    htmlmin = require("gulp-htmlmin"),
    imagemin = require("gulp-imagemin"),
    uglify = require("gulp-uglify"),
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
    del("dist/");
});

gulp.task("html", function() {
  return gulp.src("app/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("dist"));
});

// gulp.task("js", function() {
//         gulp.src("app/js/main.js")
//         .pipe(uglify())
//         .pipe(gulp.dest("dist/js"));
// });

gulp.task("images", function() {

    return gulp.src("app/images/**/*", {
            base: "app"
        })
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images/"));

});

gulp.task("copy", function() {
    gulp.src("app/css/*.css")
        .pipe(gulp.dest("dist/css/"));
    gulp.src("app/js/main.js")
        .pipe(gulp.dest("dist/js/"));
    gulp.src("app/fonts/*")
        .pipe(gulp.dest("dist/fonts/"));
});

gulp.task("default", ["sass", "server", "watch"]);
gulp.task("minify", ["html"]);

gulp.task("build", function() {
    runSequence("clean", "minify", "copy", "images");

});

gulp.task("build:server", ["build"], function() {
    browserSync.init({
        server: "dist/"
    });
});
