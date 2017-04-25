import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as runSequence from 'run-sequence';

import Config from './tools/config';
import { loadTasks, loadCompositeTasks } from './tools/utils';
var symdest = require('gulp-symdest');
var electron = require('gulp-atom-electron');
var zip = require('gulp-vinyl-zip');

loadTasks(Config.SEED_TASKS_DIR);
loadTasks(Config.PROJECT_TASKS_DIR);

loadCompositeTasks(Config.SEED_COMPOSITE_TASKS, Config.PROJECT_COMPOSITE_TASKS);


// --------------
// Clean dev/coverage that will only run once
// this prevents karma watchers from being broken when directories are deleted
let firstRun = true;
gulp.task('clean.once', (done: any) => {
  if (firstRun) {
    firstRun = false;
    runSequence('check.tools', 'clean.dev', 'clean.coverage', done);
  } else {
    util.log('Skipping clean on rebuild');
    done();
  }
});

gulp.task('electron.windows', () => {
	let src = [
    'dist/electron/**/*'
  ];
  return gulp.src(src, { base: 'dist/electron' })
    .pipe(electron({ version: '0.37.2', platform: 'win32', winIcon: 'src/client/assets/favicon/favicon-DEV.ico' }))
    .pipe(zip.dest('desktop/hms-windows.zip'));
});

gulp.task('electron.linux', () => {
	let src = [
    'dist/electron/**/*'
  ];
  return gulp.src(src, { base: 'dist/electron' })
    .pipe(electron({ version: '0.37.2', platform: 'linux', linuxExecutableName: 'hms-app' }))
    .pipe(zip.dest('desktop/hms-linux.zip'));
});

gulp.task('electron.mac', () => {
	let src = [
    'dist/electron/**/*'
  ];
  return gulp.src(src, { base: 'dist/electron' })
    .pipe(electron({ version: '0.37.2', platform: 'darwin', darwinIcon: 'src/client/assets/favicon/favicon-DEV.ico' }))
    .pipe(zip.dest('desktop/hms-mac.zip'));
});

