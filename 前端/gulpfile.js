var gulp = require('gulp');
var webser = require('gulp-webserver');
var sass = require('gulp-sass');

gulp.task('sass', function() {
    return gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', gulp.series('sass'))
})

gulp.task('webser', function() {
    return gulp.src('./src')
        .pipe(webser({
            port: 8000,
            open: true,
            livereload: true,
            proxies: [{
                source: '/addPay',
                target: 'http://localhost:3000/classify/addPay'
            }, {
                source: '/iconlist',
                target: 'http://localhost:3000/iconlist'
            }, {
                source: '/addclassify',
                target: 'http://localhost:3000/classify/addclassify'
            }, {
                source: '/username',
                target: 'http://localhost:3000/username'
            }, {
                source: '/classify',
                target: 'http://localhost:3000/classify/classify'
            }]
        }))
})

gulp.task('dev', gulp.series('sass', 'webser', 'watch'))