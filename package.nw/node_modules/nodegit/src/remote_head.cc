// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/remote_head.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/functions/free.h"
  #include "../include/oid.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitRemoteHead::~GitRemoteHead() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitRemoteHead::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("RemoteHead").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "local", Local);
         Nan::SetPrototypeMethod(tpl, "oid", Oid);
         Nan::SetPrototypeMethod(tpl, "loid", Loid);
         Nan::SetPrototypeMethod(tpl, "name", Name);
         Nan::SetPrototypeMethod(tpl, "symrefTarget", SymrefTarget);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("RemoteHead").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitRemoteHead::Local) {
      v8::Local<v8::Value> to;

       int
         local =
         Nan::ObjectWrap::Unwrap<GitRemoteHead>(info.This())->GetValue()->local;
 // start convert_to_v8 block
     to = Nan::New<Number>( local);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitRemoteHead::Oid) {
      v8::Local<v8::Value> to;

       git_oid
        *
          oid =
        &
          Nan::ObjectWrap::Unwrap<GitRemoteHead>(info.This())->GetValue()->oid;
 // start convert_to_v8 block
  
  if (oid != NULL) {
    // GitOid oid
       to = GitOid::New(oid, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitRemoteHead::Loid) {
      v8::Local<v8::Value> to;

       git_oid
        *
          loid =
        &
          Nan::ObjectWrap::Unwrap<GitRemoteHead>(info.This())->GetValue()->loid;
 // start convert_to_v8 block
  
  if (loid != NULL) {
    // GitOid loid
       to = GitOid::New(loid, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitRemoteHead::Name) {
      v8::Local<v8::Value> to;

       char *
         name =
         Nan::ObjectWrap::Unwrap<GitRemoteHead>(info.This())->GetValue()->name;
 // start convert_to_v8 block
  if (name){
       to = Nan::New<String>(name).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitRemoteHead::SymrefTarget) {
      v8::Local<v8::Value> to;

       char *
         symref_target =
         Nan::ObjectWrap::Unwrap<GitRemoteHead>(info.This())->GetValue()->symref_target;
 // start convert_to_v8 block
  if (symref_target){
       to = Nan::New<String>(symref_target).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitRemoteHeadTraits>;
 