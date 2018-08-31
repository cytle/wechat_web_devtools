// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/diff_delta.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/diff_file.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDiffDelta::~GitDiffDelta() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDiffDelta::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DiffDelta").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "status", Status);
         Nan::SetPrototypeMethod(tpl, "flags", Flags);
         Nan::SetPrototypeMethod(tpl, "similarity", Similarity);
         Nan::SetPrototypeMethod(tpl, "nfiles", Nfiles);
         Nan::SetPrototypeMethod(tpl, "oldFile", OldFile);
         Nan::SetPrototypeMethod(tpl, "newFile", NewFile);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DiffDelta").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDiffDelta::Status) {
      v8::Local<v8::Value> to;

       git_delta_t
         status =
         Nan::ObjectWrap::Unwrap<GitDiffDelta>(info.This())->GetValue()->status;
 // start convert_to_v8 block
     to = Nan::New<Number>( status);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffDelta::Flags) {
      v8::Local<v8::Value> to;

       uint32_t
         flags =
         Nan::ObjectWrap::Unwrap<GitDiffDelta>(info.This())->GetValue()->flags;
 // start convert_to_v8 block
     to = Nan::New<Number>( flags);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffDelta::Similarity) {
      v8::Local<v8::Value> to;

       uint16_t
         similarity =
         Nan::ObjectWrap::Unwrap<GitDiffDelta>(info.This())->GetValue()->similarity;
 // start convert_to_v8 block
     to = Nan::New<Number>( similarity);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffDelta::Nfiles) {
      v8::Local<v8::Value> to;

       uint16_t
         nfiles =
         Nan::ObjectWrap::Unwrap<GitDiffDelta>(info.This())->GetValue()->nfiles;
 // start convert_to_v8 block
     to = Nan::New<Number>( nfiles);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffDelta::OldFile) {
      v8::Local<v8::Value> to;

       git_diff_file
        *
          old_file =
        &
          Nan::ObjectWrap::Unwrap<GitDiffDelta>(info.This())->GetValue()->old_file;
 // start convert_to_v8 block
  
  if (old_file != NULL) {
    // GitDiffFile old_file
       to = GitDiffFile::New(old_file, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffDelta::NewFile) {
      v8::Local<v8::Value> to;

       git_diff_file
        *
          new_file =
        &
          Nan::ObjectWrap::Unwrap<GitDiffDelta>(info.This())->GetValue()->new_file;
 // start convert_to_v8 block
  
  if (new_file != NULL) {
    // GitDiffFile new_file
       to = GitDiffFile::New(new_file, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffDeltaTraits>;
 