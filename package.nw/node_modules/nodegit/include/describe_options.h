// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDESCRIBEOPTIONS_H
#define GITDESCRIBEOPTIONS_H
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

class GitDescribeOptions;

struct GitDescribeOptionsTraits {
  typedef GitDescribeOptions cppClass;
  typedef git_describe_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_describe_options **dest, git_describe_options *src) {
     Nan::ThrowError("duplicate called on GitDescribeOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_describe_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDescribeOptions : public
  NodeGitWrapper<GitDescribeOptionsTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDescribeOptionsTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDescribeOptions()
      : NodeGitWrapper<GitDescribeOptionsTraits>(
           "A new GitDescribeOptions cannot be instantiated."
       )
    {}
    GitDescribeOptions(git_describe_options *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDescribeOptionsTraits>(raw, selfFreeing, owner)
    {}
    ~GitDescribeOptions();
     static NAN_METHOD(Version);
    static NAN_METHOD(MaxCandidatesTags);
    static NAN_METHOD(DescribeStrategy);
    static NAN_METHOD(Pattern);
    static NAN_METHOD(OnlyFollowFirstParent);
    static NAN_METHOD(ShowCommitOidAsFallback);
};

#endif
