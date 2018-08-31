// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITGITERR_H
#define GITGITERR_H
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

#include "../include/error.h"

using namespace node;
using namespace v8;


class GitGiterr : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

           

  private:
           
    static NAN_METHOD(GiterrClear);

    static NAN_METHOD(GiterrLast);

    static NAN_METHOD(GiterrSetOom);

    static NAN_METHOD(GiterrSetStr);
};

#endif
