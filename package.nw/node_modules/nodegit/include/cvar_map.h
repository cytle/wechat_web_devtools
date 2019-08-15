// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCVARMAP_H
#define GITCVARMAP_H
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

class GitCvarMap;

struct GitCvarMapTraits {
  typedef GitCvarMap cppClass;
  typedef git_cvar_map cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cvar_map **dest, git_cvar_map *src) {
     Nan::ThrowError("duplicate called on GitCvarMap which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cvar_map *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitCvarMap : public
  NodeGitWrapper<GitCvarMapTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCvarMapTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitCvarMap()
      : NodeGitWrapper<GitCvarMapTraits>(
           "A new GitCvarMap cannot be instantiated."
       )
    {}
    GitCvarMap(git_cvar_map *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCvarMapTraits>(raw, selfFreeing, owner)
    {}
    ~GitCvarMap();
     static NAN_METHOD(CvarType);
    static NAN_METHOD(StrMatch);
    static NAN_METHOD(MapValue);
};

#endif
