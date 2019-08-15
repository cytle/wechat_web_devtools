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
#include "../include/diff_patchid_options.h"
#include "nodegit_wrapper.cc"

 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitDiffPatchidOptions::GitDiffPatchidOptions() : NodeGitWrapper<GitDiffPatchidOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_diff_patchid_options wrappedValue = GIT_DIFF_PATCHID_OPTIONS_INIT;
      this->raw = (git_diff_patchid_options*) malloc(sizeof(git_diff_patchid_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_diff_patchid_options));
  
  this->ConstructFields();
}

GitDiffPatchidOptions::GitDiffPatchidOptions(git_diff_patchid_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitDiffPatchidOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitDiffPatchidOptions::~GitDiffPatchidOptions() {
    }

void GitDiffPatchidOptions::ConstructFields() {
    }

void GitDiffPatchidOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("DiffPatchidOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("DiffPatchidOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitDiffPatchidOptions::GetVersion) {

      GitDiffPatchidOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffPatchidOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitDiffPatchidOptions::SetVersion) {
      GitDiffPatchidOptions *wrapper = Nan::ObjectWrap::Unwrap<GitDiffPatchidOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDiffPatchidOptionsTraits>;
