// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITREPOSITORYINITOPTIONS_H
#define GITREPOSITORYINITOPTIONS_H
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

 
using namespace node;
using namespace v8;

class GitRepositoryInitOptions;

struct GitRepositoryInitOptionsTraits {
  typedef GitRepositoryInitOptions cppClass;
  typedef git_repository_init_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_repository_init_options **dest, git_repository_init_options *src) {
     Nan::ThrowError("duplicate called on GitRepositoryInitOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_repository_init_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitRepositoryInitOptions : public NodeGitWrapper<GitRepositoryInitOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitRepositoryInitOptionsTraits>;
  public:
    GitRepositoryInitOptions(git_repository_init_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

                 
  private:
    GitRepositoryInitOptions();
    ~GitRepositoryInitOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

   
        static NAN_GETTER(GetFlags);
        static NAN_SETTER(SetFlags);

   
        static NAN_GETTER(GetMode);
        static NAN_SETTER(SetMode);

   
        static NAN_GETTER(GetWorkdirPath);
        static NAN_SETTER(SetWorkdirPath);

   
        static NAN_GETTER(GetDescription);
        static NAN_SETTER(SetDescription);

   
        static NAN_GETTER(GetTemplatePath);
        static NAN_SETTER(SetTemplatePath);

   
        static NAN_GETTER(GetInitialHead);
        static NAN_SETTER(SetInitialHead);

   
        static NAN_GETTER(GetOriginUrl);
        static NAN_SETTER(SetOriginUrl);

  };

#endif
