// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCERTX509_H
#define GITCERTX509_H
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

#include "../include/wrapper.h"
#include "node_buffer.h"
#include "../include/cert.h"

using namespace node;
using namespace v8;

class GitCertX509;

struct GitCertX509Traits {
  typedef GitCertX509 cppClass;
  typedef git_cert_x509 cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cert_x509 **dest, git_cert_x509 *src) {
     Nan::ThrowError("duplicate called on GitCertX509 which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cert_x509 *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitCertX509 : public
  NodeGitWrapper<GitCertX509Traits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCertX509Traits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCertX509()
      : NodeGitWrapper<GitCertX509Traits>(
           "A new GitCertX509 cannot be instantiated."
       )
    {}
    GitCertX509(git_cert_x509 *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCertX509Traits>(raw, selfFreeing, owner)
    {}
    ~GitCertX509();
     static NAN_METHOD(Parent);
    static NAN_METHOD(Data);
    static NAN_METHOD(Len);
};

#endif
