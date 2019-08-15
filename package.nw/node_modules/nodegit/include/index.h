// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEX_H
#define GITINDEX_H
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

#include "../include/str_array_converter.h"
#include "../include/index_entry.h"
#include "../include/strarray.h"
#include "../include/oid.h"
#include "../include/repository.h"
#include "../include/tree.h"
// Forward declaration.
struct git_index {
};

using namespace node;
using namespace v8;

class GitIndex;

struct GitIndexTraits {
  typedef GitIndex cppClass;
  typedef git_index cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index **dest, git_index *src) {
     Nan::ThrowError("duplicate called on GitIndex which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_index *raw) {
    ::git_index_free(raw); // :: to avoid calling this free recursively
   }
};

class GitIndex : public
  NodeGitWrapper<GitIndexTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

           static int AddAll_callback_cppCallback (
      const char * path
      ,
       const char * matched_pathspec
      ,
       void * payload
      );

    static void AddAll_callback_async(void *baton);
    static void AddAll_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
    struct AddAll_CallbackBaton : public AsyncBatonWithResult<int> {
      const char * path;
      const char * matched_pathspec;
      void * payload;
 
      AddAll_CallbackBaton(const int &defaultResult)
        : AsyncBatonWithResult<int>(defaultResult) {
        }
    };
                                                                                                 static int RemoveAll_callback_cppCallback (
      const char * path
      ,
       const char * matched_pathspec
      ,
       void * payload
      );

    static void RemoveAll_callback_async(void *baton);
    static void RemoveAll_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
    struct RemoveAll_CallbackBaton : public AsyncBatonWithResult<int> {
      const char * path;
      const char * matched_pathspec;
      void * payload;
 
      RemoveAll_CallbackBaton(const int &defaultResult)
        : AsyncBatonWithResult<int>(defaultResult) {
        }
    };
                           static int UpdateAll_callback_cppCallback (
      const char * path
      ,
       const char * matched_pathspec
      ,
       void * payload
      );

    static void UpdateAll_callback_async(void *baton);
    static void UpdateAll_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
    struct UpdateAll_CallbackBaton : public AsyncBatonWithResult<int> {
      const char * path;
      const char * matched_pathspec;
      void * payload;
 
      UpdateAll_CallbackBaton(const int &defaultResult)
        : AsyncBatonWithResult<int>(defaultResult) {
        }
    };
                    

  private:
    GitIndex()
      : NodeGitWrapper<GitIndexTraits>(
           "A new GitIndex cannot be instantiated."
       )
    {}
    GitIndex(git_index *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndex();
                                                                                                                                               
    struct AddBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const git_index_entry * source_entry;
    };
    class AddWorker : public Nan::AsyncWorker {
      public:
        AddWorker(
            AddBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddBaton *baton;
    };

    static NAN_METHOD(Add);

    struct AddAllBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const git_strarray * pathspec;
      unsigned int flags;
      git_index_matched_path_cb callback;
      void * payload;
    };
    class AddAllWorker : public Nan::AsyncWorker {
      public:
        AddAllWorker(
            AddAllBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddAllWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddAllBaton *baton;
    };

    static NAN_METHOD(AddAll);

    struct AddBypathBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const char * path;
    };
    class AddBypathWorker : public Nan::AsyncWorker {
      public:
        AddBypathWorker(
            AddBypathBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~AddBypathWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        AddBypathBaton *baton;
    };

    static NAN_METHOD(AddBypath);

    static NAN_METHOD(Caps);

    static NAN_METHOD(Checksum);

    struct ClearBaton {
      int error_code;
      const git_error* error;
      git_index * index;
    };
    class ClearWorker : public Nan::AsyncWorker {
      public:
        ClearWorker(
            ClearBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ClearWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ClearBaton *baton;
    };

    static NAN_METHOD(Clear);

    struct ConflictAddBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const git_index_entry * ancestor_entry;
      const git_index_entry * our_entry;
      const git_index_entry * their_entry;
    };
    class ConflictAddWorker : public Nan::AsyncWorker {
      public:
        ConflictAddWorker(
            ConflictAddBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ConflictAddWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ConflictAddBaton *baton;
    };

    static NAN_METHOD(ConflictAdd);

    struct ConflictCleanupBaton {
      int error_code;
      const git_error* error;
      git_index * index;
    };
    class ConflictCleanupWorker : public Nan::AsyncWorker {
      public:
        ConflictCleanupWorker(
            ConflictCleanupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ConflictCleanupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ConflictCleanupBaton *baton;
    };

    static NAN_METHOD(ConflictCleanup);

    struct ConflictGetBaton {
      int error_code;
      const git_error* error;
      const git_index_entry * ancestor_out;
      const git_index_entry * our_out;
      const git_index_entry * their_out;
      git_index * index;
      const char * path;
    };
    class ConflictGetWorker : public Nan::AsyncWorker {
      public:
        ConflictGetWorker(
            ConflictGetBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ConflictGetWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ConflictGetBaton *baton;
    };

    static NAN_METHOD(ConflictGet);

    struct ConflictRemoveBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const char * path;
    };
    class ConflictRemoveWorker : public Nan::AsyncWorker {
      public:
        ConflictRemoveWorker(
            ConflictRemoveBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ConflictRemoveWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ConflictRemoveBaton *baton;
    };

    static NAN_METHOD(ConflictRemove);

    static NAN_METHOD(EntryIsConflict);

    static NAN_METHOD(EntryStage);

    static NAN_METHOD(Entrycount);

    struct FindBaton {
      int error_code;
      const git_error* error;
      size_t * at_pos;
      git_index * index;
      const char * path;
    };
    class FindWorker : public Nan::AsyncWorker {
      public:
        FindWorker(
            FindBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FindWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FindBaton *baton;
    };

    static NAN_METHOD(Find);

    struct FindPrefixBaton {
      int error_code;
      const git_error* error;
      size_t * at_pos;
      git_index * index;
      const char * prefix;
    };
    class FindPrefixWorker : public Nan::AsyncWorker {
      public:
        FindPrefixWorker(
            FindPrefixBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FindPrefixWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FindPrefixBaton *baton;
    };

    static NAN_METHOD(FindPrefix);

    static NAN_METHOD(GetByindex);

    static NAN_METHOD(GetBypath);

    static NAN_METHOD(HasConflicts);

    struct OpenBaton {
      int error_code;
      const git_error* error;
      git_index * out;
      const char * index_path;
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

    struct ReadBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      int force;
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

    struct ReadTreeBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const git_tree * tree;
    };
    class ReadTreeWorker : public Nan::AsyncWorker {
      public:
        ReadTreeWorker(
            ReadTreeBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ReadTreeWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ReadTreeBaton *baton;
    };

    static NAN_METHOD(ReadTree);

    struct RemoveBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const char * path;
      int stage;
    };
    class RemoveWorker : public Nan::AsyncWorker {
      public:
        RemoveWorker(
            RemoveBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~RemoveWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        RemoveBaton *baton;
    };

    static NAN_METHOD(Remove);

    struct RemoveAllBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const git_strarray * pathspec;
      git_index_matched_path_cb callback;
      void * payload;
    };
    class RemoveAllWorker : public Nan::AsyncWorker {
      public:
        RemoveAllWorker(
            RemoveAllBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~RemoveAllWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        RemoveAllBaton *baton;
    };

    static NAN_METHOD(RemoveAll);

    struct RemoveBypathBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const char * path;
    };
    class RemoveBypathWorker : public Nan::AsyncWorker {
      public:
        RemoveBypathWorker(
            RemoveBypathBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~RemoveBypathWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        RemoveBypathBaton *baton;
    };

    static NAN_METHOD(RemoveBypath);

    struct RemoveDirectoryBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const char * dir;
      int stage;
    };
    class RemoveDirectoryWorker : public Nan::AsyncWorker {
      public:
        RemoveDirectoryWorker(
            RemoveDirectoryBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~RemoveDirectoryWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        RemoveDirectoryBaton *baton;
    };

    static NAN_METHOD(RemoveDirectory);

    static NAN_METHOD(SetCaps);

    static NAN_METHOD(SetVersion);

    struct UpdateAllBaton {
      int error_code;
      const git_error* error;
      git_index * index;
      const git_strarray * pathspec;
      git_index_matched_path_cb callback;
      void * payload;
    };
    class UpdateAllWorker : public Nan::AsyncWorker {
      public:
        UpdateAllWorker(
            UpdateAllBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~UpdateAllWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        UpdateAllBaton *baton;
    };

    static NAN_METHOD(UpdateAll);

    static NAN_METHOD(Version);

    struct WriteBaton {
      int error_code;
      const git_error* error;
      git_index * index;
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

    struct WriteTreeBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_index * index;
    };
    class WriteTreeWorker : public Nan::AsyncWorker {
      public:
        WriteTreeWorker(
            WriteTreeBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~WriteTreeWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        WriteTreeBaton *baton;
    };

    static NAN_METHOD(WriteTree);

    struct WriteTreeToBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_index * index;
      git_repository * repo;
    };
    class WriteTreeToWorker : public Nan::AsyncWorker {
      public:
        WriteTreeToWorker(
            WriteTreeToBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~WriteTreeToWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        WriteTreeToBaton *baton;
    };

    static NAN_METHOD(WriteTreeTo);

    struct AddAll_globalPayload {
      Nan::Callback * callback;

      AddAll_globalPayload() {
        callback = NULL;
      }

      ~AddAll_globalPayload() {
        if (callback != NULL) {
          delete callback;
        }
      }
    };

    struct RemoveAll_globalPayload {
      Nan::Callback * callback;

      RemoveAll_globalPayload() {
        callback = NULL;
      }

      ~RemoveAll_globalPayload() {
        if (callback != NULL) {
          delete callback;
        }
      }
    };

    struct UpdateAll_globalPayload {
      Nan::Callback * callback;

      UpdateAll_globalPayload() {
        callback = NULL;
      }

      ~UpdateAll_globalPayload() {
        if (callback != NULL) {
          delete callback;
        }
      }
    };
};

#endif
