// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITIGNORE_H
#define GITIGNORE_H
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

#include "../include/repository.h"

using namespace node;
using namespace v8;


class GitIgnore : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

             

  private:
             
    static NAN_METHOD(AddRule);

    static NAN_METHOD(ClearInternalRules);

    struct PathIsIgnoredBaton {
      int error_code;
      const git_error* error;
      int * ignored;
      git_repository * repo;
      const char * path;
    };
    class PathIsIgnoredWorker : public Nan::AsyncWorker {
      public:
        PathIsIgnoredWorker(
            PathIsIgnoredBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~PathIsIgnoredWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        PathIsIgnoredBaton *baton;
    };

    static NAN_METHOD(PathIsIgnored);
};

#endif
