'use strict';

const gulp = require('gulp'),
      // markup
      pug = require('gulp-pug'),

      // content
      data = require('gulp-data'),
      imagemin = require('gulp-imagemin'),
      md = require('jstransformer')(require('jstransformer-markdown-it')),

      // system
      del = require('del'),
      tap = require('gulp-tap'),

      // design
      sass = require('gulp-sass'),
      postcss = require('gulp-postcss'),
      autoprefixer = require('autoprefixer'),
      cssnano = require('cssnano');


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

gulp.task('html', ['clean'], () => {
  return gulp.src('./src/index.pug')
    .pipe( data({
      foo: 'bar'
    }) )
    .pipe( pug() )
    .pipe( gulp.dest('./build/') );
});

gulp.task('css:watch', () => {
  gulp.watch('./src/**/*.scss', ['css']);
});

gulp.task('images', ['clean'], () => {
  return gulp.src('./data/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./build/images/'))
});


gulp.task('default', ['clean', 'css', 'html', 'images']);
