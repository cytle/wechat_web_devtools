// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITREBASEOPTIONS_H
#define GITREBASEOPTIONS_H
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
  #include "../include/merge_options.h"
 
using namespace node;
using namespace v8;

class GitRebaseOptions;

struct GitRebaseOptionsTraits {
  typedef GitRebaseOptions cppClass;
  typedef git_rebase_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_rebase_options **dest, git_rebase_options *src) {
     Nan::ThrowError("duplicate called on GitRebaseOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_rebase_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitRebaseOptions : public NodeGitWrapper<GitRebaseOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitRebaseOptionsTraits>;
  public:
    GitRebaseOptions(git_rebase_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

           
  private:
    GitRebaseOptions();
    ~GitRebaseOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetQuiet);
        static NAN_SETTER(SetQuiet);

   
        static NAN_GETTER(GetRewriteNotesRef);
        static NAN_SETTER(SetRewriteNotesRef);

             Nan::Persistent<Object> checkout_options;
  
        static NAN_GETTER(GetCheckoutOptions);
        static NAN_SETTER(SetCheckoutOptions);

             Nan::Persistent<Object> merge_options;
  
        static NAN_GETTER(GetMergeOptions);
        static NAN_SETTER(SetMergeOptions);

  };

#endif
