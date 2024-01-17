---
title: Neovim Notes
categories:
- Notes
tags:
- Neovim
- Editors
---

## Basics

Launch Neovim (nvim), rooted at cwd:

    nvim

Launch and edit files  "x", "y" and "z":

    nvim -- x y z

A buffer will be opened for each file. To list the buffers:

    :buffers

We can also tell nvim how to open each file:

    # Create a tab for each file
    nvim -p -- x y z

    # Create vertically splitted windows for each files
    nvim -o -- x y z


    # Create horizontally splitted windows for each files
    nvim -O -- x y z

## TODO
