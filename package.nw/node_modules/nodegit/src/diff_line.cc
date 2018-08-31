// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/diff_line.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDiffLine::~GitDiffLine() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDiffLine::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DiffLine").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "origin", Origin);
         Nan::SetPrototypeMethod(tpl, "oldLineno", OldLineno);
         Nan::SetPrototypeMethod(tpl, "newLineno", NewLineno);
         Nan::SetPrototypeMethod(tpl, "numLines", NumLines);
         Nan::SetPrototypeMethod(tpl, "contentLen", ContentLen);
         Nan::SetPrototypeMethod(tpl, "contentOffset", ContentOffset);
         Nan::SetPrototypeMethod(tpl, "content", Content);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DiffLine").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDiffLine::Origin) {
      v8::Local<v8::Value> to;

       int
         origin =
         Nan::ObjectWrap::Unwrap<GitDiffLine>(info.This())->GetValue()->origin;
 // start convert_to_v8 block
     to = Nan::New<Number>( origin);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffLine::OldLineno) {
      v8::Local<v8::Value> to;

       int
         old_lineno =
         Nan::ObjectWrap::Unwrap<GitDiffLine>(info.This())->GetValue()->old_lineno;
 // start convert_to_v8 block
     to = Nan::New<Number>( old_lineno);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffLine::NewLineno) {
      v8::Local<v8::Value> to;

       int
         new_lineno =
         Nan::ObjectWrap::Unwrap<GitDiffLine>(info.This())->GetValue()->new_lineno;
 // start convert_to_v8 block
     to = Nan::New<Number>( new_lineno);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffLine::NumLines) {
      v8::Local<v8::Value> to;

       int
         num_lines =
         Nan::ObjectWrap::Unwrap<GitDiffLine>(info.This())->GetValue()->num_lines;
 // start convert_to_v8 block
     to = Nan::New<Number>( num_lines);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffLine::ContentLen) {
      v8::Local<v8::Value> to;

       size_t
         content_len =
         Nan::ObjectWrap::Unwrap<GitDiffLine>(info.This())->GetValue()->content_len;
 // start convert_to_v8 block
     to = Nan::New<Number>( content_len);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffLine::ContentOffset) {
      v8::Local<v8::Value> to;

       git_off_t
         content_offset =
         Nan::ObjectWrap::Unwrap<GitDiffLine>(info.This())->GetValue()->content_offset;
 // start convert_to_v8 block
     to = Nan::New<Number>( content_offset);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffLine::Content) {
      v8::Local<v8::Value> to;

       const char *
         content =
         Nan::ObjectWrap::Unwrap<GitDiffLine>(info.This())->GetValue()->content;
 // start convert_to_v8 block
  if (content){
       to = Nan::New<String>(content).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffLineTraits>;
 