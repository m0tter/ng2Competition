var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');

var tsProject = ts.createProject('./tsconfig.json');
var node;
var mongod;
var spawn = require('child_process').spawn;
var exec = require('child_process').exec;

gulp.task('clean.client', function(cb) {
    del.sync('dist/client');
    cb();
});

gulp.task('clean.server', function(cb) {
    del.sync(['dist/server', 'server.*']);
    cb();
});

gulp.task('clean.all', function(cb) {
    del.sync('dist');
    cb();
});

gulp.task('copy.nodemodules', function(cb) {
    gulp.src('node_modules/**/*')
        .pipe(gulp.dest('dist/node_modules'));
    cb();
});

gulp.task('copy.html', function() {
    gulp.src(['src/**/*.html', 'src/**/*.css'])
        .pipe(gulp.dest('dist'));
});

gulp.task('ts.compile', function() {
    var tsResult = tsProject.src()
        .pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist'));
});

gulp.task('mongod.start', function() {
    mongod = exec('mongod --dbpath ./data', function(err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    });
});

gulp.task('node.start', function() {
    if(node) node.kill();
    node = spawn('node', ['dist/server.js'], {stdio: 'inherit'});
    node.on('close', function(code) {
        if( code === 8 ) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('serve', ['mongod.start', 'ts.compile', 'node.start', 'copy.html'], function() {
    gulp.watch('**/*.ts', {cwd: 'src'}, ['ts.compile']);
    gulp.watch(['client/**/*.html', 'client/**/*.css'], {cwd: 'src'}, ['copy.html']);
    gulp.watch(['server.js', 'server/**/*.js'], {cwd: 'dist'}, ['node.start']);
});

gulp.task('watch', ['ts.compile', 'copy.html'], function(){
    gulp.watch('src/**/*.ts', ['ts.compile']);
    gulp.watch(['src/**/*.html', 'src/**/*.css'], ['copy.html']);
});

gulp.task('build.all', ['clean.all', 'copy.nodemodules', 'copy.html', 'ts.compile']);