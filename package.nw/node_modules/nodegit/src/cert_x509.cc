// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/cert_x509.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/wrapper.h"
  #include "node_buffer.h"
  #include "../include/cert.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitCertX509::~GitCertX509() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitCertX509::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("CertX509").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "parent", Parent);
         Nan::SetPrototypeMethod(tpl, "data", Data);
         Nan::SetPrototypeMethod(tpl, "len", Len);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("CertX509").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitCertX509::Parent) {
      v8::Local<v8::Value> to;

       git_cert
        *
          parent =
        &
          Nan::ObjectWrap::Unwrap<GitCertX509>(info.This())->GetValue()->parent;
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
     NAN_METHOD(GitCertX509::Data) {
      v8::Local<v8::Value> to;

       void *
          data =
          Nan::ObjectWrap::Unwrap<GitCertX509>(info.This())->GetValue()->data;
 // start convert_to_v8 block
  
  if (data != NULL) {
    // Wrapper data
      to = Wrapper::New(data);
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitCertX509::Len) {
      v8::Local<v8::Value> to;

       size_t
         len =
         Nan::ObjectWrap::Unwrap<GitCertX509>(info.This())->GetValue()->len;
 // start convert_to_v8 block
     to = Nan::New<Number>( len);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitCertX509Traits>;
 