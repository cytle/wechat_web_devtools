// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITFILTER_H
#define GITFILTER_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
    #include <git2/sys/filter.h>
 }

  #include "../include/filter_source.h"
  #include "../include/buf.h"
 
using namespace node;
using namespace v8;

class GitFilter;

struct GitFilterTraits {
  typedef GitFilter cppClass;
  typedef git_filter cType;

  static const bool isDuplicable = false;
  static void duplicate(git_filter **dest, git_filter *src) {
     Nan::ThrowError("duplicate called on GitFilter which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_filter *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
struct git_filter_extended {
  git_filter raw;
  void* payload;
};
 class GitFilter : public NodeGitWrapper<GitFilterTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitFilterTraits>;
  public:
    GitFilter(git_filter* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

              static int initialize_cppCallback (
              git_filter * self
            );

          static void initialize_async(void *baton);
          static void initialize_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct InitializeBaton : public AsyncBatonWithResult<int> {
                git_filter * self;
 
              InitializeBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitFilter * initialize_getInstanceFromBaton (
            InitializeBaton *baton);
            static void shutdown_cppCallback (
              git_filter * self
            );

          static void shutdown_async(void *baton);
          static void shutdown_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
            struct ShutdownBaton : public AsyncBatonWithNoResult {
                git_filter * self;
 
              ShutdownBaton()
                : AsyncBatonWithNoResult() {
                }
            };
           static GitFilter * shutdown_getInstanceFromBaton (
            ShutdownBaton *baton);
            static int check_cppCallback (
              git_filter * self
                ,
               void ** payload
                ,
               const git_filter_source * src
                ,
               const char ** attr_values
            );

          static void check_async(void *baton);
          static void check_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct CheckBaton : public AsyncBatonWithResult<int> {
                git_filter * self;
                void ** payload;
                const git_filter_source * src;
                const char ** attr_values;
 
              CheckBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitFilter * check_getInstanceFromBaton (
            CheckBaton *baton);
            static int apply_cppCallback (
              git_filter * self
                ,
               void ** payload
                ,
               git_buf * to
                ,
               const git_buf * from
                ,
               const git_filter_source * src
            );

          static void apply_async(void *baton);
          static void apply_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct ApplyBaton : public AsyncBatonWithResult<int> {
                git_filter * self;
                void ** payload;
                git_buf * to;
                const git_buf * from;
                const git_filter_source * src;
 
              ApplyBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitFilter * apply_getInstanceFromBaton (
            ApplyBaton *baton);
            static void cleanup_cppCallback (
              git_filter * self
                ,
               void * payload
            );

          static void cleanup_async(void *baton);
          static void cleanup_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
            struct CleanupBaton : public AsyncBatonWithNoResult {
                git_filter * self;
                void * payload;
 
              CleanupBaton()
                : AsyncBatonWithNoResult() {
                }
            };
           static GitFilter * cleanup_getInstanceFromBaton (
            CleanupBaton *baton);
   
  private:
    GitFilter();
    ~GitFilter();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetAttributes);
        static NAN_SETTER(SetAttributes);

             CallbackWrapper initialize;
  
        static NAN_GETTER(GetInitialize);
        static NAN_SETTER(SetInitialize);

             CallbackWrapper shutdown;
  
        static NAN_GETTER(GetShutdown);
        static NAN_SETTER(SetShutdown);

             CallbackWrapper check;
  
        static NAN_GETTER(GetCheck);
        static NAN_SETTER(SetCheck);

             CallbackWrapper apply;
  
        static NAN_GETTER(GetApply);
        static NAN_SETTER(SetApply);

             CallbackWrapper cleanup;
  
        static NAN_GETTER(GetCleanup);
        static NAN_SETTER(SetCleanup);

  };

#endif
