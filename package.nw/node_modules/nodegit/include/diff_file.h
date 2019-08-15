// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFFILE_H
#define GITDIFFFILE_H
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

using namespace node;
using namespace v8;

class GitDiffFile;

struct GitDiffFileTraits {
  typedef GitDiffFile cppClass;
  typedef git_diff_file cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_file **dest, git_diff_file *src) {
     Nan::ThrowError("duplicate called on GitDiffFile which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_file *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDiffFile : public
  NodeGitWrapper<GitDiffFileTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffFileTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffFile()
      : NodeGitWrapper<GitDiffFileTraits>(
           "A new GitDiffFile cannot be instantiated."
       )
    {}
    GitDiffFile(git_diff_file *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffFileTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffFile();
     static NAN_METHOD(Id);
    static NAN_METHOD(Path);
    static NAN_METHOD(Size);
    static NAN_METHOD(Flags);
    static NAN_METHOD(Mode);
    static NAN_METHOD(IdAbbrev);
};

#endif
