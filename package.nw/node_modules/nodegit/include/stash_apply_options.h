// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITSTASHAPPLYOPTIONS_H
#define GITSTASHAPPLYOPTIONS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
 }

  #include "../include/checkout_options.h"
 
using namespace node;
using namespace v8;

class GitStashApplyOptions;

struct GitStashApplyOptionsTraits {
  typedef GitStashApplyOptions cppClass;
  typedef git_stash_apply_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_stash_apply_options **dest, git_stash_apply_options *src) {
     Nan::ThrowError("duplicate called on GitStashApplyOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_stash_apply_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitStashApplyOptions : public NodeGitWrapper<GitStashApplyOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitStashApplyOptionsTraits>;
  public:
    GitStashApplyOptions(git_stash_apply_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                static int progress_cb_cppCallback (
              git_stash_apply_progress_t progress
                ,
               void * payload
            );

          static void progress_cb_async(void *baton);
          static void progress_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct ProgressCbBaton : public AsyncBatonWithResult<int> {
                git_stash_apply_progress_t progress;
                void * payload;
 
              ProgressCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitStashApplyOptions * progress_cb_getInstanceFromBaton (
            ProgressCbBaton *baton);
     
  private:
    GitStashApplyOptions();
    ~GitStashApplyOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

  
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

             Nan::Persistent<Object> checkout_options;
  
        static NAN_GETTER(GetCheckoutOptions);
        static NAN_SETTER(SetCheckoutOptions);

             CallbackWrapper progress_cb;
  
        static NAN_GETTER(GetProgressCb);
        static NAN_SETTER(SetProgressCb);

             Nan::Persistent<Value> progress_payload;
  
        static NAN_GETTER(GetProgressPayload);
        static NAN_SETTER(SetProgressPayload);

  };

#endif
