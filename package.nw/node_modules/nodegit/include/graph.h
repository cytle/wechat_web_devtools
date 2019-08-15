// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITGRAPH_H
#define GITGRAPH_H
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
#include "../include/oid.h"

using namespace node;
using namespace v8;


class GitGraph : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

             

  private:
             
    struct AheadBehindBaton {
      int error_code;
      const git_error* error;
      size_t * ahead;
      size_t * behind;
      git_repository * repo;
      const git_oid * local;
      bool localNeedsFree;
      const git_oid * upstream;
      bool upstreamNeedsFree;
    };
    class AheadBehindWorker : public Nan::AsyncWorker {
      public:
        AheadBehindWorker(
            AheadBehindBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AheadBehindWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AheadBehindBaton *baton;
    };

    static NAN_METHOD(AheadBehind);

    struct DescendantOfBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      const git_oid * commit;
      bool commitNeedsFree;
      const git_oid * ancestor;
      bool ancestorNeedsFree;
    };
    class DescendantOfWorker : public Nan::AsyncWorker {
      public:
        DescendantOfWorker(
            DescendantOfBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~DescendantOfWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        DescendantOfBaton *baton;
    };

    static NAN_METHOD(DescendantOf);
};

#endif
