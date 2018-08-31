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
#include "../include/index_entry.h"
#include "nodegit_wrapper.cc"

  #include "../include/index_time.h"
  #include "../include/oid.h"
 
using namespace v8;
using namespace node;
using namespace std;


// generated from struct_content.cc
GitIndexEntry::GitIndexEntry() : NodeGitWrapper<GitIndexEntryTraits>(NULL, true, v8::Local<v8::Object>())
{
  this->raw = new git_index_entry;
 
  this->ConstructFields();
}

GitIndexEntry::GitIndexEntry(git_index_entry* raw, bool selfFreeing, v8::Local<v8::Object> owner)
 : NodeGitWrapper<GitIndexEntryTraits>(raw, selfFreeing, owner)
{
  this->ConstructFields();
}

GitIndexEntry::~GitIndexEntry() {
                                     }

void GitIndexEntry::ConstructFields() {
          v8::Local<Object> ctimeTemp = GitIndexTime::New(
&this->raw->ctime,
            false
          )->ToObject();
          this->ctime.Reset(ctimeTemp);

             v8::Local<Object> mtimeTemp = GitIndexTime::New(
&this->raw->mtime,
            false
          )->ToObject();
          this->mtime.Reset(mtimeTemp);

                               v8::Local<Object> idTemp = GitOid::New(
&this->raw->id,
            false
          )->ToObject();
          this->id.Reset(idTemp);

             }

void GitIndexEntry::InitializeComponent(v8::Local<v8::Object> target) {
  Nan::HandleScope scope;

  v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

  tpl->InstanceTemplate()->SetInternalFieldCount(1);
  tpl->SetClassName(Nan::New("IndexEntry").ToLocalChecked());

      Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("ctime").ToLocalChecked(), GetCtime, SetCtime);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("mtime").ToLocalChecked(), GetMtime, SetMtime);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("dev").ToLocalChecked(), GetDev, SetDev);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("ino").ToLocalChecked(), GetIno, SetIno);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("mode").ToLocalChecked(), GetMode, SetMode);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("uid").ToLocalChecked(), GetUid, SetUid);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("gid").ToLocalChecked(), GetGid, SetGid);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("fileSize").ToLocalChecked(), GetFileSize, SetFileSize);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("id").ToLocalChecked(), GetId, SetId);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flags").ToLocalChecked(), GetFlags, SetFlags);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("flagsExtended").ToLocalChecked(), GetFlagsExtended, SetFlagsExtended);
        Nan::SetAccessor(tpl->InstanceTemplate(), Nan::New("path").ToLocalChecked(), GetPath, SetPath);
   
  InitializeTemplate(tpl);

  v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
  constructor_template.Reset(_constructor_template);
  Nan::Set(target, Nan::New("IndexEntry").ToLocalChecked(), _constructor_template);
}

    NAN_GETTER(GitIndexEntry::GetCtime) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->ctime));

     }

    NAN_SETTER(GitIndexEntry::SetCtime) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        v8::Local<Object> ctime(value->ToObject());

        wrapper->ctime.Reset(ctime);

        wrapper->raw->ctime = *  Nan::ObjectWrap::Unwrap<GitIndexTime>(ctime->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitIndexEntry::GetMtime) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->mtime));

     }

    NAN_SETTER(GitIndexEntry::SetMtime) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        v8::Local<Object> mtime(value->ToObject());

        wrapper->mtime.Reset(mtime);

        wrapper->raw->mtime = *  Nan::ObjectWrap::Unwrap<GitIndexTime>(mtime->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitIndexEntry::GetDev) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->dev));
     }

    NAN_SETTER(GitIndexEntry::SetDev) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->dev = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetIno) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->ino));
     }

    NAN_SETTER(GitIndexEntry::SetIno) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->ino = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetMode) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->mode));
     }

    NAN_SETTER(GitIndexEntry::SetMode) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->mode = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetUid) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->uid));
     }

    NAN_SETTER(GitIndexEntry::SetUid) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->uid = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetGid) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->gid));
     }

    NAN_SETTER(GitIndexEntry::SetGid) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->gid = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetFileSize) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->file_size));
     }

    NAN_SETTER(GitIndexEntry::SetFileSize) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->file_size = (uint32_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetId) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New(wrapper->id));

     }

    NAN_SETTER(GitIndexEntry::SetId) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        v8::Local<Object> id(value->ToObject());

        wrapper->id.Reset(id);

        wrapper->raw->id = *  Nan::ObjectWrap::Unwrap<GitOid>(id->ToObject())->GetValue() ;

     }

      NAN_GETTER(GitIndexEntry::GetFlags) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->flags));
     }

    NAN_SETTER(GitIndexEntry::SetFlags) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->flags = (uint16_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetFlagsExtended) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        info.GetReturnValue().Set(Nan::New<Number>(wrapper->GetValue()->flags_extended));
     }

    NAN_SETTER(GitIndexEntry::SetFlagsExtended) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

         if (value->IsNumber()) {
          wrapper->GetValue()->flags_extended = (uint16_t) Nan::To<int32_t>(value).FromJust();
        }
     }

      NAN_GETTER(GitIndexEntry::GetPath) {

      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        if (wrapper->GetValue()->path) {
          info.GetReturnValue().Set(Nan::New<String>(wrapper->GetValue()->path).ToLocalChecked());
        }
        else {
          return;
        }

     }

    NAN_SETTER(GitIndexEntry::SetPath) {
      GitIndexEntry *wrapper = Nan::ObjectWrap::Unwrap<GitIndexEntry>(info.This());

        if (wrapper->GetValue()->path) {
        }

        String::Utf8Value str(value);
        wrapper->GetValue()->path = strdup(*str);

     }

   
// force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitIndexEntryTraits>;
