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
#include "../include/blame_options.h"
#include "nodegit_wrapper.cc"

  #include "../include/oid.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitBlameOptions::GitBlameOptions() : NodeGitWrapper<GitBlameOptionsTraits>(NULL, true, v8::Local<v8::Object>())
{
        git_blame_options wrappedValue = GIT_BLAME_OPTIONS_INIT;
      this->raw = (git_blame_options*) malloc(sizeof(git_blame_options));
      memcpy(this->raw, &wrappedValue, sizeof(git_blame_options));
  
  this->ConstructFields();
}

GitBlameOptions::GitBlameOptions(git_blame_options* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitBlameOptionsTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitBlameOptions::~GitBlameOptions() {
                      }

void GitBlameOptions::ConstructFields() {
                   v8::Local<Object> newest_commitTemp = GitOid::New(
&this->raw->newest_commit,
            false
          )->ToObject();
          this->newest_commit.Reset(newest_commitTemp);

             v8::Local<Object> oldest_commitTemp = GitOid::New(
&this->raw->oldest_commit,
            false
          )->ToObject();
          this->oldest_commit.Reset(oldest_commitTemp);

          }

void GitBlameOptions::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("BlameOptions").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("version").ToLocalChecked(), GetVersion, SetVersion);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flags").ToLocalChecked(), GetFlags, SetFlags);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("minMatchCharacters").ToLocalChecked(), GetMinMatchCharacters, SetMinMatchCharacters);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("newestCommit").ToLocalChecked(), GetNewestCommit, SetNewestCommit);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("oldestCommit").ToLocalChecked(), GetOldestCommit, SetOldestCommit);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("minLine").ToLocalChecked(), GetMinLine, SetMinLine);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("maxLine").ToLocalChecked(), GetMaxLine, SetMaxLine);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("BlameOptions").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitBlameOptions::GetVersion) {

      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->version));
     }

    NAN_SETTER(GitBlameOptions::SetVersion) {
      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->version = (unsigned int) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitBlameOptions::GetFlags) {

      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->flags));
     }

    NAN_SETTER(GitBlameOptions::SetFlags) {
      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->flags = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitBlameOptions::GetMinMatchCharacters) {

      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->min_match_characters));
     }

    NAN_SETTER(GitBlameOptions::SetMinMatchCharacters) {
      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->min_match_characters = (uint16_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitBlameOptions::GetNewestCommit) {

      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->newest_commit));

     }

    NAN_SETTER(GitBlameOptions::SetNewestCommit) {
      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        v8::Local<Object> newest_commit(value->ToObject());

        wrapper->newest_commit.Reset(newest_commit);

        wrapper->raw->newest_commit = *  Nan::ObjectWrap::Unwrap<GitOid>(newest_commit->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitBlameOptions::GetOldestCommit) {

      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->oldest_commit));

     }

    NAN_SETTER(GitBlameOptions::SetOldestCommit) {
      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        v8::Local<Object> oldest_commit(value->ToObject());

        wrapper->oldest_commit.Reset(oldest_commit);

        wrapper->raw->oldest_commit = *  Nan::ObjectWrap::Unwrap<GitOid>(oldest_commit->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitBlameOptions::GetMinLine) {

      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->min_line));
     }

    NAN_SETTER(GitBlameOptions::SetMinLine) {
      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->min_line = (size_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitBlameOptions::GetMaxLine) {

      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->max_line));
     }

    NAN_SETTER(GitBlameOptions::SetMaxLine) {
      GitBlameOptions *wrapper = Nan::ObjectWrap::Unwrap<GitBlameOptions>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->max_line = (size_t) Nan::To<int32_t>(value).FromJust();
        }
     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitBlameOptionsTraits>;
