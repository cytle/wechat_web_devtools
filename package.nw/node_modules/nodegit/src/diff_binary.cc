// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/diff_binary.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/diff_binary_file.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDiffBinary::~GitDiffBinary() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDiffBinary::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DiffBinary").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "containsData", ContainsData);
         Nan::SetPrototypeMethod(tpl, "oldFile", OldFile);
         Nan::SetPrototypeMethod(tpl, "newFile", NewFile);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DiffBinary").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDiffBinary::ContainsData) {
      v8::Local<v8::Value> to;

       unsigned int
         contains_data =
         Nan::ObjectWrap::Unwrap<GitDiffBinary>(info.This())->GetValue()->contains_data;
 // start convert_to_v8 block
     to = Nan::New<Number>( contains_data);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffBinary::OldFile) {
      v8::Local<v8::Value> to;

       git_diff_binary_file
        *
          old_file =
        &
          Nan::ObjectWrap::Unwrap<GitDiffBinary>(info.This())->GetValue()->old_file;
 // start convert_to_v8 block
  
  if (old_file != NULL) {
    // GitDiffBinaryFile old_file
       to = GitDiffBinaryFile::New(old_file, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffBinary::NewFile) {
      v8::Local<v8::Value> to;

       git_diff_binary_file
        *
          new_file =
        &
          Nan::ObjectWrap::Unwrap<GitDiffBinary>(info.This())->GetValue()->new_file;
 // start convert_to_v8 block
  
  if (new_file != NULL) {
    // GitDiffBinaryFile new_file
       to = GitDiffBinaryFile::New(new_file, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffBinaryTraits>;
 