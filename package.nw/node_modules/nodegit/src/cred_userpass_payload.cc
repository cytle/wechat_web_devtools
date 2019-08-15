// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
    #include <git2/cred_helpers.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/cred_userpass_payload.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitCredUserpassPayload::~GitCredUserpassPayload() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitCredUserpassPayload::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("CredUserpassPayload").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "username", Username);
         Nan::SetPrototypeMethod(tpl, "password", Password);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("CredUserpassPayload").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitCredUserpassPayload::Username) {
      v8::Local<v8::Value> to;

       const char *
         username =
         Nan::ObjectWrap::Unwrap<GitCredUserpassPayload>(info.This())->GetValue()->username;
 // start convert_to_v8 block
  if (username){
       to = Nan::New<String>(username).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitCredUserpassPayload::Password) {
      v8::Local<v8::Value> to;

       const char *
         password =
         Nan::ObjectWrap::Unwrap<GitCredUserpassPayload>(info.This())->GetValue()->password;
 // start convert_to_v8 block
  if (password){
       to = Nan::New<String>(password).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitCredUserpassPayloadTraits>;
 