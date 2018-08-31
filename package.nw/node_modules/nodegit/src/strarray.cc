// This is a generated file, modify: generate/templates/templates/class_content.cc

#include <nan.h>
#include <string.h>

extern "C" {
  #include <git2.h>
 }

#include "../include/nodegit.h"
#include "../include/lock_master.h"
#include "../include/functions/copy.h"
#include "../include/strarray.h"
#include "nodegit_wrapper.cc"
#include "../include/async_libgit2_queue_worker.h"

  #include "../include/str_array_converter.h"
 
#include <iostream>

using namespace std;
using namespace v8;
using namespace node;

  GitStrarray::~GitStrarray() {
    // this will cause an error if you have a non-self-freeing object that also needs
    // to save values. Since the object that will eventually free the object has no
    // way of knowing to free these values.
          }

  void GitStrarray::InitializeComponent(v8::Local<v8::Object> target) {
    Nan::HandleScope scope;

    v8::Local<FunctionTemplate> tpl = Nan::New<FunctionTemplate>(JSNewFunction);

    tpl->InstanceTemplate()->SetInternalFieldCount(1);
    tpl->SetClassName(Nan::New("Strarray").ToLocalChecked());

          Nan::SetPrototypeMethod(tpl, "copy", Copy);
            Nan::SetPrototypeMethod(tpl, "free", Free);
           Nan::SetPrototypeMethod(tpl, "strings", Strings);
         Nan::SetPrototypeMethod(tpl, "count", Count);
  
    InitializeTemplate(tpl);

    v8::Local<Function> _constructor_template = Nan::GetFunction(tpl).ToLocalChecked();
    constructor_template.Reset(_constructor_template);
    Nan::Set(target, Nan::New("Strarray").ToLocalChecked(), _constructor_template);
  }

  
/*
   * @param Strarray src
     * @return Number  result    */
NAN_METHOD(GitStrarray::Copy) {
  Nan::EscapableHandleScope scope;

  if (info.Length() == 0 || !(Nan::To<bool>(info[0]).FromJust())) {
    return Nan::ThrowError("Array, String Object, or string src is required.");
  }
// start convert_from_v8 block
  const git_strarray * from_src = NULL;

  from_src = StrArrayConverter::Convert(info[0]);
// end convert_from_v8 block
 
  giterr_clear();

  {
    LockMaster lockMaster(/*asyncAction: */false        ,    Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->GetValue()
        ,    from_src
);

    int result = git_strarray_copy(
  Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->GetValue()
,  from_src
    );

 
    v8::Local<v8::Value> to;
// start convert_to_v8 block
     to = Nan::New<Number>( result);
  // end convert_to_v8 block
    return info.GetReturnValue().Set(scope.Escape(to));
  }
}
   
/*
     */
NAN_METHOD(GitStrarray::Free) {
  Nan::EscapableHandleScope scope;

if (Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->GetValue() != NULL) {
 
  giterr_clear();

  {
    LockMaster lockMaster(/*asyncAction: */false        ,    Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->GetValue()
);

git_strarray_free(
  Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->GetValue()
    );

    Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->ClearValue();
  }
     return info.GetReturnValue().Set(scope.Escape(Nan::Undefined()));
  }
}
       NAN_METHOD(GitStrarray::Strings) {
      v8::Local<v8::Value> to;

       char **
         strings =
         Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->GetValue()->strings;
 // start convert_to_v8 block
  if (strings){
      to = Nan::New<String>(*strings).ToLocalChecked();
   }
  else {
    to = Nan::Null();
  }

  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
     NAN_METHOD(GitStrarray::Count) {
      v8::Local<v8::Value> to;

       size_t
         count =
         Nan::ObjectWrap::Unwrap<GitStrarray>(info.This())->GetValue()->count;
 // start convert_to_v8 block
     to = Nan::New<Number>( count);
  // end convert_to_v8 block
      info.GetReturnValue().Set(to);
    }
  // force base class template instantiation, to make sure we get all the
// methods, statics, etc.
template class NodeGitWrapper<GitStrarrayTraits>;
 