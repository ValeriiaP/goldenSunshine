var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var wiredep     = require('wiredep').stream;
var imagemin    = require('gulp-imagemin');
//

gulp.task('serve', ['wiredep', 'imagemin'], function() {

    browserSync.init({
        server: "./app",
        serveStatic: ['./app/back_end']
    });
    gulp.watch("app/*.css");
    gulp.watch("app/*theme.css");
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("static/img/*");
});


gulp.task('wiredep', function () {
    gulp.src('./app/index.html')
        .pipe(wiredep({
            directory: './app/components/'
        }))
        .pipe(gulp.dest('./app'));
});

gulp.task('wiredepHTML', function () {
    gulp.src('./app/html/photoGallery.html')
        .pipe(wiredep({
            directory: './app/components/'
        }))
        .pipe(gulp.dest('./app/html'));
});

gulp.task('imagemin', function () {
    gulp.src('./app/static/img/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('./app/static/img-min'))
});