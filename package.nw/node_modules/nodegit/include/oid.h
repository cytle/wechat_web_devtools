// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITOID_H
#define GITOID_H
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

class GitOid;

struct GitOidTraits {
  typedef GitOid cppClass;
  typedef git_oid cType;

  static const bool isDuplicable = true;
  static void duplicate(git_oid **dest, git_oid *src) {
    git_oid *copy = (git_oid *)malloc(sizeof(git_oid));
    git_oid_cpy(copy, src);
    *dest = copy;
   }

  static const bool isFreeable = true;
  static void free(git_oid *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitOid : public
  NodeGitWrapper<GitOidTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitOidTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                    

  private:
    GitOid()
      : NodeGitWrapper<GitOidTraits>(
           "A new GitOid cannot be instantiated."
       )
    {}
    GitOid(git_oid *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitOidTraits>(raw, selfFreeing, owner)
    {}
    ~GitOid();
                                    
    static NAN_METHOD(Cmp);

    static NAN_METHOD(Cpy);

    static NAN_METHOD(Equal);

    static NAN_METHOD(Fromstr);

    static NAN_METHOD(Iszero);

    static NAN_METHOD(Ncmp);

    static NAN_METHOD(Strcmp);

    static NAN_METHOD(Streq);

    static NAN_METHOD(TostrS);
};

#endif
