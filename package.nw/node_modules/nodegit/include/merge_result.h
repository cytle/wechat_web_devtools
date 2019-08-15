// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITMERGERESULT_H
#define GITMERGERESULT_H
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

// Forward declaration.
struct git_merge_result {
};

using namespace node;
using namespace v8;

class GitMergeResult;

struct GitMergeResultTraits {
  typedef GitMergeResult cppClass;
  typedef git_merge_result cType;

  static const bool isDuplicable = false;
  static void duplicate(git_merge_result **dest, git_merge_result *src) {
     Nan::ThrowError("duplicate called on GitMergeResult which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_merge_result *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitMergeResult : public
  NodeGitWrapper<GitMergeResultTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitMergeResultTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitMergeResult()
      : NodeGitWrapper<GitMergeResultTraits>(
           "A new GitMergeResult cannot be instantiated."
       )
    {}
    GitMergeResult(git_merge_result *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitMergeResultTraits>(raw, selfFreeing, owner)
    {}
    ~GitMergeResult();
 };

#endif
