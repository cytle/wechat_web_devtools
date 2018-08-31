// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITINDEXER_H
#define GITINDEXER_H
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

#include "../include/transfer_progress.h"
#include "../include/oid.h"

using namespace node;
using namespace v8;

class GitIndexer;

struct GitIndexerTraits {
  typedef GitIndexer cppClass;
  typedef git_indexer cType;

  static const bool isDuplicable = false;
  static void duplicate(git_indexer **dest, git_indexer *src) {
     Nan::ThrowError("duplicate called on GitIndexer which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_indexer *raw) {
    ::git_indexer_free(raw); // :: to avoid calling this free recursively
   }
};

class GitIndexer : public
  NodeGitWrapper<GitIndexerTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexerTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

           

  private:
    GitIndexer()
      : NodeGitWrapper<GitIndexerTraits>(
           "A new GitIndexer cannot be instantiated."
       )
    {}
    GitIndexer(git_indexer *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitIndexerTraits>(raw, selfFreeing, owner)
    {}
    ~GitIndexer();
           
    static NAN_METHOD(Commit);

    static NAN_METHOD(Free);

    static NAN_METHOD(Hash);
};

#endif
