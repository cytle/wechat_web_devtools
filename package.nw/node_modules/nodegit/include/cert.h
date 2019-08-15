// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCERT_H
#define GITCERT_H
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

class GitCert;

struct GitCertTraits {
  typedef GitCert cppClass;
  typedef git_cert cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cert **dest, git_cert *src) {
     Nan::ThrowError("duplicate called on GitCert which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cert *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitCert : public
  NodeGitWrapper<GitCertTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCertTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCert()
      : NodeGitWrapper<GitCertTraits>(
           "A new GitCert cannot be instantiated."
       )
    {}
    GitCert(git_cert *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCertTraits>(raw, selfFreeing, owner)
    {}
    ~GitCert();
     static NAN_METHOD(CertType);
};

#endif
