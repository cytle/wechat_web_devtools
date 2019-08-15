// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/describe_format_options.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDescribeFormatOptions::~GitDescribeFormatOptions() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDescribeFormatOptions::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DescribeFormatOptions").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "version", Version);
         Nan::SetPrototypeMethod(tpl, "abbreviatedSize", AbbreviatedSize);
         Nan::SetPrototypeMethod(tpl, "alwaysUseLongFormat", AlwaysUseLongFormat);
         Nan::SetPrototypeMethod(tpl, "dirtySuffix", DirtySuffix);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DescribeFormatOptions").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDescribeFormatOptions::Version) {
      v8::Local<v8::Value> to;

       unsigned int
         version =
         Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This())->GetValue()->version;
 // start convert_to_v8 block
     to = Nan::New<Number>( version);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeFormatOptions::AbbreviatedSize) {
      v8::Local<v8::Value> to;

       unsigned int
         abbreviated_size =
         Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This())->GetValue()->abbreviated_size;
 // start convert_to_v8 block
     to = Nan::New<Number>( abbreviated_size);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeFormatOptions::AlwaysUseLongFormat) {
      v8::Local<v8::Value> to;

       int
         always_use_long_format =
         Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This())->GetValue()->always_use_long_format;
 // start convert_to_v8 block
     to = Nan::New<Number>( always_use_long_format);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeFormatOptions::DirtySuffix) {
      v8::Local<v8::Value> to;

       const char *
         dirty_suffix =
         Nan::ObjectWrap::Unwrap<GitDescribeFormatOptions>(info.This())->GetValue()->dirty_suffix;
 // start convert_to_v8 block
  if (dirty_suffix){
       to = Nan::New<String>(dirty_suffix).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDescribeFormatOptionsTraits>;
 