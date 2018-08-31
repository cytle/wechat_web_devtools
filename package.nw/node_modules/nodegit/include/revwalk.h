// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREVWALK_H
#define GITREVWALK_H
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

#include "../include/commit.h"
#include "../include/functions/copy.h"
#include "../include/oid.h"
#include "../include/repository.h"
// Forward declaration.
struct git_revwalk {
};

using namespace node;
using namespace v8;

class GitRevwalk;

struct GitRevwalkTraits {
  typedef GitRevwalk cppClass;
  typedef git_revwalk cType;

  static const bool isDuplicable = false;
  static void duplicate(git_revwalk **dest, git_revwalk *src) {
     Nan::ThrowError("duplicate called on GitRevwalk which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_revwalk *raw) {
    ::git_revwalk_free(raw); // :: to avoid calling this free recursively
   }
};

class GitRevwalk : public
  NodeGitWrapper<GitRevwalkTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitRevwalkTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                                      

  private:
    GitRevwalk()
      : NodeGitWrapper<GitRevwalkTraits>(
           "A new GitRevwalk cannot be instantiated."
       )
    {}
    GitRevwalk(git_revwalk *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitRevwalkTraits>(raw, selfFreeing, owner)
    {}
    ~GitRevwalk();
                                                                      
    static NAN_METHOD(Free);

    static NAN_METHOD(Hide);

    static NAN_METHOD(HideGlob);

    static NAN_METHOD(HideHead);

    static NAN_METHOD(HideRef);

    static NAN_METHOD(Create);

    struct NextBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_revwalk * walk;
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

    static NAN_METHOD(Push);

    static NAN_METHOD(PushGlob);

    static NAN_METHOD(PushHead);

    static NAN_METHOD(PushRange);

    static NAN_METHOD(PushRef);

    static NAN_METHOD(Repository);

    static NAN_METHOD(Reset);

    static NAN_METHOD(SimplifyFirstParent);

    static NAN_METHOD(Sorting);

    struct FastWalkBaton {
      int error_code;
      const git_error* error;
      int max_count;
      std::vector<git_oid*> * out;
      git_revwalk * walk;
    };
    class FastWalkWorker : public Nan::AsyncWorker {
      public:
        FastWalkWorker(
            FastWalkBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FastWalkWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FastWalkBaton *baton;
    };

    static NAN_METHOD(FastWalk);

    struct FileHistoryWalkBaton {
      int error_code;
      const git_error* error;
      const char * file_path;
      int max_count;
      std::vector< std::pair<git_commit *, std::pair<char *, git_delta_t> > *> * out;
      git_revwalk * walk;
    };
    class FileHistoryWalkWorker : public Nan::AsyncWorker {
      public:
        FileHistoryWalkWorker(
            FileHistoryWalkBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FileHistoryWalkWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FileHistoryWalkBaton *baton;
    };

    static NAN_METHOD(FileHistoryWalk);
};

#endif
