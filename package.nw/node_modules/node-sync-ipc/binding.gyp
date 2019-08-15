{
  "targets": [
    {
      "target_name": "server",
      "sources": ["src/basic.h", "src/server.cpp" ],
      "include_dirs" : [
            "<!(node -e \"require('nan')\")"
        ]
    },
    {
      "target_name": "client",
      "sources": [ "src/basic.h","src/client.cpp" ],
      "include_dirs" : [
            "<!(node -e \"require('nan')\")"
        ]
    }
  ]
}