// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREBASE_H
#define GITREBASE_H
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

#include "../include/oid.h"
#include "../include/signature.h"
#include "../include/repository.h"
#include "../include/annotated_commit.h"
#include "../include/rebase_options.h"
#include "../include/index.h"
#include "../include/rebase_operation.h"
// Forward declaration.
struct git_rebase {
};

using namespace node;
using namespace v8;

class GitRebase;

struct GitRebaseTraits {
  typedef GitRebase cppClass;
  typedef git_rebase cType;

  static const bool isDuplicable = false;
  static void duplicate(git_rebase **dest, git_rebase *src) {
     Nan::ThrowError("duplicate called on GitRebase which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_rebase *raw) {
    ::git_rebase_free(raw); // :: to avoid calling this free recursively
   }
};

class GitRebase : public
  NodeGitWrapper<GitRebaseTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitRebaseTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                   

  private:
    GitRebase()
      : NodeGitWrapper<GitRebaseTraits>(
           "A new GitRebase cannot be instantiated."
       )
    {}
    GitRebase(git_rebase *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitRebaseTraits>(raw, selfFreeing, owner)
    {}
    ~GitRebase();
                                                   
    struct AbortBaton {
      int error_code;
      const git_error* error;
      git_rebase * rebase;
    };
    class AbortWorker : public Nan::AsyncWorker {
      public:
        AbortWorker(
            AbortBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AbortWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AbortBaton *baton;
    };

    static NAN_METHOD(Abort);

    struct CommitBaton {
      int error_code;
      const git_error* error;
      git_oid * id;
      git_rebase * rebase;
      const git_signature * author;
      const git_signature * committer;
      const char * message_encoding;
      const char * message;
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

    static NAN_METHOD(Finish);

    struct InitBaton {
      int error_code;
      const git_error* error;
      git_rebase * out;
      git_repository * repo;
      const git_annotated_commit * branch;
      const git_annotated_commit * upstream;
      const git_annotated_commit * onto;
      const git_rebase_options * opts;
    };
    class InitWorker : public Nan::AsyncWorker {
      public:
        InitWorker(
            InitBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~InitWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        InitBaton *baton;
    };

    static NAN_METHOD(Init);

    static NAN_METHOD(InitOptions);

    static NAN_METHOD(InmemoryIndex);

    struct NextBaton {
      int error_code;
      const git_error* error;
      git_rebase_operation * out;
      git_rebase * rebase;
    };
    class NextWorker : public Nan::AsyncWorker {
      public:
        NextWorker(
            NextBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~NextWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        NextBaton *baton;
    };

    static NAN_METHOD(Next);

    struct OpenBaton {
      int error_code;
      const git_error* error;
      git_rebase * out;
      git_repository * repo;
      const git_rebase_options * opts;
    };
    class OpenWorker : public Nan::AsyncWorker {
      public:
        OpenWorker(
            OpenBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~OpenWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        OpenBaton *baton;
    };

    static NAN_METHOD(Open);

    static NAN_METHOD(OperationByindex);

    static NAN_METHOD(OperationCurrent);

    static NAN_METHOD(OperationEntrycount);
};

#endif
