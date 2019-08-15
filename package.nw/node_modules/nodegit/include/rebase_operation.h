// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREBASEOPERATION_H
#define GITREBASEOPERATION_H
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

class GitRebaseOperation;

struct GitRebaseOperationTraits {
  typedef GitRebaseOperation cppClass;
  typedef git_rebase_operation cType;

  static const bool isDuplicable = false;
  static void duplicate(git_rebase_operation **dest, git_rebase_operation *src) {
     Nan::ThrowError("duplicate called on GitRebaseOperation which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_rebase_operation *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitRebaseOperation : public
  NodeGitWrapper<GitRebaseOperationTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitRebaseOperationTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitRebaseOperation()
      : NodeGitWrapper<GitRebaseOperationTraits>(
           "A new GitRebaseOperation cannot be instantiated."
       )
    {}
    GitRebaseOperation(git_rebase_operation *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitRebaseOperationTraits>(raw, selfFreeing, owner)
    {}
    ~GitRebaseOperation();
     static NAN_METHOD(Type);
    static NAN_METHOD(Id);
    static NAN_METHOD(Exec);
};

#endif
