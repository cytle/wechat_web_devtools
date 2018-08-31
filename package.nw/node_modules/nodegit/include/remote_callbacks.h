// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITREMOTECALLBACKS_H
#define GITREMOTECALLBACKS_H
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

  #include "../include/cred.h"
  #include "../include/cert.h"
  #include "../include/transfer_progress.h"
 
using namespace node;
using namespace v8;

class GitRemoteCallbacks;

struct GitRemoteCallbacksTraits {
  typedef GitRemoteCallbacks cppClass;
  typedef git_remote_callbacks cType;

  static const bool isDuplicable = false;
  static void duplicate(git_remote_callbacks **dest, git_remote_callbacks *src) {
     Nan::ThrowError("duplicate called on GitRemoteCallbacks which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_remote_callbacks *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitRemoteCallbacks : public NodeGitWrapper<GitRemoteCallbacksTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitRemoteCallbacksTraits>;
  public:
    GitRemoteCallbacks(git_remote_callbacks* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
    static void InitializeComponent (v8::Local<v8::Object> target);

            static int credentials_cppCallback (
              git_cred ** cred
                ,
               const char * url
                ,
               const char * username_from_url
                ,
               unsigned int allowed_types
                ,
               void * payload
            );

          static void credentials_async(void *baton);
          static void credentials_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct CredentialsBaton : public AsyncBatonWithResult<int> {
                git_cred ** cred;
                const char * url;
                const char * username_from_url;
                unsigned int allowed_types;
                void * payload;
 
              CredentialsBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitRemoteCallbacks * credentials_getInstanceFromBaton (
            CredentialsBaton *baton);
            static int certificate_check_cppCallback (
              git_cert * cert
                ,
               int valid
                ,
               const char * host
                ,
               void * payload
            );

          static void certificate_check_async(void *baton);
          static void certificate_check_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct CertificateCheckBaton : public AsyncBatonWithResult<int> {
                git_cert * cert;
                int valid;
                const char * host;
                void * payload;
 
              CertificateCheckBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitRemoteCallbacks * certificate_check_getInstanceFromBaton (
            CertificateCheckBaton *baton);
            static int transfer_progress_cppCallback (
              const git_transfer_progress * stats
                ,
               void * payload
            );

          static void transfer_progress_async(void *baton);
          static void transfer_progress_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct TransferProgressBaton : public AsyncBatonWithResult<int> {
                const git_transfer_progress * stats;
                void * payload;
 
              TransferProgressBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitRemoteCallbacks * transfer_progress_getInstanceFromBaton (
            TransferProgressBaton *baton);
            static int push_update_reference_cppCallback (
              const char * refname
                ,
               const char * status
                ,
               void * data
            );

          static void push_update_reference_async(void *baton);
          static void push_update_reference_promiseCompleted(bool isFulfilled, AsyncBaton *_baton, v8::Local<v8::Value> result);
             struct PushUpdateReferenceBaton : public AsyncBatonWithResult<int> {
                const char * refname;
                const char * status;
                void * data;
 
              PushUpdateReferenceBaton(const int &defaultResult)
                : AsyncBatonWithResult<int>(defaultResult) {
                }
            };
           static GitRemoteCallbacks * push_update_reference_getInstanceFromBaton (
            PushUpdateReferenceBaton *baton);
     
  private:
    GitRemoteCallbacks();
    ~GitRemoteCallbacks();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

             CallbackWrapper credentials;
  
        static NAN_GETTER(GetCredentials);
        static NAN_SETTER(SetCredentials);

             CallbackWrapper certificate_check;
  
        static NAN_GETTER(GetCertificateCheck);
        static NAN_SETTER(SetCertificateCheck);

             CallbackWrapper transfer_progress;
  
        static NAN_GETTER(GetTransferProgress);
        static NAN_SETTER(SetTransferProgress);

             CallbackWrapper push_update_reference;
  
        static NAN_GETTER(GetPushUpdateReference);
        static NAN_SETTER(SetPushUpdateReference);

             Nan::Persistent<Value> payload;
  
        static NAN_GETTER(GetPayload);
        static NAN_SETTER(SetPayload);

  };

#endif
