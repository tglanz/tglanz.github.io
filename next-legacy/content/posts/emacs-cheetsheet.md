---
title: Emacs Cheatsheet
date: 2019-08-03
categories:
  - Cheatsheet
tags:
  - Emacs
---

# Overview 

Some tasks or workflows are very mature through emacs and less on other enviornments, for example using clojure repl, editing latex files, scheme work etc...

Created this file because I use vim in my day to I keep forgetting basic emacs stuff

# emacs

#### open emacs in the terminal emulator

    emacs -nw

#### configuration path

    ~/emacs.d/

# help

It's important to know how to get help and use the documentations within emacs

Enter tutorial

    C-h t

Enter package documentation

    C-h i d m {package}

# basic keys

## core

    C-x C-x        exit
    C-g            abort command

## navigation

    C-l     Center text around the cursor
    
    C-v     Scroll to next screenful
    M-v     Scroll to previous screenful

    M-f     Move forward a word
    M-b     Move backward a word
    
    C-n     Move to next line
    C-p     Move to previous line
    
    C-a     Move to beginning of line
    C-e     Move to end of line
    
    M-a     Move back to beginning of sentence
    M-e     Move forward to end of sentence

    M-<     Move to beginning of the document
    M->     Move to end of the document

    C-s     Initiate search mode

## windowing

    C-x 1   Delete all windows except focused
    C-x 2   Split current window horizontally
    C-x 3   Split current window verticall
    C-x o   Move to other window

## editing

    C-k     Delete from cursor to end of line
    M-k     Delete from cursor to end of sentence
    C-_     Undo
    C-w     Cut selected region
    M-w     Copy selected region
    C-y     Paste

## files and buffers

    C-s         Save current file
    C-x k       Kill buffer
    C-x b       Switch to buffer
    C-x C-b     Lits buffers