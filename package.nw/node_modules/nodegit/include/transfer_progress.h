// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTRANSFERPROGRESS_H
#define GITTRANSFERPROGRESS_H
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

class GitTransferProgress;

struct GitTransferProgressTraits {
  typedef GitTransferProgress cppClass;
  typedef git_transfer_progress cType;

  static const bool isDuplicable = true;
  static void duplicate(git_transfer_progress **dest, git_transfer_progress *src) {
    git_transfer_progress_dup(dest, src);
   }

  static const bool isFreeable = true;
  static void free(git_transfer_progress *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitTransferProgress : public
  NodeGitWrapper<GitTransferProgressTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTransferProgressTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitTransferProgress()
      : NodeGitWrapper<GitTransferProgressTraits>(
           "A new GitTransferProgress cannot be instantiated."
       )
    {}
    GitTransferProgress(git_transfer_progress *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTransferProgressTraits>(raw, selfFreeing, owner)
    {}
    ~GitTransferProgress();
     static NAN_METHOD(TotalObjects);
    static NAN_METHOD(IndexedObjects);
    static NAN_METHOD(ReceivedObjects);
    static NAN_METHOD(LocalObjects);
    static NAN_METHOD(TotalDeltas);
    static NAN_METHOD(IndexedDeltas);
    static NAN_METHOD(ReceivedBytes);
};

#endif
