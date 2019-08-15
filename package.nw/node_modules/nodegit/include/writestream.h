// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITWRITESTREAM_H
#define GITWRITESTREAM_H
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

class GitWritestream;

struct GitWritestreamTraits {
  typedef GitWritestream cppClass;
  typedef git_writestream cType;

  static const bool isDuplicable = false;
  static void duplicate(git_writestream **dest, git_writestream *src) {
     Nan::ThrowError("duplicate called on GitWritestream which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_writestream *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitWritestream : public
  NodeGitWrapper<GitWritestreamTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitWritestreamTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitWritestream()
      : NodeGitWrapper<GitWritestreamTraits>(
           "A new GitWritestream cannot be instantiated."
       )
    {}
    GitWritestream(git_writestream *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitWritestreamTraits>(raw, selfFreeing, owner)
    {}
    ~GitWritestream();
 };

#endif
