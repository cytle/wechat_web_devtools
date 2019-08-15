// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCONFIGENTRY_H
#define GITCONFIGENTRY_H
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

class GitConfigEntry;

struct GitConfigEntryTraits {
  typedef GitConfigEntry cppClass;
  typedef git_config_entry cType;

  static const bool isDuplicable = false;
  static void duplicate(git_config_entry **dest, git_config_entry *src) {
     Nan::ThrowError("duplicate called on GitConfigEntry which cannot be duplicated");
   }

  static const bool isFreeable = false;
  static void free(git_config_entry *raw) {
     Nan::ThrowError("free called on GitConfigEntry which cannot be freed");
   }
};

class GitConfigEntry : public
  NodeGitWrapper<GitConfigEntryTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitConfigEntryTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitConfigEntry()
      : NodeGitWrapper<GitConfigEntryTraits>(
           "A new GitConfigEntry cannot be instantiated."
       )
    {}
    GitConfigEntry(git_config_entry *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitConfigEntryTraits>(raw, selfFreeing, owner)
    {}
    ~GitConfigEntry();
     static NAN_METHOD(Name);
    static NAN_METHOD(Value);
    static NAN_METHOD(Level);
};

#endif
