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

#include "repository.h"

#include <string.h>

#include <map>
#include <utility>

void Repository::Init(Local<Object> target) {
  Nan::HandleScope scope;
  git_libgit2_init();

  Local<FunctionTemplate> newTemplate = Nan::New<FunctionTemplate>(
      Repository::New);
  newTemplate->SetClassName(Nan::New<String>("Repository").ToLocalChecked());
  newTemplate->InstanceTemplate()->SetInternalFieldCount(1);

  Local<ObjectTemplate> proto = newTemplate->PrototypeTemplate();
  Nan::SetMethod(proto, "getPath", Repository::GetPath);
  Nan::SetMethod(proto, "_getWorkingDirectory",
                  Repository::GetWorkingDirectory);
  Nan::SetMethod(proto, "exists", Repository::Exists);
  Nan::SetMethod(proto, "getSubmodulePaths", Repository::GetSubmodulePaths);
  Nan::SetMethod(proto, "getHead", Repository::GetHead);
  Nan::SetMethod(proto, "refreshIndex", Repository::RefreshIndex);
  Nan::SetMethod(proto, "isIgnored", Repository::IsIgnored);
  Nan::SetMethod(proto, "isSubmodule", Repository::IsSubmodule);
  Nan::SetMethod(proto, "getConfigValue", Repository::GetConfigValue);
  Nan::SetMethod(proto, "setConfigValue", Repository::SetConfigValue);
  Nan::SetMethod(proto, "getStatus", Repository::GetStatus);
  Nan::SetMethod(proto, "getStatusForPaths",
                        Repository::GetStatusForPaths);
  Nan::SetMethod(proto, "checkoutHead", Repository::CheckoutHead);
  Nan::SetMethod(proto, "getReferenceTarget", Repository::GetReferenceTarget);
  Nan::SetMethod(proto, "getDiffStats", Repository::GetDiffStats);
  Nan::SetMethod(proto, "getIndexBlob", Repository::GetIndexBlob);
  Nan::SetMethod(proto, "getHeadBlob", Repository::GetHeadBlob);
  Nan::SetMethod(proto, "getCommitCount", Repository::GetCommitCount);
  Nan::SetMethod(proto, "getMergeBase", Repository::GetMergeBase);
  Nan::SetMethod(proto, "_release", Repository::Release);
  Nan::SetMethod(proto, "getLineDiffs", Repository::GetLineDiffs);
  Nan::SetMethod(proto, "getLineDiffDetails", Repository::GetLineDiffDetails);
  Nan::SetMethod(proto, "getReferences", Repository::GetReferences);
  Nan::SetMethod(proto, "checkoutRef", Repository::CheckoutReference);
  Nan::SetMethod(proto, "add", Repository::Add);

  target->Set(Nan::New<String>("Repository").ToLocalChecked(),
                                newTemplate->GetFunction());
}

NODE_MODULE(git, Repository::Init)

NAN_METHOD(Repository::New) {
  Nan::HandleScope scope;
  Repository* repository = new Repository(Local<String>::Cast(info[0]));
  repository->Wrap(info.This());
  info.GetReturnValue().SetUndefined();
}

git_repository* Repository::GetRepository(Nan::NAN_METHOD_ARGS_TYPE args) {
  return Nan::ObjectWrap::Unwrap<Repository>(args.This())->repository;
}

int Repository::GetBlob(Nan::NAN_METHOD_ARGS_TYPE args,
                        git_repository* repo, git_blob*& blob) {
  std::string path(*String::Utf8Value(args[0]));

  int useIndex = false;
  if (args.Length() >= 3) {
    Local<Object> optionsArg(Local<Object>::Cast(args[2]));
    if (optionsArg->Get(
        Nan::New<String>("useIndex").ToLocalChecked())->BooleanValue())
      useIndex = true;
  }

  if (useIndex) {
    git_index* index;
    if (git_repository_index(&index, repo) != GIT_OK)
      return -1;

    git_index_read(index, 0);
    const git_index_entry* entry = git_index_get_bypath(index, path.data(), 0);
    if (entry == NULL) {
      git_index_free(index);
      return -1;
    }

    const git_oid* blobSha = &entry->id;
    if (blobSha != NULL && git_blob_lookup(&blob, repo, blobSha) != GIT_OK)
      blob = NULL;
  } else {
    git_reference* head;
    if (git_repository_head(&head, repo) != GIT_OK)
      return -1;

    const git_oid* sha = git_reference_target(head);
    git_commit* commit;
    int commitStatus = git_commit_lookup(&commit, repo, sha);
    git_reference_free(head);
    if (commitStatus != GIT_OK)
      return -1;

    git_tree* tree;
    int treeStatus = git_commit_tree(&tree, commit);
    git_commit_free(commit);
    if (treeStatus != GIT_OK)
      return -1;

    git_tree_entry* treeEntry;
    if (git_tree_entry_bypath(&treeEntry, tree, path.c_str()) != GIT_OK) {
      git_tree_free(tree);
      return -1;
    }

    const git_oid* blobSha = git_tree_entry_id(treeEntry);
    if (blobSha != NULL && git_blob_lookup(&blob, repo, blobSha) != GIT_OK)
      blob = NULL;
    git_tree_entry_free(treeEntry);
    git_tree_free(tree);
  }

  if (blob == NULL)
    return -1;

  return 0;
}

