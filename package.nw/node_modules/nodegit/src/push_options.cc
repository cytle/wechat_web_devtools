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
#include "../include/push_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/remote_callbacks.h"
  #include "../include/proxy_options.h"
  #include "../include/strarray.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitPushOptions::GitPushOptions() : NodeGitWrapper<GitPushOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_push_options wrappedValue = GIT_PUSH_OPTIONS_INIT;
      this->raw = (git_push_options*) malloc(sizeof(git_push_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_push_options));
  
  this->ConstructFields();
}

GitPushOptions::GitPushOptions(git_push_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitPushOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitPushOptions::~GitPushOptions() {
                }

void GitPushOptions::ConstructFields() {
                v8::Local<Object> callbacksTemp = GitRemoteCallbacks::New(
&this->raw->callbacks,
            false
          )->ToObject();
          this->callbacks.Reset(callbacksTemp);

             v8::Local<Object> proxy_optsTemp = GitProxyOptions::New(
&this->raw->proxy_opts,
            false
          )->ToObject();
          this->proxy_opts.Reset(proxy_optsTemp);

             v8::Local<Object> custom_headersTemp = GitStrarray::New(
&this->raw->custom_headers,
            false
          )->ToObject();
          this->custom_headers.Reset(custom_headersTemp);

    }

void GitPushOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("PushOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("pbParallelism").ToLocalChecked(), GetPbParallelism, SetPbParallelism);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("callbacks").ToLocalChecked(), GetCallbacks, SetCallbacks);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("proxyOpts").ToLocalChecked(), GetProxyOpts, SetProxyOpts);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("customHeaders").ToLocalChecked(), GetCustomHeaders, SetCustomHeaders);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("PushOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitPushOptions::GetVersion) {

      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitPushOptions::SetVersion) {
      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitPushOptions::GetPbParallelism) {

      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->pb_parallelism));
     }

    NAN_SETTER(GitPushOptions::SetPbParallelism) {
      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->pb_parallelism = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitPushOptions::GetCallbacks) {

      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->callbacks));

     }

    NAN_SETTER(GitPushOptions::SetCallbacks) {
      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        v8::Local<Object> callbacks(value->ToObject());

        wrapper->callbacks.Reset(callbacks);

        wrapper->raw->callbacks = *  Nan::ObjectWrap::Unwrap<GitRemoteCallbacks>(callbacks->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitPushOptions::GetProxyOpts) {

      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->proxy_opts));

     }

    NAN_SETTER(GitPushOptions::SetProxyOpts) {
      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        v8::Local<Object> proxy_opts(value->ToObject());

        wrapper->proxy_opts.Reset(proxy_opts);

        wrapper->raw->proxy_opts = *  Nan::ObjectWrap::Unwrap<GitProxyOptions>(proxy_opts->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitPushOptions::GetCustomHeaders) {

      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->custom_headers));

     }

    NAN_SETTER(GitPushOptions::SetCustomHeaders) {
      GitPushOptions *wrapper = Nan::ObjectWrap::Unwrap<GitPushOptions>(info.This());

        v8::Local<Object> custom_headers(value->ToObject());

        wrapper->custom_headers.Reset(custom_headers);

        wrapper->raw->custom_headers = * StrArrayConverter::Convert(custom_headers->ToObject()) ;

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitPushOptionsTraits>;
