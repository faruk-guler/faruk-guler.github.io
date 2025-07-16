---
layout: post
title: Recovering an Accidentally Deleted VMFS Datastore in VMware ESXi or vSphere
date: 2024-04-09 02:23
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":4006,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/rec.jpg?w=600" alt="" class="wp-image-4006" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Your VMFS datastore attached to an ESXi host or vSphere F<strong>or example,</strong> when a VMware administrator accidentally removes it, or when a disk/LUN with a VMFS partition is disabled/lost due to errors in your storage/backup device, it accidentally chooses Erase instead of Unmount and deletes a VMFS datastore. Let's process the scenario he removed.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>First of all, don't panic. Do not rebuild the VMFS datastore from the vSphere interface, do not upload files, or do anything that could overwrite the data on the previous VMFS partition on your disk (LUN).</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3971,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/deletedlun-1.png?w=1024" alt="" class="wp-image-3971" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":3972,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/confirm_del.png?w=1024" alt="" class="wp-image-3972" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>As you can see I accidentally deleted 19.75 GB of Lun space, the storage appears to be empty</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3974,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/delete_true.png?w=1024" alt="" class="wp-image-3974" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Enable SSH on your ESXi host with the deleted LUN and connect with an SSH Tool</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3977,"width":"786px","height":"242px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/path.png?w=1024" alt="" class="wp-image-3977" style="width:786px;height:242px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>SSH</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>partedUtil getptbl /vmfs/devices/disks/mpx.vmhba0:C0:T1:L0</strong>

gpt
2610 255 63 41943040
[root@esxi7:~]

<strong>#</strong>The command has returned that there is a GPT on the disk/LUN.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Next, you need to get the first and last block of the VMFS partition on the disk.<br>Run the following script in the cli to view a summary of all partitions found on the ESXi host and find the first block of the deleted VMFS partition:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>SSH</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>offset="128 2048"; for dev in `esxcfg-scsidevs -l | grep "Console Device:" | awk {'print $3'}`; do disk=$dev; echo $disk; partedUtil getptbl $disk; { for i in `echo $offset`; do echo "Checking offset found at $i:"; hexdump -n4 -s $((0x100000+(512*$i))) $disk; hexdump -n4 -s $((0x1300000+(512*$i))) $disk; hexdump -C -n 128 -s $((0x130001d + (512*$i))) $disk; done; } | grep -B 1 -A 5 d00d; echo "---------------------"; done</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":3983,"width":"853px","height":"288px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dump-1.png?w=1024" alt="" class="wp-image-3983" style="width:853px;height:288px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Now we need to disk the last block of the VMFS partition:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>partedUtil getUsableSectors /vmfs/devices/disks/mpx.vmhba0:C0:T1:L0</strong>

# 34 41943006
# [root@esxi7:~]
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>If the command returns the error “Unknown partition table on disk”, manually set the GPT partition label:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>partedUtil mklabel /vmfs/devices/disks/mpx.vmhba0:C0:T1:L0 gpt</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Then get a partition table GUID for the VMFS partition. It is always <strong>AA31E02A400F11DB9590000C2911D1B8</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>partedUtil showGuids</strong>

#You can view all possible partition table GUIDs using this command:</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":3987,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/vmsf.png?w=1024" alt="" class="wp-image-3987" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Then create a partition table on the disk using the information you have:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>partedUtil setptbl /vmfs/devices/disks/mpx.vmhba0:C0:T1:L0 gpt "1 2048 41943006 AA31E02A400F11DB9590000C2911D1B8 0"</strong>

#gpt
#0 0 0 0
</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":3992,"width":"851px","height":"195px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/son_data.png?w=1024" alt="" class="wp-image-3992" style="width:851px;height:195px" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Check the partitions on the disk again and make sure the VMFS partition is now visible: **<strong>Alanim_Data</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>partedUtil getptbl /vmfs/devices/disks/mpx.vmhba0:C0:T1:L0</strong>

# gpt
# 2610 255 63 41943040
# 1 2048 20971486 AA31E02A400F11DB9590000C2911D1B8 vmfs 0
</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Now let's mount the VMFS datastore:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>vmkfstools -V
esxcli storage core adapter rescan --all</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Go to the vSphere client and you will see that the accidentally deleted VMFS datastore has been loaded. You can mount it to the VMware ESXi host manually or via the CLI:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3994,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/mounter.png?w=1024" alt="" class="wp-image-3994" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Or Mount Command:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>esxcli storage filesystem list</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":3996,"width":"901px","height":"188px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/checked_mount.png?w=1024" alt="" class="wp-image-3996" style="width:901px;height:188px" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>esxcli storage filesystem mount -l Alanim_Data

#esxcli storage filesystem unmount -l Alanim_Data</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":3999,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/data_son2.png?w=1024" alt="" class="wp-image-3999" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":4000,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/data_son.png?w=1024" alt="" class="wp-image-4000" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