// C++ equivalent to GIT_DIFF_OPTIONS_INIT, we can not use it directly because
// of C++'s strong typing.
git_diff_options Repository::CreateDefaultGitDiffOptions() {
  git_diff_options options = { 0 };
  options.version = GIT_DIFF_OPTIONS_VERSION;
  options.context_lines = 3;
  return options;
}

NAN_METHOD(Repository::Exists) {
  Nan::HandleScope scope;

  info.GetReturnValue().Set(Nan::New<Boolean>(GetRepository(info) != NULL));
}

NAN_METHOD(Repository::GetPath) {
  Nan::HandleScope scope;
  git_repository* repository = GetRepository(info);
  const char* path = git_repository_path(repository);

  info.GetReturnValue().Set(Nan::New<String>(path).ToLocalChecked());
}

NAN_METHOD(Repository::GetWorkingDirectory) {
  Nan::HandleScope scope;
  git_repository* repository = GetRepository(info);
  const char* path = git_repository_workdir(repository);
  info.GetReturnValue().Set(Nan::New<String>(path).ToLocalChecked());
}

NAN_METHOD(Repository::GetSubmodulePaths) {
  Nan::HandleScope scope;
  git_repository* repository = GetRepository(info);
  std::vector<std::string> paths;
  git_submodule_foreach(repository, SubmoduleCallback, &paths);
  Local<Object> v8Paths = Nan::New<Array>(paths.size());
  for (size_t i = 0; i < paths.size(); i++)
    v8Paths->Set(i, Nan::New<String>(paths[i].data()).ToLocalChecked());
  info.GetReturnValue().Set(v8Paths);
}

NAN_METHOD(Repository::GetHead) {
  Nan::HandleScope scope;
  git_repository* repository = GetRepository(info);
  git_reference* head;
  if (git_repository_head(&head, repository) != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  if (git_repository_head_detached(repository) == 1) {
    const git_oid* sha = git_reference_target(head);
    if (sha != NULL) {
      char oid[GIT_OID_HEXSZ + 1];
      git_oid_tostr(oid, GIT_OID_HEXSZ + 1, sha);
      git_reference_free(head);
      return info.GetReturnValue().Set(Nan::New<String>(oid, -1)
                                        .ToLocalChecked());
    }
  }

  Local<String> referenceName = Nan::New<String>(git_reference_name(head))
                                    .ToLocalChecked();
  git_reference_free(head);
  return info.GetReturnValue().Set(referenceName);
}

NAN_METHOD(Repository::RefreshIndex) {
  Nan::HandleScope scope;
  git_repository* repository = GetRepository(info);
  git_index* index;
  if (git_repository_index(&index, repository) == GIT_OK) {
    git_index_read(index, 0);
    git_index_free(index);
  }
  info.GetReturnValue().SetUndefined();
}

NAN_METHOD(Repository::IsIgnored) {
  Nan::HandleScope scope;
  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));

  git_repository* repository = GetRepository(info);
  std::string path(*String::Utf8Value(info[0]));
  int ignored;
  if (git_ignore_path_is_ignored(&ignored,
                                 repository,
                                 path.c_str()) == GIT_OK)
    return info.GetReturnValue().Set(Nan::New<Boolean>(ignored == 1));
  else
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));
}

NAN_METHOD(Repository::IsSubmodule) {
  Nan::HandleScope scope;
  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));

  git_index* index;
  git_repository* repository = GetRepository(info);
  if (git_repository_index(&index, repository) == GIT_OK) {
    std::string path(*String::Utf8Value(info[0]));
    const git_index_entry* entry = git_index_get_bypath(index, path.c_str(), 0);
    Local<Boolean> isSubmodule = Nan::New<Boolean>(
        entry != NULL && (entry->mode & S_IFMT) == GIT_FILEMODE_COMMIT);
    git_index_free(index);
    return info.GetReturnValue().Set(isSubmodule);
  } else {
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));
  }
}

