// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/diff_file.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/oid.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDiffFile::~GitDiffFile() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDiffFile::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DiffFile").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "id", Id);
         Nan::SetPrototypeMethod(tpl, "path", Path);
         Nan::SetPrototypeMethod(tpl, "size", Size);
         Nan::SetPrototypeMethod(tpl, "flags", Flags);
         Nan::SetPrototypeMethod(tpl, "mode", Mode);
         Nan::SetPrototypeMethod(tpl, "idAbbrev", IdAbbrev);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DiffFile").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDiffFile::Id) {
      v8::Local<v8::Value> to;

       git_oid
        *
          id =
        &
          Nan::ObjectWrap::Unwrap<GitDiffFile>(info.This())->GetValue()->id;
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
     NAN_METHOD(GitDiffFile::Path) {
      v8::Local<v8::Value> to;

       const char *
         path =
         Nan::ObjectWrap::Unwrap<GitDiffFile>(info.This())->GetValue()->path;
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
     NAN_METHOD(GitDiffFile::Size) {
      v8::Local<v8::Value> to;

       git_off_t
         size =
         Nan::ObjectWrap::Unwrap<GitDiffFile>(info.This())->GetValue()->size;
 // start convert_to_v8 block
     to = Nan::New<Number>( size);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffFile::Flags) {
      v8::Local<v8::Value> to;

       uint32_t
         flags =
         Nan::ObjectWrap::Unwrap<GitDiffFile>(info.This())->GetValue()->flags;
 // start convert_to_v8 block
     to = Nan::New<Number>( flags);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffFile::Mode) {
      v8::Local<v8::Value> to;

       uint16_t
         mode =
         Nan::ObjectWrap::Unwrap<GitDiffFile>(info.This())->GetValue()->mode;
 // start convert_to_v8 block
     to = Nan::New<Number>( mode);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDiffFile::IdAbbrev) {
      v8::Local<v8::Value> to;

       uint16_t
         id_abbrev =
         Nan::ObjectWrap::Unwrap<GitDiffFile>(info.This())->GetValue()->id_abbrev;
 // start convert_to_v8 block
     to = Nan::New<Number>( id_abbrev);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffFileTraits>;
 