// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTREE_H
#define GITTREE_H
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
#include "../include/tree_update.h"
#include "../include/tree_entry.h"
// Forward declaration.
struct git_tree {
};

using namespace node;
using namespace v8;

class GitTree;

struct GitTreeTraits {
  typedef GitTree cppClass;
  typedef git_tree cType;

  static const bool isDuplicable = false;
  static void duplicate(git_tree **dest, git_tree *src) {
     Nan::ThrowError("duplicate called on GitTree which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_tree *raw) {
    ::git_tree_free(raw); // :: to avoid calling this free recursively
   }
};

class GitTree : public
  NodeGitWrapper<GitTreeTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTreeTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                            

  private:
    GitTree()
      : NodeGitWrapper<GitTreeTraits>(
           "A new GitTree cannot be instantiated."
       )
    {}
    GitTree(git_tree *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTreeTraits>(raw, selfFreeing, owner)
    {}
    ~GitTree();
                                                            
    struct CreateUpdatedBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_repository * repo;
      git_tree * baseline;
      size_t nupdates;
      const git_tree_update * updates;
    };
    class CreateUpdatedWorker : public Nan::AsyncWorker {
      public:
        CreateUpdatedWorker(
            CreateUpdatedBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateUpdatedWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateUpdatedBaton *baton;
    };

    static NAN_METHOD(CreateUpdated);

    struct DupBaton {
      int error_code;
      const git_error* error;
      git_tree * out;
      git_tree * source;
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

    static NAN_METHOD(EntryByid);

    static NAN_METHOD(EntryByindex);

    static NAN_METHOD(EntryByname);

    struct EntryBypathBaton {
      int error_code;
      const git_error* error;
      git_tree_entry * out;
      const git_tree * root;
      const char * path;
    };
    class EntryBypathWorker : public Nan::AsyncWorker {
      public:
        EntryBypathWorker(
            EntryBypathBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~EntryBypathWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        EntryBypathBaton *baton;
    };

    static NAN_METHOD(EntryBypath);

    static NAN_METHOD(EntryCmp);

    static NAN_METHOD(EntryDup);

    static NAN_METHOD(Entrycount);

    static NAN_METHOD(Free);

    static NAN_METHOD(Id);

    struct LookupBaton {
      int error_code;
      const git_error* error;
      git_tree * out;
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

    struct LookupPrefixBaton {
      int error_code;
      const git_error* error;
      git_tree * out;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
      size_t len;
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
};

#endif
