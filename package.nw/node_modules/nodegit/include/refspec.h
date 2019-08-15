// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREFSPEC_H
#define GITREFSPEC_H
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

class GitRefspec;

struct GitRefspecTraits {
  typedef GitRefspec cppClass;
  typedef git_refspec cType;

  static const bool isDuplicable = false;
  static void duplicate(git_refspec **dest, git_refspec *src) {
     Nan::ThrowError("duplicate called on GitRefspec which cannot be duplicated");
   }

  static const bool isFreeable = false;
  static void free(git_refspec *raw) {
     Nan::ThrowError("free called on GitRefspec which cannot be freed");
   }
};

class GitRefspec : public
  NodeGitWrapper<GitRefspecTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitRefspecTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                     

  private:
    GitRefspec()
      : NodeGitWrapper<GitRefspecTraits>(
           "A new GitRefspec cannot be instantiated."
       )
    {}
    GitRefspec(git_refspec *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitRefspecTraits>(raw, selfFreeing, owner)
    {}
    ~GitRefspec();
                     
    static NAN_METHOD(Direction);

    static NAN_METHOD(Dst);

    static NAN_METHOD(DstMatches);

    static NAN_METHOD(Force);

    static NAN_METHOD(Src);

    static NAN_METHOD(SrcMatches);
};

#endif
