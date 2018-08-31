// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITDIFFFINDOPTIONS_H
#define GITDIFFFINDOPTIONS_H
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

class GitDiffFindOptions;

struct GitDiffFindOptionsTraits {
  typedef GitDiffFindOptions cppClass;
  typedef git_diff_find_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_find_options **dest, git_diff_find_options *src) {
     Nan::ThrowError("duplicate called on GitDiffFindOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_find_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitDiffFindOptions : public NodeGitWrapper<GitDiffFindOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffFindOptionsTraits>;
  public:
    GitDiffFindOptions(git_diff_find_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

               
  private:
    GitDiffFindOptions();
    ~GitDiffFindOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

   
        static NAN_GETTER(GetRenameThreshold);
        static NAN_SETTER(SetRenameThreshold);

   
        static NAN_GETTER(GetRenameFromRewriteThreshold);
        static NAN_SETTER(SetRenameFromRewriteThreshold);

   
        static NAN_GETTER(GetCopyThreshold);
        static NAN_SETTER(SetCopyThreshold);

   
        static NAN_GETTER(GetBreakRewriteThreshold);
        static NAN_SETTER(SetBreakRewriteThreshold);

   
        static NAN_GETTER(GetRenameLimit);
        static NAN_SETTER(SetRenameLimit);

  };

#endif
