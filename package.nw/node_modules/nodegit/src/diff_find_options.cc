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
#include "../include/diff_find_options.h"
#include "nodegit_wrapper.cc"

 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitDiffFindOptions::GitDiffFindOptions() : NodeGitWrapper<GitDiffFindOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_diff_find_options wrappedValue = GIT_DIFF_FIND_OPTIONS_INIT;
      this->raw = (git_diff_find_options*) malloc(sizeof(git_diff_find_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_diff_find_options));
  
  this->ConstructFields();
}

GitDiffFindOptions::GitDiffFindOptions(git_diff_find_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitDiffFindOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitDiffFindOptions::~GitDiffFindOptions() {
                      }

void GitDiffFindOptions::ConstructFields() {
                      }

void GitDiffFindOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("DiffFindOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flags").ToLocalChecked(), GetFlags, SetFlags);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("renameThreshold").ToLocalChecked(), GetRenameThreshold, SetRenameThreshold);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("renameFromRewriteThreshold").ToLocalChecked(), GetRenameFromRewriteThreshold, SetRenameFromRewriteThreshold);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("copyThreshold").ToLocalChecked(), GetCopyThreshold, SetCopyThreshold);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("breakRewriteThreshold").ToLocalChecked(), GetBreakRewriteThreshold, SetBreakRewriteThreshold);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("renameLimit").ToLocalChecked(), GetRenameLimit, SetRenameLimit);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("DiffFindOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitDiffFindOptions::GetVersion) {

      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitDiffFindOptions::SetVersion) {
      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDiffFindOptions::GetFlags) {

      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->flags));
     }

    NAN_SETTER(GitDiffFindOptions::SetFlags) {
      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->flags = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDiffFindOptions::GetRenameThreshold) {

      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->rename_threshold));
     }

    NAN_SETTER(GitDiffFindOptions::SetRenameThreshold) {
      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->rename_threshold = (uint16_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDiffFindOptions::GetRenameFromRewriteThreshold) {

      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->rename_from_rewrite_threshold));
     }

    NAN_SETTER(GitDiffFindOptions::SetRenameFromRewriteThreshold) {
      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->rename_from_rewrite_threshold = (uint16_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDiffFindOptions::GetCopyThreshold) {

      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->copy_threshold));
     }

    NAN_SETTER(GitDiffFindOptions::SetCopyThreshold) {
      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->copy_threshold = (uint16_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDiffFindOptions::GetBreakRewriteThreshold) {

      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->break_rewrite_threshold));
     }

    NAN_SETTER(GitDiffFindOptions::SetBreakRewriteThreshold) {
      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->break_rewrite_threshold = (uint16_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitDiffFindOptions::GetRenameLimit) {

      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->rename_limit));
     }

    NAN_SETTER(GitDiffFindOptions::SetRenameLimit) {
      GitDiffFindOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffFindOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->rename_limit = (size_t) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffFindOptionsTraits>;
