<!--index.wxml-->
<view class="container">
    <!-- 请求按钮 -->
    <view class="list">
        <view class="list-item" bindtap="testCgi">
            <text>测试 CGI</text>
        </view>
        <view class="list-item">
            <text class="request-text">期望输出：{"code":0,"data":{"msg":"Hello World"}}</text>
        </view>
        <view class="list-item" wx:if="{{requestResult}}">
            <text class="request-text">{{'请求结果：' + requestResult}}</text>
        </view>
    </view>

    <!-- 添加CGI指引 -->
    <view class="guide">
        <text class="headline">快速添加CGI指引</text>
        <text class="p">1. 打开 server/routes/index.js 文件，添加如下语句：</text>
        <image class="image1" src="./code1.png" mode="aspectFit"></image>
        <button class="copyBtn" wx:if="{{canIUseClipboard}}" bindtap="copyCode" data-code-id="1">复制代码</button>
        <text class="p">2. 在 server/controllers 下新建一个 demo.js 文件，写入如下代码：</text>
        <image class="image2" src="./code2.png" mode="aspectFit"></image>
        <button class="copyBtn" wx:if="{{canIUseClipboard}}" bindtap="copyCode" data-code-id="2">复制代码</button>
        <text class="p">3. 点击开发者工具右上角“腾讯云” - “上传测试代码”，勾选“智能上传”</text>
        <text class="p">4. 点击测试 CGI 按钮，即可看到结果</text>
    </view>

</view>
