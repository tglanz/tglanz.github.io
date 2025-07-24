---
title: Pacman Cheatsheet
categories:
- Cheatsheet
tags:
- Pacman
- Archlinux
- Package Manager
---

# Pacman Cheatsheet

Essential pacman commands I actually use on Arch Linux. Focused on the practical stuff you need daily.

## Installing Packages

**Basic installation:**
```bash
pacman -S firefox           # Install Firefox
pacman -S git vim neovim    # Install multiple packages
pacman -S --needed base-devel  # Install only if not already installed
```

**Search before installing:**
```bash
pacman -Ss browser          # Search for packages containing "browser"
pacman -Si firefox          # Show detailed info about Firefox
```

## Removing Packages

**Complete package removal (most common):**
```bash
pacman -Rns firefox         # Remove Firefox + configs + unused deps
```

Breaking it down:
- `R` = Remove operation
- `n` = Remove configuration files
- `s` = Remove unnecessary dependencies

**Other removal options:**
```bash
pacman -R firefox           # Remove package only (keep deps)
pacman -Rs firefox          # Remove package + unused dependencies
pacman -Rn firefox          # Remove package + configuration files
```

**Real example:** Completely removing a desktop environment:
```bash
pacman -Rns gnome gnome-extra  # Remove GNOME and all related packages
```

## System Updates

**Full system update:**
```bash
pacman -Syu                 # Update package database and upgrade all
```

**Update package database only:**
```bash
pacman -Sy                  # Refresh package database
```

**Upgrade installed packages only:**
```bash
pacman -Su                  # Upgrade without refreshing database
```

## Package Information & Search

**Find information about packages:**
```bash
pacman -Q                   # List all installed packages
pacman -Qs vim              # Search installed packages for "vim"
pacman -Qi neovim           # Show info about installed neovim
pacman -Ql neovim           # List files installed by neovim
pacman -Qo /usr/bin/vim     # Which package owns this file?
```

**Search the repositories:**
```bash
pacman -Ss python           # Search repos for python packages
pacman -Si python           # Show detailed info from repos
```

## Managing Orphaned Packages

**Find orphaned packages (installed as deps but no longer needed):**
```bash
pacman -Qdt                 # List orphaned packages
```

**Remove all orphaned packages:**
```bash
pacman -Rns $(pacman -Qdtq) # Remove orphans (quiet output for piping)
```

**Example workflow:**
1. `pacman -Qdt` - check what will be removed
2. `pacman -Rns $(pacman -Qdtq)` - remove them if you agree

## Package Cache Management

**Clean package cache:**
```bash
pacman -Sc                  # Remove old packages from cache
pacman -Scc                 # Remove ALL packages from cache (even installed)
```

**Check cache size:**
```bash
du -sh /var/cache/pacman/pkg/  # See how much space cache is using
```

## Common Workflows

**Installing AUR helper (like yay):**
```bash
# First install base-devel and git if not already installed
pacman -S --needed base-devel git

# Then clone and install yay manually
git clone https://aur.archlinux.org/yay.git
cd yay && makepkg -si
```

**Before major system changes:**
```bash
pacman -Q > ~/installed-packages.txt  # Backup package list
pacman -Qe > ~/explicitly-installed.txt  # Backup explicitly installed
```

**System maintenance routine:**
```bash
# Update system
pacman -Syu

# Clean orphans
pacman -Rns $(pacman -Qdtq)

# Clean cache
pacman -Sc
```

## Troubleshooting

**Fix corrupted package database:**
```bash
sudo rm /var/lib/pacman/db.lck  # Remove lock file if pacman is stuck
pacman -Syy                     # Force refresh database
```

**Downgrade a package:**
```bash
pacman -U /var/cache/pacman/pkg/package-old-version.pkg.tar.xz
```

**Install from local package file:**
```bash
pacman -U package-1.0-1-x86_64.pkg.tar.xz  # Install local package file
```

**Check for partial upgrades (usually bad):**
```bash
pacman -Qk                      # Check package integrity
```

## Configuration

**Main config:** `/etc/pacman.conf`

**Useful config options:**
```bash
# Uncomment in /etc/pacman.conf for colored output
Color

# Show download progress
VerbosePkgLists

# Enable parallel downloads (add this line)
ParallelDownloads = 3
```

## Useful Aliases

Add these to your `~/.bashrc` or `~/.zshrc`:
```bash
alias pacs='pacman -Ss'         # Search packages
alias paci='sudo pacman -S'     # Install package
alias pacr='sudo pacman -Rns'   # Remove package completely  
alias pacu='sudo pacman -Syu'   # Update system
alias paco='pacman -Rns $(pacman -Qdtq)'  # Remove orphans
```

## Emergency Recovery

**If you accidentally break your system:**
```bash
# Boot from Arch ISO and mount your system
mount /dev/sdaX /mnt
arch-chroot /mnt

# Reinstall broken package
pacman -S packagename

# Or reinstall all packages (nuclear option)
pacman -Qnq | pacman -S -
```