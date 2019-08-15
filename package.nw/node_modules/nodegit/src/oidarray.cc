// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/oidarray.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/oid.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitOidarray::~GitOidarray() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
      }

  void GitOidarray::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Oidarray").ToLocalChecked());

          Nan::SetPrototypeMethod(tpl, "free", Free);
           Nan::SetPrototypeMethod(tpl, "ids", Ids);
         Nan::SetPrototypeMethod(tpl, "count", Count);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Oidarray").ToLocalChecked(), _constructor_template);
  }

  
/*
     */
NAN_METHOD(GitOidarray::Free) {
  Nan::EscapableHandleScope scope;

if (Nan::ObjectWrap::Unwrap<GitOidarray>(info.This())->GetValue() != NULL) {
 
  giterr_clear();

  {
    LockMaster lockMaster(/*asyncAction: */false        ,    Nan::ObjectWrap::Unwrap<GitOidarray>(info.This())->GetValue()
);

git_oidarray_free(
  Nan::ObjectWrap::Unwrap<GitOidarray>(info.This())->GetValue()
    );

    Nan::ObjectWrap::Unwrap<GitOidarray>(info.This())->ClearValue();
  }
     return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
       NAN_METHOD(GitOidarray::Ids) {
      v8::Local<v8::Value> to;

       git_oid *
          ids =
          Nan::ObjectWrap::Unwrap<GitOidarray>(info.This())->GetValue()->ids;
 // start convert_to_v8 block
  
  if (ids != NULL) {
    // GitOid ids
       to = GitOid::New(ids, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitOidarray::Count) {
      v8::Local<v8::Value> to;

       size_t
         count =
         Nan::ObjectWrap::Unwrap<GitOidarray>(info.This())->GetValue()->count;
 // start convert_to_v8 block
     to = Nan::New<Number>( count);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitOidarrayTraits>;
 