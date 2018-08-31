// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREFDB_H
#define GITREFDB_H
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
// Forward declaration.
struct git_refdb {
};

using namespace node;
using namespace v8;

class GitRefdb;

struct GitRefdbTraits {
  typedef GitRefdb cppClass;
  typedef git_refdb cType;

  static const bool isDuplicable = false;
  static void duplicate(git_refdb **dest, git_refdb *src) {
     Nan::ThrowError("duplicate called on GitRefdb which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_refdb *raw) {
    ::git_refdb_free(raw); // :: to avoid calling this free recursively
   }
};

class GitRefdb : public
  NodeGitWrapper<GitRefdbTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitRefdbTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

           

  private:
    GitRefdb()
      : NodeGitWrapper<GitRefdbTraits>(
           "A new GitRefdb cannot be instantiated."
       )
    {}
    GitRefdb(git_refdb *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitRefdbTraits>(raw, selfFreeing, owner)
    {}
    ~GitRefdb();
           
    static NAN_METHOD(Compress);

    static NAN_METHOD(Free);

    struct OpenBaton {
      int error_code;
      const git_error* error;
      git_refdb * out;
      git_repository * repo;
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
};

#endif
