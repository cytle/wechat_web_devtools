// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITDIFFOPTIONS_H
#define GITDIFFOPTIONS_H
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

  #include "../include/strarray.h"
  #include "../include/diff.h"
  #include "../include/diff_delta.h"
 
using namespace node;
using namespace v8;

class GitDiffOptions;

struct GitDiffOptionsTraits {
  typedef GitDiffOptions cppClass;
  typedef git_diff_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_options **dest, git_diff_options *src) {
     Nan::ThrowError("duplicate called on GitDiffOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitDiffOptions : public NodeGitWrapper<GitDiffOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffOptionsTraits>;
  public:
    GitDiffOptions(git_diff_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                  static int notify_cb_cppCallback (
              const git_diff * diff_so_far
                ,
               git_diff_delta * delta_to_add
                ,
               const char * matched_pathspec
                ,
               void * payload
            );

          static void notify_cb_async(void *baton);
          static void notify_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct NotifyCbBaton : public AsyncBatonWithResult<int> {
                const git_diff * diff_so_far;
                git_diff_delta * delta_to_add;
                const char * matched_pathspec;
                void * payload;
 
              NotifyCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitDiffOptions * notify_cb_getInstanceFromBaton (
            NotifyCbBaton *baton);
            static int progress_cb_cppCallback (
              const git_diff * diff_so_far
                ,
               const char * old_path
                ,
               const char * new_path
                ,
               void * payload
            );

          static void progress_cb_async(void *baton);
          static void progress_cb_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct ProgressCbBaton : public AsyncBatonWithResult<int> {
                const git_diff * diff_so_far;
                const char * old_path;
                const char * new_path;
                void * payload;
 
              ProgressCbBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitDiffOptions * progress_cb_getInstanceFromBaton (
            ProgressCbBaton *baton);
                 
  private:
    GitDiffOptions();
    ~GitDiffOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

  
        static NAN_GETTER(GetIgnoreSubmodules);
        static NAN_SETTER(SetIgnoreSubmodules);

             Nan::Persistent<Object> pathspec;
  
        static NAN_GETTER(GetPathspec);
        static NAN_SETTER(SetPathspec);

             CallbackWrapper notify_cb;
  
        static NAN_GETTER(GetNotifyCb);
        static NAN_SETTER(SetNotifyCb);

             CallbackWrapper progress_cb;
  
        static NAN_GETTER(GetProgressCb);
        static NAN_SETTER(SetProgressCb);

             Nan::Persistent<Value> payload;
  
        static NAN_GETTER(GetPayload);
        static NAN_SETTER(SetPayload);

   
        static NAN_GETTER(GetContextLines);
        static NAN_SETTER(SetContextLines);

   
        static NAN_GETTER(GetInterhunkLines);
        static NAN_SETTER(SetInterhunkLines);

   
        static NAN_GETTER(GetIdAbbrev);
        static NAN_SETTER(SetIdAbbrev);

  
        static NAN_GETTER(GetMaxSize);
        static NAN_SETTER(SetMaxSize);

   
        static NAN_GETTER(GetOldPrefix);
        static NAN_SETTER(SetOldPrefix);

   
        static NAN_GETTER(GetNewPrefix);
        static NAN_SETTER(SetNewPrefix);

  };

#endif
