// This is a generated file, modify: generate/templates/templates/class_header.h

#ifndef GITDESCRIBEFORMATOPTIONS_H
#define GITDESCRIBEFORMATOPTIONS_H
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

class GitDescribeFormatOptions;

struct GitDescribeFormatOptionsTraits {
  typedef GitDescribeFormatOptions cppClass;
  typedef git_describe_format_options cType;

  static const bool isDuplicable = false;
  static void duplicate(git_describe_format_options **dest, git_describe_format_options *src) {
     Nan::ThrowError("duplicate called on GitDescribeFormatOptions which cannot be duplicated");
   }

  static const bool isFreeable = true;
  static void free(git_describe_format_options *raw) {
    ::free(raw); // :: to avoid calling this free recursively
   }
};

class GitDescribeFormatOptions : public
  NodeGitWrapper<GitDescribeFormatOptionsTraits>
{
    // grant full access to base class
    friend class NodeGitWrapper<GitDescribeFormatOptionsTraits>;
   public:
    static void InitializeComponent (v8::Local<v8::Object> target);

 

  private:
    GitDescribeFormatOptions()
      : NodeGitWrapper<GitDescribeFormatOptionsTraits>(
           "A new GitDescribeFormatOptions cannot be instantiated."
       )
    {}
    GitDescribeFormatOptions(git_describe_format_options *raw, bool selfFreeing, v8::Local<v8::Object> owner = v8::Local<v8::Object>())
      : NodeGitWrapper<GitDescribeFormatOptionsTraits>(raw, selfFreeing, owner)
    {}
    ~GitDescribeFormatOptions();
     static NAN_METHOD(Version);
    static NAN_METHOD(AbbreviatedSize);
    static NAN_METHOD(AlwaysUseLongFormat);
    static NAN_METHOD(DirtySuffix);
};

#endif
