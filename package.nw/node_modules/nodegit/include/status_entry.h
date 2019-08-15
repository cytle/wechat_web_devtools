// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITSTATUSENTRY_H
#define GITSTATUSENTRY_H
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

#include "../include/diff_delta.h"

using namespace node;
using namespace v8;

class GitStatusEntry;

struct GitStatusEntryTraits {
  typedef GitStatusEntry cppClass;
  typedef git_status_entry cType;

  static const bool isDuplicable = false;
  static void duplicate(git_status_entry **dest, git_status_entry *src) {
     Nan::ThrowError("duplicate called on GitStatusEntry which cannot be duplicated");
   }

  static const bool isFreeable = false;
  static void free(git_status_entry *raw) {
     Nan::ThrowError("free called on GitStatusEntry which cannot be freed");
   }
};

class GitStatusEntry : public
  NodeGitWrapper<GitStatusEntryTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitStatusEntryTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitStatusEntry()
      : NodeGitWrapper<GitStatusEntryTraits>(
           "A new GitStatusEntry cannot be instantiated."
       )
    {}
    GitStatusEntry(git_status_entry *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitStatusEntryTraits>(raw, selfFreeing, owner)
    {}
    ~GitStatusEntry();
     static NAN_METHOD(Status);
    static NAN_METHOD(HeadToIndex);
    static NAN_METHOD(IndexToWorkdir);
};

#endif
