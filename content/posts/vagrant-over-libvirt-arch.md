---
title: Vagrant over libvirt on Archlinux
---

# The tools

[Vagrant](https://www.vagrantup.com/) is an open source software to virtualize development environments.

[libvirt](https://libvit.org/) is an open source virtualization API. I think the [archwiki page](https://wiki.archlinux.org/title/Libvit) actually describes it better, as a collection of software that provides a way to manage virtualization functionality.

[kvm](https://www.linux-kvm.org/page/Main_Page/) a short for **K**ernel-based **V**irtual **M**achine, is a virtualization infrastructure provided by the kernel.

[QEMU](https://www.qemu.org/) is an open source machine emulator and virtualizer.

# The stack

Vagrant will use the libvirt APIs which will be drived by QEMU utilizing kvm.

```
+-----------+
|  Vagrant  |
+-----------+
|  libvirt  |
+-----------+
|  QEMU     |
+-----------+
|  KVM      |
+-----------
```

To install the stack we will need the following packages  
- [vagrant](https://archlinux.org/packages/?name=vagrant)
- [libvirt](https://archlinux.org/packages/?name=libvirt)
- [iptables-nft](https://archlinux.org/packages/?name=iptables-nft)
- [dnsmasq](https://archlinux.org/packages/?name=dnsmasq)
- [qemu-headless](https://archlinux.org/packages/?name=qemu-headless)

Run the command

    pacman -Suy vagrant libvirt iptables-nft dnsmasq qemu-headless

# Startup

In order to run the stack we need the following services running
- libvirtd.service 
- virtlogd.service

You can either start them by running

    systemctl start libvirtd virtlogd

Or you can enable them by running

    systemctl enable libvirtd virtlogd

You can check that everything is running by running

    virsh -c qemu:///system

> [virsh](https://linux.die.net/man/1/virsh) is a cli to interact with guest domains (virtual machines).

# Starting out first Vagrant Box

In Vagrant's domain, a Box is a package format, a bit like an ISO or a docker image. We will start a ```debian/bullseye64``` Boxed OS.

Inside your working directory, there should be a configuration file that Vagrant can read and function by - It is the ```Vagrantfile```. The Vagrantfile contains configuration about what Box to run, how many resources to allocate and more.

In a new environment, we can either create a file manually or use Vagrants ```init``` command to do this for us. 

    vagrant init --minimal

Now, lets edit the newly created Vagrantfile and set the parameter ```config.vm.box``` to "debian/bullseye64". Lets also add the following parameters  

We can always validate the Vagrantfile by running

    vagrant validate

At this point, during validation, you might get an error like ```No usable default provider could be found for your system```. Thats fine, see next.

Vagrant uses a notion of Providers. A Provider is Vagrant's abstraction over the underlying hypervisor that vagrant will operate. In our case, as illustrated above, we use libvirt as the hypervisor so we will need to install the relevant Provider. To install the Provider we will use Vagrant's Plugins mechanism and run

    vagrant plugin install vagrant-libvirt

Now we are finally ready to run the Box by running the command

    vagrant up --provider=libvirt

Some errors you might encounter

**Some error about polkit indicates permission issues**. Read about it for best scenario solution, as a quick and easy solution, add your user to the libvirt group

**Some error about your machine not supporting NFS.** Just install nfs-utils by running

    pacman -Syu nfs-utils

**Forevr waiting on IP acquisition.** I still havn't completely figured this out. It looks somethong about DNS and DHCP. What I did find out that some Boxes do not get this issue, try changing.

To ssh into the OS run

    vagrant ssh

To clean up run

    vagrant destroy

# Other tools

__virt-manager__ is a graphical tool to list and manage the guest domains.
