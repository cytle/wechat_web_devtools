// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITSTATUS_H
#define GITSTATUS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"

extern "C" {
#include <git2.h>
#include <git2/sys/diff.h>
}

#include "../include/typedefs.h"

#include "../include/status_list.h"
#include "../include/status_entry.h"
#include "../include/repository.h"
#include "../include/status_options.h"

using namespace node;
using namespace v8;


class GitStatus : public
  Nan::ObjectWrap
{
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

              static int Foreach_callback_cppCallback (
      const char * path
      ,
       unsigned int status_flags
      ,
       void * payload
      );

    static void Foreach_callback_async(void *baton);
    static void Foreach_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
    struct Foreach_CallbackBaton : public AsyncBatonWithResult<int> {
      const char * path;
      unsigned int status_flags;
      void * payload;
 
      Foreach_CallbackBaton(const int &defaultResult)
        : AsyncBatonWithResult<int>(defaultResult) {
        }
    };
          static int ForeachExt_callback_cppCallback (
      const char * path
      ,
       unsigned int status_flags
      ,
       void * payload
      );

    static void ForeachExt_callback_async(void *baton);
    static void ForeachExt_callback_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
    struct ForeachExt_CallbackBaton : public AsyncBatonWithResult<int> {
      const char * path;
      unsigned int status_flags;
      void * payload;
 
      ForeachExt_CallbackBaton(const int &defaultResult)
        : AsyncBatonWithResult<int>(defaultResult) {
        }
    };
          

  private:
                          
    static NAN_METHOD(Byindex);

    struct FileBaton {
      int error_code;
      const git_error* error;
      unsigned int * status_flags;
      git_repository * repo;
      const char * path;
    };
    class FileWorker : public Nan::AsyncWorker {
      public:
        FileWorker(
            FileBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FileWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FileBaton *baton;
    };

    static NAN_METHOD(File);

    struct ForeachBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      git_status_cb callback;
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

    struct ForeachExtBaton {
      int error_code;
      const git_error* error;
      git_repository * repo;
      const git_status_options * opts;
      git_status_cb callback;
      void * payload;
    };
    class ForeachExtWorker : public Nan::AsyncWorker {
      public:
        ForeachExtWorker(
            ForeachExtBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~ForeachExtWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        ForeachExtBaton *baton;
    };

    static NAN_METHOD(ForeachExt);

    static NAN_METHOD(ShouldIgnore);

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

    struct ForeachExt_globalPayload {
      Nan::Callback * callback;

      ForeachExt_globalPayload() {
        callback = NULL;
      }

      ~ForeachExt_globalPayload() {
        if (callback != NULL) {
          delete callback;
        }
      }
    };
};

#endif
