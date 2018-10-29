<?php
defined('BASEPATH') OR exit('No direct script access allowed');
?><!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>腾讯云微信小程序服务器 Demo - PHP</title>
    <style type="text/css">

    ::selection { background-color: #E13300; color: white; }
    ::-moz-selection { background-color: #E13300; color: white; }

    body {
        background-color: #fff;
        margin: 40px;
        font: 13px/20px normal Helvetica, Arial, sans-serif;
        color: #4F5155;
    }

    a {
        color: #003399;
        background-color: transparent;
        font-weight: normal;
        text-decoration: none;
    }

    h1 {
        color: #444;
        background-color: transparent;
        border-bottom: 1px solid #D0D0D0;
        font-size: 19px;
        font-weight: normal;
        margin: 0 0 14px 0;
        padding: 14px 0;
    }

    p.footer {
    	text-align: right;
    	font-size: 11px;
    	border-top: 1px solid #D0D0D0;
    	line-height: 32px;
    	padding: 0 10px 0 10px;
    	margin: 20px 0 0 0;
    }

    #container {
        margin: 10px;
        padding: 10px 20px;
        border: 1px solid #D0D0D0;
        box-shadow: 0 0 8px #D0D0D0;
    }
    </style>
</head>
<body>
    <div id="container">
        <h1>腾讯云微信小程序服务端 Demo - PHP</h1>
        <p>会话管理服务</p>
        <ul>
            <li><a href="/login">登录服务</a></li>
            <li><a href="/user">检查登录</a></li>
        </ul>
        <p>信道服务</p>
        <ul>
            <li><a href="/tunnel">获得信道地址</a></li>
        </ul>

        <p class="footer">Page rendered in <strong>{elapsed_time}</strong> seconds. <?php echo  (ENVIRONMENT === 'development') ?  'CodeIgniter Version <strong>' . CI_VERSION . '</strong>' : '' ?></p>
    </div>
</body>
</html>