#!/bin/bash

scripts_dir="$(dirname $0)"
src_dir="$(realpath $scripts_dir/..)"
top_dir="$(realpath $src_dir/..)"

echo "workspace
  - scripts directory: $scripts_dir
  - source directory : $src_dir
  - top directory    : $top_dir"

echo "process"
for file_or_dir in $(ls $top_dir); do
    file_or_dir="$(realpath $top_dir/$file_or_dir)"
    case $file_or_dir in
        # add here exclusions for deletion
        $top_dir/src)
            echo "  - skipping: $file_or_dir" ;;
        *) 
            echo "  - deleting: $file_or_dir" ;; # && rm -rf $file_or_dir ;;
    esac
done