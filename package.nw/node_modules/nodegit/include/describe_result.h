// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDESCRIBERESULT_H
#define GITDESCRIBERESULT_H
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
struct git_describe_result {
};

using namespace node;
using namespace v8;

class GitDescribeResult;

struct GitDescribeResultTraits {
  typedef GitDescribeResult cppClass;
  typedef git_describe_result cType;

  static const bool isDuplicable = false;
  static void duplicate(git_describe_result **dest, git_describe_result *src) {
     Nan::ThrowError("duplicate called on GitDescribeResult which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_describe_result *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDescribeResult : public
  NodeGitWrapper<GitDescribeResultTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDescribeResultTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDescribeResult()
      : NodeGitWrapper<GitDescribeResultTraits>(
           "A new GitDescribeResult cannot be instantiated."
       )
    {}
    GitDescribeResult(git_describe_result *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDescribeResultTraits>(raw, selfFreeing, owner)
    {}
    ~GitDescribeResult();
 };

#endif
