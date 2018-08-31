// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITODBEXPANDID_H
#define GITODBEXPANDID_H
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

class GitOdbExpandId;

struct GitOdbExpandIdTraits {
  typedef GitOdbExpandId cppClass;
  typedef git_odb_expand_id cType;

  static const bool isDuplicable = false;
  static void duplicate(git_odb_expand_id **dest, git_odb_expand_id *src) {
     Nan::ThrowError("duplicate called on GitOdbExpandId which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_odb_expand_id *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitOdbExpandId : public
  NodeGitWrapper<GitOdbExpandIdTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOdbExpandIdTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitOdbExpandId()
      : NodeGitWrapper<GitOdbExpandIdTraits>(
           "A new GitOdbExpandId cannot be instantiated."
       )
    {}
    GitOdbExpandId(git_odb_expand_id *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOdbExpandIdTraits>(raw, selfFreeing, owner)
    {}
    ~GitOdbExpandId();
     static NAN_METHOD(Id);
    static NAN_METHOD(Length);
    static NAN_METHOD(Type);
};

#endif
