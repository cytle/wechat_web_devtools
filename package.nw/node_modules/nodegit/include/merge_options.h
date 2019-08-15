// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITMERGEOPTIONS_H
#define GITMERGEOPTIONS_H
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

 
using namespace node;
using namespace v8;

class GitMergeOptions;

struct GitMergeOptionsTraits {
  typedef GitMergeOptions cppClass;
  typedef git_merge_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_merge_options **dest, git_merge_options *src) {
     Nan::ThrowError("duplicate called on GitMergeOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_merge_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitMergeOptions : public NodeGitWrapper<GitMergeOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitMergeOptionsTraits>;
  public:
    GitMergeOptions(git_merge_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                 
  private:
    GitMergeOptions();
    ~GitMergeOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

  
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

   
        static NAN_GETTER(GetRenameThreshold);
        static NAN_SETTER(SetRenameThreshold);

   
        static NAN_GETTER(GetTargetLimit);
        static NAN_SETTER(SetTargetLimit);

   
        static NAN_GETTER(GetRecursionLimit);
        static NAN_SETTER(SetRecursionLimit);

   
        static NAN_GETTER(GetDefaultDriver);
        static NAN_SETTER(SetDefaultDriver);

  
        static NAN_GETTER(GetFileFavor);
        static NAN_SETTER(SetFileFavor);

  
        static NAN_GETTER(GetFileFlags);
        static NAN_SETTER(SetFileFlags);

  };

#endif
