// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITPUSH_H
#define GITPUSH_H
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

#include "../include/push_options.h"
// Forward declaration.
struct git_push {
};

using namespace node;
using namespace v8;

class GitPush;

struct GitPushTraits {
  typedef GitPush cppClass;
  typedef git_push cType;

  static const bool isDuplicable = false;
  static void duplicate(git_push **dest, git_push *src) {
     Nan::ThrowError("duplicate called on GitPush which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_push *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitPush : public
  NodeGitWrapper<GitPushTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitPushTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

     

  private:
    GitPush()
      : NodeGitWrapper<GitPushTraits>(
           "A new GitPush cannot be instantiated."
       )
    {}
    GitPush(git_push *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitPushTraits>(raw, selfFreeing, owner)
    {}
    ~GitPush();
     
    static NAN_METHOD(InitOptions);
};

#endif
