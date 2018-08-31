// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITSUBMODULEUPDATEOPTIONS_H
#define GITSUBMODULEUPDATEOPTIONS_H
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

class GitSubmoduleUpdateOptions;

struct GitSubmoduleUpdateOptionsTraits {
  typedef GitSubmoduleUpdateOptions cppClass;
  typedef git_submodule_update_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_submodule_update_options **dest, git_submodule_update_options *src) {
     Nan::ThrowError("duplicate called on GitSubmoduleUpdateOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_submodule_update_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitSubmoduleUpdateOptions : public NodeGitWrapper<GitSubmoduleUpdateOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitSubmoduleUpdateOptionsTraits>;
  public:
    GitSubmoduleUpdateOptions(git_submodule_update_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

         
  private:
    GitSubmoduleUpdateOptions();
    ~GitSubmoduleUpdateOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

             Nan::Persistent<Object> checkout_opts;
  
        static NAN_GETTER(GetCheckoutOpts);
        static NAN_SETTER(SetCheckoutOpts);

             Nan::Persistent<Object> fetch_opts;
  
        static NAN_GETTER(GetFetchOpts);
        static NAN_SETTER(SetFetchOpts);

   
        static NAN_GETTER(GetAllowFetch);
        static NAN_SETTER(SetAllowFetch);

  };

#endif
