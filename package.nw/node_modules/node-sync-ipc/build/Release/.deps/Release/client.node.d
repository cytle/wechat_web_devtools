cmd_Release/client.node := ln -f "Release/obj.target/client.node" "Release/client.node" 2>/dev/null || (rm -rf "Release/client.node" && cp -af "Release/obj.target/client.node" "Release/client.node")
