const gulp = require('gulp'),
  browserSync = require('browser-sync').create(),
  gutil = require('gulp-util'),
  stylus = require('gulp-stylus'),
  named = require('vinyl-named'),
  concat = require('gulp-concat'),
  sourcemaps = require('gulp-sourcemaps'),
  webpack = require('webpack-stream'),
  reload = browserSync.reload;

gulp.task('es6-react', function () {
  gulp.src('build/index.jsx')
    .pipe(named())
    .pipe(webpack(require('./webpack.config.js')))
    .on('error', gutil.log)
    .pipe(gulp.dest('dist/js'))
    .pipe(reload({stream:true}))
});

gulp.task('html', function () {
  gulp.src('build/index.html')
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream:true}));
});

gulp.task('styl', function() {
  gulp.src("build/style/common.styl")
    .pipe(sourcemaps.init())
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(sourcemaps.write('.'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    open: false
  });
});

gulp.task('watch', function () {
  gulp.watch('build/index.html', ['html']);
  gulp.watch(['build/**/*.**'], ['es6-react']);
  gulp.watch('build/style/common.styl', ['styl']);
});

gulp.task('default', [
  'html',
  'styl',
  'es6-react',
  'browser-sync',
  'watch'
]);
