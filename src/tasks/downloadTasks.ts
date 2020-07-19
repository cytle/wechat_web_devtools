import * as download from 'download';
import fetch from 'node-fetch';
import * as path from 'path';
import { Listr } from 'listr2';
import * as fs from 'fs-extra';

interface DownloadCtx {
  downloadUrl: string;
  downloadsDir: string;
  version: string;
  fileName: string;
  fullFileName: string;
  fullFilePath: string;
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
    const downloadsDir = path.resolve(__dirname, 'downloads');
    ctx.fullFileName = fullFileName;
    ctx.fileName = fileName;
    ctx.version = version;
    ctx.downloadsDir = downloadsDir;
    },
},
{
    title: 'Download Wechat Devtools',
    task: async (ctx) => {
    await download(ctx.downloadUrl, ctx.downloadsDir, {
        filename: ctx.fullFileName,
    });
    },
    skip: (ctx) => fs.pathExistsSync(path.join(ctx.downloadsDir, ctx.fullFileName)),
},
]);
