// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTRANSACTION_H
#define GITTRANSACTION_H
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
struct git_transaction {
};

using namespace node;
using namespace v8;

class GitTransaction;

struct GitTransactionTraits {
  typedef GitTransaction cppClass;
  typedef git_transaction cType;

  static const bool isDuplicable = false;
  static void duplicate(git_transaction **dest, git_transaction *src) {
     Nan::ThrowError("duplicate called on GitTransaction which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_transaction *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitTransaction : public
  NodeGitWrapper<GitTransactionTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTransactionTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitTransaction()
      : NodeGitWrapper<GitTransactionTraits>(
           "A new GitTransaction cannot be instantiated."
       )
    {}
    GitTransaction(git_transaction *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTransactionTraits>(raw, selfFreeing, owner)
    {}
    ~GitTransaction();
 };

#endif
