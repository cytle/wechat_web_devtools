import * as download from 'download';
import fetch from 'node-fetch';
import * as path from 'path';
import * as decompress from 'decompress';
import * as ora from 'ora';
import { Listr } from 'listr2';
import * as fs from 'fs-extra';
import * as extract from 'extract-zip';

// // https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki&download_version=1032007151&version_type=1
// // https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki&download_version=1032006090&version_type=1
// // https://dldir1.qq.com/WechatWebDev/nightly/p-ae42ee2cde4d42ee80ac60b35f183a99/wechat_devtools_1.03.2006090_x64.exe
// // https://dldir1.qq.com/WechatWebDev/nightly/p-7aa88fbb60d64e4a96fac38999591e31/0.39.3/wechat_devtools_1.03.2007172_x64.exe
// // https://dldir1.qq.com/WechatWebDev/nightly/p-7aa88fbb60d64e4a96fac38999591e31/0.44.6/wechat_devtools_1.04.2007172_x64.exe

// const downloadLatest = (version: string, dist: string) => {
//   download('https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki')
// }
// å
const latestVersionUrl = 'https://servicewechat.com/wxa-dev-logic/download_redirect?type=x64&from=mpwiki';


interface DownloadCtx {
  downloadUrl: string;
  downloadsDir: string;
  extractedDir: string;
  extractedHealthFilePath: string;
  downloadfilePath: string;
  version: string;
  fileName: string;
  fullFileName: string;
}

export const downloadWechatDevtoolsTasks = new Listr<DownloadCtx>([
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
        const [p, fullFileName, fileName, version] = res;
        ctx.fullFileName = fullFileName;
        ctx.fileName = fileName;
        ctx.version = version;
        ctx.downloadsDir = path.resolve(__dirname, '..','downloads');
        ctx.downloadfilePath = path.resolve(ctx.downloadsDir, ctx.fullFileName);
        ctx.extractedDir = path.resolve(ctx.downloadsDir, ctx.fileName);
        ctx.extractedHealthFilePath = path.resolve(ctx.extractedDir, 'health');
        },
    },
    {
        title: 'Download Wechat Devtools',
        task: async (ctx) => {
        await download(ctx.downloadUrl, ctx.downloadsDir, {
            filename: ctx.fullFileName,
        });
        },
        skip: (ctx) => fs.pathExistsSync(ctx.extractedHealthFilePath) || fs.pathExistsSync(ctx.downloadfilePath),
    },

    {
        title: 'Decompress Wechat Devtools',
        task: async (ctx) => {
            await extract(ctx.downloadfilePath, { dir: ctx.extractedDir });
            await fs.ensureFile(ctx.extractedHealthFilePath);
        },
        skip: (ctx) => fs.pathExistsSync(ctx.extractedHealthFilePath),
    },
    ]);

interface InstallCtx {
    version: string;
}
const installWechatDevtoolsTasks = new Listr<InstallCtx>([
    {
        title: 'Download Wechat Devtools',
        task: async (ctx) => {
            const {
                version,
            } = await downloadWechatDevtoolsTasks.run();
            ctx.version = version;
        },
    },
]);

(async function () {
  try {
    const ctx = await installWechatDevtoolsTasks.run()
    console.log(ctx);
  } catch (e) {
    console.error(e)
  }
})()
