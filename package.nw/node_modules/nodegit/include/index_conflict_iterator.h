// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXCONFLICTITERATOR_H
#define GITINDEXCONFLICTITERATOR_H
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
struct git_index_conflict_iterator {
};

using namespace node;
using namespace v8;

class GitIndexConflictIterator;

struct GitIndexConflictIteratorTraits {
  typedef GitIndexConflictIterator cppClass;
  typedef git_index_conflict_iterator cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index_conflict_iterator **dest, git_index_conflict_iterator *src) {
     Nan::ThrowError("duplicate called on GitIndexConflictIterator which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_index_conflict_iterator *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitIndexConflictIterator : public
  NodeGitWrapper<GitIndexConflictIteratorTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexConflictIteratorTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitIndexConflictIterator()
      : NodeGitWrapper<GitIndexConflictIteratorTraits>(
           "A new GitIndexConflictIterator cannot be instantiated."
       )
    {}
    GitIndexConflictIterator(git_index_conflict_iterator *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexConflictIteratorTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexConflictIterator();
 };

#endif
