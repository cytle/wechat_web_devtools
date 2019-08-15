// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITPUSHOPTIONS_H
#define GITPUSHOPTIONS_H
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

  #include "../include/remote_callbacks.h"
  #include "../include/proxy_options.h"
  #include "../include/strarray.h"
 
using namespace node;
using namespace v8;

class GitPushOptions;

struct GitPushOptionsTraits {
  typedef GitPushOptions cppClass;
  typedef git_push_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_push_options **dest, git_push_options *src) {
     Nan::ThrowError("duplicate called on GitPushOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_push_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitPushOptions : public NodeGitWrapper<GitPushOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitPushOptionsTraits>;
  public:
    GitPushOptions(git_push_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

           
  private:
    GitPushOptions();
    ~GitPushOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetPbParallelism);
        static NAN_SETTER(SetPbParallelism);

             Nan::Persistent<Object> callbacks;
  
        static NAN_GETTER(GetCallbacks);
        static NAN_SETTER(SetCallbacks);

             Nan::Persistent<Object> proxy_opts;
  
        static NAN_GETTER(GetProxyOpts);
        static NAN_SETTER(SetProxyOpts);

             Nan::Persistent<Object> custom_headers;
  
        static NAN_GETTER(GetCustomHeaders);
        static NAN_SETTER(SetCustomHeaders);

  };

#endif
