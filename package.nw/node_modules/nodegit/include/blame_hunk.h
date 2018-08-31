// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITBLAMEHUNK_H
#define GITBLAMEHUNK_H
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
#include "../include/signature.h"

using namespace node;
using namespace v8;

class GitBlameHunk;

struct GitBlameHunkTraits {
  typedef GitBlameHunk cppClass;
  typedef git_blame_hunk cType;

  static const bool isDuplicable = false;
  static void duplicate(git_blame_hunk **dest, git_blame_hunk *src) {
     Nan::ThrowError("duplicate called on GitBlameHunk which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_blame_hunk *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitBlameHunk : public
  NodeGitWrapper<GitBlameHunkTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitBlameHunkTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitBlameHunk()
      : NodeGitWrapper<GitBlameHunkTraits>(
           "A new GitBlameHunk cannot be instantiated."
       )
    {}
    GitBlameHunk(git_blame_hunk *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitBlameHunkTraits>(raw, selfFreeing, owner)
    {}
    ~GitBlameHunk();
     static NAN_METHOD(LinesInHunk);
    static NAN_METHOD(FinalCommitId);
    static NAN_METHOD(FinalStartLineNumber);
    static NAN_METHOD(FinalSignature);
    static NAN_METHOD(OrigCommitId);
    static NAN_METHOD(OrigPath);
    static NAN_METHOD(OrigStartLineNumber);
    static NAN_METHOD(OrigSignature);
};

#endif
