# arch boot spec

this is specific to my machine and software of choice
- efi boot
- disk at sdb 
- netctl as network manager

i edit this file in parallel to the installation and learning process; if you want to do this as well, install git from the boot environment (or use elinks to view the file through github)

## connect to network

```wifi-menu``` - follow instructions

check connectivity

```ping 8.8.8.8```

in ```/etc/nsswitch.conf```, at the ```hosts``` entry, make sure ```dns``` is before ```[!UNAVAIL=return]```

check dns acquisition

```ping google.com```

## partition, filesystems and mount

partition scheme below

partition | size  | type             | desc
----------|-------|------------------|----------------
sdb1      | 512MB | EFI System       | boot partition
sdb2      | 24GB  | Linux Swap       | swap partition
sdb3      | rest  | Linux Filesystem | root partition

## archlinux installation
## installation setup
  - fstab
  - chroot
  - locale
  - timezone
## grub
## finalize
- 
