// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITSTASH_H
#define GITSTASH_H
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
#include "../include/stash_apply_options.h"
#include "../include/oid.h"
#include "../include/signature.h"

using namespace node;
using namespace v8;


class GitStash : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                  static int Foreach_callback_cppCallback (
      size_t index
      ,
       const char * message
      ,
       const git_oid * stash_id
      ,
       void * payload
      );

    static void Foreach_callback_async(void *baton);
    static void Foreach_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
    struct Foreach_CallbackBaton : public AsyncBatonWithResult<int> {
      size_t index;
      const char * message;
      const git_oid * stash_id;
      void * payload;
 
      Foreach_CallbackBaton(const int &defaultResult)
        : AsyncBatonWithResult<int>(defaultResult) {
        }
    };
                 

  private:
                               
    struct ApplyBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      size_t index;
      const git_stash_apply_options * options;
    };
    class ApplyWorker : public Nan::AsyncWorker {
      public:
        ApplyWorker(
            ApplyBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ApplyWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ApplyBaton *baton;
    };

    static NAN_METHOD(Apply);

    static NAN_METHOD(ApplyInitOptions);

    struct DropBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      size_t index;
    };
    class DropWorker : public Nan::AsyncWorker {
      public:
        DropWorker(
            DropBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~DropWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        DropBaton *baton;
    };

    static NAN_METHOD(Drop);

    struct ForeachBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      git_stash_cb callback;
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

    struct PopBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      size_t index;
      const git_stash_apply_options * options;
    };
    class PopWorker : public Nan::AsyncWorker {
      public:
        PopWorker(
            PopBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~PopWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        PopBaton *baton;
    };

    static NAN_METHOD(Pop);

    struct SaveBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_repository * repo;
      const git_signature * stasher;
      const char * message;
      unsigned int flags;
    };
    class SaveWorker : public Nan::AsyncWorker {
      public:
        SaveWorker(
            SaveBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SaveWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SaveBaton *baton;
    };

    static NAN_METHOD(Save);

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
