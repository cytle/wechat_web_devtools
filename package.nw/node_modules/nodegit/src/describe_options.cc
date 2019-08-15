// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/describe_options.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitDescribeOptions::~GitDescribeOptions() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
   }

  void GitDescribeOptions::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("DescribeOptions").ToLocalChecked());

         Nan::SetPrototypeMethod(tpl, "version", Version);
         Nan::SetPrototypeMethod(tpl, "maxCandidatesTags", MaxCandidatesTags);
         Nan::SetPrototypeMethod(tpl, "describeStrategy", DescribeStrategy);
         Nan::SetPrototypeMethod(tpl, "pattern", Pattern);
         Nan::SetPrototypeMethod(tpl, "onlyFollowFirstParent", OnlyFollowFirstParent);
         Nan::SetPrototypeMethod(tpl, "showCommitOidAsFallback", ShowCommitOidAsFallback);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("DescribeOptions").ToLocalChecked(), _constructor_template);
  }

      NAN_METHOD(GitDescribeOptions::Version) {
      v8::Local<v8::Value> to;

       unsigned int
         version =
         Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This())->GetValue()->version;
 // start convert_to_v8 block
     to = Nan::New<Number>( version);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeOptions::MaxCandidatesTags) {
      v8::Local<v8::Value> to;

       unsigned int
         max_candidates_tags =
         Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This())->GetValue()->max_candidates_tags;
 // start convert_to_v8 block
     to = Nan::New<Number>( max_candidates_tags);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeOptions::DescribeStrategy) {
      v8::Local<v8::Value> to;

       unsigned int
         describe_strategy =
         Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This())->GetValue()->describe_strategy;
 // start convert_to_v8 block
     to = Nan::New<Number>( describe_strategy);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeOptions::Pattern) {
      v8::Local<v8::Value> to;

       const char *
         pattern =
         Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This())->GetValue()->pattern;
 // start convert_to_v8 block
  if (pattern){
       to = Nan::New<String>(pattern).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeOptions::OnlyFollowFirstParent) {
      v8::Local<v8::Value> to;

       int
         only_follow_first_parent =
         Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This())->GetValue()->only_follow_first_parent;
 // start convert_to_v8 block
     to = Nan::New<Number>( only_follow_first_parent);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitDescribeOptions::ShowCommitOidAsFallback) {
      v8::Local<v8::Value> to;

       int
         show_commit_oid_as_fallback =
         Nan::ObjectWrap::Unwrap<GitDescribeOptions>(info.This())->GetValue()->show_commit_oid_as_fallback;
 // start convert_to_v8 block
     to = Nan::New<Number>( show_commit_oid_as_fallback);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitDescribeOptionsTraits>;
 