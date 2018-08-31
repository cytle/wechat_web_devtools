// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITPACKBUILDER_H
#define GITPACKBUILDER_H
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

#include "../include/oid.h"
#include "../include/revwalk.h"
#include "../include/repository.h"
// Forward declaration.
struct git_packbuilder {
};

using namespace node;
using namespace v8;

class GitPackbuilder;

struct GitPackbuilderTraits {
  typedef GitPackbuilder cppClass;
  typedef git_packbuilder cType;

  static const bool isDuplicable = false;
  static void duplicate(git_packbuilder **dest, git_packbuilder *src) {
     Nan::ThrowError("duplicate called on GitPackbuilder which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_packbuilder *raw) {
    ::git_packbuilder_free(raw); // :: to avoid calling this free recursively
   }
};

class GitPackbuilder : public
  NodeGitWrapper<GitPackbuilderTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitPackbuilderTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                           

  private:
    GitPackbuilder()
      : NodeGitWrapper<GitPackbuilderTraits>(
           "A new GitPackbuilder cannot be instantiated."
       )
    {}
    GitPackbuilder(git_packbuilder *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitPackbuilderTraits>(raw, selfFreeing, owner)
    {}
    ~GitPackbuilder();
                                           
    static NAN_METHOD(Free);

    static NAN_METHOD(Hash);

    static NAN_METHOD(Insert);

    static NAN_METHOD(InsertCommit);

    static NAN_METHOD(InsertRecur);

    static NAN_METHOD(InsertTree);

    static NAN_METHOD(InsertWalk);

    static NAN_METHOD(Create);

    static NAN_METHOD(ObjectCount);

    static NAN_METHOD(SetThreads);

    static NAN_METHOD(Written);
};

#endif
