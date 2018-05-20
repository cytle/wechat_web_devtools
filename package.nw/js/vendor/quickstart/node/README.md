# Wafer2 快速开发 Demo

本仓库是最简版的 Wafer2 开发套件，建议配合腾讯云微信小程序开发者工具解决方案一起使用。适用于想要使用 Wafer SDK 开发的开发者，Demo 对 SDK 进行了详细的使用和介绍，降低开发者的学习成本。

## 目录

- [腾讯云一站式部署开通指引](#腾讯云一站式部署开通指引)
  - [一、通过微信公众平台授权登录腾讯云](#一通过微信公众平台授权登录腾讯云)
  - [二、安装开发工具](#二安装开发工具)
  - [三、导入 DEMO 和配置](#三导入-demo-和配置)
  - [四、上传和部署代码](#四上传和部署代码)
- [文档](#文档)

## 腾讯云一站式部署开通指引

只需要四步即可部署属于自己的小程序**开发环境**。

### 一、通过微信公众平台授权登录腾讯云

打开[微信公众平台](https://mp.weixin.qq.com)注册并登录小程序，按如下步骤操作：

1. 单击左侧菜单栏中的【设置】。
2. 单击右侧 Tab 栏中的【开发者工具】。
3. 单击【腾讯云】，进入腾讯云工具页面，单击【开通】。
4. 使用小程序绑定的微信扫码即可将小程序授权给腾讯云，开通之后会自动进去腾讯云微信小程序控制台，显示开发环境已开通，此时可以进行后续操作。

> **注意：**
>
> 此时通过小程序开发者工具查看腾讯云状态并不会显示已开通，已开通状态会在第一次部署开发环境之后才会同步到微信开发者工具上。

![进入微信公众平台后台](https://mc.qcloudimg.com/static/img/a3ca2891b23cfce7d3678cd05a4e14fe/13.jpg)

![开通腾讯云](https://mc.qcloudimg.com/static/img/53e34b52e098ee3a0a02ecc8fbb68a54/14.jpg)

![腾讯云微信小程序控制台](https://mc.qcloudimg.com/static/img/032d0b2b99dfcfdf4234db911e93b60f/15.png)

### 二、安装开发工具

下载并安装最新版本的[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，使用小程序绑定的微信号扫码登录开发者工具。

![微信开发者工具](https://mc.qcloudimg.com/static/img/4fd45bb5c74eed92b031fbebf8600bd2/1.png)

### 三、初始化 Demo 并上传

1. 打开第二步安装的微信开发者工具，点击【小程序项目】按钮。

2. 输入小程序 AppID，项目目录选择一个**空的目录**，接着选择【建立腾讯云 Node.js 启动模板】，点击确定创建小程序项目。

   <img src="https://mc.qcloudimg.com/static/img/b5e57e41bab97b6b01f4de03ccfc8acc/image.png" width="413px">

3. 安装依赖

   > 为方便本地调试，建议您在本地安装依赖。你也可以跳过这步直接使用开发者工具的“腾讯云”菜单中的“安装依赖”直接在线上安装依赖。

   在您刚刚选择的目录打开 CMD 安装依赖：

   ```bash
   cd server && npm install
   ```

   ![安装依赖](https://mc.qcloudimg.com/static/img/f39248e665fd0915e041da67e5970b7f/12.png)

4. 点击界面右上角的【腾讯云】图标，在下拉的菜单栏中选择【上传测试代码】。

   ![上传按钮](https://mc.qcloudimg.com/static/img/8480bbc02b097bac0d511c334b731e12/5.png)

5. 选择【模块上传】并勾选全部选项，然后勾选【部署后自动安装依赖】，点击【确定】开始上传代码。

   ![选择模块](https://user-images.githubusercontent.com/3380894/30306412-8df08f4e-97aa-11e7-9a5b-7ab82c58c63d.png)

   ![上传成功](https://mc.qcloudimg.com/static/img/a78431b42d0edf0bddae0b85ef00d40f/7.png)

6. 上传代码完成之后，点击右上角的【详情】按钮，接着选择【腾讯云状态】即可看到腾讯云自动分配给你的开发环境域名：

   ![查看开发域名](https://mc.qcloudimg.com/static/img/04a97a0551d28a25aa066352e74e0443/8.png)

7. 完整复制（包括 `https://`）开发环境 request 域名，然后在编辑器中打开 `client/config.js` 文件，将复制的域名填入 `host` 中并保存，保存之后编辑器会自动编译小程序，左边的模拟器窗口即可实时显示出客户端的 Demo：

   ![修改客户端配置](https://mc.qcloudimg.com/static/img/397c68210ef2113721608dd2506f8f12/9.png)

8. 在模拟器中点击【登录】，看到显示“登录成功”，即为开通完成，可以开始你的其他开发了。

   ![登录测试](https://mc.qcloudimg.com/static/img/7102752e343d9d8791564b2ffc9d8308/10.png)

## 文档

我们还提供了服务端、客户端的 Demo、SDK 的具体文档：

- [Wiki 首页](https://github.com/tencentyun/wafer2-startup/wiki)
- [开发环境和生产环境](https://github.com/tencentyun/wafer2-startup/wiki/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83%E5%92%8C%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83)
- [自行部署](https://github.com/tencentyun/wafer2-startup/wiki/%E8%87%AA%E8%A1%8C%E9%83%A8%E7%BD%B2)
- [一站式部署](https://github.com/tencentyun/wafer2-startup/blob/master/README.md)
- [常见问题](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98)
  - [如何部署代码到开发环境](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2%E4%BB%A3%E7%A0%81%E5%88%B0%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)
  - [如何重启服务器](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E9%87%8D%E5%90%AF%E6%9C%8D%E5%8A%A1%E5%99%A8)
  - [如何恢复初始化环境](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E6%81%A2%E5%A4%8D%E5%88%9D%E5%A7%8B%E5%8C%96%E7%8E%AF%E5%A2%83)
  - [如何远程调试后台代码](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E8%BF%9C%E7%A8%8B%E8%B0%83%E8%AF%95%E5%90%8E%E5%8F%B0%E4%BB%A3%E7%A0%81)
  - [如何查看后台日志](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E6%9F%A5%E7%9C%8B%E5%90%8E%E5%8F%B0%E6%97%A5%E5%BF%97)
  - [如何修改数据库密码](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE%E5%BA%93%E5%AF%86%E7%A0%81)
  - [如何新建和修改数据库的库表](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E6%96%B0%E5%BB%BA%E5%92%8C%E4%BF%AE%E6%94%B9%E6%95%B0%E6%8D%AE%E5%BA%93%E7%9A%84%E5%BA%93%E8%A1%A8)
  - [如何上传图片](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E4%B8%8A%E4%BC%A0%E5%9B%BE%E7%89%87)
  - [如何部署 Demo 到自己的服务器](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E9%83%A8%E7%BD%B2-demo-%E5%88%B0%E8%87%AA%E5%B7%B1%E7%9A%84%E6%9C%8D%E5%8A%A1%E5%99%A8)
  - [如何快速新建路由](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E5%BF%AB%E9%80%9F%E6%96%B0%E5%BB%BA%E8%B7%AF%E7%94%B1)
  - [微信后台如何配置客服消息推送接口](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%BE%AE%E4%BF%A1%E5%90%8E%E5%8F%B0%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E5%AE%A2%E6%9C%8D%E6%B6%88%E6%81%AF%E6%8E%A8%E9%80%81%E6%8E%A5%E5%8F%A3)
  - [如何使用服务端 SDK 连接和操作数据库](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E7%AB%AF-sdk-%E8%BF%9E%E6%8E%A5%E5%92%8C%E6%93%8D%E4%BD%9C%E6%95%B0%E6%8D%AE%E5%BA%93)
  - [本地如何搭建开发环境](https://github.com/tencentyun/wafer2-startup/wiki/%E5%B8%B8%E8%A7%81%E9%97%AE%E9%A2%98#%E6%9C%AC%E5%9C%B0%E5%A6%82%E4%BD%95%E6%90%AD%E5%BB%BA%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83)
- [Wafer2 服务端 Demo 文档](./server/README.md)
- [Wafer2 服务端 Demo 工具文档](./server/tools.md)
- [Wafer2 客户端 Demo 文档](./client/README.md)
- [Wafer2 服务端 SDK 使用文档](https://github.com/tencentyun/wafer2-node-sdk/blob/master/README.md)
- [Wafer2 服务端 SDK API 文档](https://github.com/tencentyun/wafer2-node-sdk/blob/master/API.md)
- [Wafer2 客户端 SDK 使用文档](https://github.com/tencentyun/wafer2-client-sdk/blob/master/README.md)

