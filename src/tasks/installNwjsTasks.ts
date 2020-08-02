import * as download from 'download';
import * as path from 'path';
import * as decompress from 'decompress';
import { Listr } from 'listr2';
import * as fs from 'fs-extra';
import { NWJSDownloadCtx } from '../types';
import { downloadsDir, appDir } from '../paths';

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
