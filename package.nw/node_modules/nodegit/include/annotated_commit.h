// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITANNOTATEDCOMMIT_H
#define GITANNOTATEDCOMMIT_H
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
#include "../include/reference.h"
// Forward declaration.
struct git_annotated_commit {
};

using namespace node;
using namespace v8;

class GitAnnotatedCommit;

struct GitAnnotatedCommitTraits {
  typedef GitAnnotatedCommit cppClass;
  typedef git_annotated_commit cType;

  static const bool isDuplicable = false;
  static void duplicate(git_annotated_commit **dest, git_annotated_commit *src) {
     Nan::ThrowError("duplicate called on GitAnnotatedCommit which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_annotated_commit *raw) {
    ::git_annotated_commit_free(raw); // :: to avoid calling this free recursively
   }
};

class GitAnnotatedCommit : public
  NodeGitWrapper<GitAnnotatedCommitTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitAnnotatedCommitTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                             

  private:
    GitAnnotatedCommit()
      : NodeGitWrapper<GitAnnotatedCommitTraits>(
           "A new GitAnnotatedCommit cannot be instantiated."
       )
    {}
    GitAnnotatedCommit(git_annotated_commit *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitAnnotatedCommitTraits>(raw, selfFreeing, owner)
    {}
    ~GitAnnotatedCommit();
                             
    static NAN_METHOD(Free);

    struct FromFetchheadBaton {
      int error_code;
      const git_error* error;
      git_annotated_commit * out;
      git_repository * repo;
      const char * branch_name;
      const char * remote_url;
      const git_oid * id;
      bool idNeedsFree;
    };
    class FromFetchheadWorker : public Nan::AsyncWorker {
      public:
        FromFetchheadWorker(
            FromFetchheadBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FromFetchheadWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FromFetchheadBaton *baton;
    };

    static NAN_METHOD(FromFetchhead);

    struct FromRefBaton {
      int error_code;
      const git_error* error;
      git_annotated_commit * out;
      git_repository * repo;
      const git_reference * ref;
    };
    class FromRefWorker : public Nan::AsyncWorker {
      public:
        FromRefWorker(
            FromRefBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FromRefWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FromRefBaton *baton;
    };

    static NAN_METHOD(FromRef);

    struct FromRevspecBaton {
      int error_code;
      const git_error* error;
      git_annotated_commit * out;
      git_repository * repo;
      const char * revspec;
    };
    class FromRevspecWorker : public Nan::AsyncWorker {
      public:
        FromRevspecWorker(
            FromRevspecBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FromRevspecWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FromRevspecBaton *baton;
    };

    static NAN_METHOD(FromRevspec);

    static NAN_METHOD(Id);

    struct LookupBaton {
      int error_code;
      const git_error* error;
      git_annotated_commit * out;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
    };
    class LookupWorker : public Nan::AsyncWorker {
      public:
        LookupWorker(
            LookupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LookupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LookupBaton *baton;
    };

    static NAN_METHOD(Lookup);
};

#endif
