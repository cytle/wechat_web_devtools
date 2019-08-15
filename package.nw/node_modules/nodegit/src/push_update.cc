// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/push_update.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/oid.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitPushUpdate::~GitPushUpdate() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitPushUpdate::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("PushUpdate").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "srcRefname", SrcRefname);
         Nan::SetPrototypeMethod(tpl, "dstRefname", DstRefname);
         Nan::SetPrototypeMethod(tpl, "src", Src);
         Nan::SetPrototypeMethod(tpl, "dst", Dst);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("PushUpdate").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitPushUpdate::SrcRefname) {
      v8::Local<v8::Value> to;

       char *
         src_refname =
         Nan::ObjectWrap::Unwrap<GitPushUpdate>(info.This())->GetValue()->src_refname;
 // start convert_to_v8 block
  if (src_refname){
       to = Nan::New<String>(src_refname).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitPushUpdate::DstRefname) {
      v8::Local<v8::Value> to;

       char *
         dst_refname =
         Nan::ObjectWrap::Unwrap<GitPushUpdate>(info.This())->GetValue()->dst_refname;
 // start convert_to_v8 block
  if (dst_refname){
       to = Nan::New<String>(dst_refname).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitPushUpdate::Src) {
      v8::Local<v8::Value> to;

       git_oid
        *
          src =
        &
          Nan::ObjectWrap::Unwrap<GitPushUpdate>(info.This())->GetValue()->src;
 // start convert_to_v8 block
  
  if (src != NULL) {
    // GitOid src
       to = GitOid::New(src, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitPushUpdate::Dst) {
      v8::Local<v8::Value> to;

       git_oid
        *
          dst =
        &
          Nan::ObjectWrap::Unwrap<GitPushUpdate>(info.This())->GetValue()->dst;
 // start convert_to_v8 block
  
  if (dst != NULL) {
    // GitOid dst
       to = GitOid::New(dst, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitPushUpdateTraits>;
 