// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITBLOB_H
#define GITBLOB_H
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

#include "../include/wrapper.h"
#include "node_buffer.h"
#include "../include/oid.h"
#include "../include/repository.h"
#include "../include/writestream.h"
#include "../include/buf.h"
// Forward declaration.
struct git_blob {
};

using namespace node;
using namespace v8;

class GitBlob;

struct GitBlobTraits {
  typedef GitBlob cppClass;
  typedef git_blob cType;

  static const bool isDuplicable = false;
  static void duplicate(git_blob **dest, git_blob *src) {
     Nan::ThrowError("duplicate called on GitBlob which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_blob *raw) {
    ::git_blob_free(raw); // :: to avoid calling this free recursively
   }
};

class GitBlob : public
  NodeGitWrapper<GitBlobTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitBlobTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                                                                 

  private:
    GitBlob()
      : NodeGitWrapper<GitBlobTraits>(
           "A new GitBlob cannot be instantiated."
       )
    {}
    GitBlob(git_blob *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitBlobTraits>(raw, selfFreeing, owner)
    {}
    ~GitBlob();
                                                                 
    struct CreateFrombufferBaton {
      int error_code;
      const git_error* error;
      git_oid * id;
      git_repository * repo;
      const void * buffer;
      size_t len;
    };
    class CreateFrombufferWorker : public Nan::AsyncWorker {
      public:
        CreateFrombufferWorker(
            CreateFrombufferBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFrombufferWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFrombufferBaton *baton;
    };

    static NAN_METHOD(CreateFrombuffer);

    struct CreateFromdiskBaton {
      int error_code;
      const git_error* error;
      git_oid * id;
      git_repository * repo;
      const char * path;
    };
    class CreateFromdiskWorker : public Nan::AsyncWorker {
      public:
        CreateFromdiskWorker(
            CreateFromdiskBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromdiskWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromdiskBaton *baton;
    };

    static NAN_METHOD(CreateFromdisk);

    struct CreateFromstreamBaton {
      int error_code;
      const git_error* error;
      git_writestream * out;
      git_repository * repo;
      const char * hintpath;
    };
    class CreateFromstreamWorker : public Nan::AsyncWorker {
      public:
        CreateFromstreamWorker(
            CreateFromstreamBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromstreamWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromstreamBaton *baton;
    };

    static NAN_METHOD(CreateFromstream);

    struct CreateFromstreamCommitBaton {
      int error_code;
      const git_error* error;
      git_oid * out;
      git_writestream * stream;
    };
    class CreateFromstreamCommitWorker : public Nan::AsyncWorker {
      public:
        CreateFromstreamCommitWorker(
            CreateFromstreamCommitBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromstreamCommitWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromstreamCommitBaton *baton;
    };

    static NAN_METHOD(CreateFromstreamCommit);

    struct CreateFromworkdirBaton {
      int error_code;
      const git_error* error;
      git_oid * id;
      git_repository * repo;
      const char * relative_path;
    };
    class CreateFromworkdirWorker : public Nan::AsyncWorker {
      public:
        CreateFromworkdirWorker(
            CreateFromworkdirBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~CreateFromworkdirWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        CreateFromworkdirBaton *baton;
    };

    static NAN_METHOD(CreateFromworkdir);

    struct DupBaton {
      int error_code;
      const git_error* error;
      git_blob * out;
      git_blob * source;
    };
    class DupWorker : public Nan::AsyncWorker {
      public:
        DupWorker(
            DupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~DupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        DupBaton *baton;
    };

    static NAN_METHOD(Dup);

    struct FilteredContentBaton {
      int error_code;
      const git_error* error;
      git_buf * out;
      git_blob * blob;
      const char * as_path;
      int check_for_binary_data;
    };
    class FilteredContentWorker : public Nan::AsyncWorker {
      public:
        FilteredContentWorker(
            FilteredContentBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FilteredContentWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FilteredContentBaton *baton;
    };

    static NAN_METHOD(FilteredContent);

    static NAN_METHOD(Free);

    static NAN_METHOD(Id);

    static NAN_METHOD(IsBinary);

    struct LookupBaton {
      int error_code;
      const git_error* error;
      git_blob * blob;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
    };
    class LookupWorker : public Nan::AsyncWorker {
      public:
        LookupWorker(
            LookupBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LookupWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LookupBaton *baton;
    };

    static NAN_METHOD(Lookup);

    struct LookupPrefixBaton {
      int error_code;
      const git_error* error;
      git_blob * blob;
      git_repository * repo;
      const git_oid * id;
      bool idNeedsFree;
      size_t len;
    };
    class LookupPrefixWorker : public Nan::AsyncWorker {
      public:
        LookupPrefixWorker(
            LookupPrefixBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~LookupPrefixWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        LookupPrefixBaton *baton;
    };

    static NAN_METHOD(LookupPrefix);

    static NAN_METHOD(Owner);

    static NAN_METHOD(Rawcontent);

    static NAN_METHOD(Rawsize);
};

#endif
