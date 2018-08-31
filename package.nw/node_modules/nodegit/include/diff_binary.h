// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFBINARY_H
#define GITDIFFBINARY_H
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

#include "../include/diff_binary_file.h"

using namespace node;
using namespace v8;

class GitDiffBinary;

struct GitDiffBinaryTraits {
  typedef GitDiffBinary cppClass;
  typedef git_diff_binary cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_binary **dest, git_diff_binary *src) {
     Nan::ThrowError("duplicate called on GitDiffBinary which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_binary *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDiffBinary : public
  NodeGitWrapper<GitDiffBinaryTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffBinaryTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffBinary()
      : NodeGitWrapper<GitDiffBinaryTraits>(
           "A new GitDiffBinary cannot be instantiated."
       )
    {}
    GitDiffBinary(git_diff_binary *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffBinaryTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffBinary();
     static NAN_METHOD(ContainsData);
    static NAN_METHOD(OldFile);
    static NAN_METHOD(NewFile);
};

#endif
