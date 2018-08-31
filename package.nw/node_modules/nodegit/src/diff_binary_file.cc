// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/diff_binary_file.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDiffBinaryFile::~GitDiffBinaryFile() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDiffBinaryFile::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DiffBinaryFile").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "type", Type);
         Nan::SetPrototypeMethod(tpl, "data", Data);
         Nan::SetPrototypeMethod(tpl, "datalen", Datalen);
         Nan::SetPrototypeMethod(tpl, "inflatedlen", Inflatedlen);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DiffBinaryFile").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDiffBinaryFile::Type) {
      v8::Local<v8::Value> to;

       git_diff_binary_t
         type =
         Nan::ObjectWrap::Unwrap<GitDiffBinaryFile>(info.This())->GetValue()->type;
 // start convert_to_v8 block
     to = Nan::New<Number>( type);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffBinaryFile::Data) {
      v8::Local<v8::Value> to;

       const char *
         data =
         Nan::ObjectWrap::Unwrap<GitDiffBinaryFile>(info.This())->GetValue()->data;
 // start convert_to_v8 block
  if (data){
       to = Nan::New<String>(data).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffBinaryFile::Datalen) {
      v8::Local<v8::Value> to;

       size_t
         datalen =
         Nan::ObjectWrap::Unwrap<GitDiffBinaryFile>(info.This())->GetValue()->datalen;
 // start convert_to_v8 block
     to = Nan::New<Number>( datalen);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffBinaryFile::Inflatedlen) {
      v8::Local<v8::Value> to;

       size_t
         inflatedlen =
         Nan::ObjectWrap::Unwrap<GitDiffBinaryFile>(info.This())->GetValue()->inflatedlen;
 // start convert_to_v8 block
     to = Nan::New<Number>( inflatedlen);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffBinaryFileTraits>;
 