// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITHASHSIG_H
#define GITHASHSIG_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"

extern "C" {
#include <git2.h>
#include <git2/sys/hashsig.h>
}

#include "../include/typedefs.h"

// Forward declaration.
struct git_hashsig {
};

using namespace node;
using namespace v8;

class GitHashsig;

struct GitHashsigTraits {
  typedef GitHashsig cppClass;
  typedef git_hashsig cType;

  static const bool isDuplicable = false;
  static void duplicate(git_hashsig **dest, git_hashsig *src) {
     Nan::ThrowError("duplicate called on GitHashsig which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_hashsig *raw) {
    ::git_hashsig_free(raw); // :: to avoid calling this free recursively
   }
};

class GitHashsig : public
  NodeGitWrapper<GitHashsigTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitHashsigTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                   

  private:
    GitHashsig()
      : NodeGitWrapper<GitHashsigTraits>(
           "A new GitHashsig cannot be instantiated."
       )
    {}
    GitHashsig(git_hashsig *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitHashsigTraits>(raw, selfFreeing, owner)
    {}
    ~GitHashsig();
                   
    static NAN_METHOD(Compare);

    struct CreateBaton {
      int error_code;
      const git_error* error;
      git_hashsig * out;
      const char * buf;
      size_t buflen;
      git_hashsig_option_t opts;
    };
    class CreateWorker : public Nan::AsyncWorker {
      public:
        CreateWorker(
            CreateBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateBaton *baton;
    };

    static NAN_METHOD(Create);

    struct CreateFromfileBaton {
      int error_code;
      const git_error* error;
      git_hashsig * out;
      const char * path;
      git_hashsig_option_t opts;
    };
    class CreateFromfileWorker : public Nan::AsyncWorker {
      public:
        CreateFromfileWorker(
            CreateFromfileBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromfileWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromfileBaton *baton;
    };

    static NAN_METHOD(CreateFromfile);

    static NAN_METHOD(Free);
};

#endif
