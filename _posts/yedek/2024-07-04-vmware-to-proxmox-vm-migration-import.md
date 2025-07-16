---
layout: post
title: Vmware to Proxmox VM Migration Import
date: 2025-01-02 13:39
author: theguler
comments: true
categories: [Virtualization Technology]
---
<!-- wp:image {"id":12928,"width":"418px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/mig-vm-prox.png?w=1024" alt="" class="wp-image-12928" style="width:418px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>In this article,</strong> I explain 2 different ways how you can perform the VMware &gt; Proxmox migration process quickly and successfully.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Disk Extensions Virtualization Platforms:</strong><br>Vmware: OVF, OVA, VMDK<br>Microsoft Hyper-V: VHD, VHDX<br>Proxmox: QCOW2, Raw<br>VirtualBox: VDI, VMDK<br>.etc.</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>1- Using Proxmox ESXI Import Wizard</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Proxmox VE offers VM Import Wizard as of 2024. You can use this to import all VMware ESXi VMs by enabling VM migration from VMware to Proxmox.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Prerequisite:</strong> Make sure your Proxmox VE version is 8 (or above) and has the latest available system updates.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":12950,"width":"505px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/cr-esxi.png?w=710" alt="" class="wp-image-12950" style="width:505px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>Proxmox VE:</strong> Data Center &gt; Storage &gt; Add &gt; ESXi &gt; IP, Username, Password:</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>After logging into the Esxi host: Select VMs to import &gt; Specify Imported VMs &gt; <strong>Import.</strong></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>2- Manually VMware to Proxmox migration:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Make sure you can see your Virtual Machine's files in these directories and locations. You can transfer the VM to a conspicuous location using the appropriate commands. **You can use SCP or Winscp tool for file transfer.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Locate:</strong><br><strong>ESXI Host:</strong> ds///vmfs/volumes/457b5u78-689ocd19-2048-vy345606fgyn/<br><strong>Local Drive:</strong> D:\Faruk\Vms\IIS-MERKEZ\</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":12933,"width":"435px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/mig-1-1.png?w=1024" alt="" class="wp-image-12933" style="width:435px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Create a new Proxmox VM:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>First you need to create a Proxmox virtual machine and make sure you choose the correct <strong>BIOS settings</strong> and hard disk drive type. Generally, you should select <strong>OVMF</strong> (UEFI) as the BIOS setting and set the hard disk drive type to <strong>SATA.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>**Set the BIOS settings on the system to <strong>UEFI (usually OVMF (UEFI) </strong>is selected)</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":12935,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/cr-1.jpg?w=1021" alt="" class="wp-image-12935" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>**You must select the Device Type as <strong>SATA </strong>for the disks.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":12937,"width":"627px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/cr-2.jpg?w=1024" alt="" class="wp-image-12937" style="width:627px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Typically, a virtual disk contains two files: *.vmdk and *-flat.vmdk. These files should be copied together to the target path of Proxmox. **You can use <strong>SCP</strong> or <strong>Winscp tool </strong>for file transfer in Proxmox.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#scp -v &lt;source&gt; &lt;destination&gt;<br>scp -v root@192.168.5.100:/vmfs/volumes/457b5u78-689ocd19-2048-vy345606fgyn/50/windows-app.vmdk /var/lib/vz/temp<br>scp -v root@192.168.5.100:/vmfs/volumes/636b5c77-974fab32-2048-bc169506deba/50/windows-app-flat.vmdk /var/lib/vz/temp</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>**Deleting the files copied to the Proxmox Local node after the process will prevent unnecessary disk space usage.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Import VMDK Disk:</strong></h2>
<!-- /wp:heading -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>*** <em>qm importdisk</em></li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>This command is used to add an existing disk file to the Proxmox VE virtual machine. This command imports the specified windows-app.vmdk file into virtual machine 117 on Proxmox VE and stores this disk in the area named <strong>"Prox-Pool"</strong>.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">qm importdisk 117 /var/lib/vz/windows-app.vmdk Prox-Pool --format raw<br>qm importdisk 117 /var/lib/vz/windows-app-DB.vmdk Prox-Pool --format raw<br><strong>#Format:</strong> qcow2, raw, vmdk<br><br><strong>#The conf. file location:</strong> VM with ID 117.<br>/etc/pve/nodes/pve1/qemu-server/<br>/etc/pve/qemu-server/</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>The converted vmdk disk will automatically show as&nbsp;<strong>“Unused Disk”&nbsp;</strong>in Proxmox VE. Now click on <strong>VM 117</strong> &gt;&nbsp;<strong>Hardware </strong>&gt;&nbsp;<strong>Unused Disk 0</strong> &gt;&nbsp;&nbsp;Select Edit and make sure the bus/device is also <strong>SATA.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":12941,"width":"635px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/cr3.jpg?w=1024" alt="" class="wp-image-12941" style="width:635px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Now go to <strong>VM 117 </strong>&gt;&nbsp;<strong>Options</strong> &gt; <strong>Boot Order</strong> &gt; move newly added disk to first &gt; <strong>enable</strong> &gt; press <strong>OK.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":12943,"width":"637px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/cr4.jpg?w=1024" alt="" class="wp-image-12943" style="width:637px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Start the Virtual Machine:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>Click VM 117 </strong>&gt; Console &gt; <strong>Start Now</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":12948,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/cr5.jpg?w=1024" alt="" class="wp-image-12948" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Vm Ops. :</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#[Convert Vmdk To Qcow2, RAW]</strong><br><br><strong>#Disk convert and move: Local -&gt; Prox-Pool</strong> [*CEPH]<br><strong>#Format:</strong> qcow2, raw, vmdk<br>qemu-img convert -f vmdk /tmp/windows-app-server/windows-app.vmdk -O qcow2 /var/lib/vz/images/117/windows-app.qcow2<br><br><strong>#Edit virtual machine config file and attach disk file:</strong><br>nano /etc/pve/local/qemu-server/117.conf<br><br><strong>#Import Ovf To Proxmox</strong><br>qm importovf 117 windows-app.ovf <strong>local-lvm</strong><br><br><strong>#[Convert VHD to VMDK]</strong><br>----------------------</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla...</strong></p>
<!-- /wp:paragraph -->
