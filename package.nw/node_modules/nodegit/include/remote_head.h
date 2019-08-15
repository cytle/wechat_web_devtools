// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREMOTEHEAD_H
#define GITREMOTEHEAD_H
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

#include "../include/functions/free.h"
#include "../include/oid.h"

using namespace node;
using namespace v8;

class GitRemoteHead;

struct GitRemoteHeadTraits {
  typedef GitRemoteHead cppClass;
  typedef git_remote_head cType;

  static const bool isDuplicable = false;
  static void duplicate(git_remote_head **dest, git_remote_head *src) {
     Nan::ThrowError("duplicate called on GitRemoteHead which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_remote_head *raw) {
    ::git_remote_head_free(raw); // :: to avoid calling this free recursively
   }
};

class GitRemoteHead : public
  NodeGitWrapper<GitRemoteHeadTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitRemoteHeadTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitRemoteHead()
      : NodeGitWrapper<GitRemoteHeadTraits>(
           "A new GitRemoteHead cannot be instantiated."
       )
    {}
    GitRemoteHead(git_remote_head *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitRemoteHeadTraits>(raw, selfFreeing, owner)
    {}
    ~GitRemoteHead();
     static NAN_METHOD(Local);
    static NAN_METHOD(Oid);
    static NAN_METHOD(Loid);
    static NAN_METHOD(Name);
    static NAN_METHOD(SymrefTarget);
};

#endif
