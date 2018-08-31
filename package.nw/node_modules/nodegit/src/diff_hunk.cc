// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/diff_hunk.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDiffHunk::~GitDiffHunk() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDiffHunk::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DiffHunk").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "oldStart", OldStart);
         Nan::SetPrototypeMethod(tpl, "oldLines", OldLines);
         Nan::SetPrototypeMethod(tpl, "newStart", NewStart);
         Nan::SetPrototypeMethod(tpl, "newLines", NewLines);
         Nan::SetPrototypeMethod(tpl, "headerLen", HeaderLen);
         Nan::SetPrototypeMethod(tpl, "header", Header);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DiffHunk").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDiffHunk::OldStart) {
      v8::Local<v8::Value> to;

       int
         old_start =
         Nan::ObjectWrap::Unwrap<GitDiffHunk>(info.This())->GetValue()->old_start;
 // start convert_to_v8 block
     to = Nan::New<Number>( old_start);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffHunk::OldLines) {
      v8::Local<v8::Value> to;

       int
         old_lines =
         Nan::ObjectWrap::Unwrap<GitDiffHunk>(info.This())->GetValue()->old_lines;
 // start convert_to_v8 block
     to = Nan::New<Number>( old_lines);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffHunk::NewStart) {
      v8::Local<v8::Value> to;

       int
         new_start =
         Nan::ObjectWrap::Unwrap<GitDiffHunk>(info.This())->GetValue()->new_start;
 // start convert_to_v8 block
     to = Nan::New<Number>( new_start);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffHunk::NewLines) {
      v8::Local<v8::Value> to;

       int
         new_lines =
         Nan::ObjectWrap::Unwrap<GitDiffHunk>(info.This())->GetValue()->new_lines;
 // start convert_to_v8 block
     to = Nan::New<Number>( new_lines);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffHunk::HeaderLen) {
      v8::Local<v8::Value> to;

       size_t
         header_len =
         Nan::ObjectWrap::Unwrap<GitDiffHunk>(info.This())->GetValue()->header_len;
 // start convert_to_v8 block
     to = Nan::New<Number>( header_len);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffHunk::Header) {
      v8::Local<v8::Value> to;

       char *
         header =
         Nan::ObjectWrap::Unwrap<GitDiffHunk>(info.This())->GetValue()->header;
 // start convert_to_v8 block
  if (header){
       to = Nan::New<String>(header).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffHunkTraits>;
 