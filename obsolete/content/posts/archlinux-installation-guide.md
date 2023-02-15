---
layout: post
title: Archlinux Installation Guide
date: 2019-06-26
categories:
  - Guides
tags:
  - Archlinux
  - Linux
---

# arch boot spec

this is specific to my machine and software of choice
- efi boot
- disk at sdb 
- netctl as network manager in boot environment
- networkmanager as network manager in installation

i edit this file in parallel to the installation and learning process; if you want to do this as well, install git from the boot environment (or use elinks to view the file through github)

## connect to network

```wifi-menu``` and follow instructions

check connectivity

```ping 8.8.8.8```

in ```/etc/nsswitch.conf```, at the ```hosts``` entry, make sure ```dns``` is before ```[!UNAVAIL=return]```

check dns acquisition

```ping google.com```

## partition, filesystems and mount

be careful, assume each step to erase all data on partition layout of the disk!

make sure on which device you want to work on, using ```lsblk```

erase labels ```wipefs -a /dev/sdb```

example partition scheme below

> you can use ```fdisk``` or ```cfdisk``` for example

partition | size  | type             | desc
----------|-------|------------------|----------------
sdb1      | 550MB | EFI System       | boot partition
sdb2      | 24GB  | Linux swap       | swap partition
sdb3      | 32GB  | Linux filesystem  | root partition
sdb4      | rest  | Linux filesystem  | home partition

make filesystems for the partitions

```bash
mkfs.fat -F32 /dev/sdb1

mkswap /dev/sdb2
swapon /dev/sdb2

mkfs.ext4 /dev/sdb3
mkfs.ext4 /dev/sdb4
```

mount partitions to filesystem

```bash
mount /dev/sdb3 /mnt

mkdir /mnt/boot
mkdir /mnt/boot/efi
mkdir /mnt/home

mount /dev/sdb4 /mnt/home
mount /dev/sdb1 /mnt/boot/efi
```

## archlinux installation

```bash
pacstrap /mnt \
    base base-devel \
    linux linux-firmware \
    grub efibootmgr \
    networkmanager \
    vim git
```

## installation setup

generate fstab - ```genfstab -U /mnt >> /mnt/etc/fstab```

change root to installation - ```arch-chroot /mnt```

edit file ```/etc/locale.gen``` and uncomment desired locale

generate locale - ```locale-gen```

add set language - ```echo "LANG=en_US.UTF-8" > /etc/locale.conf```

set timezone -

```bash
ln -sf /usr/share/zoneinfo/Asia/Jerusalem /etc/localtime
hwclock --systohc
```

set root password for linux installation - ```passwd```

## grub

```bash
grub-install --target=x86_64-efi --efi-directory=/boot/efi
grub-mkconfig -o /boot/grub/grub.cfg
```

## finalize

back to bootable environment

```exit```

unmount all partitions

```umount -R /mnt```

```reboot```
