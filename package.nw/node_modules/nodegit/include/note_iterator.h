// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITNOTEITERATOR_H
#define GITNOTEITERATOR_H
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

class GitNoteIterator;

struct GitNoteIteratorTraits {
  typedef GitNoteIterator cppClass;
  typedef git_note_iterator cType;

  static const bool isDuplicable = false;
  static void duplicate(git_note_iterator **dest, git_note_iterator *src) {
     Nan::ThrowError("duplicate called on GitNoteIterator which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_note_iterator *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitNoteIterator : public
  NodeGitWrapper<GitNoteIteratorTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitNoteIteratorTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitNoteIterator()
      : NodeGitWrapper<GitNoteIteratorTraits>(
           "A new GitNoteIterator cannot be instantiated."
       )
    {}
    GitNoteIterator(git_note_iterator *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitNoteIteratorTraits>(raw, selfFreeing, owner)
    {}
    ~GitNoteIterator();
 };

#endif
