// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREFLOG_H
#define GITREFLOG_H
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
#include "../include/reflog_entry.h"
// Forward declaration.
struct git_reflog {
};

using namespace node;
using namespace v8;

class GitReflog;

struct GitReflogTraits {
  typedef GitReflog cppClass;
  typedef git_reflog cType;

  static const bool isDuplicable = false;
  static void duplicate(git_reflog **dest, git_reflog *src) {
     Nan::ThrowError("duplicate called on GitReflog which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_reflog *raw) {
    ::git_reflog_free(raw); // :: to avoid calling this free recursively
   }
};

class GitReflog : public
  NodeGitWrapper<GitReflogTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitReflogTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                       

  private:
    GitReflog()
      : NodeGitWrapper<GitReflogTraits>(
           "A new GitReflog cannot be instantiated."
       )
    {}
    GitReflog(git_reflog *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitReflogTraits>(raw, selfFreeing, owner)
    {}
    ~GitReflog();
                                       
    static NAN_METHOD(Append);

    static NAN_METHOD(Delete);

    static NAN_METHOD(Drop);

    static NAN_METHOD(EntryByindex);

    static NAN_METHOD(Entrycount);

    static NAN_METHOD(Free);

    struct ReadBaton {
      int error_code;
      const git_error* error;
      git_reflog * out;
      git_repository * repo;
      const char * name;
    };
    class ReadWorker : public Nan::AsyncWorker {
      public:
        ReadWorker(
            ReadBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ReadWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ReadBaton *baton;
    };

    static NAN_METHOD(Read);

    static NAN_METHOD(Rename);

    struct WriteBaton {
      int error_code;
      const git_error* error;
      git_reflog * reflog;
    };
    class WriteWorker : public Nan::AsyncWorker {
      public:
        WriteWorker(
            WriteBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~WriteWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        WriteBaton *baton;
    };

    static NAN_METHOD(Write);
};

#endif
