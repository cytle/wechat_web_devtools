# 云开发小游戏 QuickStart

## 快速启动步骤

1. 点击工具栏左侧 “云开发” 按钮，根据提示在控制台中开通云服务
2. 根据提示创建第一个环境（注：初始可免费拥有两个环境，建议一个为测试环境，一个为正式环境，分别命名为 test 和 release）
3. 在控制台中切换到 “数据库” 管理页，创建第一个名为 “score” 的集合，用于存放分数
4. 在工具编辑器目录树中，右键目录 "cloudfunction" 选择 “更多设置”，在打开的窗口上方下拉选择刚创建的环境
5. 在编辑器 "cloudfunction" 目录下，右击目录 “login”，选择新建并上传该云函数，该云函数负责获取用户 openid
6. 在编辑器 "cloudfunction" 目录下，右击目录 “uploadScore”，选择新建并上传该云函数，该云函数负责记录用户分数到数据库
7. 体验小游戏！

## 云开发版 QuickStart 小游戏端与普通小游戏 QuickStart 差异一览

- `main.js`：增加了云能力初始化方法（约 11 行）、获取用户 openid（约 22 行）、获取历史最高分（约 41 行）、调用云函数上传结果（约 130 行）、调用渲染 GameOver 画面时多传入历史最高分（约 198 行）
- `gameinfo.js`：增加了渲染历史最高分（约 37 行）


## 小游戏源码目录介绍

```
./miniprogram/js
├── base                                   // 定义游戏开发基础类
│   ├── animatoin.js                       // 帧动画的简易实现
│   ├── pool.js                            // 对象池的简易实现
│   └── sprite.js                          // 游戏基本元素精灵类
├── libs
│   ├── symbol.js                          // ES6 Symbol简易兼容
│   └── weapp-adapter.js                   // 小游戏适配器
├── npc
│   └── enemy.js                           // 敌机类
├── player
│   ├── bullet.js                          // 子弹类
│   └── index.js                           // 玩家类
├── runtime
│   ├── background.js                      // 背景类
│   ├── gameinfo.js                        // 用于展示分数和结算界面
│   └── music.js                           // 全局音效管理器
├── databus.js                             // 管控游戏状态
└── main.js                                // 游戏入口主函数

```
