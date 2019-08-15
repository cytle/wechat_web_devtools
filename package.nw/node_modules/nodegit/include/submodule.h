// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITSUBMODULE_H
#define GITSUBMODULE_H
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
#include "../include/oid.h"
#include "../include/buf.h"
#include "../include/submodule_update_options.h"
// Forward declaration.
struct git_submodule {
};

using namespace node;
using namespace v8;

class GitSubmodule;

struct GitSubmoduleTraits {
  typedef GitSubmodule cppClass;
  typedef git_submodule cType;

  static const bool isDuplicable = false;
  static void duplicate(git_submodule **dest, git_submodule *src) {
     Nan::ThrowError("duplicate called on GitSubmodule which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_submodule *raw) {
    ::git_submodule_free(raw); // :: to avoid calling this free recursively
   }
};

class GitSubmodule : public
  NodeGitWrapper<GitSubmoduleTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitSubmoduleTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                         static int Foreach_callback_cppCallback (
      git_submodule * sm
      ,
       const char * name
      ,
       void * payload
      );

    static void Foreach_callback_async(void *baton);
    static void Foreach_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
    struct Foreach_CallbackBaton : public AsyncBatonWithResult<int> {
      git_submodule * sm;
      const char * name;
      void * payload;
 
      Foreach_CallbackBaton(const int &defaultResult)
        : AsyncBatonWithResult<int>(defaultResult) {
        }
    };
                                                                                                             

