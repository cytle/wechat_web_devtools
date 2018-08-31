// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTREEUPDATE_H
#define GITTREEUPDATE_H
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

class GitTreeUpdate;

struct GitTreeUpdateTraits {
  typedef GitTreeUpdate cppClass;
  typedef git_tree_update cType;

  static const bool isDuplicable = false;
  static void duplicate(git_tree_update **dest, git_tree_update *src) {
     Nan::ThrowError("duplicate called on GitTreeUpdate which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_tree_update *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitTreeUpdate : public
  NodeGitWrapper<GitTreeUpdateTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTreeUpdateTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitTreeUpdate()
      : NodeGitWrapper<GitTreeUpdateTraits>(
           "A new GitTreeUpdate cannot be instantiated."
       )
    {}
    GitTreeUpdate(git_tree_update *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTreeUpdateTraits>(raw, selfFreeing, owner)
    {}
    ~GitTreeUpdate();
     static NAN_METHOD(Action);
    static NAN_METHOD(Id);
    static NAN_METHOD(Filemode);
    static NAN_METHOD(Path);
};

#endif
