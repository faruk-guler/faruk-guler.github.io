---
layout: post
title: Debian Linux Cheat Sheet V [System Information]
date: 2024-01-02 21:26
author: theguler
comments: true
categories: [Debian]
---
<!-- wp:image {"id":10440,"width":"340px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/linux-live.webp?w=1024" alt="" class="wp-image-10440" style="width:340px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">🐧<strong>🖥️ <strong>Get </strong>Unix/Linux System Information<br>----------------------------------------|</strong><br><br>lsb_release -a<br>hostnamectl<br>uname -a<br>cat /proc/version<br>cat /etc/issue<br>hostname<br>w<br>who<br>top<br>date<br>uptime<br>last<br>ps -all<br>ps aux<br>sysctl -a<br>pstree -a<br>vmstat<br>mpstat #multi-processor CPU<br>iostat #devices I/O<br>sudo stress-ng #stres test -diagnostig<br>whoami<br>ifconfig<br>ip a<br>netstat -tunap<br>cat /proc/cpuinfo<br>cat /proc/meminfo<br>free -mh<br>free -h #ram swap management<br>lscpu<br>lsmod #kernel modülleri<br>vmstat -t /-td / -tD<br>lshw -short<br>lsusb #USB device lists<br>hwinfo --short<br>lspci<br>df -h -T<br>lsblk<br>lsblk -p /dev/sda (detailed)<br>lsblk -a<br>parted -l<br>duf<br>fdisk -l<br>cfdisk #disk partition<br>dmidecode -t system<br>dmidecode -t bios<br>lsof<br>du -hc &lt;argüman&gt;<br>systemctl list-units --type=service<br>journalctl<br>dpkg -l<br>udevadm monitor #udev events<br><br>neofetch<br>aptitude<br>htop</pre>
<!-- /wp:preformatted -->
