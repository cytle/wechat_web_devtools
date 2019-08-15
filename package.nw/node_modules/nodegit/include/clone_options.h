// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITCLONEOPTIONS_H
#define GITCLONEOPTIONS_H
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
  #include "../include/fetch_options.h"
 
using namespace node;
using namespace v8;

class GitCloneOptions;

struct GitCloneOptionsTraits {
  typedef GitCloneOptions cppClass;
  typedef git_clone_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_clone_options **dest, git_clone_options *src) {
     Nan::ThrowError("duplicate called on GitCloneOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_clone_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitCloneOptions : public NodeGitWrapper<GitCloneOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitCloneOptionsTraits>;
  public:
    GitCloneOptions(git_clone_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                 
  private:
    GitCloneOptions();
    ~GitCloneOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

             Nan::Persistent<Object> checkout_opts;
  
        static NAN_GETTER(GetCheckoutOpts);
        static NAN_SETTER(SetCheckoutOpts);

             Nan::Persistent<Object> fetch_opts;
  
        static NAN_GETTER(GetFetchOpts);
        static NAN_SETTER(SetFetchOpts);

   
        static NAN_GETTER(GetBare);
        static NAN_SETTER(SetBare);

  
        static NAN_GETTER(GetLocal);
        static NAN_SETTER(SetLocal);

   
        static NAN_GETTER(GetCheckoutBranch);
        static NAN_SETTER(SetCheckoutBranch);

             Nan::Persistent<Value> repository_cb_payload;
  
        static NAN_GETTER(GetRepositoryCbPayload);
        static NAN_SETTER(SetRepositoryCbPayload);

             Nan::Persistent<Value> remote_cb_payload;
  
        static NAN_GETTER(GetRemoteCbPayload);
        static NAN_SETTER(SetRemoteCbPayload);

  };

#endif
