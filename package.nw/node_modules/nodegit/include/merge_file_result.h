// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITMERGEFILERESULT_H
#define GITMERGEFILERESULT_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;

class GitMergeFileResult;

struct GitMergeFileResultTraits {
  typedef GitMergeFileResult cppClass;
  typedef git_merge_file_result cType;

  static const bool isDuplicable = false;
  static void duplicate(git_merge_file_result **dest, git_merge_file_result *src) {
     Nan::ThrowError("duplicate called on GitMergeFileResult which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_merge_file_result *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitMergeFileResult : public
  NodeGitWrapper<GitMergeFileResultTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitMergeFileResultTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitMergeFileResult()
      : NodeGitWrapper<GitMergeFileResultTraits>(
           "A new GitMergeFileResult cannot be instantiated."
       )
    {}
    GitMergeFileResult(git_merge_file_result *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitMergeFileResultTraits>(raw, selfFreeing, owner)
    {}
    ~GitMergeFileResult();
     static NAN_METHOD(Automergeable);
    static NAN_METHOD(Path);
    static NAN_METHOD(Mode);
    static NAN_METHOD(Ptr);
    static NAN_METHOD(Len);
};

#endif
