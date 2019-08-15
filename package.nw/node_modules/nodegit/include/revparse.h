// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREVPARSE_H
#define GITREVPARSE_H
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

#include "../include/object.h"
#include "../include/reference.h"
#include "../include/repository.h"

using namespace node;
using namespace v8;


class GitRevparse : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

            

  private:
            
    static NAN_METHOD(Ext);

    struct SingleBaton {
      int error_code;
      const git_error* error;
      git_object * out;
      git_repository * repo;
      const char * spec;
    };
    class SingleWorker : public Nan::AsyncWorker {
      public:
        SingleWorker(
            SingleBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SingleWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SingleBaton *baton;
    };

    static NAN_METHOD(Single);
};

#endif
