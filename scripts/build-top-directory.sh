#!/bin/bash

func_error() {
  echo $1 1>&2
  exit 1
}

scripts_dir="$(realpath $(dirname $0))"
src_dir="$(realpath $scripts_dir/..)"
top_dir="$(realpath $src_dir/..)"
temp_static_dir="$(realpath $top_dir/_static)"

echo "workspace
  - top directory    : $top_dir
  - static directory : $temp_static_dir
  - source directory : $src_dir
  - scripts directory: $scripts_dir"

cd $src_dir

echo "installing" && bundle install || func_error "failed to install"
echo "building into $temp_static_dir" && bundle exec jekyll build -d $temp_static_dir || func_error "failed to build"
echo "migrating from $temp_static_dir to $top_dir" && cp -r $temp_static_dir/* $top_dir || func_error "failed to migrate"
echo "deleting $temp_static_dir" && rm -r $temp_static_dir || func_error "failed to delete"

echo "removing $top_dir/scripts" && rm -r $top_dir/scripts || func_error "failed to delete"