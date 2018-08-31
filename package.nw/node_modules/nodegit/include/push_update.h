// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITPUSHUPDATE_H
#define GITPUSHUPDATE_H
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

#include "../include/oid.h"

using namespace node;
using namespace v8;

class GitPushUpdate;

struct GitPushUpdateTraits {
  typedef GitPushUpdate cppClass;
  typedef git_push_update cType;

  static const bool isDuplicable = false;
  static void duplicate(git_push_update **dest, git_push_update *src) {
     Nan::ThrowError("duplicate called on GitPushUpdate which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_push_update *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitPushUpdate : public
  NodeGitWrapper<GitPushUpdateTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitPushUpdateTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitPushUpdate()
      : NodeGitWrapper<GitPushUpdateTraits>(
           "A new GitPushUpdate cannot be instantiated."
       )
    {}
    GitPushUpdate(git_push_update *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitPushUpdateTraits>(raw, selfFreeing, owner)
    {}
    ~GitPushUpdate();
     static NAN_METHOD(SrcRefname);
    static NAN_METHOD(DstRefname);
    static NAN_METHOD(Src);
    static NAN_METHOD(Dst);
};

#endif
