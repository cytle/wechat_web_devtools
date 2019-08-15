// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITMERGEDRIVERSOURCE_H
#define GITMERGEDRIVERSOURCE_H
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
struct git_merge_driver_source {
};

using namespace node;
using namespace v8;

class GitMergeDriverSource;

struct GitMergeDriverSourceTraits {
  typedef GitMergeDriverSource cppClass;
  typedef git_merge_driver_source cType;

  static const bool isDuplicable = false;
  static void duplicate(git_merge_driver_source **dest, git_merge_driver_source *src) {
     Nan::ThrowError("duplicate called on GitMergeDriverSource which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_merge_driver_source *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitMergeDriverSource : public
  NodeGitWrapper<GitMergeDriverSourceTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitMergeDriverSourceTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitMergeDriverSource()
      : NodeGitWrapper<GitMergeDriverSourceTraits>(
           "A new GitMergeDriverSource cannot be instantiated."
       )
    {}
    GitMergeDriverSource(git_merge_driver_source *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitMergeDriverSourceTraits>(raw, selfFreeing, owner)
    {}
    ~GitMergeDriverSource();
 };

#endif
