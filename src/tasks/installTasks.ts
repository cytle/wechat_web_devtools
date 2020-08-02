import { Listr } from 'listr2';
import * as fs from 'fs-extra';
import { appDir } from '../paths';
import { installWechatDevtoolsTasks } from './installWechatDevtoolsTasks';
import { installNwjsTasks } from './installNwjsTasks';
import { installDepsTasks } from './installDepsTasks';

interface InstallCtx {
    nwjsVersion: string;
    wechatDevtoolsVersion: string;
}
export const installTasks = new Listr<InstallCtx>([
    // {
    //     title: 'Remove app',
    //     task: async () => {
    //         fs.removeSync(appDir);
    //     },
    // },
    {
        title: 'Install Wechat Devtools',
        task: async (ctx) => {
            const {
                version,
            } = await installWechatDevtoolsTasks.run();
            ctx.wechatDevtoolsVersion = version;
        },
    },
    {
        title: 'Install NW.js',
        task: async (ctx) => {
            const { version } = await installNwjsTasks.run();
            ctx.nwjsVersion = version;
            await installDepsTasks.run();
        },
    },
], { concurrent: true});
