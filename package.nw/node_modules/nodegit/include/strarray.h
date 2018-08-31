// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITSTRARRAY_H
#define GITSTRARRAY_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "nodegit_wrapper.h"
#include "promise_completion.h"

extern "C" {
#include <git2.h>
}

#include "../include/typedefs.h"

#include "../include/str_array_converter.h"

using namespace node;
using namespace v8;

class GitStrarray;

struct GitStrarrayTraits {
  typedef GitStrarray cppClass;
  typedef git_strarray cType;

  static const bool isDuplicable = false;
  static void duplicate(git_strarray **dest, git_strarray *src) {
     Nan::ThrowError("duplicate called on GitStrarray which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_strarray *raw) {
    ::git_strarray_free(raw); // :: to avoid calling this free recursively
   }
};

class GitStrarray : public
  NodeGitWrapper<GitStrarrayTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitStrarrayTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

        

  private:
    GitStrarray()
      : NodeGitWrapper<GitStrarrayTraits>(
           "A new GitStrarray cannot be instantiated."
       )
    {}
    GitStrarray(git_strarray *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitStrarrayTraits>(raw, selfFreeing, owner)
    {}
    ~GitStrarray();
            static NAN_METHOD(Strings);
    static NAN_METHOD(Count);

    static NAN_METHOD(Copy);

    static NAN_METHOD(Free);
};

#endif
