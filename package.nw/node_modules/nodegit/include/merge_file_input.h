// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITMERGEFILEINPUT_H
#define GITMERGEFILEINPUT_H
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

class GitMergeFileInput;

struct GitMergeFileInputTraits {
  typedef GitMergeFileInput cppClass;
  typedef git_merge_file_input cType;

  static const bool isDuplicable = false;
  static void duplicate(git_merge_file_input **dest, git_merge_file_input *src) {
     Nan::ThrowError("duplicate called on GitMergeFileInput which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_merge_file_input *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitMergeFileInput : public NodeGitWrapper<GitMergeFileInputTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitMergeFileInputTraits>;
  public:
    GitMergeFileInput(git_merge_file_input* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

           
  private:
    GitMergeFileInput();
    ~GitMergeFileInput();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetPtr);
        static NAN_SETTER(SetPtr);

   
        static NAN_GETTER(GetSize);
        static NAN_SETTER(SetSize);

   
        static NAN_GETTER(GetPath);
        static NAN_SETTER(SetPath);

   
        static NAN_GETTER(GetMode);
        static NAN_SETTER(SetMode);

  };

#endif
