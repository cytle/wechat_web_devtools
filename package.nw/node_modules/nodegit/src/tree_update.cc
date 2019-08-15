// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/tree_update.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/oid.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitTreeUpdate::~GitTreeUpdate() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitTreeUpdate::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("TreeUpdate").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "action", Action);
         Nan::SetPrototypeMethod(tpl, "id", Id);
         Nan::SetPrototypeMethod(tpl, "filemode", Filemode);
         Nan::SetPrototypeMethod(tpl, "path", Path);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("TreeUpdate").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitTreeUpdate::Action) {
      v8::Local<v8::Value> to;

       git_tree_update_t
         action =
         Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This())->GetValue()->action;
 // start convert_to_v8 block
     to = Nan::New<Number>( action);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTreeUpdate::Id) {
      v8::Local<v8::Value> to;

       git_oid
        *
          id =
        &
          Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This())->GetValue()->id;
 // start convert_to_v8 block
  
  if (id != NULL) {
    // GitOid id
       to = GitOid::New(id, true , info.This() );
   }
  else {
    to = Nan::Null();
  }

 // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTreeUpdate::Filemode) {
      v8::Local<v8::Value> to;

       git_filemode_t
         filemode =
         Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This())->GetValue()->filemode;
 // start convert_to_v8 block
     to = Nan::New<Number>( filemode);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitTreeUpdate::Path) {
      v8::Local<v8::Value> to;

       const char *
         path =
         Nan::ObjectWrap::Unwrap<GitTreeUpdate>(info.This())->GetValue()->path;
 // start convert_to_v8 block
  if (path){
       to = Nan::New<String>(path).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitTreeUpdateTraits>;
 