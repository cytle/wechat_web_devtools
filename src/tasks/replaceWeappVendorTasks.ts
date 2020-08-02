import * as path from 'path';
import { Listr } from 'listr2';
import * as fs from 'fs-extra';
import * as execa from 'execa';
import * as chokidar from 'chokidar';
import { appDir, templatesDir, devToolsConfigDir } from '../paths';


const weappVendorDir=path.join(devToolsConfigDir,'WeappVendor');

export const replaceWeappVendorTasks = new Listr([
    {
        title: 'Init Wechat Devtools config',
        task: async () => {
            return new Promise((resolve) => {
                const nwProcess = execa(path.join(appDir, 'nw'));
                const watcher = chokidar.watch(weappVendorDir);
                watcher.on('addDir', (p) => {
                    console.log(`Directory ${p} has been added`);
                    nwProcess.kill('SIGTERM', {
                        forceKillAfterTimeout: 2000
                    });
                    resolve();
                });
            })
        },
        skip: () => fs.pathExistsSync(weappVendorDir),
    },
    {
        title: 'Replace Weapp Vendor',
        task: async () => {
            const originWeappVendorDir = path.resolve(weappVendorDir, 's')
            const vendorDir= path.resolve(appDir, 'package.nw', 'js', 'vendor');
            fs.ensureDirSync(originWeappVendorDir);
            fs.copyFileSync(path.resolve(vendorDir, 'wcc.exe'), originWeappVendorDir);
            fs.copyFileSync(path.resolve(vendorDir, 'wcsc.exe'), originWeappVendorDir);
            fs.copySync(path.resolve(templatesDir, 'WeappVendor', '*'), weappVendorDir);
        },
    },
], { concurrent: false });
