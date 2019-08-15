// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTREEENTRY_H
#define GITTREEENTRY_H
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
#include "../include/object.h"
#include "../include/repository.h"
// Forward declaration.
struct git_tree_entry {
};

using namespace node;
using namespace v8;

class GitTreeEntry;

struct GitTreeEntryTraits {
  typedef GitTreeEntry cppClass;
  typedef git_tree_entry cType;

  static const bool isDuplicable = true;
  static void duplicate(git_tree_entry **dest, git_tree_entry *src) {
    git_tree_entry_dup(dest, src);
   }

  static const bool isFreeable = true;
  static void free(git_tree_entry *raw) {
    ::git_tree_entry_free(raw); // :: to avoid calling this free recursively
   }
};

class GitTreeEntry : public
  NodeGitWrapper<GitTreeEntryTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTreeEntryTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                        

  private:
    GitTreeEntry()
      : NodeGitWrapper<GitTreeEntryTraits>(
           "A new GitTreeEntry cannot be instantiated."
       )
    {}
    GitTreeEntry(git_tree_entry *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTreeEntryTraits>(raw, selfFreeing, owner)
    {}
    ~GitTreeEntry();
                        
    static NAN_METHOD(Filemode);

    static NAN_METHOD(FilemodeRaw);

    static NAN_METHOD(Free);

    static NAN_METHOD(Id);

    static NAN_METHOD(Name);

    struct ToObjectBaton {
      int error_code;
      const git_error* error;
      git_object * object_out;
      git_repository * repo;
      const git_tree_entry * entry;
    };
    class ToObjectWorker : public Nan::AsyncWorker {
      public:
        ToObjectWorker(
            ToObjectBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ToObjectWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ToObjectBaton *baton;
    };

    static NAN_METHOD(ToObject);

    static NAN_METHOD(Type);
};

#endif
