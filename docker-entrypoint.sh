#! /bin/bash

# run ubuntu-desktop-lxde-vnc
bash /startup.sh > /var/log/ubuntu-desktop-lxde-vnc.log 2>&1 &
$HOME/wxdt/bin/wxdt
