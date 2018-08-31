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
#include "../include/submodule_update_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/checkout_options.h"
  #include "../include/fetch_options.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitSubmoduleUpdateOptions::GitSubmoduleUpdateOptions() : NodeGitWrapper<GitSubmoduleUpdateOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_submodule_update_options wrappedValue = GIT_SUBMODULE_UPDATE_OPTIONS_INIT;
      this->raw = (git_submodule_update_options*) malloc(sizeof(git_submodule_update_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_submodule_update_options));
  
  this->ConstructFields();
}

GitSubmoduleUpdateOptions::GitSubmoduleUpdateOptions(git_submodule_update_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitSubmoduleUpdateOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitSubmoduleUpdateOptions::~GitSubmoduleUpdateOptions() {
             }

void GitSubmoduleUpdateOptions::ConstructFields() {
             v8::Local<Object> checkout_optsTemp = GitCheckoutOptions::New(
&this->raw->checkout_opts,
            false
          )->ToObject();
          this->checkout_opts.Reset(checkout_optsTemp);

             v8::Local<Object> fetch_optsTemp = GitFetchOptions::New(
&this->raw->fetch_opts,
            false
          )->ToObject();
          this->fetch_opts.Reset(fetch_optsTemp);

       }

void GitSubmoduleUpdateOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("SubmoduleUpdateOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("checkoutOpts").ToLocalChecked(), GetCheckoutOpts, SetCheckoutOpts);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("fetchOpts").ToLocalChecked(), GetFetchOpts, SetFetchOpts);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("allowFetch").ToLocalChecked(), GetAllowFetch, SetAllowFetch);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("SubmoduleUpdateOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitSubmoduleUpdateOptions::GetVersion) {

      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitSubmoduleUpdateOptions::SetVersion) {
      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitSubmoduleUpdateOptions::GetCheckoutOpts) {

      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->checkout_opts));

     }

    NAN_SETTER(GitSubmoduleUpdateOptions::SetCheckoutOpts) {
      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

        v8::Local<Object> checkout_opts(value->ToObject());

        wrapper->checkout_opts.Reset(checkout_opts);

        wrapper->raw->checkout_opts = *  Nan::ObjectWrap::Unwrap<GitCheckoutOptions>(checkout_opts->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitSubmoduleUpdateOptions::GetFetchOpts) {

      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->fetch_opts));

     }

    NAN_SETTER(GitSubmoduleUpdateOptions::SetFetchOpts) {
      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

        v8::Local<Object> fetch_opts(value->ToObject());

        wrapper->fetch_opts.Reset(fetch_opts);

        wrapper->raw->fetch_opts = *  Nan::ObjectWrap::Unwrap<GitFetchOptions>(fetch_opts->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitSubmoduleUpdateOptions::GetAllowFetch) {

      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->allow_fetch));
     }

    NAN_SETTER(GitSubmoduleUpdateOptions::SetAllowFetch) {
      GitSubmoduleUpdateOptions *wrapper = Nan::ObjectWrap::Unwrap<GitSubmoduleUpdateOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->allow_fetch = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitSubmoduleUpdateOptionsTraits>;