NAN_METHOD(Repository::GetConfigValue) {
  Nan::HandleScope scope;
  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::Null());

  git_config* config;
  git_repository* repository = GetRepository(info);
  if (git_repository_config_snapshot(&config, repository) != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  std::string configKey(*String::Utf8Value(info[0]));
  const char* configValue;
  if (git_config_get_string(
        &configValue, config, configKey.c_str()) == GIT_OK) {
    git_config_free(config);
    return info.GetReturnValue().Set(Nan::New<String>(configValue)
                                      .ToLocalChecked());
  } else {
    git_config_free(config);
    return info.GetReturnValue().Set(Nan::Null());
  }
}

NAN_METHOD(Repository::SetConfigValue) {
  Nan::HandleScope scope;
  if (info.Length() != 2)
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));

  git_config* config;
  git_repository* repository = GetRepository(info);
  if (git_repository_config(&config, repository) != GIT_OK)
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));

  std::string configKey(*String::Utf8Value(info[0]));
  std::string configValue(*String::Utf8Value(info[1]));

  int errorCode = git_config_set_string(
      config, configKey.c_str(), configValue.c_str());
  git_config_free(config);
  return info.GetReturnValue().Set(Nan::New<Boolean>(errorCode == GIT_OK));
}


NAN_METHOD(Repository::GetStatus) {
  Nan::HandleScope scope;
  if (info.Length() < 1) {
    Local<Object> result = Nan::New<Object>();
    std::map<std::string, unsigned int> statuses;
    git_status_options options = GIT_STATUS_OPTIONS_INIT;
    options.flags = GIT_STATUS_OPT_INCLUDE_UNTRACKED |
                    GIT_STATUS_OPT_RECURSE_UNTRACKED_DIRS;
    if (git_status_foreach_ext(GetRepository(info),
                               &options,
                               StatusCallback,
                               &statuses) == GIT_OK) {
      std::map<std::string, unsigned int>::iterator iter = statuses.begin();
      for (; iter != statuses.end(); ++iter)
        result->Set(Nan::New<String>(iter->first.c_str()).ToLocalChecked(),
                    Nan::New<Number>(iter->second));
    }
    return info.GetReturnValue().Set(result);
  } else {
    git_repository* repository = GetRepository(info);
    std::string path(*String::Utf8Value(info[0]));
    unsigned int status = 0;
    if (git_status_file(&status, repository, path.c_str()) == GIT_OK)
      return info.GetReturnValue().Set(Nan::New<Number>(status));
    else
      return info.GetReturnValue().Set(Nan::New<Number>(0));
  }
}

NAN_METHOD(Repository::GetStatusForPaths) {
  Nan::HandleScope scope;

  Local<Object> result = Nan::New<Object>();
  if (info.Length() < 1)
    return info.GetReturnValue().Set(result);

  std::map<std::string, unsigned int> statuses;
  git_status_options options = GIT_STATUS_OPTIONS_INIT;
  // Ideally we'd use GIT_STATUS_OPT_DISABLE_PATHSPEC_MATCH here since we want
  // to limit to a path, not a pathspec, but libgit2 seems to have a bug here:
  // https://github.com/libgit2/libgit2/pull/3609
  options.flags = GIT_STATUS_OPT_INCLUDE_UNTRACKED |
                  GIT_STATUS_OPT_RECURSE_UNTRACKED_DIRS;

  Array *pathsArg = Array::Cast(*info[0]);
  unsigned int pathsLength = pathsArg->Length();
  if (pathsLength < 1)
    return info.GetReturnValue().Set(result);

  char *path = NULL;
  char **paths = reinterpret_cast<char **>(malloc(pathsLength * sizeof(path)));
  for (unsigned int i = 0; i < pathsLength; i++) {
    String::Utf8Value utf8Path(pathsArg->Get(i));
    path = strdup(*utf8Path);
    paths[i] = path;
  }

  git_strarray pathsArray;
  pathsArray.count = pathsLength;
  pathsArray.strings = paths;
  options.pathspec = pathsArray;

  if (git_status_foreach_ext(GetRepository(info),
                             &options,
                             StatusCallback,
                             &statuses) == GIT_OK) {
    std::map<std::string, unsigned int>::iterator iter = statuses.begin();
    for (; iter != statuses.end(); ++iter)
      result->Set(Nan::New<String>(iter->first.c_str()).ToLocalChecked(),
                  Nan::New<Number>(iter->second));
  }

  if (paths != NULL) {
    git_strarray_free(&pathsArray);
  }

  return info.GetReturnValue().Set(result);
}

