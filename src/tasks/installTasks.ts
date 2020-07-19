import * as download from 'download';
import fetch from 'node-fetch';
import * as path from 'path';
import * as decompress from 'decompress';
import * as ora from 'ora';
import { Listr } from 'listr2';
import * as fs from 'fs-extra';
import * as execa from 'execa';

// // https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki&download_version=1032007151&version_type=1
// // https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki&download_version=1032006090&version_type=1
// // https://dldir1.qq.com/WechatWebDev/nightly/p-ae42ee2cde4d42ee80ac60b35f183a99/wechat_devtools_1.03.2006090_x64.exe
// // https://dldir1.qq.com/WechatWebDev/nightly/p-7aa88fbb60d64e4a96fac38999591e31/0.39.3/wechat_devtools_1.03.2007172_x64.exe
// // https://dldir1.qq.com/WechatWebDev/nightly/p-7aa88fbb60d64e4a96fac38999591e31/0.44.6/wechat_devtools_1.04.2007172_x64.exe

// const downloadLatest = (version: string, dist: string) => {
//   download('https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki')
// }
// å

interface DownloadCtx {
  downloadUrl: string; // 下载路径
  extractedDir: string; // 解压的文件夹
  appHealthFilePath: string; // 解压的健康检查文件夹
  downloadFilePath: string; // 完整下载路径文件夹
  version: string; // 下载版本
  fileName: string; // 文件名带尾缀
}

const downloadsDir = path.resolve(__dirname, '..','downloads');
const appDir = path.resolve(__dirname, '..','app');

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
            await fs.move(path.resolve(ctx.extractedDir, 'code', 'package.nw'), path.resolve(appDir, 'package.nw'), { overwrite: true});
            await fs.remove(ctx.extractedDir);
            await fs.ensureFile(ctx.appHealthFilePath);
        },
        skip: (ctx) => fs.pathExistsSync(ctx.appHealthFilePath),
    },
    ], { concurrent: false});

interface NWJSDownloadCtx extends DownloadCtx{
    bit: 'x64' | 'ia32';
    baseName: string;
}
export const installNwjsTasks = new Listr<NWJSDownloadCtx>([
    {
        title: 'Get url',
        task: async (ctx) => {
            // if (!ctx.version) {
            //     throw new Error('NW.js version is undefined');
            // }
            ctx.version = ctx.version || '0.39.3';
            ctx.bit = ctx.bit || 'x64';
            const mirrorsUri = 'https://npm.taobao.org/mirrors';
            const baseName = `nwjs-sdk-v${ctx.version}-linux-${ctx.bit}`;
            ctx.baseName = baseName;
            ctx.fileName = `${baseName}.tar.gz`;
            ctx.downloadUrl = `${mirrorsUri}/nwjs/v${ctx.version}/${ctx.fileName}`
            ctx.downloadFilePath = path.resolve(downloadsDir, ctx.fileName);
            ctx.extractedDir = path.resolve(downloadsDir, baseName);
            ctx.appHealthFilePath = path.resolve(appDir, `nwjs-${ctx.version}-health`);
        },
    },
    {
        title: 'Download NW.js',
        task: async (ctx) => {
            await download(ctx.downloadUrl, path.dirname(ctx.downloadFilePath), {
                filename: path.basename(ctx.downloadFilePath),
            });
        },
        skip: (ctx) => fs.pathExistsSync(ctx.appHealthFilePath) || fs.pathExistsSync(ctx.downloadFilePath),
    },

    {
        title: 'Decompress NW.js',
        task: async (ctx) => {
            await decompress(ctx.downloadFilePath, ctx.extractedDir, {filter: (file) => {
                return !file.path.includes(
                    '/locales/'
                ) || file.path.includes(
                    'zh-CN'
                ) || file.path.includes(
                    'en-US'
                );
            }});
            const sdir = path.resolve(ctx.extractedDir, ctx.baseName);
            const files = await fs.readdir(sdir);
            await Promise.all(files.map((name) => fs.move(path.join(sdir, name), path.join(appDir, name), { overwrite: true })));
            await fs.remove(ctx.extractedDir);
            await fs.ensureFile(ctx.appHealthFilePath);
        },
        skip: (ctx) => fs.pathExistsSync(ctx.appHealthFilePath),
    },
], { concurrent: false});
interface InstallCtx {
    nwjsVersion: string;
    wechatDevtoolsVersion: string;
}
export const installTasks = new Listr<InstallCtx>([
    {
        title: 'Remove app',
        task: async () => {
            fs.removeSync(appDir);
        },
    },
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
        },
    },
], { concurrent: true});
