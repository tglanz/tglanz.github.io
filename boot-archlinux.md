# boot archlinux

## make sure boot mode is UEFI

boot mode is uefi if the following directory exists

__/sys/firmware/efi/efivars__

## configure wireless network

### tl;dr

- assume you wanna connect to _mynet_
- add profile for netctl at _/etc/netctl_ named _mynet_
- execute ```netctl start mynet```
- verify connection by pinging to 8.8.8.8
- edit _/etc/nsswitch.conf_ such that in the _hosts_ entry, _dns_ will appear before [!UNAVAIL=return]
- verify dns by pinging to google.com

### interfaces

```ip link list``` to display network interfaces

detect you wireless interface, probably ```wlan0```

inside the first angled brackets, if there is _UP_ it indicates the interface is up, it is probably isn't.

```ip link set wlan0 up``` to enable _wlan0_, expect to see _UP_ for the interface's status.

### pick network using netctl

#### option 1 - wifi-menu

run ```wifi-menu``` and follow instructions to pick the network and input the password.

basically, it uses ```netctl``` behind the scenes which configures a network profile for the chosen network, which leads us to the second option

#### option 2 - netctl

run ```netctl list```to see all network profiles, there is probably nothing here.

_netctl_ stores the profiles at _/etc/netctl/_. each profile _PROFILE_ is a file named _PROFILE_ in this directory, don't confuse with the _interfaces_ directory.

_netctl_ provides profiles templates at  _/etc/example/_, there are wireless ones using dhcp or static ip, choose whatever, copy it to _/etc/netctl/THE_NAME_OF_THE_PROFILE_YOU_WANT_ and edit it as will.

```netctl list``` should now show you this profile.

### connect to the network

enable a desired profile by running ```netctl start PROFILE_NAME```, but note that the inferface of the network should be down!

### issues

#### dns 1

for some reason, the dns fails and it is because of some short circuit configuration at _/etc/nsswitch.conf_.
at the line begining with _hosts:_, change _dns_ to be before _[!UNAVAIL=return]_

## update system time

```timedatectl set-ntp true```
