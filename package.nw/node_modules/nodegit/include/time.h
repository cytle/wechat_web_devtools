// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITTIME_H
#define GITTIME_H
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

#include "git2/sys/time.h"

using namespace node;
using namespace v8;

class GitTime;

struct GitTimeTraits {
  typedef GitTime cppClass;
  typedef git_time cType;

  static const bool isDuplicable = true;
  static void duplicate(git_time **dest, git_time *src) {
    git_time_dup(dest, src);
   }

  static const bool isFreeable = true;
  static void free(git_time *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitTime : public
  NodeGitWrapper<GitTimeTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitTimeTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

   

  private:
    GitTime()
      : NodeGitWrapper<GitTimeTraits>(
           "A new GitTime cannot be instantiated."
       )
    {}
    GitTime(git_time *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitTimeTraits>(raw, selfFreeing, owner)
    {}
    ~GitTime();
       static NAN_METHOD(Time);
    static NAN_METHOD(Offset);

    static NAN_METHOD(Monotonic);
};

#endif
