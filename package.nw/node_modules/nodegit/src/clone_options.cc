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
#include "../include/clone_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/checkout_options.h"
  #include "../include/fetch_options.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitCloneOptions::GitCloneOptions() : NodeGitWrapper<GitCloneOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_clone_options wrappedValue = GIT_CLONE_OPTIONS_INIT;
      this->raw = (git_clone_options*) malloc(sizeof(git_clone_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_clone_options));
  
  this->ConstructFields();
}

GitCloneOptions::GitCloneOptions(git_clone_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitCloneOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitCloneOptions::~GitCloneOptions() {
                        }

void GitCloneOptions::ConstructFields() {
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

           
          v8::Local<Value> repository_cb_payload = Nan::Undefined();
          this->repository_cb_payload.Reset(repository_cb_payload);
   
          v8::Local<Value> remote_cb_payload = Nan::Undefined();
          this->remote_cb_payload.Reset(remote_cb_payload);
    }

void GitCloneOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("CloneOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("checkoutOpts").ToLocalChecked(), GetCheckoutOpts, SetCheckoutOpts);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("fetchOpts").ToLocalChecked(), GetFetchOpts, SetFetchOpts);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("bare").ToLocalChecked(), GetBare, SetBare);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("local").ToLocalChecked(), GetLocal, SetLocal);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("checkoutBranch").ToLocalChecked(), GetCheckoutBranch, SetCheckoutBranch);
       
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("CloneOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitCloneOptions::GetVersion) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitCloneOptions::SetVersion) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitCloneOptions::GetCheckoutOpts) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->checkout_opts));

     }

    NAN_SETTER(GitCloneOptions::SetCheckoutOpts) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        v8::Local<Object> checkout_opts(value->ToObject());

        wrapper->checkout_opts.Reset(checkout_opts);

        wrapper->raw->checkout_opts = *  Nan::ObjectWrap::Unwrap<GitCheckoutOptions>(checkout_opts->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitCloneOptions::GetFetchOpts) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->fetch_opts));

     }

    NAN_SETTER(GitCloneOptions::SetFetchOpts) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        v8::Local<Object> fetch_opts(value->ToObject());

        wrapper->fetch_opts.Reset(fetch_opts);

        wrapper->raw->fetch_opts = *  Nan::ObjectWrap::Unwrap<GitFetchOptions>(fetch_opts->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitCloneOptions::GetBare) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->bare));
     }

    NAN_SETTER(GitCloneOptions::SetBare) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->bare = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitCloneOptions::GetLocal) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        info.GetReturnValue().Set(Nan::New((int)wrapper->GetValue()->local));

     }

    NAN_SETTER(GitCloneOptions::SetLocal) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        if (value->IsNumber()) {
          wrapper->GetValue()->local = (git_clone_local_t) Nan::To<int32_t>(value).FromJust();
        }

     }

      NAN_GETTER(GitCloneOptions::GetCheckoutBranch) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        if (wrapper->GetValue()->checkout_branch) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->checkout_branch).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitCloneOptions::SetCheckoutBranch) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        if (wrapper->GetValue()->checkout_branch) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->checkout_branch = strdup(*str);

     }

      NAN_GETTER(GitCloneOptions::GetRepositoryCbPayload) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->repository_cb_payload));

     }

    NAN_SETTER(GitCloneOptions::SetRepositoryCbPayload) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        wrapper->repository_cb_payload.Reset(value);

     }

      NAN_GETTER(GitCloneOptions::GetRemoteCbPayload) {

      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->remote_cb_payload));

     }

    NAN_SETTER(GitCloneOptions::SetRemoteCbPayload) {
      GitCloneOptions *wrapper = Nan::ObjectWrap::Unwrap<GitCloneOptions>(info.This());

        wrapper->remote_cb_payload.Reset(value);

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitCloneOptionsTraits>;
