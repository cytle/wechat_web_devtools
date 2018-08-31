// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITODB_H
#define GITODB_H
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

#include "../include/odb_expand_id.h"
#include "../include/odb_object.h"
#include "../include/oid.h"
// Forward declaration.
struct git_odb {
};

using namespace node;
using namespace v8;

class GitOdb;

struct GitOdbTraits {
  typedef GitOdb cppClass;
  typedef git_odb cType;

  static const bool isDuplicable = false;
  static void duplicate(git_odb **dest, git_odb *src) {
     Nan::ThrowError("duplicate called on GitOdb which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_odb *raw) {
    ::git_odb_free(raw); // :: to avoid calling this free recursively
   }
};

class GitOdb : public
  NodeGitWrapper<GitOdbTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOdbTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                             

  private:
    GitOdb()
      : NodeGitWrapper<GitOdbTraits>(
           "A new GitOdb cannot be instantiated."
       )
    {}
    GitOdb(git_odb *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOdbTraits>(raw, selfFreeing, owner)
    {}
    ~GitOdb();
                             
    static NAN_METHOD(AddDiskAlternate);

    static NAN_METHOD(ExpandIds);

    static NAN_METHOD(Free);

    struct OpenBaton {
      int error_code;
      const git_error* error;
      git_odb * out;
      const char * objects_dir;
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

    struct ReadBaton {
      int error_code;
      const git_error* error;
      git_odb_object * out;
      git_odb * db;
      const git_oid * id;
      bool idNeedsFree;
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

    struct WriteBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_odb * odb;
      const void * data;
      size_t len;
      git_otype type;
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
