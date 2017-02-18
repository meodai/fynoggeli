'use strict';

const gulp = require('gulp'),
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),
      del = require('del');

gulp.task('clean', function () {
  return del(paths.build);
});

gulp.task('css', function () {
  const plugins = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('css:watch', function () {
  gulp.watch('./src/**/*.scss', ['css']);
});
