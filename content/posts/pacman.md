---
title: Pacman
---

# Pacman

Focues on esoteric usages I sometimes do, instead of re-searching

> Perhaps do a single packages for all (apk, pacman, apt)?

__Purge Package__

    pacman -Rns {package}

The most common use case is to just delete a package {package}, removing all it's configurations and dependencies.

- R is the _Remove_ operation
- n flag indicates to remove the package's configuration
- s flag indicates to remove unnecessary dependencies


__List Orphans__

    pacman -Qdt

- Q is the _Query_ action
- d filters only depnedencies
- t filters only those who are unrequired

__Delete orphans__

    pacman -Rns $(pacman -Qdtq)

Notice that we added a _q_ option to the _List Orphans_ command, it prints less information. Specifically, it makes it so the _Query_ operation will only return the package name. That way, we can easily pass it as an argument to the _Remove_ operation
