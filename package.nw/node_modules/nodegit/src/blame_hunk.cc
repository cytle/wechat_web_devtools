// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/blame_hunk.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/oid.h"
  #include "../include/signature.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitBlameHunk::~GitBlameHunk() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitBlameHunk::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("BlameHunk").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "linesInHunk", LinesInHunk);
         Nan::SetPrototypeMethod(tpl, "finalCommitId", FinalCommitId);
         Nan::SetPrototypeMethod(tpl, "finalStartLineNumber", FinalStartLineNumber);
         Nan::SetPrototypeMethod(tpl, "finalSignature", FinalSignature);
         Nan::SetPrototypeMethod(tpl, "origCommitId", OrigCommitId);
         Nan::SetPrototypeMethod(tpl, "origPath", OrigPath);
         Nan::SetPrototypeMethod(tpl, "origStartLineNumber", OrigStartLineNumber);
         Nan::SetPrototypeMethod(tpl, "origSignature", OrigSignature);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("BlameHunk").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitBlameHunk::LinesInHunk) {
      v8::Local<v8::Value> to;

       size_t
         lines_in_hunk =
         Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->lines_in_hunk;
 // start convert_to_v8 block
     to = Nan::New<Number>( lines_in_hunk);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitBlameHunk::FinalCommitId) {
      v8::Local<v8::Value> to;

       git_oid
        *
          final_commit_id =
        &
          Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->final_commit_id;
 // start convert_to_v8 block
  
  if (final_commit_id != NULL) {
    // GitOid final_commit_id
       to = GitOid::New(final_commit_id, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitBlameHunk::FinalStartLineNumber) {
      v8::Local<v8::Value> to;

       size_t
         final_start_line_number =
         Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->final_start_line_number;
 // start convert_to_v8 block
     to = Nan::New<Number>( final_start_line_number);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitBlameHunk::FinalSignature) {
      v8::Local<v8::Value> to;

       git_signature *
          final_signature =
          Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->final_signature;
 // start convert_to_v8 block
  
  if (final_signature != NULL) {
    // GitSignature final_signature
       to = GitSignature::New(final_signature, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitBlameHunk::OrigCommitId) {
      v8::Local<v8::Value> to;

       git_oid
        *
          orig_commit_id =
        &
          Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->orig_commit_id;
 // start convert_to_v8 block
  
  if (orig_commit_id != NULL) {
    // GitOid orig_commit_id
       to = GitOid::New(orig_commit_id, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitBlameHunk::OrigPath) {
      v8::Local<v8::Value> to;

       const char *
         orig_path =
         Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->orig_path;
 // start convert_to_v8 block
  if (orig_path){
       to = Nan::New<String>(orig_path).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitBlameHunk::OrigStartLineNumber) {
      v8::Local<v8::Value> to;

       size_t
         orig_start_line_number =
         Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->orig_start_line_number;
 // start convert_to_v8 block
     to = Nan::New<Number>( orig_start_line_number);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitBlameHunk::OrigSignature) {
      v8::Local<v8::Value> to;

       git_signature *
          orig_signature =
          Nan::ObjectWrap::Unwrap<GitBlameHunk>(info.This())->GetValue()->orig_signature;
 // start convert_to_v8 block
  
  if (orig_signature != NULL) {
    // GitSignature orig_signature
       to = GitSignature::New(orig_signature, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitBlameHunkTraits>;
 