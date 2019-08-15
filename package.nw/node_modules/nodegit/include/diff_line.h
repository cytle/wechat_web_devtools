// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFLINE_H
#define GITDIFFLINE_H
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

class GitDiffLine;

struct GitDiffLineTraits {
  typedef GitDiffLine cppClass;
  typedef git_diff_line cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_line **dest, git_diff_line *src) {
     Nan::ThrowError("duplicate called on GitDiffLine which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_line *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDiffLine : public
  NodeGitWrapper<GitDiffLineTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffLineTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffLine()
      : NodeGitWrapper<GitDiffLineTraits>(
           "A new GitDiffLine cannot be instantiated."
       )
    {}
    GitDiffLine(git_diff_line *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffLineTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffLine();
     static NAN_METHOD(Origin);
    static NAN_METHOD(OldLineno);
    static NAN_METHOD(NewLineno);
    static NAN_METHOD(NumLines);
    static NAN_METHOD(ContentLen);
    static NAN_METHOD(ContentOffset);
    static NAN_METHOD(Content);
};

#endif
