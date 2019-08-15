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
#include "../include/rebase_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/checkout_options.h"
  #include "../include/merge_options.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitRebaseOptions::GitRebaseOptions() : NodeGitWrapper<GitRebaseOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_rebase_options wrappedValue = GIT_REBASE_OPTIONS_INIT;
      this->raw = (git_rebase_options*) malloc(sizeof(git_rebase_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_rebase_options));
  
  this->ConstructFields();
}

GitRebaseOptions::GitRebaseOptions(git_rebase_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitRebaseOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitRebaseOptions::~GitRebaseOptions() {
                }

void GitRebaseOptions::ConstructFields() {
                   v8::Local<Object> checkout_optionsTemp = GitCheckoutOptions::New(
&this->raw->checkout_options,
            false
          )->ToObject();
          this->checkout_options.Reset(checkout_optionsTemp);

             v8::Local<Object> merge_optionsTemp = GitMergeOptions::New(
&this->raw->merge_options,
            false
          )->ToObject();
          this->merge_options.Reset(merge_optionsTemp);

    }

void GitRebaseOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("RebaseOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("quiet").ToLocalChecked(), GetQuiet, SetQuiet);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("rewriteNotesRef").ToLocalChecked(), GetRewriteNotesRef, SetRewriteNotesRef);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("checkoutOptions").ToLocalChecked(), GetCheckoutOptions, SetCheckoutOptions);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("mergeOptions").ToLocalChecked(), GetMergeOptions, SetMergeOptions);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("RebaseOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitRebaseOptions::GetVersion) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitRebaseOptions::SetVersion) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRebaseOptions::GetQuiet) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->quiet));
     }

    NAN_SETTER(GitRebaseOptions::SetQuiet) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->quiet = (int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitRebaseOptions::GetRewriteNotesRef) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        if (wrapper->GetValue()->rewrite_notes_ref) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->rewrite_notes_ref).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitRebaseOptions::SetRewriteNotesRef) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        if (wrapper->GetValue()->rewrite_notes_ref) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->rewrite_notes_ref = strdup(*str);

     }

      NAN_GETTER(GitRebaseOptions::GetCheckoutOptions) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->checkout_options));

     }

    NAN_SETTER(GitRebaseOptions::SetCheckoutOptions) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        v8::Local<Object> checkout_options(value->ToObject());

        wrapper->checkout_options.Reset(checkout_options);

        wrapper->raw->checkout_options = *  Nan::ObjectWrap::Unwrap<GitCheckoutOptions>(checkout_options->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitRebaseOptions::GetMergeOptions) {

      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->merge_options));

     }

    NAN_SETTER(GitRebaseOptions::SetMergeOptions) {
      GitRebaseOptions *wrapper = Nan::ObjectWrap::Unwrap<GitRebaseOptions>(info.This());

        v8::Local<Object> merge_options(value->ToObject());

        wrapper->merge_options.Reset(merge_options);

        wrapper->raw->merge_options = *  Nan::ObjectWrap::Unwrap<GitMergeOptions>(merge_options->ToObject())->GetValue() ;

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitRebaseOptionsTraits>;
