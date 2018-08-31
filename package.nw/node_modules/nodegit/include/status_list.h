// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITSTATUSLIST_H
#define GITSTATUSLIST_H
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

#include "../include/diff_perfdata.h"
#include "../include/repository.h"
#include "../include/status_options.h"
// Forward declaration.
struct git_status_list {
};

using namespace node;
using namespace v8;

class GitStatusList;

struct GitStatusListTraits {
  typedef GitStatusList cppClass;
  typedef git_status_list cType;

  static const bool isDuplicable = false;
  static void duplicate(git_status_list **dest, git_status_list *src) {
     Nan::ThrowError("duplicate called on GitStatusList which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_status_list *raw) {
    ::git_status_list_free(raw); // :: to avoid calling this free recursively
   }
};

class GitStatusList : public
  NodeGitWrapper<GitStatusListTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitStatusListTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                

  private:
    GitStatusList()
      : NodeGitWrapper<GitStatusListTraits>(
           "A new GitStatusList cannot be instantiated."
       )
    {}
    GitStatusList(git_status_list *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitStatusListTraits>(raw, selfFreeing, owner)
    {}
    ~GitStatusList();
                
    static NAN_METHOD(Entrycount);

    static NAN_METHOD(Free);

    struct GetPerfdataBaton {
      int error_code;
      const git_error* error;
      git_diff_perfdata * out;
      const git_status_list * status;
    };
    class GetPerfdataWorker : public Nan::AsyncWorker {
      public:
        GetPerfdataWorker(
            GetPerfdataBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~GetPerfdataWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        GetPerfdataBaton *baton;
    };

    static NAN_METHOD(GetPerfdata);

    struct CreateBaton {
      int error_code;
      const git_error* error;
      git_status_list * out;
      git_repository * repo;
      const git_status_options * opts;
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
};

#endif
