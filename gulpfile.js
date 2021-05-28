let gulp = require('gulp');
let ts = require('gulp-typescript');

gulp.task('default', defaultTask);

function defaultTask(done) {
    gulp.src('src/**/*.ts')
        .pipe(ts('tsconfig.json'))
        .pipe(gulp.dest('./dist'));

    copyNpmrc();
    copyPackage();
    copyConfigJson();
    copyScripts();
    copyJestConfigs();
    copyWebdrivers();
    done();
}

function copyNpmrc() {
    gulp.src('./.npmrc').pipe(gulp.dest('./dist'));
}

function copyPackage() {
    gulp.src('./package.json').pipe(gulp.dest('./dist'));
}

function copyJestConfigs() {
    gulp.src('./jest.*.ts').pipe(gulp.dest('./dist'));
}

function copyConfigJson() {
    gulp.src('src/config/*.json')
        .pipe(gulp.dest('./dist/config'));
}

function copyScripts() {
    gulp.src('scripts/*.js').pipe(gulp.dest('./dist/scripts'));
}

function copyWebdrivers() {
    gulp.src('webdrivers/*').pipe(gulp.dest('./dist/webdrivers'));
}
