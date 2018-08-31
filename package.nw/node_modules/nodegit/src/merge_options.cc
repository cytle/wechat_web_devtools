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
#include "../include/merge_options.h"
#include "nodegit_wrapper.cc"

 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitMergeOptions::GitMergeOptions() : NodeGitWrapper<GitMergeOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_merge_options wrappedValue = GIT_MERGE_OPTIONS_INIT;
      this->raw = (git_merge_options*) malloc(sizeof(git_merge_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_merge_options));
  
  this->ConstructFields();
}

GitMergeOptions::GitMergeOptions(git_merge_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitMergeOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitMergeOptions::~GitMergeOptions() {
                      }

void GitMergeOptions::ConstructFields() {
                      }

void GitMergeOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("MergeOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flags").ToLocalChecked(), GetFlags, SetFlags);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("renameThreshold").ToLocalChecked(), GetRenameThreshold, SetRenameThreshold);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("targetLimit").ToLocalChecked(), GetTargetLimit, SetTargetLimit);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("recursionLimit").ToLocalChecked(), GetRecursionLimit, SetRecursionLimit);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("defaultDriver").ToLocalChecked(), GetDefaultDriver, SetDefaultDriver);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("fileFavor").ToLocalChecked(), GetFileFavor, SetFileFavor);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("fileFlags").ToLocalChecked(), GetFileFlags, SetFileFlags);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("MergeOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitMergeOptions::GetVersion) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitMergeOptions::SetVersion) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitMergeOptions::GetFlags) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->flags));

     }

    NAN_SETTER(GitMergeOptions::SetFlags) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->flags = (git_merge_flag_t) Nan::To<int32_t>(value).FromJust();
        }

     }

      NAN_GETTER(GitMergeOptions::GetRenameThreshold) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->rename_threshold));
     }

    NAN_SETTER(GitMergeOptions::SetRenameThreshold) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->rename_threshold = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitMergeOptions::GetTargetLimit) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->target_limit));
     }

    NAN_SETTER(GitMergeOptions::SetTargetLimit) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->target_limit = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitMergeOptions::GetRecursionLimit) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->recursion_limit));
     }

    NAN_SETTER(GitMergeOptions::SetRecursionLimit) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->recursion_limit = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitMergeOptions::GetDefaultDriver) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        if (wrapper->GetValue()->default_driver) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->default_driver).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitMergeOptions::SetDefaultDriver) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        if (wrapper->GetValue()->default_driver) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->default_driver = strdup(*str);

     }

      NAN_GETTER(GitMergeOptions::GetFileFavor) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->file_favor));

     }

    NAN_SETTER(GitMergeOptions::SetFileFavor) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->file_favor = (git_merge_file_favor_t) Nan::To<int32_t>(value).FromJust();
        }

     }

      NAN_GETTER(GitMergeOptions::GetFileFlags) {

      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->file_flags));

     }

    NAN_SETTER(GitMergeOptions::SetFileFlags) {
      GitMergeOptions *wrapper = Nan::ObjectWrap::Unwrap<GitMergeOptions>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->file_flags = (git_merge_file_flag_t) Nan::To<int32_t>(value).FromJust();
        }

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitMergeOptionsTraits>;
