// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCREDUSERNAME_H
#define GITCREDUSERNAME_H
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

#include "../include/cred.h"

using namespace node;
using namespace v8;

class GitCredUsername;

struct GitCredUsernameTraits {
  typedef GitCredUsername cppClass;
  typedef git_cred_username cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cred_username **dest, git_cred_username *src) {
     Nan::ThrowError("duplicate called on GitCredUsername which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cred_username *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitCredUsername : public
  NodeGitWrapper<GitCredUsernameTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCredUsernameTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCredUsername()
      : NodeGitWrapper<GitCredUsernameTraits>(
           "A new GitCredUsername cannot be instantiated."
       )
    {}
    GitCredUsername(git_cred_username *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCredUsernameTraits>(raw, selfFreeing, owner)
    {}
    ~GitCredUsername();
     static NAN_METHOD(Parent);
    static NAN_METHOD(Username);
};

#endif