NAN_METHOD(Repository::CheckoutHead) {
  Nan::HandleScope scope;
  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));

  String::Utf8Value utf8Path(info[0]);
  char* path = *utf8Path;

  git_checkout_options options = GIT_CHECKOUT_OPTIONS_INIT;
  options.checkout_strategy = GIT_CHECKOUT_FORCE |
                              GIT_CHECKOUT_DISABLE_PATHSPEC_MATCH;
  git_strarray paths;
  paths.count = 1;
  paths.strings = &path;
  options.paths = paths;

  int result = git_checkout_head(GetRepository(info), &options);
  return info.GetReturnValue().Set(Nan::New<Boolean>(result == GIT_OK));
}

NAN_METHOD(Repository::GetReferenceTarget) {
  Nan::HandleScope scope;
  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::Null());

  std::string refName(*String::Utf8Value(info[0]));
  git_oid sha;
  if (git_reference_name_to_id(
        &sha, GetRepository(info), refName.c_str()) == GIT_OK) {
    char oid[GIT_OID_HEXSZ + 1];
    git_oid_tostr(oid, GIT_OID_HEXSZ + 1, &sha);
    return info.GetReturnValue().Set(Nan::New<String>(oid, -1)
                                  .ToLocalChecked());
  } else {
    return info.GetReturnValue().Set(Nan::Null());
  }
}

NAN_METHOD(Repository::GetDiffStats) {
  Nan::HandleScope scope;

  int added = 0;
  int deleted = 0;
  Local<Object> result = Nan::New<Object>();
  result->Set(Nan::New<String>("added").ToLocalChecked(),
                Nan::New<Number>(added));
  result->Set(Nan::New<String>("deleted").ToLocalChecked(),
                Nan::New<Number>(deleted));

  if (info.Length() < 1)
    return info.GetReturnValue().Set(result);

  git_repository* repository = GetRepository(info);
  git_reference* head;
  if (git_repository_head(&head, repository) != GIT_OK)
    return info.GetReturnValue().Set(result);

  const git_oid* sha = git_reference_target(head);
  git_commit* commit;
  int commitStatus = git_commit_lookup(&commit, repository, sha);
  git_reference_free(head);
  if (commitStatus != GIT_OK)
    return info.GetReturnValue().Set(result);

  git_tree* tree;
  int treeStatus = git_commit_tree(&tree, commit);
  git_commit_free(commit);
  if (treeStatus != GIT_OK)
    return info.GetReturnValue().Set(result);

  String::Utf8Value utf8Path(info[0]);
  char* path = *utf8Path;

  git_diff_options options = CreateDefaultGitDiffOptions();
  git_strarray paths;
  paths.count = 1;
  paths.strings = &path;
  options.pathspec = paths;
  options.context_lines = 0;
  options.flags = GIT_DIFF_DISABLE_PATHSPEC_MATCH;

  git_diff* diffs;
  int diffStatus = git_diff_tree_to_workdir(&diffs, repository, tree, &options);
  git_tree_free(tree);
  if (diffStatus != GIT_OK)
    return info.GetReturnValue().Set(result);

  int deltas = git_diff_num_deltas(diffs);
  if (deltas != 1) {
    git_diff_free(diffs);
    return info.GetReturnValue().Set(result);
  }

  git_patch* patch;
  int patchStatus = git_patch_from_diff(&patch, diffs, 0);
  git_diff_free(diffs);
  if (patchStatus != GIT_OK)
    return info.GetReturnValue().Set(result);

  int hunks = git_patch_num_hunks(patch);
  for (int i = 0; i < hunks; i++) {
    int lines = git_patch_num_lines_in_hunk(patch, i);
    for (int j = 0; j < lines; j++) {
      const git_diff_line* line;
      if (git_patch_get_line_in_hunk(&line, patch, i, j) == GIT_OK) {
        switch (line->origin) {
          case GIT_DIFF_LINE_ADDITION:
            added++;
            break;
          case GIT_DIFF_LINE_DELETION:
            deleted++;
            break;
        }
      }
    }
  }
  git_patch_free(patch);

  result->Set(Nan::New<String>("added").ToLocalChecked(),
                Nan::New<Number>(added));
  result->Set(Nan::New<String>("deleted").ToLocalChecked(),
                Nan::New<Number>(deleted));

  return info.GetReturnValue().Set(result);
}

