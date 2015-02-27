var gulp = require('gulp'),
    less = require('gulp-less'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    coffee = require('gulp-coffee'),
    livereload = require('gulp-livereload'),
    streamqueue = require('streamqueue'),
    concatCss = require('gulp-concat-css'),
    del = require('del')
    ;

gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts');
});

gulp.task('dev', ['clean'], function() {
    gulp.start('styles-lite', 'scripts-lite', 'watch');
});

gulp.task('watch', function() {
    gulp.watch('public-dev/**/*.js', ['scripts']);
    gulp.watch('public-dev/**/*.coffee', ['scripts']);
    gulp.watch('public-dev/**/*.less', ['styles']);
    gulp.watch('public-dev/**/*.css', ['styles']);
});

gulp.task('clean', function(cb) {
    del([
        //'public/scripts',
        //'public/styles'
    ], cb);
});

gulp.task('styles-lite', function() {
    return gulp.src([
        'bower_components/foundation/css/normalize.css',
        'bower_components/foundation/css/founation.css',
        'public-dev/**/*.less',
        'public-dev/**/*.css'
    ])
    .pipe(less())
    .pipe(concatCss('airfragger.css'))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('styles', ['styles-lite'], function() {
    return gulp.src([
        'public/stylesheets/airfragger.css'
    ])
    .pipe(minifycss())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('scripts-lite', function() {
    return streamqueue({ objectMode: true },
        gulp.src([
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/foundation/js/foundation.js',
            'bower_components/moment/moment.js',
            'bower_components/string/lib/string.js'
        ]),
        gulp.src(['public-dev/scripts/app.coffee', 'public-dev/**/*.coffee']).pipe(coffee()),
        gulp.src(['public-dev/**/*.js'])
    )
        .pipe(concat('airfragger.js'))
        .pipe(gulp.dest('public/scripts'));
});

gulp.task('scripts', ['scripts-lite'], function() {
    return streamqueue({ objectMode: true },
        gulp.src([
            'public/scripts/airfragger.js'
        ])
        )
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/scripts'));
});

