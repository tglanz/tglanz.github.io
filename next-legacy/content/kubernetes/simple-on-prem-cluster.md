---
title: Simple on-prem Kuberenetes cluster 
categories:
    - Kubernetes
tags:
    - Kubernetes
weight: 999
---

# Kubes

Deploy a kubernetes cluster.

We will setup a simple kubernetes cluster will describe the concepts and process.

The OS on all nodes is debian bullseye - I specifically executing this using vagrant's box ```debian/bullseye64```.

To document the steps we will provide bash script snippets for now. But, the goal is to provide configuration files content for something like ansible or chef.

## Container runtime

Kubernetes is an orchestration infrastructure and does not provide any containerization - It relies on a different containarization platform, a.k.a the [Container Runtime](https://kubernetes.io/docs/setup/production-environment/container-runtimes/).

We will use [docker](https://www.docker.com/). Let's install it by following the documentation [Here](https://docs.docker.com/engine/install/debian/).

```
sudo apt-get remove docker docker-engine docker.io containerd runc

sudo apt-get update
sudo apt-get install ca-certificates curl gnupg lsb-release

curl -fsSL https://download.docker.com/linux/debian/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io
```

Another thing to do is docker to utilize systemd for cgroup management (You can read more about it in the container runtimes documentation). To apply this setting we need to edit docker's configuration. There are multiple to do so, for example - edit systemd's service that initiates docker. Another approach is to edit docker's global configuration file which is at ```/etc/docker/daemon.json```. Hence, edit (create if missing) the mentioned file and add

```json
{
    ... other configurations
    "exec-opts": ["native.cgroupdriver=systemd", ... more exec opts if exists]
}
```

Once done, reboot docker by running ```sudo systemctl restart docker```

## Kube Components

We will not rely on the package manager to install the components.

Define the relevant variables

> Note that the cni directory does not include the version! Later we will install a network plugin, it'll be in the same directory

```
ARCH="amd64"
CNI_VERSION="v0.8.2"
CNI_DIR="/opt/cni/bin"
CRICTL_VERSION="v1.23.0"
CRICTL_DIR="/opt/cri/$CRICTL_VERSION/bin"
KUBERNETES_VERSION="v1.23.3"
KUBERNETES_DIR="/opt/kubernetes/$KUBERNETES_VERSION"

# Install [CNI](https://www.cni.dev/)

sudo mkdir -p $CNI_DIR
curl -L "https://github.com/containernetworking/plugins/releases/download/${CNI_VERSION}/cni-plugins-linux-${ARCH}-${CNI_VERSION}.tgz" | sudo tar -C $CNI_DIR -xz

# Install [CRI](https://kubernetes.io/docs/concepts/architecture/cri/)

sudo mkdir -p $CRICTL_DIR
curl -L "https://github.com/kubernetes-sigs/cri-tools/releases/download/${CRICTL_VERSION}/crictl-${CRICTL_VERSION}-linux-${ARCH}.tar.gz" | sudo tar -C $CRICTL_DIR -xz

# Install Kube components

sudo mkdir -p $KUBERNETES_DIR
cd $KUBERNETES_DIR
for component in kubeadm kubectl kubelet; do
  sudo curl -L --remote-name-all https://storage.googleapis.com/kubernetes-release/release/$KUBERNETES_VERSION/bin/linux/$ARCH/$component
  sudo chmod +x $component
done

# and services

RELEASE_VERSION="v0.4.0"
curl -sSL "https://raw.githubusercontent.com/kubernetes/release/${RELEASE_VERSION}/cmd/kubepkg/templates/latest/deb/kubelet/lib/systemd/system/kubelet.service" | sed "s:/usr/bin:${KUBERNETES_DIR}:g" | sudo tee /etc/systemd/system/kubelet.service
sudo mkdir -p /etc/systemd/system/kubelet.service.d
curl -sSL "https://raw.githubusercontent.com/kubernetes/release/${RELEASE_VERSION}/cmd/kubepkg/templates/latest/deb/kubeadm/10-kubeadm.conf" | sed "s:/usr/bin:${KUBERNETES_DIR}:g" | sudo tee /etc/systemd/system/kubelet.service.d/10-kubeadm.conf
```

enable, and start kubelet

```
sudo systemctl enable --now kubelet
```

## Initialization

Install prerequesites for kubeadm

```
sudo apt-get update 
sudo apt install ethtool socat conntrack
```

Create an update alternative

```
sudo update-alternatives --install /usr/bin/kubeadm kubeadm $KUBERNETES_DIR/kubeadm 100
sudo update-alternatives --install /usr/bin/kubelet kubelet $KUBERNETES_DIR/kubelet 100
sudo update-alternatives --install /usr/bin/kubectl kubectl $KUBERNETES_DIR/kubectl 100
```

Run @controlplane

> TODO: load balancer, hostnames

Initialize configuration such that the network is 10.10.0.0/16

```
sudo kubeadm init --pod-network-cidr 10.10.0.0/16 --apiserver-advertise-address {ip}
```

For documentation, you should see something like

```
Your Kubernetes control-plane has initialized successfully!

To start using your cluster, you need to run the following as a regular user:

  mkdir -p $HOME/.kube
  sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
  sudo chown $(id -u):$(id -g) $HOME/.kube/config

Alternatively, if you are the root user, you can run:

  export KUBECONFIG=/etc/kubernetes/admin.conf

You should now deploy a pod network to the cluster.
Run "kubectl apply -f [podnetwork].yaml" with one of the options listed at:
  https://kubernetes.io/docs/concepts/cluster-administration/addons/

Then you can join any number of worker nodes by running the following on each as root:

kubeadm join 192.168.121.210:6443 --token clns4a.b29f6anjipygy0e2 \
	--discovery-token-ca-cert-hash sha256:833f599cc9ab27eb5010c499e9c77e8e3263fb991d8e9e78ef187ba97e1efb59
```

Do as it says, run

```
mkdir -p $HOME/.kube
sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
sudo chown $(id -u):$(id -g) $HOME/.kube/config
```

We will use [Weave Net](https://kubernetes.io/docs/tasks/administer-cluster/network-policy-provider/weave-network-policy/) as a network plugin

```
kubectl apply -f "https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')"
```
