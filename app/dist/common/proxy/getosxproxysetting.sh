#!/bin/bash
# exit 1
services=$(networksetup -listnetworkserviceorder | grep 'Hardware Port')

while read line; do
    sname=$(echo $line | awk -F  "(, )|(: )|[)]" '{print $2}')
    sdev=$(echo $line | awk -F  "(, )|(: )|[)]" '{print $4}')
    if [ -n "$sdev" ]; then
        ifconfig $sdev 2>/dev/null | grep 'status: active' > /dev/null 2>&1
        rc="$?"
        if [ "$rc" -eq 0 ]; then
            # echo $sname
            proxy=$(networksetup -getwebproxy $sname)
            # # echo $proxy
            while read p; do
                echo $p
            done <<< "$(echo "$proxy")"
            sproxy=$(networksetup -getsecurewebproxy $sname)
            # # echo $proxy
            while read p; do
                echo $p
            done <<< "$(echo "$sproxy")"
            proxyurl=$(networksetup -getautoproxyurl $sname)
            while read p; do
                echo $p
            done <<< "$(echo "$proxyurl")"
            proxybypassdomains=$(networksetup -getproxybypassdomains $sname)
            echo $proxybypassdomains
            # while read p; do
            #     echo $p
            # done <<< "$(echo "$proxybypassdomains")"
            exit 0
        fi
    fi
done <<< "$(echo "$services")"

exit 1

# if [ -n $currentservice ]; then
#     echo $currentservice
# else
#     >&2 echo "Could not find current service"
#     exit 1
# fi