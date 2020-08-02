
export interface DownloadCtx {
    downloadUrl: string; // 下载路径
    extractedDir: string; // 解压的文件夹
    appHealthFilePath: string; // 解压的健康检查文件夹
    downloadFilePath: string; // 完整下载路径文件夹
    version: string; // 下载版本
    fileName: string; // 文件名带尾缀
  }

export interface NWJSDownloadCtx extends DownloadCtx{
    bit: 'x64' | 'ia32';
    baseName: string;
}
