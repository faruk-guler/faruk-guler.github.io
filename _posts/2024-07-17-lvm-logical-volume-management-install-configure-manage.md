---
layout: post
title: LVM Logical Volume Management Install, Configure, Manage Part-2
date: 2025-01-01 10:30
author: theguler
comments: true
categories: [Storage]
---
<!-- wp:image {"id":12441,"width":"428px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/lvs-stat.jpg?w=800" alt="" class="wp-image-12441" style="width:428px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🗃️</strong>🗃️🗃️ <strong>LVM (Logical Volume Management)</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>(LVM) </strong>is a storage management technology used in Linux-based operating systems. LVM provides the ability to partition physical storage space (hard disk or disk drives) into partitions called "Logical Volumes", which are its logical volume. This allows you to flexibly create, merge, expand-reduce, in short, <strong>"Manage"</strong> partitions on the physical disks where data is stored.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":7680,"width":"543px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/lvm-best.jpg?w=933" alt="" class="wp-image-7680" style="width:543px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Layer 1:&nbsp;Hard Drivers</strong> and Partitions consisting of them. These are your physical hard disks used by LVM and the standard file system. They keep all the data of the system on them.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Layer 2:&nbsp;PV </strong>(Physical volume)&nbsp;These are the partitions on your physical hard drives that can be used by LVM. They are used to create volume groups.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Layer 3:</strong> There is a physical volume called&nbsp;<strong>VG</strong> (Volume group). It is a virtual storage pool that combines multiple PVs and can be divided into logical volumes (LV).</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Layer 4:</strong> <strong>LV</strong>&nbsp;(Logical volume) is present. This is part of VG which you can use as a partition. Corresponds to Partitions; they usually hold a file system. But unlike partitions, they can span multiple disks and do not need to be physically contiguous.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Layer 5:</strong> There are hierarchical directories. Your disks are <strong>"mounted" </strong>in these directories and used.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🗃️ ⚙️ LVM: [Install, Configure]</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>⚠️ Be careful and <strong>"back up"</strong> your data before these operations. Misconfiguration may result in <strong>"System crashes"</strong> and <strong>"Data loss"!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>🎓For LVM configuration and general storage, I recommend using a second disk other than the <strong>/boot </strong>disk where the system is installed. This advice will help you in case of future expansion or maintenance work on your structure.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>🎓Since LVM comes installed as standard on many Linux distributions, its installation will not be explained here. If it is not installed on your system, you will need to install it manually.</p>
<!-- /wp:paragraph -->


<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##System: RHELL / Centos</strong><br><br><strong>--------------------------------|<br>#[LVM] Install, Configure:<br>--------------------------------|</strong><br><strong>### Disk Configuration ###</strong><br><br><strong>#Disk/Directory Status:</strong><br>sudo du -hla /storage/log<br>sudo du -hla --max-depth=1 / | sort -h<br><br><strong>#Check Status:</strong><br>ls -l /dev/sd*<br>df -Th<br>lsblk -p<br>sudo fdisk -l<br><br><strong>#Check the disk added to the system:</strong> (SCSI or NVMe)<br>ls  /sys/class/scsi_host/<br>echo "- - -" | tee /sys/class/scsi_host/host*/scan<br>echo "1" &gt; /sys/class/block/sda/device/rescan<br><br><strong>##Disk Partitioning##</strong><br><br><strong>1-</strong> <strong>#Using Fdisk:</strong> [sdb1, nvme0n2, ...]<br>sudo fdisk /dev/nvme0n2<br><br><strong>Welcome to fdisk (util-linux 2.37.4).</strong><br>Changes will remain in memory only, until you decide to write them.<br>Be careful before using the write command.<br><br><strong>Command (m for help):</strong><br><strong>m -</strong> print this help menu:<br><strong>n - </strong>add a new partition:<br><strong>p -</strong> print the partition table:<br><br><strong>Create a new label</strong><br>  <strong> g -</strong> create a new empty GPT partition table <strong>[1-128 Partitions]</strong><br>   <strong>G -</strong> create a new empty SGI (IRIX) partition table<br>   <strong>o -</strong> create a new empty DOS partition table<br>  <strong> s -</strong> create a new empty Sun partition table<br><br><strong>Partition type</strong><br>   <strong>p</strong>   primary (2 primary, 0 extended, 2 free) <strong>[Max 4 pieces]</strong><br>  <strong> e</strong>   extended (container for logical partitionsSelect (default p):<strong>[Unlimited]</strong><br><br>*Specify the starting and ending sectors. You can use 100% of all unallocated space.<br>*Disk type will be <strong>[Linux LVM] </strong>by default.<br>*To change this, use the<strong>&nbsp;[t]&nbsp;</strong>command.<br>*Specify the partition type and number we want to change. Enter code <strong>8e</strong>:<br>#Write the changes to disk. <strong>[Attention!]</strong><br><strong>t -</strong> Change partition type:<br><strong>L -</strong> List partition type:<br><strong>8e -</strong> Set/change partition type to <strong>'Linux LVM'</strong>:<br><strong>#w -</strong> Write changes to disk:<br><strong>p -</strong> List disk partitions:<br><strong>q - </strong>Exit from fdisk tool:<br><br><strong>#Introduce disk changes to the kernel:</strong><br>partprobe<br><br><strong>### LVM Configuration ###</strong><br><br><strong>#LVM Status Check:</strong><br>lvm version<br>lvm formats<br>show system lvm overview<br><br>#<strong>Create Physical volume(FV):</strong> (target: disk &amp; partitions)<br>pvs<br>pvdisplay<br>pvcreate /dev/nvme0n2<br>pvcreate /dev/nvme0n2p1 /dev/nvme0n2p2<br><br><strong>#Create Volume group(VG):</strong> (name:repo_vg)<br>vgs<br>vgdisplay<br>#vgcreate repo_vg /dev/nvme0n2<br>#vgcreate repo_vg /dev/nvme0n2p1<br>#vgcreate repo_vg /dev/nvme0n2p1 /dev/nvme0n2p2<br><br><strong>#Create logical volume(LV):</strong> (name:logs)<br>lvs<br>lvdisplay<br>#lvcreate -n logs -L 55G repo_vg (spesific)<br>#lvcreate -n logs -l 100%FREE repo_vg (%100)<br>#lvcreate -n logs -l 75%FREE repo_vg (%75)<br><br><strong>#Check Status:</strong><br>lsblk -p<br>df -Th<br><br><strong>Disk/Partition Status:</strong><br>sudo file -sL /dev/nvme0n2<br>sudo blkid /dev/repo_vg/logs<br><br><strong>1- Format: Disk, Partition, or LVM [Ext3/4]:</strong>(sdb1,nvme0n2p1, ..)<br>#sudo mkfs -t ext4 /dev/nvme0n2<br>#sudo mkfs -t ext4 /dev/nvme0n2p1<br>#sudo mkfs -t ext4 /dev/repo_vg/logs<br><br><br><strong>2- Format: Disk, Partition, or LVM [Xfs]:</strong> (sdb1,nvme0n2p1, ...)<br>#sudo mkfs -t xfs /dev/nvme0n2<br>#sudo mkfs -t xfs /dev/nvme0n2p1<br>#sudo mkfs -t xfs /dev/repo_vg/logs<br><br><strong>Folder Ops:</strong><br>sudo mkdir /LOGDIR<br>sudo mkdir /alan<br>sudo mkdir -p /alan/hold-27/xxx (sub tree)<br><br><strong>#Mount &amp; Umount:</strong><br>sudo mount /dev/repo_vg/logs /alan<br>sudo umount /dev/repo_vg/logs /alan<br><br><strong>#fstab:</strong> (persistence)<br>sudo cp /etc/fstab /etc/fstab.old<br>cat /etc/fstab<br>#nano /etc/fstab<br>#/dev/repo_vg/logs /alan ext4 defaults 0 0<br>#/dev/repo_vg/logs /alan xfs  defaults 0 0<br>sudo mount -av<br>sudo findmnt --verify<br>sudo systemctl daemon-reload</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>👨🏼‍💻 LVM: [Manage]</strong></h2>
<!-- /wp:heading -->

<!-- wp:image {"id":12176,"width":"475px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/lvm-arch.png?w=960" alt="" class="wp-image-12176" style="width:475px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p><strong>#Expand the size of the Logical Volume:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Create a new partition on the hard disk.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Add the partition you just created as a physical volume.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Add the new physical volume to the volume group.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Assign space from the volume group to the logical volume.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Resize the filesystem.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>#Reduce the size of the Logical Volume:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>[Reverse Process of Expansion]</strong></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>--------------------------------------|<br>#[LVM] Manage: Extend and Reduce<br>--------------------------------------|</strong><br><br><strong>#fschk Check for errors:</strong><br>sudo e2fsck -ff /dev/nvme0n2p1<br>sudo e2fsck -f /dev/repo_vg/logs<br><br><strong>#&gt;&gt;&gt;&gt; Expand Sections &lt;&lt;&lt;&lt;#</strong><br><strong>#Physical Volume(FV) expand:</strong><br>pvresize /dev/nvme0n2p1<br><br><strong>#Volume Group(VG) expand:</strong><br>vgextend repo_vg /dev/nvme0n2p1<br><br><strong>#Logical Volume(LV) expand:</strong> (LV Name:logs)<br>lvextend -L +5G /dev/repo_vg/logs<br>lvextend -l +100%FREE /dev/repo_vg/logs<br><br><strong>#&gt;&gt;&gt;&gt; Extend file system &lt;&lt;&lt;&lt;#</strong><br> <strong>If you are using Ext3/4:(resize2fs)</strong><br>#sudo resize2fs /dev/repo_vg/logs (%100)<br>#sudo resize2fs /dev/repo_vg/logs 84G (only more +GB)<br><br> ⦁<strong>If you are using&nbsp;XFS:(xfs_growfs)</strong><br>#sudo xfs_growfs /dev/repo_vg/logs(%100)<br>#sudo xfs_growfs -D 10G /dev/repo_vg/logs (+10GB)<br><br><strong>#&gt;&gt;&gt;&gt; LVM Size Reduction &lt;&lt;&lt;&lt;# [Reverse Process of Expansion]</strong> <strong>(*Only Ext3/4)</strong><br><strong>#Disk reducing is not recommended. If the reducing is greater than the disk capacity, you will lose data!!</strong><br>umount /dev/mapper/repo_vg/logs /LOGDIR<br>e2fsck -f /dev/mapper/repo_vg/logs<br>resize2fs /dev/mapper/repo_vg/logs 5G<br>lvreduce -L -5G /dev/mapper/repo_vg/logs<br>resize2fs /dev/mapper/repo_vg/logs<br>mount /dev/mapper/repo_vg/logs /LOGDIR</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>🛑 LVM Uninstalling 🛑</strong><br>#umount /dev/mapper/repo_vg/logs<br><strong>Removing LV from LVM:</strong><br>#sudo lvremove /dev/mapper/repo_vg/logs<br><br><strong>Removing VG from LVM:</strong><br>#sudo vgremove repo_vg<br><br><strong>Removing PV from LVM:</strong><br>#sudo pvremove /dev/nvme0n2<br>#sudo pvremove /dev/nvme0n2p1<br>#sudo pvremove /dev/mapper/repo_vg/logs</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#LVM Conf. Backup and Restore</strong><br>sudo cp -r /etc/lvm /LVM-Yedek<br>sudo cp -r /LVM-Yedek /etc/lvm</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🔄 LVM Migration</strong>:</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>What is LVM Migration?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>LVM migration is an important feature that allows you to move logical volumes to a new disk without data loss and without interruption. This feature is used to transfer our existing data from the old disk to a new disk. We usually perform such migrations when an error or malfunction occurs in the disks or when our storage requirements change.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>🛑⚠️***Warning:</strong> The bootloader cannot read LVM volumes directly. Therefore, you need to create your <strong>/boot </strong>partition on a standard <strong>(non-LVM)</strong> partition and define it in the fstab file. Skipping this step may cause your system to fail to boot after LVM migration. You may need to use an external live disk image to resolve this situation.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>💡 In the default installation, the <strong>[/]</strong> and <strong>[swap]</strong> partitions are always created in LVM, and the <strong>[/boot]</strong> partition is created in a separate Standard Partition.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>--------------------------------------|<br>#[LVM] Manage: Migration<br>--------------------------------------|</strong><br><br><strong>-1 Mirroring<br>-2 Pvmove</strong><br><br><strong>#-2 Using Pvmove:</strong><br>lsblk -p<br>pvcreate /dev/nvme0n2 <strong>[New PV create]</strong><br>vgextend repo_vg /dev/nvme0n2 <strong>[VG extend]</strong><br>pvmove -n /dev/repo_vg/logs /dev/nvme0n2 <strong>[PV move where New Disk]</strong><br>pvmove /dev/sda1 /dev/nvme0n2 <strong>[Move All Disk to New disk]</strong><br><br><strong>#Cleanup</strong> (spesific)<br>vgreduce repo_vg /dev/sda1 <strong>[PV remove From VG]</strong><br>pvremove /dev/sda1 <strong>[PV remove]</strong><br><br><strong>About Using Pvmove:</strong> With pvmove, data on the specified logical volume is moved to another physical volume. After this process, the data on the source physical volume is deleted.<br><br><strong>***Physical Units:</strong> <strong>/dev/*</strong> It represents the locations where data is kept and moved.<br>The data on the <strong>/dev/repo_vg/logs</strong> logical volume will be moved from the <strong>/dev/sda1</strong> <strong>PV to</strong> the target volume <strong>/dev/nvme0n2</strong> <strong>PV.</strong> <strong>-n</strong> is the name of the LV to be moved.</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Linear, Striped, Mirrored, Snaphot Volume:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>-Linear:<br>-Striped:<br>-Mirrored:</strong><br>-<strong>Snaphot Volume</strong><br><strong><br>-4 Snaphot Volume:</strong><br>***Snapshots are instant copies of Volume and Logical Volumes. In this way, a copy of the Volume from which the snapshot was taken is kept. Snapshot is a fast and efficient solution to data loss in the volume.<br>***There must be enough free space in the volume group to create a new snapshot.<br>***Snapshots cannot be used as a backup solution.<br>&nbsp;<br><strong>Creating LVM Snapshot:</strong><br>#Check if there is free space in the volume group using the 'vgs' command to create a new snapshot.<br>vgs<br>lvcreate -L 1GB -s -n logs-snap1 /dev/repo_vg/logs<br>lvs<br><br><strong>Snapshot Usage:</strong><br>#You can mount and view #Snapshot in a directory you created.<br>mkdir /mnt/logs-snap1<br>mount /dev/repo_vg/logs-snap1 /mnt/logs-snap1<br><br>#<strong>Expand the Snapshot size:</strong><br>lvextend -L +2G /dev/repo_vg/logs-snap1<br><br><strong>Snapshot Restore and Merge:</strong><br>#If your original space is completely lost, merge the snapshot by converting it.<br>#The time when the snapshot is created is very important.<br>#After the defragmentation is complete, the snapshot is automatically removed.<br><br>lvdisplay /dev/repo_vg/logs-snap1<br>umount /mnt/logs-snap1<br>#lvconvert --merge /dev/repo_vg/logs-snap1<br><br><strong>Snapshot Remove:</strong><br>lvremove /dev/repo_vg/logs-snap1</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><a href="https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/5/html/logical_volume_manager_administration/lv_overview">https://docs.redhat.com/en/documentation/red_hat_enterprise_linux/5/html/logical_volume_manager_administration/lv_overview</a></p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading">🗃️📜 <strong>Tutorials / Information:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">⦁ The highest number of physical volumes within each volume group is 256.<br>⦁ LVM size is minimum 4MB and maximum 255.99GB.<br>⦁ The maximum volume group (VG) per device is 99.<br>⦁ Traditional partitioning is good, but LVM is better. (RedHat Enterprise)<br>⦁ XFS file system can be expanded but not reducing!! (year 2024) The only solution is to back up the data, delete the volume, create a smaller volume and restore the data there.<br>⦁ Disk reducing is not recommended. If the reducing is greater than the disk capacity, you will lose data!!<br>⦁<br>⦁<br><br>- LV: Cannot belong to more than one VG.<br>- VG: Can contain more than one LV.<br>- PV: Cannot belong to more than one VG.<br>- VG: Can consist of more than one PV.</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>🗃️📜 Some I use LVM Commands:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Command	                Description</strong><br><strong>pvs</strong>	                Display physical volume information<br><strong>vgs</strong>	                Display volume group information<br><strong>lvs</strong>	                Display logical volume information<br><br>pvcreate	        Create physical volume<br>pvdisplay	        Display physical volume information<br>pvremove	        Remove physical volume<br>pvscan                  scan to PV's<br>vgcreate	        Create volume group<br>vgdisplay	        Display volume group information<br>vgremove	        Remove volume group<br>vgextend/vgreduce	Extend or reduce volume group<br>lvcreate	        Create logical volume<br>lvdisplay	        Display logical volume information<br>lvremove	        Remove logical volume<br>lvextend/lvreduce       Extend or reduce logical volume<br><br><a href="https://man7.org/linux/man-pages/man8/lvm.8.html">https://man7.org/linux/man-pages/man8/lvm.8.html</a><br><a href="https://pastebin.com/raw/ugxWRJps">https://pastebin.com/raw/ugxWRJps</a></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##The same rules apply other systems.</strong><br>⦁ Debian / Ubuntu<br>⦁ Slackware<br>⦁ Arch Linux</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>📊LVM Advantages:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>⦁ <a href="https://bidb.itu.edu.tr/seyir-defteri/blog/2013/09/06/lvm-(logical-volume-management)">https://bidb.itu.edu.tr/seyir-defteri/blog/2013/09/06/lvm-(logical-volume-management)</a><br>⦁ <a href="https://access.redhat.com/documentation/fr-fr/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/advantages-of-lvm_overview-of-logical-volume-management">https://access.redhat.com/documentation/fr-fr/red_hat_enterprise_linux/9/html/configuring_and_managing_logical_volumes/advantages-of-lvm_overview-of-logical-volume-management</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>End of chapter 2</strong></p>
<!-- /wp:paragraph -->
