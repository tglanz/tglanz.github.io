# iso burn

- detect the device to burn to to using

```lsblk```

- carefully and surely execute

```bash
sudo dd bs=4M conv=fdatasync if=your/iso/path of=device/identifier

# example
sudo dd bs=4M conv=fdatasync if=~/Downloads/archlinux-2020.06.01-x86_64.iso of=/dev/sdc
```


