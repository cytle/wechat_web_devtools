import * as download from 'download';
import fetch from 'node-fetch';
import * as path from 'path';
import { Listr } from 'listr2';
import * as fs from 'fs-extra';
import * as execa from 'execa';
import { DownloadCtx } from '../types';
import { downloadsDir, appDir } from '../paths';

// // https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki&download_version=1032007151&version_type=1
// // https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki&download_version=1032006090&version_type=1
// // https://dldir1.qq.com/WechatWebDev/nightly/p-ae42ee2cde4d42ee80ac60b35f183a99/wechat_devtools_1.03.2006090_x64.exe
// // https://dldir1.qq.com/WechatWebDev/nightly/p-7aa88fbb60d64e4a96fac38999591e31/0.39.3/wechat_devtools_1.03.2007172_x64.exe
// // https://dldir1.qq.com/WechatWebDev/nightly/p-7aa88fbb60d64e4a96fac38999591e31/0.44.6/wechat_devtools_1.04.2007172_x64.exe

export const installWechatDevtoolsTasks = new Listr<DownloadCtx>([
    {
        title: 'Get final download url',
        task: async (ctx) => {
            const latestVersionUrl = 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki';
            const { url } = await fetch(ctx.downloadUrl || latestVersionUrl);
            ctx.downloadUrl = url;
        },
        skip: (ctx) => ctx.downloadUrl && !ctx.downloadUrl.includes('download_redirect'),
    },
    {
        title: 'Get version from url',
        task: (ctx) => {
        const res = /((wechat_devtools_([\d.]+)_x64)\.exe)$/.exec(ctx.downloadUrl);
        if (!res) {
            throw new Error(`Can't found version from ${ctx.downloadUrl}`);
        }
        const [p, fileName, baseName, version] = res;
        ctx.fileName = fileName;
        ctx.version = version;
        ctx.downloadFilePath = path.resolve(downloadsDir, ctx.fileName);
        ctx.extractedDir = path.resolve(downloadsDir, baseName);
        ctx.appHealthFilePath = path.resolve(appDir, `package-nw-${ctx.version}-health`);
        },
    },
    {
        title: 'Download Wechat Devtools',
        task: async (ctx) => {
            await download(ctx.downloadUrl, path.dirname(ctx.downloadFilePath), {
                filename: path.basename(ctx.downloadFilePath),
            });
        },
        skip: (ctx) => fs.pathExistsSync(ctx.appHealthFilePath) || fs.pathExistsSync(ctx.downloadFilePath),
    },

    {
        title: 'Decompress Wechat Devtools',
        task: async (ctx) => {
            const whiteList = [
                'code/package.nw'
            ];
            await execa('7z', ['x', ctx.downloadFilePath, `-o${ctx.extractedDir}`, '-y', ...whiteList]);
            const packageNWDir = path.resolve(appDir, 'package.nw');
            await fs.move(path.resolve(ctx.extractedDir, 'code', 'package.nw'), packageNWDir, { overwrite: true});
            await fs.remove(ctx.extractedDir);
            const packageJson =await fs.readJSON(path.resolve(packageNWDir, 'package.json'))
            packageJson.name = 'wechatwebdevtools';
            await fs.writeJSON(path.resolve(packageNWDir, 'package.json'), packageJson)
            await fs.ensureFile(ctx.appHealthFilePath);
        },
        skip: (ctx) => fs.pathExistsSync(ctx.appHealthFilePath),
    },
    ], { concurrent: false});
