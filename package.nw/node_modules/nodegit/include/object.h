// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITOBJECT_H
#define GITOBJECT_H
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
#include "../include/repository.h"
#include "../include/buf.h"
// Forward declaration.
struct git_object {
};

using namespace node;
using namespace v8;

class GitObject;

struct GitObjectTraits {
  typedef GitObject cppClass;
  typedef git_object cType;

  static const bool isDuplicable = false;
  static void duplicate(git_object **dest, git_object *src) {
     Nan::ThrowError("duplicate called on GitObject which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_object *raw) {
    ::git_object_free(raw); // :: to avoid calling this free recursively
   }
};

class GitObject : public
  NodeGitWrapper<GitObjectTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitObjectTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                         

  private:
    GitObject()
      : NodeGitWrapper<GitObjectTraits>(
           "A new GitObject cannot be instantiated."
       )
    {}
    GitObject(git_object *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitObjectTraits>(raw, selfFreeing, owner)
    {}
    ~GitObject();
                                                         
    static NAN_METHOD(Size);

    struct DupBaton {
      int error_code;
      const git_error* error;
      git_object * dest;
      git_object * source;
    };
    class DupWorker : public Nan::AsyncWorker {
      public:
        DupWorker(
            DupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~DupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        DupBaton *baton;
    };

    static NAN_METHOD(Dup);

    static NAN_METHOD(Free);

    static NAN_METHOD(Id);

    struct LookupBaton {
      int error_code;
      const git_error* error;
      git_object * object;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
      git_otype type;
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

    struct LookupBypathBaton {
      int error_code;
      const git_error* error;
      git_object * out;
      const git_object * treeish;
      const char * path;
      git_otype type;
    };
    class LookupBypathWorker : public Nan::AsyncWorker {
      public:
        LookupBypathWorker(
            LookupBypathBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LookupBypathWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LookupBypathBaton *baton;
    };

    static NAN_METHOD(LookupBypath);

    struct LookupPrefixBaton {
      int error_code;
      const git_error* error;
      git_object * object_out;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
      size_t len;
      git_otype type;
    };
    class LookupPrefixWorker : public Nan::AsyncWorker {
      public:
        LookupPrefixWorker(
            LookupPrefixBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LookupPrefixWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LookupPrefixBaton *baton;
    };

    static NAN_METHOD(LookupPrefix);

    static NAN_METHOD(Owner);

    struct PeelBaton {
      int error_code;
      const git_error* error;
      git_object * peeled;
      const git_object * object;
      git_otype target_type;
    };
    class PeelWorker : public Nan::AsyncWorker {
      public:
        PeelWorker(
            PeelBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~PeelWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        PeelBaton *baton;
    };

    static NAN_METHOD(Peel);

    struct ShortIdBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      const git_object * obj;
    };
    class ShortIdWorker : public Nan::AsyncWorker {
      public:
        ShortIdWorker(
            ShortIdBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ShortIdWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ShortIdBaton *baton;
    };

    static NAN_METHOD(ShortId);

    static NAN_METHOD(String2type);

    static NAN_METHOD(Type);

    static NAN_METHOD(Type2string);

    static NAN_METHOD(Typeisloose);
};

#endif
