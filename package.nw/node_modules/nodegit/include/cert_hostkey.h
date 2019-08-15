// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCERTHOSTKEY_H
#define GITCERTHOSTKEY_H
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

#include "../include/cert.h"

using namespace node;
using namespace v8;

class GitCertHostkey;

struct GitCertHostkeyTraits {
  typedef GitCertHostkey cppClass;
  typedef git_cert_hostkey cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cert_hostkey **dest, git_cert_hostkey *src) {
     Nan::ThrowError("duplicate called on GitCertHostkey which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cert_hostkey *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitCertHostkey : public
  NodeGitWrapper<GitCertHostkeyTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCertHostkeyTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCertHostkey()
      : NodeGitWrapper<GitCertHostkeyTraits>(
           "A new GitCertHostkey cannot be instantiated."
       )
    {}
    GitCertHostkey(git_cert_hostkey *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCertHostkeyTraits>(raw, selfFreeing, owner)
    {}
    ~GitCertHostkey();
     static NAN_METHOD(Parent);
    static NAN_METHOD(Type);
    static NAN_METHOD(HashMd5);
    static NAN_METHOD(HashSha1);
};

#endif
