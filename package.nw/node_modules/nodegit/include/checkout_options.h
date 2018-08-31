// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITCHECKOUTOPTIONS_H
#define GITCHECKOUTOPTIONS_H
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

  #include "../include/diff_file.h"
  #include "../include/strarray.h"
  #include "../include/tree.h"
  #include "../include/index.h"
 
using namespace node;
using namespace v8;

class GitCheckoutOptions;

struct GitCheckoutOptionsTraits {
  typedef GitCheckoutOptions cppClass;
  typedef git_checkout_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_checkout_options **dest, git_checkout_options *src) {
     Nan::ThrowError("duplicate called on GitCheckoutOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_checkout_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitCheckoutOptions : public NodeGitWrapper<GitCheckoutOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitCheckoutOptionsTraits>;
  public:
    GitCheckoutOptions(git_checkout_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                        static int notify_cb_cppCallback (
              git_checkout_notify_t why
                ,
               const char * path
                ,
               const git_diff_file * baseline
                ,
               const git_diff_file * target
                ,
               const git_diff_file * workdir
                ,
               void * payload
            );

          static void notify_cb_async(void *baton);
          static void notify_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct NotifyCbBaton : public AsyncBatonWithResult<int> {
                git_checkout_notify_t why;
                const char * path;
                const git_diff_file * baseline;
                const git_diff_file * target;
                const git_diff_file * workdir;
                void * payload;
 
              NotifyCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitCheckoutOptions * notify_cb_getInstanceFromBaton (
            NotifyCbBaton *baton);
              static int progress_cb_cppCallback (
              const char * path
                ,
               size_t completed_steps
                ,
               size_t total_steps
                ,
               void * payload
            );

          static void progress_cb_async(void *baton);
          static void progress_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct ProgressCbBaton : public AsyncBatonWithResult<int> {
                const char * path;
                size_t completed_steps;
                size_t total_steps;
                void * payload;
 
              ProgressCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitCheckoutOptions * progress_cb_getInstanceFromBaton (
            ProgressCbBaton *baton);
                            static int perfdata_cb_cppCallback (
              const git_checkout_perfdata * perfdata
                ,
               void * payload
            );

          static void perfdata_cb_async(void *baton);
          static void perfdata_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct PerfdataCbBaton : public AsyncBatonWithResult<int> {
                const git_checkout_perfdata * perfdata;
                void * payload;
 
              PerfdataCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitCheckoutOptions * perfdata_cb_getInstanceFromBaton (
            PerfdataCbBaton *baton);
     
  private:
    GitCheckoutOptions();
    ~GitCheckoutOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetCheckoutStrategy);
        static NAN_SETTER(SetCheckoutStrategy);

   
        static NAN_GETTER(GetDisableFilters);
        static NAN_SETTER(SetDisableFilters);

   
        static NAN_GETTER(GetDirMode);
        static NAN_SETTER(SetDirMode);

   
        static NAN_GETTER(GetFileMode);
        static NAN_SETTER(SetFileMode);

   
        static NAN_GETTER(GetFileOpenFlags);
        static NAN_SETTER(SetFileOpenFlags);

   
        static NAN_GETTER(GetNotifyFlags);
        static NAN_SETTER(SetNotifyFlags);

             CallbackWrapper notify_cb;
  
        static NAN_GETTER(GetNotifyCb);
        static NAN_SETTER(SetNotifyCb);

             Nan::Persistent<Value> notify_payload;
  
        static NAN_GETTER(GetNotifyPayload);
        static NAN_SETTER(SetNotifyPayload);

             CallbackWrapper progress_cb;
  
        static NAN_GETTER(GetProgressCb);
        static NAN_SETTER(SetProgressCb);

             Nan::Persistent<Value> progress_payload;
  
        static NAN_GETTER(GetProgressPayload);
        static NAN_SETTER(SetProgressPayload);

             Nan::Persistent<Object> paths;
  
        static NAN_GETTER(GetPaths);
        static NAN_SETTER(SetPaths);

             Nan::Persistent<Object> baseline;
  
        static NAN_GETTER(GetBaseline);
        static NAN_SETTER(SetBaseline);

             Nan::Persistent<Object> baseline_index;
  
        static NAN_GETTER(GetBaselineIndex);
        static NAN_SETTER(SetBaselineIndex);

   
        static NAN_GETTER(GetTargetDirectory);
        static NAN_SETTER(SetTargetDirectory);

   
        static NAN_GETTER(GetAncestorLabel);
        static NAN_SETTER(SetAncestorLabel);

   
        static NAN_GETTER(GetOurLabel);
        static NAN_SETTER(SetOurLabel);

   
        static NAN_GETTER(GetTheirLabel);
        static NAN_SETTER(SetTheirLabel);

             CallbackWrapper perfdata_cb;
  
        static NAN_GETTER(GetPerfdataCb);
        static NAN_SETTER(SetPerfdataCb);

             Nan::Persistent<Value> perfdata_payload;
  
        static NAN_GETTER(GetPerfdataPayload);
        static NAN_SETTER(SetPerfdataPayload);

  };

#endif
