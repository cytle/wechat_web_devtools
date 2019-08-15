// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFDELTA_H
#define GITDIFFDELTA_H
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

#include "../include/diff_file.h"

using namespace node;
using namespace v8;

class GitDiffDelta;

struct GitDiffDeltaTraits {
  typedef GitDiffDelta cppClass;
  typedef git_diff_delta cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_delta **dest, git_diff_delta *src) {
     Nan::ThrowError("duplicate called on GitDiffDelta which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_delta *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDiffDelta : public
  NodeGitWrapper<GitDiffDeltaTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffDeltaTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffDelta()
      : NodeGitWrapper<GitDiffDeltaTraits>(
           "A new GitDiffDelta cannot be instantiated."
       )
    {}
    GitDiffDelta(git_diff_delta *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffDeltaTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffDelta();
     static NAN_METHOD(Status);
    static NAN_METHOD(Flags);
    static NAN_METHOD(Similarity);
    static NAN_METHOD(Nfiles);
    static NAN_METHOD(OldFile);
    static NAN_METHOD(NewFile);
};

#endif