NAN_METHOD(Repository::GetHeadBlob) {
  Nan::HandleScope scope;
  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::Null());

  std::string path(*String::Utf8Value(info[0]));

  git_repository* repo = GetRepository(info);
  git_reference* head;
  if (git_repository_head(&head, repo) != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  const git_oid* sha = git_reference_target(head);
  git_commit* commit;
  int commitStatus = git_commit_lookup(&commit, repo, sha);
  git_reference_free(head);
  if (commitStatus != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  git_tree* tree;
  int treeStatus = git_commit_tree(&tree, commit);
  git_commit_free(commit);
  if (treeStatus != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  git_tree_entry* treeEntry;
  if (git_tree_entry_bypath(&treeEntry, tree, path.c_str()) != GIT_OK) {
    git_tree_free(tree);
    return info.GetReturnValue().Set(Nan::Null());
  }

  git_blob* blob = NULL;
  const git_oid* blobSha = git_tree_entry_id(treeEntry);
  if (blobSha != NULL && git_blob_lookup(&blob, repo, blobSha) != GIT_OK)
    blob = NULL;
  git_tree_entry_free(treeEntry);
  git_tree_free(tree);
  if (blob == NULL)
    return info.GetReturnValue().Set(Nan::Null());

  const char* content = static_cast<const char*>(git_blob_rawcontent(blob));
  Local<Value> value = Nan::New<String>(content).ToLocalChecked();
  git_blob_free(blob);
  return info.GetReturnValue().Set(value);
}

NAN_METHOD(Repository::GetIndexBlob) {
  Nan::HandleScope scope;
  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::Null());

  std::string path(*String::Utf8Value(info[0]));

  git_repository* repo = GetRepository(info);
  git_index* index;
  if (git_repository_index(&index, repo) != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  git_index_read(index, 0);
  const git_index_entry* entry = git_index_get_bypath(index, path.data(), 0);
  if (entry == NULL) {
    git_index_free(index);
    return info.GetReturnValue().Set(Nan::Null());
  }

  git_blob* blob = NULL;
  const git_oid* blobSha = &entry->id;
  if (blobSha != NULL && git_blob_lookup(&blob, repo, blobSha) != GIT_OK)
    blob = NULL;
  git_index_free(index);
  if (blob == NULL)
    return info.GetReturnValue().Set(Nan::Null());

  const char* content = static_cast<const char*>(git_blob_rawcontent(blob));
  Local<Value> value = Nan::New<String>(content).ToLocalChecked();
  git_blob_free(blob);
  return info.GetReturnValue().Set(value);
}

int Repository::StatusCallback(
    const char* path, unsigned int status, void* payload) {
  std::map<std::string, unsigned int>* statuses =
      static_cast<std::map<std::string, unsigned int>*>(payload);
  statuses->insert(std::make_pair(std::string(path), status));
  return GIT_OK;
}

int Repository::SubmoduleCallback(
    git_submodule* submodule, const char* name, void* payload) {
  std::vector<std::string>* submodules =
      static_cast<std::vector<std::string>*>(payload);
  const char* submodulePath = git_submodule_path(submodule);
  if (submodulePath != NULL)
    submodules->push_back(submodulePath);
  return GIT_OK;
}

NAN_METHOD(Repository::Release) {
  Nan::HandleScope scope;
  Repository* repo = Nan::ObjectWrap::Unwrap<Repository>(info.This());
  if (repo->repository != NULL) {
    git_repository_free(repo->repository);
    repo->repository = NULL;
  }
  info.GetReturnValue().SetUndefined();
}

NAN_METHOD(Repository::GetCommitCount) {
  Nan::HandleScope scope;
  if (info.Length() < 2)
    return info.GetReturnValue().Set(Nan::New<Number>(0));

  std::string fromCommitId(*String::Utf8Value(info[0]));
  git_oid fromCommit;
  if (git_oid_fromstr(&fromCommit, fromCommitId.c_str()) != GIT_OK)
    return info.GetReturnValue().Set(Nan::New<Number>(0));

  std::string toCommitId(*String::Utf8Value(info[1]));
  git_oid toCommit;
  if (git_oid_fromstr(&toCommit, toCommitId.c_str()) != GIT_OK)
    return info.GetReturnValue().Set(Nan::New<Number>(0));

  git_revwalk* revWalk;
  if (git_revwalk_new(&revWalk, GetRepository(info)) != GIT_OK)
    return info.GetReturnValue().Set(Nan::New<Number>(0));

  git_revwalk_push(revWalk, &fromCommit);
  git_revwalk_hide(revWalk, &toCommit);
  git_oid currentCommit;
  int count = 0;
  while (git_revwalk_next(&currentCommit, revWalk) == GIT_OK)
    count++;
  git_revwalk_free(revWalk);
  return info.GetReturnValue().Set(Nan::New<Number>(count));
}

NAN_METHOD(Repository::GetMergeBase) {
  Nan::HandleScope scope;
  if (info.Length() < 2)
    return info.GetReturnValue().Set(Nan::Null());

  std::string commitOneId(*String::Utf8Value(info[0]));
  git_oid commitOne;
  if (git_oid_fromstr(&commitOne, commitOneId.c_str()) != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  std::string commitTwoId(*String::Utf8Value(info[1]));
  git_oid commitTwo;
  if (git_oid_fromstr(&commitTwo, commitTwoId.c_str()) != GIT_OK)
    return info.GetReturnValue().Set(Nan::Null());

  git_oid mergeBase;
  if (git_merge_base(
        &mergeBase, GetRepository(info), &commitOne, &commitTwo) == GIT_OK) {
    char mergeBaseId[GIT_OID_HEXSZ + 1];
    git_oid_tostr(mergeBaseId, GIT_OID_HEXSZ + 1, &mergeBase);
    return info.GetReturnValue().Set(Nan::New<String>(mergeBaseId, -1)
        .ToLocalChecked());
  }

  return info.GetReturnValue().Set(Nan::Null());
}

int Repository::DiffHunkCallback(const git_diff_delta* delta,
                                 const git_diff_hunk* range,
                                 void* payload) {
  std::vector<git_diff_hunk>* ranges =
      static_cast<std::vector<git_diff_hunk>*>(payload);
  ranges->push_back(*range);
  return GIT_OK;
}

NAN_METHOD(Repository::GetLineDiffs) {
  Nan::HandleScope scope;
  if (info.Length() < 2)
    return info.GetReturnValue().Set(Nan::Null());

  std::string text(*String::Utf8Value(info[1]));

  git_repository* repo = GetRepository(info);

  git_blob* blob = NULL;

  int getBlobResult = GetBlob(info, repo, blob);

  if (getBlobResult != 0)
    return info.GetReturnValue().Set(Nan::Null());

  std::vector<git_diff_hunk> ranges;
  git_diff_options options = CreateDefaultGitDiffOptions();

  // Set GIT_DIFF_IGNORE_WHITESPACE_EOL when ignoreEolWhitespace: true
  if (info.Length() >= 3) {
    Local<Object> optionsArg(Local<Object>::Cast(info[2]));
    Local<Value> ignoreEolWhitespace;
    ignoreEolWhitespace = optionsArg->Get(
        Nan::New<String>("ignoreEolWhitespace").ToLocalChecked());

    if (ignoreEolWhitespace->BooleanValue())
      options.flags = GIT_DIFF_IGNORE_WHITESPACE_EOL;
  }

  options.context_lines = 0;
  if (git_diff_blob_to_buffer(blob, NULL, text.data(), text.length(), NULL,
                              &options, NULL, NULL, DiffHunkCallback, NULL,
                              &ranges) == GIT_OK) {
    Local<Object> v8Ranges = Nan::New<Array>(ranges.size());
    for (size_t i = 0; i < ranges.size(); i++) {
      Local<Object> v8Range = Nan::New<Object>();
      v8Range->Set(Nan::New<String>("oldStart").ToLocalChecked(),
                   Nan::New<Number>(ranges[i].old_start));
      v8Range->Set(Nan::New<String>("oldLines").ToLocalChecked(),
                   Nan::New<Number>(ranges[i].old_lines));
      v8Range->Set(Nan::New<String>("newStart").ToLocalChecked(),
                   Nan::New<Number>(ranges[i].new_start));
      v8Range->Set(Nan::New<String>("newLines").ToLocalChecked(),
                   Nan::New<Number>(ranges[i].new_lines));
      v8Ranges->Set(i, v8Range);
    }
    git_blob_free(blob);
    return info.GetReturnValue().Set(v8Ranges);
  } else {
    git_blob_free(blob);
    return info.GetReturnValue().Set(Nan::Null());
  }
}

struct LineDiff {
  git_diff_hunk hunk;
  git_diff_line line;
};

int Repository::DiffLineCallback(const git_diff_delta* delta,
                                 const git_diff_hunk* range,
                                 const git_diff_line* line,
                                 void* payload) {
  LineDiff lineDiff;
  lineDiff.hunk = *range;
  lineDiff.line = *line;
  std::vector<LineDiff> * lineDiffs =
      static_cast<std::vector<LineDiff>*>(payload);
  lineDiffs->push_back(lineDiff);
  return GIT_OK;
}

NAN_METHOD(Repository::GetLineDiffDetails) {
  Nan::HandleScope scope;
  if (info.Length() < 2)
    return info.GetReturnValue().Set(Nan::Null());

  std::string text(*String::Utf8Value(info[1]));

  git_repository* repo = GetRepository(info);

  git_blob* blob = NULL;

  int getBlobResult = GetBlob(info, repo, blob);

  if (getBlobResult != 0)
    return info.GetReturnValue().Set(Nan::Null());

  std::vector<LineDiff> lineDiffs;
  git_diff_options options = CreateDefaultGitDiffOptions();

  // Set GIT_DIFF_IGNORE_WHITESPACE_EOL when ignoreEolWhitespace: true
  if (info.Length() >= 3) {
    Local<Object> optionsArg(Local<Object>::Cast(info[2]));
    Local<Value> ignoreEolWhitespace;
    ignoreEolWhitespace = optionsArg->Get(
        Nan::New<String>("ignoreEolWhitespace").ToLocalChecked());

    if (ignoreEolWhitespace->BooleanValue())
      options.flags = GIT_DIFF_IGNORE_WHITESPACE_EOL;
  }

  options.context_lines = 0;
  if (git_diff_blob_to_buffer(blob, NULL, text.data(), text.length(), NULL,
                              &options, NULL, NULL, NULL, DiffLineCallback,
                              &lineDiffs) == GIT_OK) {
    Local<Object> v8Ranges = Nan::New<Array>(lineDiffs.size());
    for (size_t i = 0; i < lineDiffs.size(); i++) {
      Local<Object> v8Range = Nan::New<Object>();

      v8Range->Set(Nan::New<String>("oldLineNumber").ToLocalChecked(),
                   Nan::New<Number>(lineDiffs[i].line.old_lineno));
      v8Range->Set(Nan::New<String>("newLineNumber").ToLocalChecked(),
                   Nan::New<Number>(lineDiffs[i].line.new_lineno));
      v8Range->Set(Nan::New<String>("oldStart").ToLocalChecked(),
                   Nan::New<Number>(lineDiffs[i].hunk.old_start));
      v8Range->Set(Nan::New<String>("newStart").ToLocalChecked(),
                   Nan::New<Number>(lineDiffs[i].hunk.new_start));
      v8Range->Set(Nan::New<String>("oldLines").ToLocalChecked(),
                   Nan::New<Number>(lineDiffs[i].hunk.old_lines));
      v8Range->Set(Nan::New<String>("newLines").ToLocalChecked(),
                   Nan::New<Number>(lineDiffs[i].hunk.new_lines));
      v8Range->Set(Nan::New<String>("line").ToLocalChecked(),
                   Nan::New<String>(lineDiffs[i].line.content,
                                    lineDiffs[i].line.content_len)
                                        .ToLocalChecked());

      v8Ranges->Set(i, v8Range);
    }
    git_blob_free(blob);
    return info.GetReturnValue().Set(v8Ranges);
  } else {
    git_blob_free(blob);
    return info.GetReturnValue().Set(Nan::Null());
  }
}

Local<Value> Repository::ConvertStringVectorToV8Array(
    const std::vector<std::string>& vector) {
  size_t i = 0, size = vector.size();
  Local<Object> array = Nan::New<Array>(size);
  for (i = 0; i < size; i++)
    array->Set(i, Nan::New<String>(vector[i].c_str()).ToLocalChecked());

  return array;
}

NAN_METHOD(Repository::GetReferences) {
  Nan::HandleScope scope;

  Local<Object> references = Nan::New<Object>();
  std::vector<std::string> heads, remotes, tags;

  git_strarray strarray;
  git_reference_list(&strarray, GetRepository(info));

  for (unsigned int i = 0; i < strarray.count; i++)
    if (strncmp(strarray.strings[i], "refs/heads/", 11) == 0)
      heads.push_back(strarray.strings[i]);
    else if (strncmp(strarray.strings[i], "refs/remotes/", 13) == 0)
      remotes.push_back(strarray.strings[i]);
    else if (strncmp(strarray.strings[i], "refs/tags/", 10) == 0)
      tags.push_back(strarray.strings[i]);

  git_strarray_free(&strarray);

  references->Set(Nan::New<String>("heads").ToLocalChecked(),
                    ConvertStringVectorToV8Array(heads));
  references->Set(Nan::New<String>("remotes").ToLocalChecked(),
                    ConvertStringVectorToV8Array(remotes));
  references->Set(Nan::New<String>("tags").ToLocalChecked(),
                    ConvertStringVectorToV8Array(tags));

  info.GetReturnValue().Set(references);
}

int branch_checkout(git_repository* repo, const char* refName) {
  git_reference* ref = NULL;
  git_object* git_obj = NULL;
  git_checkout_options opts = GIT_CHECKOUT_OPTIONS_INIT;
  opts.checkout_strategy = GIT_CHECKOUT_SAFE;
  int success = -1;

  if (!(success = git_reference_lookup(&ref, repo, refName)) &&
      !(success = git_reference_peel(&git_obj, ref, GIT_OBJ_TREE)) &&
      !(success = git_checkout_tree(repo, git_obj, &opts)))
    success = git_repository_set_head(repo, refName);

  git_object_free(git_obj);
  git_obj = NULL;
  git_reference_free(ref);
  ref = NULL;

  return success;
}

NAN_METHOD(Repository::CheckoutReference) {
  Nan::HandleScope scope;

  if (info.Length() < 1)
    return info.GetReturnValue().Set(Nan::New<Boolean>(false));

  bool shouldCreateNewRef;
  if (info.Length() > 1 && info[1]->BooleanValue())
    shouldCreateNewRef = true;
  else
    shouldCreateNewRef = false;

  std::string strRefName(*String::Utf8Value(info[0]));
  const char* refName = strRefName.c_str();

  git_repository* repo = GetRepository(info);

  if (branch_checkout(repo, refName) == GIT_OK) {
    return info.GetReturnValue().Set(Nan::New<Boolean>(true));
  } else if (shouldCreateNewRef) {
    git_reference* head;
    if (git_repository_head(&head, repo) != GIT_OK)
      return info.GetReturnValue().Set(Nan::New<Boolean>(false));

    const git_oid* sha = git_reference_target(head);
    git_commit* commit;
    int commitStatus = git_commit_lookup(&commit, repo, sha);
    git_reference_free(head);

    if (commitStatus != GIT_OK)
      return info.GetReturnValue().Set(Nan::New<Boolean>(false));

    git_reference* branch;
    // N.B.: git_branch_create needs a name like 'xxx', not 'refs/heads/xxx'
    const int kShortNameLength = strRefName.length() - 11;
    std::string shortRefName(strRefName.c_str() + 11, kShortNameLength);

    int branchCreateStatus = git_branch_create(
        &branch, repo, shortRefName.c_str(), commit, 0);
    git_commit_free(commit);

    if (branchCreateStatus != GIT_OK)
      return info.GetReturnValue().Set(Nan::New<Boolean>(false));

    git_reference_free(branch);

    if (branch_checkout(repo, refName) == GIT_OK)
      return info.GetReturnValue().Set(Nan::New<Boolean>(true));
  }

  return info.GetReturnValue().Set(Nan::New<Boolean>(false));
}

NAN_METHOD(Repository::Add) {
  Nan::HandleScope scope;

  git_repository* repository = GetRepository(info);
  std::string path(*String::Utf8Value(info[0]));

  git_index* index;
  if (git_repository_index(&index, repository) != GIT_OK) {
    const git_error* e = giterr_last();
    if (e != NULL)
      return Nan::ThrowError(e->message);
    else
      return Nan::ThrowError("Unknown error opening index");
  }
  // Modify the in-memory index.
  if (git_index_add_bypath(index, path.c_str()) != GIT_OK) {
    git_index_free(index);
    const git_error* e = giterr_last();
    if (e != NULL)
      return Nan::ThrowError(e->message);
    else
      return Nan::ThrowError("Unknown error adding path to index");
  }
  // Write this change in the index back to disk, so it is persistent
  if (git_index_write(index) != GIT_OK) {
    git_index_free(index);
    const git_error* e = giterr_last();
    if (e != NULL)
      return Nan::ThrowError(e->message);
    else
      return Nan::ThrowError("Unknown error adding path to index");
  }
  git_index_free(index);
  info.GetReturnValue().Set(Nan::New<Boolean>(true));
}

Repository::Repository(Local<String> path) {
  Nan::HandleScope scope;

  std::string repositoryPath(*String::Utf8Value(path));
  if (git_repository_open_ext(
        &repository, repositoryPath.c_str(), 0, NULL) != GIT_OK)
    repository = NULL;
}

Repository::~Repository() {
  if (repository != NULL) {
    git_repository_free(repository);
    repository = NULL;
  }
}