  private:
    GitSubmodule()
      : NodeGitWrapper<GitSubmoduleTraits>(
           "A new GitSubmodule cannot be instantiated."
       )
    {}
    GitSubmodule(git_submodule *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitSubmoduleTraits>(raw, selfFreeing, owner)
    {}
    ~GitSubmodule();
                                                                                                                                  
    struct AddFinalizeBaton {
      int error_code;
      const git_error* error;
      git_submodule * submodule;
    };
    class AddFinalizeWorker : public Nan::AsyncWorker {
      public:
        AddFinalizeWorker(
            AddFinalizeBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddFinalizeWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddFinalizeBaton *baton;
    };

    static NAN_METHOD(AddFinalize);

    struct AddSetupBaton {
      int error_code;
      const git_error* error;
      git_submodule * out;
      git_repository * repo;
      const char * url;
      const char * path;
      int use_gitlink;
    };
    class AddSetupWorker : public Nan::AsyncWorker {
      public:
        AddSetupWorker(
            AddSetupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddSetupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddSetupBaton *baton;
    };

    static NAN_METHOD(AddSetup);

    struct AddToIndexBaton {
      int error_code;
      const git_error* error;
      git_submodule * submodule;
      int write_index;
    };
    class AddToIndexWorker : public Nan::AsyncWorker {
      public:
        AddToIndexWorker(
            AddToIndexBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddToIndexWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddToIndexBaton *baton;
    };

    static NAN_METHOD(AddToIndex);

    static NAN_METHOD(Branch);

    static NAN_METHOD(FetchRecurseSubmodules);

    struct ForeachBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      git_submodule_cb callback;
      void * payload;
    };
    class ForeachWorker : public Nan::AsyncWorker {
      public:
        ForeachWorker(
            ForeachBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ForeachWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ForeachBaton *baton;
    };

    static NAN_METHOD(Foreach);

    static NAN_METHOD(Free);

    static NAN_METHOD(HeadId);

    static NAN_METHOD(Ignore);

    static NAN_METHOD(IndexId);

    struct InitBaton {
      int error_code;
      const git_error* error;
      git_submodule * submodule;
      int overwrite;
    };
    class InitWorker : public Nan::AsyncWorker {
      public:
        InitWorker(
            InitBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~InitWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        InitBaton *baton;
    };

    static NAN_METHOD(Init);

    struct LocationBaton {
      int error_code;
      const git_error* error;
      unsigned int * location_status;
      git_submodule * submodule;
    };
    class LocationWorker : public Nan::AsyncWorker {
      public:
        LocationWorker(
            LocationBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LocationWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LocationBaton *baton;
    };

    static NAN_METHOD(Location);

    struct LookupBaton {
      int error_code;
      const git_error* error;
      git_submodule * out;
      git_repository * repo;
      const char * name;
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

    static NAN_METHOD(Name);

    struct OpenBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      git_submodule * submodule;
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

    static NAN_METHOD(Owner);

    static NAN_METHOD(Path);

    static NAN_METHOD(Reload);

    struct RepoInitBaton {
      int error_code;
      const git_error* error;
      git_repository * out;
      const git_submodule * sm;
      int use_gitlink;
    };
    class RepoInitWorker : public Nan::AsyncWorker {
      public:
        RepoInitWorker(
            RepoInitBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~RepoInitWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        RepoInitBaton *baton;
    };

    static NAN_METHOD(RepoInit);

    struct ResolveUrlBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      git_repository * repo;
      const char * url;
    };
    class ResolveUrlWorker : public Nan::AsyncWorker {
      public:
        ResolveUrlWorker(
            ResolveUrlBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ResolveUrlWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ResolveUrlBaton *baton;
    };

    static NAN_METHOD(ResolveUrl);

    static NAN_METHOD(SetBranch);

    static NAN_METHOD(SetFetchRecurseSubmodules);

    struct SetIgnoreBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      const char * name;
      git_submodule_ignore_t ignore;
    };
    class SetIgnoreWorker : public Nan::AsyncWorker {
      public:
        SetIgnoreWorker(
            SetIgnoreBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetIgnoreWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetIgnoreBaton *baton;
    };

    static NAN_METHOD(SetIgnore);

    struct SetUpdateBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      const char * name;
      git_submodule_update_t update;
    };
    class SetUpdateWorker : public Nan::AsyncWorker {
      public:
        SetUpdateWorker(
            SetUpdateBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetUpdateWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetUpdateBaton *baton;
    };

    static NAN_METHOD(SetUpdate);

    struct SetUrlBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      const char * name;
      const char * url;
    };
    class SetUrlWorker : public Nan::AsyncWorker {
      public:
        SetUrlWorker(
            SetUrlBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SetUrlWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SetUrlBaton *baton;
    };

    static NAN_METHOD(SetUrl);

    struct StatusBaton {
      int error_code;
      const git_error* error;
      unsigned int * status;
      git_repository * repo;
      const char * name;
      git_submodule_ignore_t ignore;
    };
    class StatusWorker : public Nan::AsyncWorker {
      public:
        StatusWorker(
            StatusBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~StatusWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        StatusBaton *baton;
    };

    static NAN_METHOD(Status);

    struct SyncBaton {
      int error_code;
      const git_error* error;
      git_submodule * submodule;
    };
    class SyncWorker : public Nan::AsyncWorker {
      public:
        SyncWorker(
            SyncBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SyncWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SyncBaton *baton;
    };

    static NAN_METHOD(Sync);

    struct UpdateBaton {
      int error_code;
      const git_error* error;
      git_submodule * submodule;
      int init;
      git_submodule_update_options * options;
    };
    class UpdateWorker : public Nan::AsyncWorker {
      public:
        UpdateWorker(
            UpdateBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~UpdateWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        UpdateBaton *baton;
    };

    static NAN_METHOD(Update);

    static NAN_METHOD(UpdateInitOptions);

    static NAN_METHOD(UpdateStrategy);

    static NAN_METHOD(Url);

    static NAN_METHOD(WdId);

    struct Foreach_globalPayload {
      Nan::Callback * callback;

      Foreach_globalPayload() {
        callback = NULL;
      }

      ~Foreach_globalPayload() {
        if (callback != NULL) {
          delete callback;
        }
      }
    };
};

#endif
