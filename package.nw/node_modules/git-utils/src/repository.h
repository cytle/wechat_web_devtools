// Copyright (c) 2013 GitHub Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

#ifndef SRC_REPOSITORY_H_
#define SRC_REPOSITORY_H_

#include <string>
#include <vector>

#include "git2.h"
#include "nan.h"
using namespace v8;  // NOLINT

class Repository : public Nan::ObjectWrap {
 public:
  static void Init(Local<Object> target);

 private:
  static NAN_METHOD(New);
  static NAN_METHOD(GetPath);
  static NAN_METHOD(GetWorkingDirectory);
  static NAN_METHOD(GetSubmodulePaths);
  static NAN_METHOD(Exists);
  static NAN_METHOD(GetHead);
  static NAN_METHOD(GetHeadAsync);
  static NAN_METHOD(RefreshIndex);
  static NAN_METHOD(IsIgnored);
  static NAN_METHOD(IsSubmodule);
  static NAN_METHOD(GetConfigValue);
  static NAN_METHOD(SetConfigValue);
  static NAN_METHOD(GetStatus);
  static NAN_METHOD(GetStatusAsync);
  static NAN_METHOD(GetStatusForPath);
  static NAN_METHOD(CheckoutHead);
  static NAN_METHOD(GetReferenceTarget);
  static NAN_METHOD(GetDiffStats);
  static NAN_METHOD(GetIndexBlob);
  static NAN_METHOD(GetHeadBlob);
  static NAN_METHOD(CompareCommits);
  static NAN_METHOD(CompareCommitsAsync);
  static NAN_METHOD(Release);
  static NAN_METHOD(GetLineDiffs);
  static NAN_METHOD(GetLineDiffDetails);
  static NAN_METHOD(GetReferences);
  static NAN_METHOD(CheckoutReference);
  static NAN_METHOD(Add);

  static int DiffHunkCallback(const git_diff_delta *delta,
                              const git_diff_hunk *hunk,
                              void *payload);
  static int DiffLineCallback(const git_diff_delta *delta,
                              const git_diff_hunk *hunk,
                              const git_diff_line *line,
                              void *payload);
  static int SubmoduleCallback(git_submodule *submodule, const char *name,
                               void *payload);

  static Local<Value> ConvertStringVectorToV8Array(
      const std::vector<std::string>& vector);

  static git_repository* GetRepository(Nan::NAN_METHOD_ARGS_TYPE args);
  static git_repository* GetAsyncRepository(Nan::NAN_METHOD_ARGS_TYPE args);

  static int GetBlob(Nan::NAN_METHOD_ARGS_TYPE args,
                      git_repository* repo, git_blob*& blob);

  static git_diff_options CreateDefaultGitDiffOptions();

  explicit Repository(Local<String> path, Local<Boolean> search);
  ~Repository();

  git_repository* repository;
  git_repository* async_repository;
};

#endif  // SRC_REPOSITORY_H_
