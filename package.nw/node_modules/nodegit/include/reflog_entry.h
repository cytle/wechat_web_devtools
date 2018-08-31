// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITREFLOGENTRY_H
#define GITREFLOGENTRY_H
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

#include "../include/signature.h"
#include "../include/oid.h"
// Forward declaration.
struct git_reflog_entry {
};

using namespace node;
using namespace v8;

class GitReflogEntry;

struct GitReflogEntryTraits {
  typedef GitReflogEntry cppClass;
  typedef git_reflog_entry cType;

  static const bool isDuplicable = false;
  static void duplicate(git_reflog_entry **dest, git_reflog_entry *src) {
     Nan::ThrowError("duplicate called on GitReflogEntry which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_reflog_entry *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitReflogEntry : public
  NodeGitWrapper<GitReflogEntryTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitReflogEntryTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

             

  private:
    GitReflogEntry()
      : NodeGitWrapper<GitReflogEntryTraits>(
           "A new GitReflogEntry cannot be instantiated."
       )
    {}
    GitReflogEntry(git_reflog_entry *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitReflogEntryTraits>(raw, selfFreeing, owner)
    {}
    ~GitReflogEntry();
             
    static NAN_METHOD(Committer);

    static NAN_METHOD(IdNew);

    static NAN_METHOD(IdOld);

    static NAN_METHOD(Message);
};

#endif
