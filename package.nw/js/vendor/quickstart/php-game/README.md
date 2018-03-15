# Wafer2 快速开发 Demo - PHP

本仓库是最简版的 Wafer2 开发套件，建议配合腾讯云微信小程序（游戏）开发者工具解决方案一起使用。适用于想要使用 Wafer SDK 开发的开发者，Demo 对 SDK 进行了详细的使用和介绍，降低开发者的学习成本。

## 腾讯云一站式部署开通指引

只需要四步即可部署属于自己的小程序(游戏)**开发环境**。

### 一、通过微信公众平台授权登录腾讯云

打开[微信公众平台](https://mp.weixin.qq.com)注册并登录小程序(游戏)，按如下步骤操作：

注意：在跳转到腾讯云前，请先在微信开放平台选择小程序类目为“游戏”类型
1. 单击左侧菜单栏中的【设置】。
2. 单击右侧 Tab 栏中的【开发者工具】。
3. 单击【腾讯云】，进入腾讯云工具页面，单击【开通】。
4. 使用小程序（游戏）绑定的微信扫码即可将小程序（游戏）授权给腾讯云，开通之后会自动进去腾讯云微信小程序（游戏）控制台，显示开发环境已开通，此时可以进行后续操作。

> **注意：**
>
> 此时通过小程序（游戏）开发者工具查看腾讯云状态并不会显示已开通，已开通状态会在第一次部署开发环境之后才会同步到微信开发者工具上。

![进入微信公众平台后台](https://mc.qcloudimg.com/static/img/a3ca2891b23cfce7d3678cd05a4e14fe/13.jpg)

![开通腾讯云](https://mc.qcloudimg.com/static/img/53e34b52e098ee3a0a02ecc8fbb68a54/14.jpg)

![腾讯云微信小程序控制台](https://mc.qcloudimg.com/static/img/032d0b2b99dfcfdf4234db911e93b60f/15.png)

### 二、安装开发工具

下载并安装最新版本的[微信开发者工具](https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/download.html)，使用小程序绑定的微信号扫码登录开发者工具。

![微信开发者工具](https://mc.qcloudimg.com/static/img/4fd45bb5c74eed92b031fbebf8600bd2/1.png)

### 三、下载 Demo

你可以通过两个途径访问 Github 上 `wafer2-quickstart-php` 项目下载 Demo 代码：

1. 访问[仓库主页](https://github.com/tencentyun/wafer2-quickstart-php)，单机 `clone or download` 按钮，再单击 `Download ZIP` 下载打包好的 Demo 代码：

   ![下载代码](https://mc.qcloudimg.com/static/img/5b589d4ef12202175304e7c47a920235/11.png)

2. 通过 git clone 下载代码：

   ```bash
   git clone https://github.com/tencentyun/wafer2-quickstart-php.git
   ```

### 四、上传和部署代码

1. 打开第二步安装的微信开发者工具，点击【小程序项目】按钮。
2. 输入小程序(游戏) AppID，项目目录选择上一步下载下来的代码目录，点击确定创建小程序(游戏)项目。
3. 再次点击【确定】进入开发者工具。

  > **注意：** 
  >
  > 目录请选择 `quickstart` 根目录。包含有 `project.config.json`，请不要只选择 `client` 目录！

  ![上传代码](https://mc.qcloudimg.com/static/img/d5f3a4d68d4405b5a3a41f0e45bebc9c/2.png)

  ![开发者工具](https://mc.qcloudimg.com/static/img/dddafb0f88489d0de7010321e6b48071/3.png)

4. 打开 Demo 代码中 `server` 目录下的 `config.php` 文件，将其中的 `mysql` 配置项的密码 `pass` 改成你的微信小程序(游戏) AppID，并**保存**。

  ![修改 MySQL 密码](https://mc.qcloudimg.com/static/img/64ec8f25eec2e9ac74838960a25cbb82/musql_passwd.png)

5. 点击界面右上角的【腾讯云】图标，在下拉的菜单栏中选择【上传测试代码】。

  ![上传按钮](https://mc.qcloudimg.com/static/img/52c7ff501a13da3cb327df3f5d1ba284/2.png)

6. 选择【模块上传】并勾选全部选项，然后勾选【部署后自动安装依赖】，点击【确定】开始上传代码。

  ![选择模块](https://mc.qcloudimg.com/static/img/f2e00aecfc06e5b275f204f501b2b848/3.jpg)

  ![上传成功](https://mc.qcloudimg.com/static/img/8038e62426a6b74eb2ddbb3f04b7f093/4.jpg)

7. 上传代码完成之后，点击右上角的【详情】按钮，接着选择【腾讯云状态】即可看到腾讯云自动分配给你的开发环境域名：

  ![查看开发域名](https://mc.qcloudimg.com/static/img/04a97a0551d28a25aa066352e74e0443/8.png)

8. 完整复制（包括 `https://`）开发环境 request 域名，然后在编辑器中打开 `client/config.js` 文件，将复制的域名填入 `host` 中并保存，保存之后编辑器会自动编译小程序(游戏)，左边的模拟器窗口即可实时显示出客户端的 Demo：
    (注意，如果在真机上调试，请将域名手动写入到微信开放平台对应app的地址配置中，否则需要在客户端开启debug模式才能正常体验)

  ![修改客户端配置](https://mc.qcloudimg.com/static/img/ea2fbd580634be4b514f3afe13113c66/config_url.png)

9. 在模拟器中试玩，看到显示“登录成功”，说明环境ok了，可以开始你的其他开发了。
