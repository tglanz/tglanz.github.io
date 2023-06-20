---
title: ZSH completions
---

Using `oh-my-zsh`.

Put completions for `x` at

    ~/.oh-my-zsh/completions/_x

In `~/.zshr`, Add if not exists

    fpath=($fpath /.oh-my-zsh/completions)
    autoload -U compinit
    compinit
