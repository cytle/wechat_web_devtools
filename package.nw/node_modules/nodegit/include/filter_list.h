// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITFILTERLIST_H
#define GITFILTERLIST_H
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

#include "../include/buf.h"
#include "../include/blob.h"
#include "../include/repository.h"
// Forward declaration.
struct git_filter_list {
};

using namespace node;
using namespace v8;

class GitFilterList;

struct GitFilterListTraits {
  typedef GitFilterList cppClass;
  typedef git_filter_list cType;

  static const bool isDuplicable = false;
  static void duplicate(git_filter_list **dest, git_filter_list *src) {
     Nan::ThrowError("duplicate called on GitFilterList which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_filter_list *raw) {
    ::git_filter_list_free(raw); // :: to avoid calling this free recursively
   }
};

class GitFilterList : public
  NodeGitWrapper<GitFilterListTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitFilterListTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                            

  private:
    GitFilterList()
      : NodeGitWrapper<GitFilterListTraits>(
           "A new GitFilterList cannot be instantiated."
       )
    {}
    GitFilterList(git_filter_list *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitFilterListTraits>(raw, selfFreeing, owner)
    {}
    ~GitFilterList();
                            
    struct ApplyToBlobBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      git_filter_list * filters;
      git_blob * blob;
    };
    class ApplyToBlobWorker : public Nan::AsyncWorker {
      public:
        ApplyToBlobWorker(
            ApplyToBlobBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ApplyToBlobWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ApplyToBlobBaton *baton;
    };

    static NAN_METHOD(ApplyToBlob);

    struct ApplyToDataBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      git_filter_list * filters;
      git_buf * in;
    };
    class ApplyToDataWorker : public Nan::AsyncWorker {
      public:
        ApplyToDataWorker(
            ApplyToDataBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ApplyToDataWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ApplyToDataBaton *baton;
    };

    static NAN_METHOD(ApplyToData);

    struct ApplyToFileBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      git_filter_list * filters;
      git_repository * repo;
      const char * path;
    };
    class ApplyToFileWorker : public Nan::AsyncWorker {
      public:
        ApplyToFileWorker(
            ApplyToFileBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ApplyToFileWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ApplyToFileBaton *baton;
    };

    static NAN_METHOD(ApplyToFile);

    static NAN_METHOD(Free);

    struct LoadBaton {
      int error_code;
      const git_error* error;
      git_filter_list * filters;
      git_repository * repo;
      git_blob * blob;
      const char * path;
      git_filter_mode_t mode;
      uint32_t flags;
    };
    class LoadWorker : public Nan::AsyncWorker {
      public:
        LoadWorker(
            LoadBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LoadWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LoadBaton *baton;
    };

    static NAN_METHOD(Load);
};

#endif
