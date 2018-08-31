// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITCHERRYPICKOPTIONS_H
#define GITCHERRYPICKOPTIONS_H
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

  #include "../include/merge_options.h"
  #include "../include/checkout_options.h"
 
using namespace node;
using namespace v8;

class GitCherrypickOptions;

struct GitCherrypickOptionsTraits {
  typedef GitCherrypickOptions cppClass;
  typedef git_cherrypick_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cherrypick_options **dest, git_cherrypick_options *src) {
     Nan::ThrowError("duplicate called on GitCherrypickOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cherrypick_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitCherrypickOptions : public NodeGitWrapper<GitCherrypickOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitCherrypickOptionsTraits>;
  public:
    GitCherrypickOptions(git_cherrypick_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

         
  private:
    GitCherrypickOptions();
    ~GitCherrypickOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetMainline);
        static NAN_SETTER(SetMainline);

             Nan::Persistent<Object> merge_opts;
  
        static NAN_GETTER(GetMergeOpts);
        static NAN_SETTER(SetMergeOpts);

             Nan::Persistent<Object> checkout_opts;
  
        static NAN_GETTER(GetCheckoutOpts);
        static NAN_SETTER(SetCheckoutOpts);

  };

#endif
