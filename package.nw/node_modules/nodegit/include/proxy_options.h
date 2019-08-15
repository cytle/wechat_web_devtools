// This is a generated file, modify: generate/templates/templates/struct_header.h

#ifndef GITPROXYOPTIONS_H
#define GITPROXYOPTIONS_H
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
 
using namespace node;
using namespace v8;

class GitProxyOptions;

struct GitProxyOptionsTraits {
  typedef GitProxyOptions cppClass;
  typedef git_proxy_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_proxy_options **dest, git_proxy_options *src) {
     Nan::ThrowError("duplicate called on GitProxyOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_proxy_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};
 class GitProxyOptions : public NodeGitWrapper<GitProxyOptionsTraits> {
    // grant full access to base class
    friend class NodeGitWrapper<GitProxyOptionsTraits>;
  public:
    GitProxyOptions(git_proxy_options* raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>());
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
           static GitProxyOptions * credentials_getInstanceFromBaton (
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
           static GitProxyOptions * certificate_check_getInstanceFromBaton (
            CertificateCheckBaton *baton);
     
  private:
    GitProxyOptions();
    ~GitProxyOptions();

    void ConstructFields();

  
        static NAN_GETTER(GetVersion);
        static NAN_SETTER(SetVersion);

  
        static NAN_GETTER(GetType);
        static NAN_SETTER(SetType);

   
        static NAN_GETTER(GetUrl);
        static NAN_SETTER(SetUrl);

             CallbackWrapper credentials;
  
        static NAN_GETTER(GetCredentials);
        static NAN_SETTER(SetCredentials);

             CallbackWrapper certificate_check;
  
        static NAN_GETTER(GetCertificateCheck);
        static NAN_SETTER(SetCertificateCheck);

             Nan::Persistent<Value> payload;
  
        static NAN_GETTER(GetPayload);
        static NAN_SETTER(SetPayload);

  };

#endif
