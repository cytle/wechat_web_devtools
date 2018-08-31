// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITERROR_H
#define GITERROR_H
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


using namespace node;
using namespace v8;

class GitError;

struct GitErrorTraits {
  typedef GitError cppClass;
  typedef git_error cType;

  static const bool isDuplicable = false;
  static void duplicate(git_error **dest, git_error *src) {
     Nan::ThrowError("duplicate called on GitError which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_error *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitError : public
  NodeGitWrapper<GitErrorTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitErrorTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitError()
      : NodeGitWrapper<GitErrorTraits>(
           "A new GitError cannot be instantiated."
       )
    {}
    GitError(git_error *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitErrorTraits>(raw, selfFreeing, owner)
    {}
    ~GitError();
     static NAN_METHOD(Message);
    static NAN_METHOD(Klass);
};

#endif
