// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITPROXY_H
#define GITPROXY_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/proxy_options.h"

using namespace node;
using namespace v8;


class GitProxy : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

     

  private:
     
    static NAN_METHOD(InitOptions);
};

#endif
