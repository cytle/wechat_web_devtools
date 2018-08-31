// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
    #include <git2/sys/diff.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/diff_perfdata.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDiffPerfdata::~GitDiffPerfdata() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDiffPerfdata::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DiffPerfdata").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "version", Version);
         Nan::SetPrototypeMethod(tpl, "statCalls", StatCalls);
         Nan::SetPrototypeMethod(tpl, "oidCalculations", OidCalculations);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DiffPerfdata").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDiffPerfdata::Version) {
      v8::Local<v8::Value> to;

       unsigned int
         version =
         Nan::ObjectWrap::Unwrap<GitDiffPerfdata>(info.This())->GetValue()->version;
 // start convert_to_v8 block
     to = Nan::New<Number>( version);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffPerfdata::StatCalls) {
      v8::Local<v8::Value> to;

       size_t
         stat_calls =
         Nan::ObjectWrap::Unwrap<GitDiffPerfdata>(info.This())->GetValue()->stat_calls;
 // start convert_to_v8 block
     to = Nan::New<Number>( stat_calls);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffPerfdata::OidCalculations) {
      v8::Local<v8::Value> to;

       size_t
         oid_calculations =
         Nan::ObjectWrap::Unwrap<GitDiffPerfdata>(info.This())->GetValue()->oid_calculations;
 // start convert_to_v8 block
     to = Nan::New<Number>( oid_calculations);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffPerfdataTraits>;
 