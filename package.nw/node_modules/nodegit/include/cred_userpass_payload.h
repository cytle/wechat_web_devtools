// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCREDUSERPASSPAYLOAD_H
#define GITCREDUSERPASSPAYLOAD_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"

extern "C" {
#include <git2.h>
#include <git2/cred_helpers.h>
}

#include "../include/typedefs.h"


using namespace node;
using namespace v8;

class GitCredUserpassPayload;

struct GitCredUserpassPayloadTraits {
  typedef GitCredUserpassPayload cppClass;
  typedef git_cred_userpass_payload cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cred_userpass_payload **dest, git_cred_userpass_payload *src) {
     Nan::ThrowError("duplicate called on GitCredUserpassPayload which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cred_userpass_payload *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitCredUserpassPayload : public
  NodeGitWrapper<GitCredUserpassPayloadTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCredUserpassPayloadTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCredUserpassPayload()
      : NodeGitWrapper<GitCredUserpassPayloadTraits>(
           "A new GitCredUserpassPayload cannot be instantiated."
       )
    {}
    GitCredUserpassPayload(git_cred_userpass_payload *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCredUserpassPayloadTraits>(raw, selfFreeing, owner)
    {}
    ~GitCredUserpassPayload();
     static NAN_METHOD(Username);
    static NAN_METHOD(Password);
};

#endif
