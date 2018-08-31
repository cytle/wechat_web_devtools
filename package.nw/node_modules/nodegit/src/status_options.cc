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
#include "../include/status_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/strarray.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitStatusOptions::GitStatusOptions() : NodeGitWrapper<GitStatusOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_status_options wrappedValue = GIT_STATUS_OPTIONS_INIT;
      this->raw = (git_status_options*) malloc(sizeof(git_status_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_status_options));
  
  this->ConstructFields();
}

GitStatusOptions::GitStatusOptions(git_status_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitStatusOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitStatusOptions::~GitStatusOptions() {
           }

void GitStatusOptions::ConstructFields() {
                 v8::Local<Object> pathspecTemp = GitStrarray::New(
&this->raw->pathspec,
            false
          )->ToObject();
          this->pathspec.Reset(pathspecTemp);

    }

void GitStatusOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("StatusOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("show").ToLocalChecked(), GetShow, SetShow);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flags").ToLocalChecked(), GetFlags, SetFlags);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("pathspec").ToLocalChecked(), GetPathspec, SetPathspec);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("StatusOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitStatusOptions::GetVersion) {

      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitStatusOptions::SetVersion) {
      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitStatusOptions::GetShow) {

      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->show));

     }

    NAN_SETTER(GitStatusOptions::SetShow) {
      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->show = (git_status_show_t) Nan::To<int32_t>(value).FromJust();
        }

     }

      NAN_GETTER(GitStatusOptions::GetFlags) {

      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->flags));

     }

    NAN_SETTER(GitStatusOptions::SetFlags) {
      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->flags = (git_status_opt_t) Nan::To<int32_t>(value).FromJust();
        }

     }

      NAN_GETTER(GitStatusOptions::GetPathspec) {

      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->pathspec));

     }

    NAN_SETTER(GitStatusOptions::SetPathspec) {
      GitStatusOptions *wrapper = Nan::ObjectWrap::Unwrap<GitStatusOptions>(info.This());

        v8::Local<Object> pathspec(value->ToObject());

        wrapper->pathspec.Reset(pathspec);

        wrapper->raw->pathspec = * StrArrayConverter::Convert(pathspec->ToObject()) ;

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitStatusOptionsTraits>;
