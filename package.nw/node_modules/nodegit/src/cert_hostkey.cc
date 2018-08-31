// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/cert_hostkey.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/cert.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitCertHostkey::~GitCertHostkey() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitCertHostkey::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("CertHostkey").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "parent", Parent);
         Nan::SetPrototypeMethod(tpl, "type", Type);
         Nan::SetPrototypeMethod(tpl, "hashMd5", HashMd5);
         Nan::SetPrototypeMethod(tpl, "hashSha1", HashSha1);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("CertHostkey").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitCertHostkey::Parent) {
      v8::Local<v8::Value> to;

       git_cert
        *
          parent =
        &
          Nan::ObjectWrap::Unwrap<GitCertHostkey>(info.This())->GetValue()->parent;
 // start convert_to_v8 block
  
  if (parent != NULL) {
    // GitCert parent
       to = GitCert::New(parent, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitCertHostkey::Type) {
      v8::Local<v8::Value> to;

       git_cert_ssh_t
         type =
         Nan::ObjectWrap::Unwrap<GitCertHostkey>(info.This())->GetValue()->type;
 // start convert_to_v8 block
     to = Nan::New<Number>( type);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitCertHostkey::HashMd5) {
      v8::Local<v8::Value> to;

      char* hash_md5 = (char *)Nan::ObjectWrap::Unwrap<GitCertHostkey>(info.This())->GetValue()->hash_md5;
 // start convert_to_v8 block
  if (hash_md5){
      to = Nan::New<String>(hash_md5, 16).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitCertHostkey::HashSha1) {
      v8::Local<v8::Value> to;

      char* hash_sha1 = (char *)Nan::ObjectWrap::Unwrap<GitCertHostkey>(info.This())->GetValue()->hash_sha1;
 // start convert_to_v8 block
  if (hash_sha1){
      to = Nan::New<String>(hash_sha1, 20).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitCertHostkeyTraits>;
 