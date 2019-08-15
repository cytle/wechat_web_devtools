// This is a generated file, modify: generate/templates/templates/struct_content.cc

#include <nan.h>
#include <string.h>
#ifdef WIN32
#include <windows.h>
#else
#include <unistd.h>
#endif // win32

extern "C" {
  #include <git2.h>
 }

#include <iostream>
#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/merge_file_input.h"
#include "nodegit_wrapper.cc"

 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitMergeFileInput::GitMergeFileInput() : NodeGitWrapper<GitMergeFileInputTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_merge_file_input wrappedValue = GIT_MERGE_FILE_INPUT_INIT;
      this->raw = (git_merge_file_input*) malloc(sizeof(git_merge_file_input));
      memcpy(this->raw, &wrappedValue, sizeof(git_merge_file_input));
  
  this->ConstructFields();
}

GitMergeFileInput::GitMergeFileInput(git_merge_file_input* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitMergeFileInputTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitMergeFileInput::~GitMergeFileInput() {
                }

void GitMergeFileInput::ConstructFields() {
                }

void GitMergeFileInput::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("MergeFileInput").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("ptr").ToLocalChecked(), GetPtr, SetPtr);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("size").ToLocalChecked(), GetSize, SetSize);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("path").ToLocalChecked(), GetPath, SetPath);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("mode").ToLocalChecked(), GetMode, SetMode);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("MergeFileInput").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitMergeFileInput::GetVersion) {

      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitMergeFileInput::SetVersion) {
      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitMergeFileInput::GetPtr) {

      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

        if (wrapper->GetValue()->ptr) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->ptr).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitMergeFileInput::SetPtr) {
      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

        if (wrapper->GetValue()->ptr) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->ptr = strdup(*str);

     }

      NAN_GETTER(GitMergeFileInput::GetSize) {

      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->size));
     }

    NAN_SETTER(GitMergeFileInput::SetSize) {
      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->size = (size_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitMergeFileInput::GetPath) {

      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

        if (wrapper->GetValue()->path) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->path).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitMergeFileInput::SetPath) {
      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

        if (wrapper->GetValue()->path) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->path = strdup(*str);

     }

      NAN_GETTER(GitMergeFileInput::GetMode) {

      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->mode));
     }

    NAN_SETTER(GitMergeFileInput::SetMode) {
      GitMergeFileInput *wrapper = Nan::ObjectWrap::Unwrap<GitMergeFileInput>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->mode = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitMergeFileInputTraits>;
