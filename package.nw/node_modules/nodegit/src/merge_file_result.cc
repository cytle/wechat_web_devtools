// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/merge_file_result.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitMergeFileResult::~GitMergeFileResult() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitMergeFileResult::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("MergeFileResult").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "automergeable", Automergeable);
         Nan::SetPrototypeMethod(tpl, "path", Path);
         Nan::SetPrototypeMethod(tpl, "mode", Mode);
         Nan::SetPrototypeMethod(tpl, "ptr", Ptr);
         Nan::SetPrototypeMethod(tpl, "len", Len);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("MergeFileResult").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitMergeFileResult::Automergeable) {
      v8::Local<v8::Value> to;

       unsigned int
         automergeable =
         Nan::ObjectWrap::Unwrap<GitMergeFileResult>(info.This())->GetValue()->automergeable;
 // start convert_to_v8 block
     to = Nan::New<Number>( automergeable);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitMergeFileResult::Path) {
      v8::Local<v8::Value> to;

       const char *
         path =
         Nan::ObjectWrap::Unwrap<GitMergeFileResult>(info.This())->GetValue()->path;
 // start convert_to_v8 block
  if (path){
       to = Nan::New<String>(path).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitMergeFileResult::Mode) {
      v8::Local<v8::Value> to;

       unsigned int
         mode =
         Nan::ObjectWrap::Unwrap<GitMergeFileResult>(info.This())->GetValue()->mode;
 // start convert_to_v8 block
     to = Nan::New<Number>( mode);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitMergeFileResult::Ptr) {
      v8::Local<v8::Value> to;

       const char *
         ptr =
         Nan::ObjectWrap::Unwrap<GitMergeFileResult>(info.This())->GetValue()->ptr;
 // start convert_to_v8 block
  if (ptr){
       to = Nan::New<String>(ptr).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitMergeFileResult::Len) {
      v8::Local<v8::Value> to;

       size_t
         len =
         Nan::ObjectWrap::Unwrap<GitMergeFileResult>(info.This())->GetValue()->len;
 // start convert_to_v8 block
     to = Nan::New<Number>( len);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitMergeFileResultTraits>;
 