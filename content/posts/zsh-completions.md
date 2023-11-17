---
title: ZSH completions
tags:
- Notes
---

Using `oh-my-zsh`.

Put completions for `x` at

    ~/.oh-my-zsh/completions/_x

In `~/.zshrc`, Add if not exists

    fpath=($fpath /.oh-my-zsh/completions)
    autoload -U compinit
    compinit
