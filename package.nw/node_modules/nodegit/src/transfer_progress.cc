// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/transfer_progress.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitTransferProgress::~GitTransferProgress() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitTransferProgress::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("TransferProgress").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "totalObjects", TotalObjects);
         Nan::SetPrototypeMethod(tpl, "indexedObjects", IndexedObjects);
         Nan::SetPrototypeMethod(tpl, "receivedObjects", ReceivedObjects);
         Nan::SetPrototypeMethod(tpl, "localObjects", LocalObjects);
         Nan::SetPrototypeMethod(tpl, "totalDeltas", TotalDeltas);
         Nan::SetPrototypeMethod(tpl, "indexedDeltas", IndexedDeltas);
         Nan::SetPrototypeMethod(tpl, "receivedBytes", ReceivedBytes);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("TransferProgress").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitTransferProgress::TotalObjects) {
      v8::Local<v8::Value> to;

       unsigned int
         total_objects =
         Nan::ObjectWrap::Unwrap<GitTransferProgress>(info.This())->GetValue()->total_objects;
 // start convert_to_v8 block
     to = Nan::New<Number>( total_objects);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTransferProgress::IndexedObjects) {
      v8::Local<v8::Value> to;

       unsigned int
         indexed_objects =
         Nan::ObjectWrap::Unwrap<GitTransferProgress>(info.This())->GetValue()->indexed_objects;
 // start convert_to_v8 block
     to = Nan::New<Number>( indexed_objects);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTransferProgress::ReceivedObjects) {
      v8::Local<v8::Value> to;

       unsigned int
         received_objects =
         Nan::ObjectWrap::Unwrap<GitTransferProgress>(info.This())->GetValue()->received_objects;
 // start convert_to_v8 block
     to = Nan::New<Number>( received_objects);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTransferProgress::LocalObjects) {
      v8::Local<v8::Value> to;

       unsigned int
         local_objects =
         Nan::ObjectWrap::Unwrap<GitTransferProgress>(info.This())->GetValue()->local_objects;
 // start convert_to_v8 block
     to = Nan::New<Number>( local_objects);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTransferProgress::TotalDeltas) {
      v8::Local<v8::Value> to;

       unsigned int
         total_deltas =
         Nan::ObjectWrap::Unwrap<GitTransferProgress>(info.This())->GetValue()->total_deltas;
 // start convert_to_v8 block
     to = Nan::New<Number>( total_deltas);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTransferProgress::IndexedDeltas) {
      v8::Local<v8::Value> to;

       unsigned int
         indexed_deltas =
         Nan::ObjectWrap::Unwrap<GitTransferProgress>(info.This())->GetValue()->indexed_deltas;
 // start convert_to_v8 block
     to = Nan::New<Number>( indexed_deltas);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTransferProgress::ReceivedBytes) {
      v8::Local<v8::Value> to;

       size_t
         received_bytes =
         Nan::ObjectWrap::Unwrap<GitTransferProgress>(info.This())->GetValue()->received_bytes;
 // start convert_to_v8 block
     to = Nan::New<Number>( received_bytes);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitTransferProgressTraits>;
 