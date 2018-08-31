// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCHERRYPICK_H
#define GITCHERRYPICK_H
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
#include "../include/commit.h"
#include "../include/cherrypick_options.h"
#include "../include/index.h"
#include "../include/merge_options.h"

using namespace node;
using namespace v8;


class GitCherrypick : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                  

  private:
                  
    struct CherrypickBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      git_commit * commit;
      const git_cherrypick_options * cherrypick_options;
    };
    class CherrypickWorker : public Nan::AsyncWorker {
      public:
        CherrypickWorker(
            CherrypickBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CherrypickWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CherrypickBaton *baton;
    };

    static NAN_METHOD(Cherrypick);

    struct CommitBaton {
      int error_code;
      const git_error* error;
      git_index * out;
      git_repository * repo;
      git_commit * cherrypick_commit;
      git_commit * our_commit;
      unsigned int mainline;
      const git_merge_options * merge_options;
    };
    class CommitWorker : public Nan::AsyncWorker {
      public:
        CommitWorker(
            CommitBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CommitWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CommitBaton *baton;
    };

    static NAN_METHOD(Commit);

    static NAN_METHOD(InitOptions);
};

#endif
