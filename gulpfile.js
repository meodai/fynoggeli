'use strict';

const gulp = require('gulp'),
      // css
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano'),

      // images
      imagemin = require('gulp-imagemin'),

      // system
      del = require('del');

gulp.task('clean', () => {
  return del('./build/');
});

gulp.task('css', ['clean'], () => {
  const plugins = [
    autoprefixer({browsers: ['last 2 versions']}),
    cssnano()
  ];
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss())
    .pipe(gulp.dest('./build/css'));
});

gulp.task('css:watch', () => {
  gulp.watch('./src/**/*.scss', ['css']);
});

gulp.task('images', ['clean'], () => {
  return gulp.src('./data/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'))
})

gulp.task('default', ['clean', 'css', 'images']);
