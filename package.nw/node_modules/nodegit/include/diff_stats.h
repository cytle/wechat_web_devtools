// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDIFFSTATS_H
#define GITDIFFSTATS_H
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
struct git_diff_stats {
};

using namespace node;
using namespace v8;

class GitDiffStats;

struct GitDiffStatsTraits {
  typedef GitDiffStats cppClass;
  typedef git_diff_stats cType;

  static const bool isDuplicable = false;
  static void duplicate(git_diff_stats **dest, git_diff_stats *src) {
     Nan::ThrowError("duplicate called on GitDiffStats which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_diff_stats *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDiffStats : public
  NodeGitWrapper<GitDiffStatsTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDiffStatsTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDiffStats()
      : NodeGitWrapper<GitDiffStatsTraits>(
           "A new GitDiffStats cannot be instantiated."
       )
    {}
    GitDiffStats(git_diff_stats *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDiffStatsTraits>(raw, selfFreeing, owner)
    {}
    ~GitDiffStats();
 };

#endif
