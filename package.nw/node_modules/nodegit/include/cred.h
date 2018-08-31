// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITCRED_H
#define GITCRED_H
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

class GitCred;

struct GitCredTraits {
  typedef GitCred cppClass;
  typedef git_cred cType;

  static const bool isDuplicable = false;
  static void duplicate(git_cred **dest, git_cred *src) {
     Nan::ThrowError("duplicate called on GitCred which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_cred *raw) {
    ::git_cred_free(raw); // :: to avoid calling this free recursively
   }
};

class GitCred : public
  NodeGitWrapper<GitCredTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitCredTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                     

  private:
    GitCred()
      : NodeGitWrapper<GitCredTraits>(
           "A new GitCred cannot be instantiated."
       )
    {}
    GitCred(git_cred *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitCredTraits>(raw, selfFreeing, owner)
    {}
    ~GitCred();
                                     
    static NAN_METHOD(DefaultNew);

    static NAN_METHOD(Free);

    static NAN_METHOD(HasUsername);

    static NAN_METHOD(SshKeyFromAgent);

    struct SshKeyMemoryNewBaton {
      int error_code;
      const git_error* error;
      git_cred * out;
      const char * username;
      const char * publickey;
      const char * privatekey;
      const char * passphrase;
    };
    class SshKeyMemoryNewWorker : public Nan::AsyncWorker {
      public:
        SshKeyMemoryNewWorker(
            SshKeyMemoryNewBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~SshKeyMemoryNewWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        SshKeyMemoryNewBaton *baton;
    };

    static NAN_METHOD(SshKeyMemoryNew);

    static NAN_METHOD(SshKeyNew);

    struct UsernameNewBaton {
      int error_code;
      const git_error* error;
      git_cred * cred;
      const char * username;
    };
    class UsernameNewWorker : public Nan::AsyncWorker {
      public:
        UsernameNewWorker(
            UsernameNewBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~UsernameNewWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        UsernameNewBaton *baton;
    };

    static NAN_METHOD(UsernameNew);

    static NAN_METHOD(UserpassPlaintextNew);
};

#endif
