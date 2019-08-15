// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITPATHSPEC_H
#define GITPATHSPEC_H
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

#include "../include/str_array_converter.h"
#include "../include/pathspec_match_list.h"
#include "../include/diff.h"
#include "../include/index.h"
#include "../include/diff_delta.h"
#include "../include/tree.h"
#include "../include/repository.h"
#include "../include/strarray.h"
// Forward declaration.
struct git_pathspec {
};

using namespace node;
using namespace v8;

class GitPathspec;

struct GitPathspecTraits {
  typedef GitPathspec cppClass;
  typedef git_pathspec cType;

  static const bool isDuplicable = false;
  static void duplicate(git_pathspec **dest, git_pathspec *src) {
     Nan::ThrowError("duplicate called on GitPathspec which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_pathspec *raw) {
    ::git_pathspec_free(raw); // :: to avoid calling this free recursively
   }
};

class GitPathspec : public
  NodeGitWrapper<GitPathspecTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitPathspecTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                       

  private:
    GitPathspec()
      : NodeGitWrapper<GitPathspecTraits>(
           "A new GitPathspec cannot be instantiated."
       )
    {}
    GitPathspec(git_pathspec *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitPathspecTraits>(raw, selfFreeing, owner)
    {}
    ~GitPathspec();
                                                       
    static NAN_METHOD(Free);

    struct MatchDiffBaton {
      int error_code;
      const git_error* error;
      git_pathspec_match_list * out;
      git_diff * diff;
      uint32_t flags;
      git_pathspec * ps;
    };
    class MatchDiffWorker : public Nan::AsyncWorker {
      public:
        MatchDiffWorker(
            MatchDiffBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~MatchDiffWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        MatchDiffBaton *baton;
    };

    static NAN_METHOD(MatchDiff);

    struct MatchIndexBaton {
      int error_code;
      const git_error* error;
      git_pathspec_match_list * out;
      git_index * index;
      uint32_t flags;
      git_pathspec * ps;
    };
    class MatchIndexWorker : public Nan::AsyncWorker {
      public:
        MatchIndexWorker(
            MatchIndexBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~MatchIndexWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        MatchIndexBaton *baton;
    };

    static NAN_METHOD(MatchIndex);

    static NAN_METHOD(MatchListDiffEntry);

    static NAN_METHOD(MatchListEntry);

    static NAN_METHOD(MatchListEntrycount);

    static NAN_METHOD(MatchListFailedEntry);

    static NAN_METHOD(MatchListFailedEntrycount);

    struct MatchTreeBaton {
      int error_code;
      const git_error* error;
      git_pathspec_match_list * out;
      git_tree * tree;
      uint32_t flags;
      git_pathspec * ps;
    };
    class MatchTreeWorker : public Nan::AsyncWorker {
      public:
        MatchTreeWorker(
            MatchTreeBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~MatchTreeWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        MatchTreeBaton *baton;
    };

    static NAN_METHOD(MatchTree);

    struct MatchWorkdirBaton {
      int error_code;
      const git_error* error;
      git_pathspec_match_list * out;
      git_repository * repo;
      uint32_t flags;
      git_pathspec * ps;
    };
    class MatchWorkdirWorker : public Nan::AsyncWorker {
      public:
        MatchWorkdirWorker(
            MatchWorkdirBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~MatchWorkdirWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        MatchWorkdirBaton *baton;
    };

    static NAN_METHOD(MatchWorkdir);

    static NAN_METHOD(MatchesPath);

    static NAN_METHOD(Create);
};

#endif
