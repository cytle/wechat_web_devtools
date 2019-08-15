// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITBLAMEOPTIONS_H
#define GITBLAMEOPTIONS_H
#include <nan.h>
#include <string>
#include <queue>
#include <utility>

#include "async_baton.h"
#include "callback_wrapper.h"
#include "nodegit_wrapper.h"

extern "C" {
  #include <git2.h>
 }

  #include "../include/oid.h"
 
using namespace node;
using namespace v8;

class GitBlameOptions;

struct GitBlameOptionsTraits {
  typedef GitBlameOptions cppClass;
  typedef git_blame_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_blame_options **dest, git_blame_options *src) {
     Nan::ThrowError("duplicate called on GitBlameOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_blame_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitBlameOptions : public NodeGitWrapper<GitBlameOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitBlameOptionsTraits>;
  public:
    GitBlameOptions(git_blame_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

               
  private:
    GitBlameOptions();
    ~GitBlameOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

   
        static NAN_GETTER(GetMinMatchCharacters);
        static NAN_SETTER(SetMinMatchCharacters);

             Nan::Persistent<Object> newest_commit;
  
        static NAN_GETTER(GetNewestCommit);
        static NAN_SETTER(SetNewestCommit);

             Nan::Persistent<Object> oldest_commit;
  
        static NAN_GETTER(GetOldestCommit);
        static NAN_SETTER(SetOldestCommit);

   
        static NAN_GETTER(GetMinLine);
        static NAN_SETTER(SetMinLine);

   
        static NAN_GETTER(GetMaxLine);
        static NAN_SETTER(SetMaxLine);

  };

#endif
