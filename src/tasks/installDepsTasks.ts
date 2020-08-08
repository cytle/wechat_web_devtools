import { Listr } from 'listr2';
import * as fs from 'fs-extra';
import * as path from 'path';
import { packageNwDir } from '../paths';

interface InstallDepsCtx {

}

export const installDepsTasks = new Listr<InstallDepsCtx>([
    {
        title: 'Read deps',
        task: async () => {
            const fileinfo = await fs.readJSON(path.resolve(packageNwDir, 'node_modules.fileinfo'));
            const set = new Set<string>();
            const reg = /^\/(@[^/]*\/[^/]*|[^@][^/]*)\//i;
            Object.keys(fileinfo).forEach((key) => {
                const res = reg.exec(key);
                if (res) {
                    set.add(res[1])
                    console.log('Match:', key, res[1]);
                } else {
                    console.log('Dont match:', key);
                }
            });
            console.log(set);
            debugger;
        },
    },
], { concurrent: true});
(async function () {
    try {
      const ctx = await installDepsTasks.run();
    //   await replaceWeappVendorTasks.run();
      console.log(ctx);
    } catch (e) {
      console.error(e)
    }
  })()

  // extract-file-icon native-keymap native-watchdog node-pty nodegit oniguruma spdlog trash vscode-oniguruma vscode-ripgrep vscode-windows-ca-certs vscode-windows-registry windows-process-tree
