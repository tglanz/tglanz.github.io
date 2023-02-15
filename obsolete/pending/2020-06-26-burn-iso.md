---
layout: post
title: Burn iso to device
image: /assets/iso-256.png
date: 2020-06-26
category: misc
tags: tutorial
---

# iso burn

- detect the device to burn to to using ```lsblk```

- carefully and surely execute

```bash
dd bs=4M conv=fdatasync if=your/iso/path of=device/identifier
```

__example__
```bash
sudo dd bs=4M conv=fdatasync if=~/Downloads/archlinux-2020.06.01-x86_64.iso of=/dev/sdc
```
