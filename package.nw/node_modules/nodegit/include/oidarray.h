// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITOIDARRAY_H
#define GITOIDARRAY_H
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

class GitOidarray;

struct GitOidarrayTraits {
  typedef GitOidarray cppClass;
  typedef git_oidarray cType;

  static const bool isDuplicable = false;
  static void duplicate(git_oidarray **dest, git_oidarray *src) {
     Nan::ThrowError("duplicate called on GitOidarray which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_oidarray *raw) {
    ::git_oidarray_free(raw); // :: to avoid calling this free recursively
   }
};

class GitOidarray : public
  NodeGitWrapper<GitOidarrayTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOidarrayTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

    

  private:
    GitOidarray()
      : NodeGitWrapper<GitOidarrayTraits>(
           "A new GitOidarray cannot be instantiated."
       )
    {}
    GitOidarray(git_oidarray *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOidarrayTraits>(raw, selfFreeing, owner)
    {}
    ~GitOidarray();
        static NAN_METHOD(Ids);
    static NAN_METHOD(Count);

    static NAN_METHOD(Free);
};

#endif
