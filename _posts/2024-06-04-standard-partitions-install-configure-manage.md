---
layout: post
title: Standard Partitions Install, Configure, Manage Part-1
date: 2024-06-04 23:52
author: theguler
comments: true
categories: [Storage]
---
<!-- wp:image {"id":12010,"width":"459px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/disk-lnx.jpg?w=1024" alt="" class="wp-image-12010" style="width:459px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>It enables efficient disk and volume management, data storage and access operations in Linux operating systems. This process enables system administrators and users to make the best use of disk space, plan ahead, ensure data security and increase performance. Disk and volume management, partitioning of disks, creation of file systems, logical volume management (LVM), (RAID) configurations, etc. It includes various operations such as.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>📁File Systems:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list {"ordered":true} -->
<ol class="wp-block-list"><!-- wp:list-item -->
<li><strong>Ext4:</strong> It is an updated version of the ext3 file system. The most widely used Linux file system today.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Ext3: </strong>It is an updated version of the ext2 file system. Provides backward compatibility.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Ext2:</strong> A legacy file system for Linux, with basic features.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Btrfs:</strong> A modern file system with high performance and scalable features.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>XFS: </strong>A file system used for large data storage and systems requiring high performance.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>JFS: </strong>A journal file system developed by IBM.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ZFS: </strong>A file system known for its high data integrity, data compression, and snapshot features.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>.etc</strong></li>
<!-- /wp:list-item --></ol>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>Comparative: </strong>ext4, xfs, btrfs</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":13973,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/fs-compare.png?w=1024" alt="" class="wp-image-13973" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Major Basic components of file system structure:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Superblock:</strong> contains information about the partition, starting and ending addresses, empty block table, inode table, root (/) directory index number. (the inode number of the root directory is always 2)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Inode (file node):</strong> Contains file permission information, owner information and the addresses of data blocks belonging to the file. They do not contain file names. Additionally, if the file is in use, it is placed in lock status. i.e. file<br>metadata is kept in the file node.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Datablock:</strong> It is the part where the data of the files is stored.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Directories:</strong> They are special files. They hold the inode numbers and names of the files and directories under them. They are kept in the Datablock (data) section of the disk. (normal file datablocks hold file data, but directories<br>datablocks keep the names and inode numbers of the directories and files under them.)</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🛢️🛢️ Disks and Partitions: </strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>In Linux, disks are physical devices that represent storage space. In Linux, disks and partitions are often referred to by representatives such as <strong>/dev/sdXY,</strong> where <strong>"X"</strong> is a letter or <strong>"Y"</strong> is a number. In short, it refers to the Y partition of the X disk.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>/dev/sd<strong>c4</strong> = partition 4 of disk c</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>/dev/nvme0n<strong>1</strong>p<strong>2</strong> = 2nd partition of 1st NVMe disk</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>.etc</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>lsblk -p</strong><br><br>NAME              MAJ:MIN RM SIZE RO TYPE MOUNTPOINTS<strong><br>sda  </strong>             8:0    0     280G  0 disk <br><strong>sdb </strong>              8:16   0    100G  0 disk <br><strong>├─sdb1</strong>            8:17   0     1M  0 part <br><strong>├─sdb2 </strong>           8:18   0   513M  0 part /boot/efi<br><strong>└─sdb3 </strong>           8:19   0   9,5G  0 part /var/snap/firefox/<br>                                          /<br><strong>sdc  </strong>             8:32   0     50G  0 disk <br><strong>├─sdc1 </strong>           8:33   0     1M  0 part <br><strong>├─sdc2 </strong>           8:34   0   513M  0 part <br><strong>└─sdc3 </strong>           8:35   0   4,5G  0 part <br>  ├─vgubuntu-root                        /storage/logs<br>  │             253:0    0     4G  0 lvm  <br>  └─vgubuntu-swap_1                      /storage/www<br>                253:1    0   504M  0 lvm  <br><strong>sdd  </strong>             8:48   0     300G  0 disk <br><strong>sde</strong>               8:64   0     325G  0 disk <br><strong>nvme0n1 </strong>        259:0    0     500G  0 disk <br><br>#In this command output, the connected disks and partitions in the system<br># 5 sd <strong>(SATA(Serial Advanced Technology Attachment)</strong><br># 1 <strong>NVMe(Non-Volatile Memory Express)</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>📜Tutorials / Information:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">⦁ Disks can be divided into <strong>partitions.</strong><br>⦁ Partitions are logical sections within a disk. Each section can be formatted with a separate <strong>file format.</strong><br>⦁ Formatting must be done separately for each partition after partitioning. otherwise you will lose all partitions.<br>⦁ If <strong>Linux systems</strong> do not have <strong>LVM</strong> (Logical Volume Manager), <strong>standard partitions</strong> are used by default.<br>⦁ Discs always expand to <strong>the right.</strong><br>⦁ The disk is set to <strong>GPT</strong> (1-128), you can create <strong>128 partitions.</strong><br>⦁ LVM Management will place the <strong>/boot</strong> partition in the first sector.<br>⦁ In best practice, <strong>/boot</strong> and <strong>/swap</strong> should be placed in the first sector.<br>⦁ The created file systems (xfs, ext3, ext4, ntfs .etc) <strong>require a partition</strong>. It is mandatory to use these partitions.<br>⦁ It is a safer approach to mount the <strong>UUID</strong> of the <strong>fstab</strong> <strong>/boot</strong> partition.<br>⦁ Expanding and reducing the partition can be done <strong>Online/Offline.</strong><br>⦁ To <strong>reduce the partition</strong>, the <strong>File system</strong> must be minimized first. <strong>(reverse process of expansion)</strong><br>⦁ If enlarging a file system is to be done, it should first start from the partition.<br>⦁ The file system cannot be enlarged without enlarging the partition<br>⦁ The <strong>"parted" or cfdisk" tool </strong>can be used to expand the <strong>partition.</strong><br>⦁ Actually no resize partition option in fdisk tool! <strong>(year 2024)</strong><br>⦁ <strong>"e2fsck"</strong> checker should be used before <strong>reducing </strong> the <strong>partition</strong>.<br>⦁ <strong>xfs</strong> file system can be expanded but <strong>not reducing!!</strong> <strong>(year 2024)</strong><br>⦁ Disk reducing is <strong>not recommended.</strong> If the reducing is greater than the disk capacity, <strong>you will lose data!!</strong><br>⦁ There are two types of disks used in the Linux world. <strong>Active partitions</strong> and <strong>Logical partitions</strong><br>⦁ The <strong>active partition</strong> must be primary.<br>⦁ <strong>"Primary partitions"</strong> <strong>"can be active partition"</strong><br>⦁ <strong>"Extended partition"</strong> will <strong>not be an active partition</strong><br>⦁ The <strong>NTFS</strong> disk format can be used for <strong>dual bootin</strong>g on a Linux system.<br>⦁ To <strong>repair</strong> the file system with <strong>e2fsck,</strong> the file system must be <strong>unmounted.</strong><br>⦁<br>⦁</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🧰Disk Tools:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>- Fdisk:</strong> Used to create and manage disk partitions.<br><strong>-</strong> <strong>Cfdisk:</strong> To list your disks, create, delete or edit partitions.<br><strong>-</strong> <strong>Parted:</strong> A command line tool used to create, edit and manage disk partitions.<br><strong>-</strong> <strong>Gdisk:</strong> Performs partition creation and management operations on GPT-based disks.<br><strong>- Gparted:</strong> GParted (GNOME Partition Editor) is an open-source graphical tool for managing disk partitions.<br><strong>- KDE Partition Manager:</strong> It is a powerful and easy-to-use tool used to manage disk partitions, running in the KDE desktop environment.<br><strong>-</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading">🧱Disk Partitioning Style:</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>There are generally two (2) styles for disk partitioning.<br><strong>MBR (Master Boot Record) </strong>and<strong> GPT (GUID Partition Table)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>&gt;&gt; <strong>MBR:</strong> Max: 2 TB<br>4 primary and 1 extended partitions can be created.<br>&gt;&gt; <strong>GPT:</strong> Max: 9.44 ZB (9.4 BILLION TERABABYTES)<br>128 primary partitions can be created. There is no extended partition.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>💾⚙️ Standard Partitions: [Install, Configure] </strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Standard disk configuration in Linux usually includes standard partitions. This configuration divides the hard disk into physically separated partitions and formats each as a separate file system. <strong>If Linux systems do not have LVM (Logical Volume Manager), standard partitions are used by default.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Standard partitions are used to separate physical disk spaces of a certain size and format each with a separate file system. These partitions may be directories containing system files or user data, such as /boot, /home, /var .etc.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>👨🏼‍💻  Standard Partitions: [Manage]</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##System: RHELL / Centos</strong><br><br>--------------------------------------------|<br><strong>#[Standard Partitions] Install, Configure:</strong><br>--------------------------------------------|<br><strong>### Disk Configuration ###</strong><br><br><strong>#Disk/Directory Status:</strong><br>sudo du -hla /storage/log<br>sudo du -hla --max-depth=1 / | sort -h<br><br><strong>#Check Status:</strong><br>ls -l /dev/sd*<br>df -Th<br>lsblk -p<br>sudo fdisk -l<br><br><strong>#Check the disk added to the system:</strong> (SCSI or NVMe)<br>ls  /sys/class/scsi_host/<br>echo "- - -" | tee /sys/class/scsi_host/host*/scan<br>echo "1" &gt; /sys/class/block/sda/device/rescan<br><br><strong>##Disk Partitioning##</strong><br><strong>1- #Using Fdisk:</strong> [sdb1, nvme0n2, ...]<br>sudo fdisk /dev/nvme0n2<br><br><strong>2- #Using Cfdisk:</strong> [sdb1, nvme0n2, ...]<br>sudo cfdisk /dev/nvme0n2<br><br><strong>3- #Using Parted:</strong> [sdb1, nvme0n2, ...]<br>sudo parted /dev/nvme0n2<br><br><strong>Welcome to fdisk (util-linux 2.37.4).</strong><br>Changes will remain in memory only, until you decide to write them.<br>Be careful before using the write command.<br><br><strong>Command (m for help):</strong><br><strong>m -</strong> print this help menu:<br><strong>n -</strong> add a new partition:<br><strong>p -</strong> print the partition table:<br><br><strong>Create a new label</strong><br>   g - create a new empty GPT partition table <strong>[1-128 Partitions]</strong><br>   G - create a new empty SGI (IRIX) partition table<br>   o - create a new empty DOS partition table<br>   s - create a new empty Sun partition table<br><br><strong>Partition type</strong><br>   <strong>p</strong>   primary (0 primary, 0 extended, 4 free) <strong>[Max 4 pieces]</strong><br>   <strong>e</strong>   extended (container for logical partitionsSelect (default p):<strong>[Unlimited]</strong><br><br><strong>*</strong>Specify the starting and ending sectors. You can use <strong>100%</strong> of all unallocated space.<br><strong>*</strong>Disk type will be <strong>[Linux]</strong> by default.<br>*To change this, use the&nbsp;<strong>[t]</strong>&nbsp;command.<br><strong>*</strong>Specify the partition type and number we want to change.<br>#Write the changes to disk. <strong>[Attention!]</strong><br><strong>t -</strong> Change partition type:<br><strong>L -</strong> List partition type:<br>8e - Set/change partition type:<br><strong>#w -</strong> Write changes to disk:<br><strong>p -</strong> List disk partitions:<br><strong>q -</strong> Exit from fdisk tool:<br><br><strong>#Introduce disk changes to the kernel:</strong><br>partprobe -s<br><br><strong>Disk/Partition Status:</strong><br>sudo file -sL /dev/nvme0n2<br>sudo blkid /dev/repo_vg/logs<br><br><strong>1- Disk, Partition Formatting [Ext3/Ext4]:</strong> (sdb1,nvme0n2p1, ..)<br>#sudo mkfs -t ext4 /dev/nvme0n2<br>#sudo mkfs -t ext4 /dev/nvme0n2p1<br><br><strong>2- Disk, Partition Formatting [Xfs]:</strong> (sdb1,nvme0n2p1, ...)<br>#sudo mkfs -t xfs /dev/nvme0n2<br>#sudo mkfs -t xfs /dev/nvme0n2p1<br><br><strong>#Folder Ops.:</strong><br>sudo mkdir /alan<br>sudo mkdir -p /alan/hodl-77/xxx (sub tree)<br><br><strong>#Mount &amp; Umount Ops.:</strong><br>sudo mount /dev/nvme0n2p1 /alan<br>sudo umount /dev/nvme0n2p1 /alan<br>sudo umount -l /dev/nvme0n2p1 /alan<br><br><strong>#fstab edit:</strong> (Persistence)<br>sudo cp /etc/fstab /etc/fstab.old<br>cat /etc/fstab<br>#nano /etc/fstab<br>#/dev/nvme0n2p1 /alan ext4 defaults 0 0<br>sudo mount -av<br>sudo findmnt --verify<br>sudo systemctl daemon-reload</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Expand the size of the volume:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>⦁ 📜Tutorials / Information:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>#Reduce  the size of the volume:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>⦁ The partition can be reducing after the file system is reduce. (reverse process of expansion)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>⚠️ Be careful and <strong>"back up"</strong> your data before these operations. Misconfiguration may result in <strong>"System crashes"</strong> and <strong>"Data loss"!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">-------------------------------------------------------------------|<br><strong>#[Standard Partitions] Manage: Extend and Reduce </strong> <strong>**Online/Offline</strong><br>-------------------------------------------------------------------|<br><br><strong>##&gt;&gt;A +Extend Operation##</strong><br><strong>#Check for errors with fsck:</strong><br>sudo e2fsck -ff -v /dev/nvme0n2p1<br>sudo e2fsck -f /dev/nvme0n2p1<br><br><strong>#A1 -First size Extend the Partition:</strong><br>Fdisk tool:<br>Parted or Cdisk tool:<br>df -Th<br><br><strong>#A2 -Later size Extend the File System:</strong><br>⦁<strong>If you are using Ext3/Ext4: (resize2fs)</strong> <strong>[Online]</strong><br>#sudo resize2fs /dev/nvme0n2p1 <strong>[%100]</strong><br>#sudo resize2fs /dev/nvme0n2p1 18G <strong>[spesific]</strong><br>df -Th<br><br>⦁<strong>If you are using Xfs: (xfs_growfs)</strong> <strong>[Online]</strong><br>#sudo xfs_growfs -d /dev/nvme0n2p1 <strong>[%100]</strong><br>#sudo xfs_growfs /dev/nvme0n2p1 18G <strong>[spesific]</strong><br>df -Th<br><br><strong>##&gt;&gt;B +Reducing Operation ##</strong> (<strong>only Ext3/Ext4, </strong>not Xfs)<br><strong>#If you shrink more than the disk data, you will lose data!</strong><br><strong>#Check for errors with fsck:</strong><br>sudo e2fsck -ff -v /dev/nvme0n2p1<br>sudo e2fsck -f /dev/nvme0n2p1<br><br><strong>#B1 First size the File System:</strong> (Reverse)<br><strong>⦁If you are using Ext3/Ext4: (resize2fs) [Offline]</strong><br>sudo umount /dev/nvme0n2p1 /alan <strong>[umount]</strong><br>sudo e2fsck -f /dev/nvme0n2p1<br>#sudo resize2fs /dev/nvme0n2p1 17G <strong>[spesific size]</strong><br>sudo mount /dev/nvme0n2p1 /alan <strong>[try mount]</strong><br>df -Th</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🔄Data/Disk Migration and Disaster Recovery:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Data migration or copying is used to <strong>[Completely]</strong> transfer our existing data from old disk to a new disk. We typically perform these types of migrations when an error or malfunction occurs in the disks or when our storage requirements change.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It is an abbreviation for <strong>“dd” </strong>(disk dump) and is a command used in Unix and Unix-like operating systems. It is a powerful and flexible tool that basically reads/writes <strong>[block-by-block]</strong> from files or devices. There is also SSH support to transfer data with the remote server. It is used to write iso images and bootable USBs or to create disk images.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>dd tool:</strong><br>#dd if=/dev/sda of=/dev/nvme0n2 status=progress conv=fsync<br>#dd if=recovery-14.img of=rec-14.tar status=progress conv=fsync</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>☢️✅ <strong>Disaster Recovery:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Disk system disasters can cause serious problems in operating systems. These disasters usually occur in the form of data loss, file system corruption, or system crash.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>💡 If you do not have an additional disk or are just focused on your data, you can access your data using 3rd party live disk/CD images, move it to an external area and try to recover it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>💡 The faulty partition/data be copied from the old disk to the new disk using "dd" (disk dump) and then the necessary configuration should be made on "fstab". On exit you should verify fstab and remove errors. You can then remove the faulty disk from the system. If the disk is removed from the system or the system is rebooted before the errors are resolved, it may not boot. You may need to use an external live disk image.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>💡 It is recommended to always format the<strong> [/boot] </strong>partition with the <strong>[Ext]</strong> file system. This is because Ext file system support is available in the Linux Kernel. Other file systems (LVM, XFS, BTRS, etc.) come as modules and are located in the <strong>[/lib]</strong> directory.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>root@ubuntu-siemnode4:~# lsblk -f</strong><br><strong>sda</strong><br>├─sda1<br>└─sda2                LVM2_member   xxx-xxx-xxx-xxx-xxx<br>  └─/dev/repo_vg/logs ext4          xxx-xxx-xxx-xxx-xxx   580.4G 37% <strong>/LOGS</strong><br><strong>sdb</strong><br>├─/dev/sdb1<br>├─/dev/sdb2           ext4          xxx-xxx-xxx-xxx-xxx    4.8GB  11% <strong>/boot</strong><br><strong>root@ubuntu-siemnode4:~#</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>fstab Configuration:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#<strong> /etc/fstab: static file system information.</strong><br># &lt;file system&gt; &lt;mount point&gt;   &lt;type&gt;  &lt;options&gt;       &lt;dump&gt;  &lt;pass&gt;<br># / was on /dev/ubuntu-vg/ubuntu-lv during curtin installation<br><strong>/dev/repo_vg/logs                      / ext4 defaults 0 1</strong><br># /boot was on /dev/sda2 during curtin installation<br><strong>/dev/disk/by-uuid/xxx-xxx-xxx-xxx-xxx  /boot ext4 defaults 0 1</strong><br><br><strong>fstab verifying:</strong><br>sudo cp /etc/fstab /etc/fstab.old<br>sudo mount -av<br>sudo findmnt --verify<br>udo systemctl daemon-reload</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##The same rules apply other systems.</strong><br>⦁ Debian / Ubuntu<br>⦁ Slackware<br>⦁ Arch Linux</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>End of chapter 1 – Best Regards…</strong></p>
<!-- /wp:paragraph -->
