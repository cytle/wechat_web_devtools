// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCREDDEFAULT_H
#define GITCREDDEFAULT_H
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

class GitCredDefault;

struct GitCredDefaultTraits {
  typedef GitCredDefault cppClass;
  typedef git_cred_default cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cred_default **dest, git_cred_default *src) {
     Nan::ThrowError("duplicate called on GitCredDefault which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cred_default *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitCredDefault : public
  NodeGitWrapper<GitCredDefaultTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCredDefaultTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCredDefault()
      : NodeGitWrapper<GitCredDefaultTraits>(
           "A new GitCredDefault cannot be instantiated."
       )
    {}
    GitCredDefault(git_cred_default *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCredDefaultTraits>(raw, selfFreeing, owner)
    {}
    ~GitCredDefault();
 };

#endif
