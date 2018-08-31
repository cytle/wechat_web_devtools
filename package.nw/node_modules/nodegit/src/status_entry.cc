// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/status_entry.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/diff_delta.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitStatusEntry::~GitStatusEntry() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitStatusEntry::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("StatusEntry").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "status", Status);
         Nan::SetPrototypeMethod(tpl, "headToIndex", HeadToIndex);
         Nan::SetPrototypeMethod(tpl, "indexToWorkdir", IndexToWorkdir);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("StatusEntry").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitStatusEntry::Status) {
      v8::Local<v8::Value> to;

       git_status_t
         status =
         Nan::ObjectWrap::Unwrap<GitStatusEntry>(info.This())->GetValue()->status;
 // start convert_to_v8 block
     to = Nan::New<Number>( status);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitStatusEntry::HeadToIndex) {
      v8::Local<v8::Value> to;

       git_diff_delta *
          head_to_index =
          Nan::ObjectWrap::Unwrap<GitStatusEntry>(info.This())->GetValue()->head_to_index;
 // start convert_to_v8 block
  
  if (head_to_index != NULL) {
    // GitDiffDelta head_to_index
       to = GitDiffDelta::New(head_to_index, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitStatusEntry::IndexToWorkdir) {
      v8::Local<v8::Value> to;

       git_diff_delta *
          index_to_workdir =
          Nan::ObjectWrap::Unwrap<GitStatusEntry>(info.This())->GetValue()->index_to_workdir;
 // start convert_to_v8 block
  
  if (index_to_workdir != NULL) {
    // GitDiffDelta index_to_workdir
       to = GitDiffDelta::New(index_to_workdir, false , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitStatusEntryTraits>;
 