// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITINDEXENTRY_H
#define GITINDEXENTRY_H
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

  #include "../include/index_time.h"
  #include "../include/oid.h"
 
using namespace node;
using namespace v8;

class GitIndexEntry;

struct GitIndexEntryTraits {
  typedef GitIndexEntry cppClass;
  typedef git_index_entry cType;

  static const bool isDuplicable = false;
  static void duplicate(git_index_entry **dest, git_index_entry *src) {
     Nan::ThrowError("duplicate called on GitIndexEntry which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_index_entry *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitIndexEntry : public NodeGitWrapper<GitIndexEntryTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitIndexEntryTraits>;
  public:
    GitIndexEntry(git_index_entry* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                         
  private:
    GitIndexEntry();
    ~GitIndexEntry();

    void ConstructFields();

            Nan::Persistent<Object> ctime;
  
        static NAN_GETTER(GetCtime);
        static NAN_SETTER(SetCtime);

             Nan::Persistent<Object> mtime;
  
        static NAN_GETTER(GetMtime);
        static NAN_SETTER(SetMtime);

   
        static NAN_GETTER(GetDev);
        static NAN_SETTER(SetDev);

   
        static NAN_GETTER(GetIno);
        static NAN_SETTER(SetIno);

   
        static NAN_GETTER(GetMode);
        static NAN_SETTER(SetMode);

   
        static NAN_GETTER(GetUid);
        static NAN_SETTER(SetUid);

   
        static NAN_GETTER(GetGid);
        static NAN_SETTER(SetGid);

   
        static NAN_GETTER(GetFileSize);
        static NAN_SETTER(SetFileSize);

             Nan::Persistent<Object> id;
  
        static NAN_GETTER(GetId);
        static NAN_SETTER(SetId);

   
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

   
        static NAN_GETTER(GetFlagsExtended);
        static NAN_SETTER(SetFlagsExtended);

   
        static NAN_GETTER(GetPath);
        static NAN_SETTER(SetPath);

  };

#endif
