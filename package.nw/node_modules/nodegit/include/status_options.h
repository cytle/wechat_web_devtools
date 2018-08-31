// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITSTATUSOPTIONS_H
#define GITSTATUSOPTIONS_H
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
 
using namespace node;
using namespace v8;

class GitStatusOptions;

struct GitStatusOptionsTraits {
  typedef GitStatusOptions cppClass;
  typedef git_status_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_status_options **dest, git_status_options *src) {
     Nan::ThrowError("duplicate called on GitStatusOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_status_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitStatusOptions : public NodeGitWrapper<GitStatusOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitStatusOptionsTraits>;
  public:
    GitStatusOptions(git_status_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

         
  private:
    GitStatusOptions();
    ~GitStatusOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

  
        static NAN_GETTER(GetShow);
        static NAN_SETTER(SetShow);

  
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

             Nan::Persistent<Object> pathspec;
  
        static NAN_GETTER(GetPathspec);
        static NAN_SETTER(SetPathspec);

  };

#endif
