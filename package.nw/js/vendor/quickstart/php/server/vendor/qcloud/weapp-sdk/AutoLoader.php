<?php

// >= PHP 5.3.0
spl_autoload_register(function ($pClassName) {
    $NAMESPACE = 'QCloud_WeApp_SDK' . DIRECTORY_SEPARATOR;
    $pClassName = str_replace('\\', DIRECTORY_SEPARATOR, $pClassName);

    // Either already loaded, or not a `QCloud_WeApp_SDK` class request
    if (class_exists($pClassName, FALSE) || (strpos($pClassName, $NAMESPACE) !== 0)) {
        return FALSE;
    }

    $pClassName = str_replace($NAMESPACE, 'lib' . DIRECTORY_SEPARATOR, $pClassName);

    require(dirname(__FILE__) . DIRECTORY_SEPARATOR . $pClassName . '.php');
}, TRUE, TRUE);
