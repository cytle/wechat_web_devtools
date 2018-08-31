// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITBLAME_H
#define GITBLAME_H
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

#include "../include/repository.h"
#include "../include/blame_options.h"
#include "../include/blame_hunk.h"

using namespace node;
using namespace v8;

class GitBlame;

struct GitBlameTraits {
  typedef GitBlame cppClass;
  typedef git_blame cType;

  static const bool isDuplicable = false;
  static void duplicate(git_blame **dest, git_blame *src) {
     Nan::ThrowError("duplicate called on GitBlame which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_blame *raw) {
    ::git_blame_free(raw); // :: to avoid calling this free recursively
   }
};

class GitBlame : public
  NodeGitWrapper<GitBlameTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitBlameTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

                               

  private:
    GitBlame()
      : NodeGitWrapper<GitBlameTraits>(
           "A new GitBlame cannot be instantiated."
       )
    {}
    GitBlame(git_blame *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitBlameTraits>(raw, selfFreeing, owner)
    {}
    ~GitBlame();
                               
    struct BufferBaton {
      int error_code;
      const git_error* error;
      git_blame * out;
      git_blame * reference;
      const char * buffer;
      size_t buffer_len;
    };
    class BufferWorker : public Nan::AsyncWorker {
      public:
        BufferWorker(
            BufferBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~BufferWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        BufferBaton *baton;
    };

    static NAN_METHOD(Buffer);

    struct FileBaton {
      int error_code;
      const git_error* error;
      git_blame * out;
      git_repository * repo;
      const char * path;
      git_blame_options * options;
    };
    class FileWorker : public Nan::AsyncWorker {
      public:
        FileWorker(
            FileBaton *_baton,
            Nan::Callback *callback
        ) : Nan::AsyncWorker(callback)
          , baton(_baton) {};
        ~FileWorker() {};
        void Execute();
        void HandleOKCallback();

      private:
        FileBaton *baton;
    };

    static NAN_METHOD(File);

    static NAN_METHOD(Free);

    static NAN_METHOD(GetHunkByindex);

    static NAN_METHOD(GetHunkByline);

    static NAN_METHOD(GetHunkCount);

    static NAN_METHOD(InitOptions);
};

#endif
