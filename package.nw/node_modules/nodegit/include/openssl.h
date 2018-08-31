// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITOPENSSL_H
#define GITOPENSSL_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"

extern "C" {
#include <git2.h>
#include <git2/sys/openssl.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;


class GitOpenssl : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

   

  private:
   
    static NAN_METHOD(SetLocking);
};

#endif
