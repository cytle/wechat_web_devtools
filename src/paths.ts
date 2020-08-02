import * as path from 'path';

export const rootDir = path.resolve(__dirname, '..');
export const downloadsDir = path.resolve(rootDir,'downloads');
export const appDir = path.resolve(rootDir,'app');
export const templatesDir = path.resolve(rootDir,'templates');
export const devToolsConfigDir=path.resolve(process.env.HOME, '.config','wechat_web_devtools');
