var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    cssnano = require("cssnano"),
    sourcemaps = require("gulp-sourcemaps"),
    uglify = require('gulp-uglify'),
    concat = require("gulp-concat"),
    imagemin = require("gulp-imagemin"),
    fileinclude = require('gulp-file-include'),
    babel = require('gulp-babel'),
    browserSync = require("browser-sync").create();

function style() {
return gulp
    .src("./src/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
      }))
    .on("error", sass.logError)
    .pipe(concat("index.css"))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./public"))
    .pipe(browserSync.stream());
}

function htmlInclude() {
    return gulp.src("./src/index.html")
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('./public/'))
      .pipe(browserSync.stream());
  }

function optimizeImg() {
    return gulp.src("./src/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("./public/images/"));
}

function uglifyJS () {
    return gulp.src("./src/**/*.js")
        .pipe(sourcemaps.init())
        .pipe(babel({
          presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(concat("script.js"))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./public/"));
}

function reload(done) {
browserSync.reload();
done();
}

function watch() {
browserSync.init({
    server: {
        baseDir: "./public"
    }
});
gulp.watch("./src/**/*.scss", style);
gulp.watch("./src/**/*.html", htmlInclude);
gulp.watch("./src/**/*.js", uglifyJS);
gulp.watch("./src/images/**/*", optimizeImg);
gulp.watch("./public/*.html", reload);
}
exports.watch = watch

var build = gulp.parallel(watch, style, htmlInclude, uglifyJS, optimizeImg);

gulp.task('default', build);