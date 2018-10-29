# Wafer2 快速开发 Demo - PHP

本仓库是最简版的 Wafer2 开发套件，建议配合腾讯云微信小程序开发者工具解决方案一起使用。适用于想要使用 Wafer SDK 开发的开发者，Demo 对 SDK 进行了详细的使用和介绍，降低开发者的学习成本。

**登录接口切换公告：https://github.com/tencentyun/wafer2-quickstart/issues/10**

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

### 三、初始化 Demo

1. 打开第二步安装的微信开发者工具，点击【小程序项目】按钮。

2. 输入小程序 AppID，项目目录选择一个**空的目录**，接着选择【建立腾讯云 PHP 启动模板】，点击确定创建小程序项目。

   <img src="https://mc.qcloudimg.com/static/img/b8c2c265418a5d446b70b923ae97fcf2/php.png" width="413px">

3. 再次点击【确定】进入开发者工具。

  ![开发者工具](https://mc.qcloudimg.com/static/img/dddafb0f88489d0de7010321e6b48071/3.png)

4. 点击界面右上角的【腾讯云】图标，在下拉的菜单栏中选择【上传测试代码】。

  ![上传按钮](https://mc.qcloudimg.com/static/img/52c7ff501a13da3cb327df3f5d1ba284/2.png)

5. 选择【模块上传】并勾选全部选项，然后勾选【部署后自动安装依赖】，点击【确定】开始上传代码。

  ![选择模块](https://mc.qcloudimg.com/static/img/f2e00aecfc06e5b275f204f501b2b848/3.jpg)

  ![上传成功](https://mc.qcloudimg.com/static/img/8038e62426a6b74eb2ddbb3f04b7f093/4.jpg)

6. 上传代码完成之后，点击右上角的【详情】按钮，接着选择【腾讯云状态】即可看到腾讯云自动分配给你的开发环境域名：

  ![查看开发域名](https://mc.qcloudimg.com/static/img/04a97a0551d28a25aa066352e74e0443/8.png)

7. 完整复制（包括 `https://`）开发环境 request 域名，然后在编辑器中打开 `client/config.js` 文件，将复制的域名填入 `host` 中并保存，保存之后编辑器会自动编译小程序，左边的模拟器窗口即可实时显示出客户端的 Demo：

  ![修改客户端配置](https://mc.qcloudimg.com/static/img/397c68210ef2113721608dd2506f8f12/9.png)

8. 在模拟器中点击【登录】，看到显示“登录成功”，即为开通完成，可以开始你的其他开发了。

  ![登录测试](https://mc.qcloudimg.com/static/img/7102752e343d9d8791564b2ffc9d8308/10.png)
