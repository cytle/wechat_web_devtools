// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/config_entry.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitConfigEntry::~GitConfigEntry() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitConfigEntry::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("ConfigEntry").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "name", Name);
         Nan::SetPrototypeMethod(tpl, "value", Value);
         Nan::SetPrototypeMethod(tpl, "level", Level);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("ConfigEntry").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitConfigEntry::Name) {
      v8::Local<v8::Value> to;

       const char *
         name =
         Nan::ObjectWrap::Unwrap<GitConfigEntry>(info.This())->GetValue()->name;
 // start convert_to_v8 block
  if (name){
       to = Nan::New<String>(name).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitConfigEntry::Value) {
      v8::Local<v8::Value> to;

       const char *
         value =
         Nan::ObjectWrap::Unwrap<GitConfigEntry>(info.This())->GetValue()->value;
 // start convert_to_v8 block
  if (value){
       to = Nan::New<String>(value).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitConfigEntry::Level) {
      v8::Local<v8::Value> to;

       git_config_level_t
         level =
         Nan::ObjectWrap::Unwrap<GitConfigEntry>(info.This())->GetValue()->level;
 // start convert_to_v8 block
     to = Nan::New<Number>( level);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitConfigEntryTraits>;
 