// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITODBOBJECT_H
#define GITODBOBJECT_H
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

#include "../include/wrapper.h"
#include "node_buffer.h"
#include "../include/oid.h"
// Forward declaration.
struct git_odb_object {
};

using namespace node;
using namespace v8;

class GitOdbObject;

struct GitOdbObjectTraits {
  typedef GitOdbObject cppClass;
  typedef git_odb_object cType;

  static const bool isDuplicable = false;
  static void duplicate(git_odb_object **dest, git_odb_object *src) {
     Nan::ThrowError("duplicate called on GitOdbObject which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_odb_object *raw) {
    ::git_odb_object_free(raw); // :: to avoid calling this free recursively
   }
};

class GitOdbObject : public
  NodeGitWrapper<GitOdbObjectTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOdbObjectTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                    

  private:
    GitOdbObject()
      : NodeGitWrapper<GitOdbObjectTraits>(
           "A new GitOdbObject cannot be instantiated."
       )
    {}
    GitOdbObject(git_odb_object *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOdbObjectTraits>(raw, selfFreeing, owner)
    {}
    ~GitOdbObject();
                    
    static NAN_METHOD(Data);

    struct DupBaton {
      int error_code;
      const git_error* error;
      git_odb_object * dest;
      git_odb_object * source;
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

    static NAN_METHOD(Size);

    static NAN_METHOD(Type);
};

#endif
