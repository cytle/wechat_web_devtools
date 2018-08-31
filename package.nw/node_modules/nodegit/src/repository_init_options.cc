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
#include "../include/repository_init_options.h"
#include "nodegit_wrapper.cc"

 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitRepositoryInitOptions::GitRepositoryInitOptions() : NodeGitWrapper<GitRepositoryInitOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_repository_init_options wrappedValue = GIT_REPOSITORY_INIT_OPTIONS_INIT;
      this->raw = (git_repository_init_options*) malloc(sizeof(git_repository_init_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_repository_init_options));
  
  this->ConstructFields();
}

GitRepositoryInitOptions::GitRepositoryInitOptions(git_repository_init_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitRepositoryInitOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitRepositoryInitOptions::~GitRepositoryInitOptions() {
                         }

void GitRepositoryInitOptions::ConstructFields() {
                         }

void GitRepositoryInitOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("RepositoryInitOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flags").ToLocalChecked(), GetFlags, SetFlags);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("mode").ToLocalChecked(), GetMode, SetMode);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("workdirPath").ToLocalChecked(), GetWorkdirPath, SetWorkdirPath);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("description").ToLocalChecked(), GetDescription, SetDescription);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("templatePath").ToLocalChecked(), GetTemplatePath, SetTemplatePath);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("initialHead").ToLocalChecked(), GetInitialHead, SetInitialHead);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("originUrl").ToLocalChecked(), GetOriginUrl, SetOriginUrl);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("RepositoryInitOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitRepositoryInitOptions::GetVersion) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitRepositoryInitOptions::SetVersion) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRepositoryInitOptions::GetFlags) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->flags));
     }

    NAN_SETTER(GitRepositoryInitOptions::SetFlags) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->flags = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRepositoryInitOptions::GetMode) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->mode));
     }

    NAN_SETTER(GitRepositoryInitOptions::SetMode) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->mode = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRepositoryInitOptions::GetWorkdirPath) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->workdir_path) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->workdir_path).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRepositoryInitOptions::SetWorkdirPath) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->workdir_path) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->workdir_path = strdup(*str);

     }

      NAN_GETTER(GitRepositoryInitOptions::GetDescription) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->description) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->description).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRepositoryInitOptions::SetDescription) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->description) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->description = strdup(*str);

     }

      NAN_GETTER(GitRepositoryInitOptions::GetTemplatePath) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->template_path) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->template_path).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRepositoryInitOptions::SetTemplatePath) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->template_path) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->template_path = strdup(*str);

     }

      NAN_GETTER(GitRepositoryInitOptions::GetInitialHead) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->initial_head) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->initial_head).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRepositoryInitOptions::SetInitialHead) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->initial_head) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->initial_head = strdup(*str);

     }

      NAN_GETTER(GitRepositoryInitOptions::GetOriginUrl) {

      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->origin_url) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->origin_url).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRepositoryInitOptions::SetOriginUrl) {
      GitRepositoryInitOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRepositoryInitOptions>(info.This());

        if (wrapper->GetValue()->origin_url) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->origin_url = strdup(*str);

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitRepositoryInitOptionsTraits>;
