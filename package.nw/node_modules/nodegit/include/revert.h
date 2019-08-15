// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREVERT_H
#define GITREVERT_H
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
#include "../include/revert_options.h"
#include "../include/index.h"
#include "../include/merge_options.h"

using namespace node;
using namespace v8;


class GitRevert : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

              

  private:
              
    struct RevertBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      git_commit * commit;
      const git_revert_options * given_opts;
    };
    class RevertWorker : public Nan::AsyncWorker {
      public:
        RevertWorker(
            RevertBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~RevertWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        RevertBaton *baton;
    };

    static NAN_METHOD(Revert);

    struct CommitBaton {
      int error_code;
      const git_error* error;
      git_index * out;
      git_repository * repo;
      git_commit * revert_commit;
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
};

#endif
