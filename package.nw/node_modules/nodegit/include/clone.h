// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCLONE_H
#define GITCLONE_H
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
#include "../include/clone_options.h"

using namespace node;
using namespace v8;


class GitClone : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

           

  private:
           
    struct CloneBaton {
      int error_code;
      const git_error* error;
      git_repository * out;
      const char * url;
      const char * local_path;
      const git_clone_options * options;
    };
    class CloneWorker : public Nan::AsyncWorker {
      public:
        CloneWorker(
            CloneBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CloneWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CloneBaton *baton;
    };

    static NAN_METHOD(Clone);

    static NAN_METHOD(InitOptions);
};

#endif
