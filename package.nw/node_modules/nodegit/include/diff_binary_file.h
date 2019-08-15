// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFBINARYFILE_H
#define GITDIFFBINARYFILE_H
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

class GitDiffBinaryFile;

struct GitDiffBinaryFileTraits {
  typedef GitDiffBinaryFile cppClass;
  typedef git_diff_binary_file cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_binary_file **dest, git_diff_binary_file *src) {
     Nan::ThrowError("duplicate called on GitDiffBinaryFile which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_binary_file *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDiffBinaryFile : public
  NodeGitWrapper<GitDiffBinaryFileTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffBinaryFileTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffBinaryFile()
      : NodeGitWrapper<GitDiffBinaryFileTraits>(
           "A new GitDiffBinaryFile cannot be instantiated."
       )
    {}
    GitDiffBinaryFile(git_diff_binary_file *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffBinaryFileTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffBinaryFile();
     static NAN_METHOD(Type);
    static NAN_METHOD(Data);
    static NAN_METHOD(Datalen);
    static NAN_METHOD(Inflatedlen);
};

#endif
