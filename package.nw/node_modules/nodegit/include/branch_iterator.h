// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITBRANCHITERATOR_H
#define GITBRANCHITERATOR_H
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

// Forward declaration.
struct git_branch_iterator {
};

using namespace node;
using namespace v8;

class GitBranchIterator;

struct GitBranchIteratorTraits {
  typedef GitBranchIterator cppClass;
  typedef git_branch_iterator cType;

  static const bool isDuplicable = false;
  static void duplicate(git_branch_iterator **dest, git_branch_iterator *src) {
     Nan::ThrowError("duplicate called on GitBranchIterator which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_branch_iterator *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitBranchIterator : public
  NodeGitWrapper<GitBranchIteratorTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitBranchIteratorTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitBranchIterator()
      : NodeGitWrapper<GitBranchIteratorTraits>(
           "A new GitBranchIterator cannot be instantiated."
       )
    {}
    GitBranchIterator(git_branch_iterator *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitBranchIteratorTraits>(raw, selfFreeing, owner)
    {}
    ~GitBranchIterator();
 };

#endif
