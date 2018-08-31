// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/index_time.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitIndexTime::~GitIndexTime() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitIndexTime::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("IndexTime").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "seconds", Seconds);
         Nan::SetPrototypeMethod(tpl, "nanoseconds", Nanoseconds);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("IndexTime").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitIndexTime::Seconds) {
      v8::Local<v8::Value> to;

       int32_t
         seconds =
         Nan::ObjectWrap::Unwrap<GitIndexTime>(info.This())->GetValue()->seconds;
 // start convert_to_v8 block
     to = Nan::New<Number>( seconds);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitIndexTime::Nanoseconds) {
      v8::Local<v8::Value> to;

       uint32_t
         nanoseconds =
         Nan::ObjectWrap::Unwrap<GitIndexTime>(info.This())->GetValue()->nanoseconds;
 // start convert_to_v8 block
     to = Nan::New<Number>( nanoseconds);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitIndexTimeTraits>;
 