---
layout: post
title: VMware Tools Kurulumu ve Update Edilmesi
date: 2023-07-11 21:54
tag: [Vmware]
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":540,"width":391,"height":281,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/vmtools.png?w=356" alt="" class="wp-image-540" width="391" height="281" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Standart bir vmware tools upgrade sürecinde vmler için restart gereklidir. Ancak bazı durumlarda vmlerin restart edilmesi hizmet kesintilerine neden olacaktır Bu durumda reboot olmaksızın upgrade işlemini yapmak için aşağıdaki adımlar izlenmelidir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>VMware Tools 10x, 11x, 12x  vs. indirme linkleri:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://customerconnect.vmware.com/downloads/#all_products">https://customerconnect.vmware.com/downloads/#all_products</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://customerconnect.vmware.com/downloads/info/slug/datacenter_cloud_infrastructure/vmware_tools/12_x">https://customerconnect.vmware.com/downloads/info/slug/datacenter_cloud_infrastructure/vmware_tools/12_x</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Warning: </strong>A newer version of VMware Tools is available for this virtual machine.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2718,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/hata.png?w=906" alt="" class="wp-image-2718" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>ESXI tüm "vmtoolslar" için Download link:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://packages.vmware.com/tools/releases">https://packages.vmware.com/tools/releases</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><a href="https://packages.vmware.com/tools/esx/index.html">https://packages.vmware.com/tools/esx</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Bu işleme başlmadan önce vm üzerinde eski dahi olsa bir <strong>vmware tools </strong>kurulumunun yapılmış olması gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2773,"width":842,"height":351,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/testtt.png?w=1024" alt="" class="wp-image-2773" width="842" height="351" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>a)</strong> <strong>Interactive Upgrade</strong>
####################
Bu seçenekte VMware Tools içeren disk isosu sanal CD/DVD sürücüsüne mount edilecektir. Sanal makinenin konuk işletim sistemi çalışıyor olmalıdır. Ardından sanal CD/DVD'den VMware Tools Upgrade sihirbazını çalıştırarak makine içerisinden Vmware toolsu kurabilirsiniz.


<strong>b)</strong> <strong>Automatic Upgrade</strong>
#########################
Bu seçenekte ise VMware Tools, işletim sistemi ile etkileşime girmeden sadece komutlar ile otomatik olarak update edilecektir. Gerekirse, işletim sistemi otomatik olarak yeniden başlatılacaktır. haliyle bunu belirleyen komutlarınız olacaktır.

<strong>#Windows makinelere restart etmeden vmtools yüklemek için farklı komutlar kulllanılabilir:</strong>

/s /v “/qn REBOOT=ReallySuppress”

<strong>Ancak aklınızda bulunsun ki en kısa ve müsait zamanda Yeniden başlatma hala gereklidir. Bunu manuel olarak yapmanız gerekir</strong>.

/S /v “/qn REBOOT=R ADDLOCAL=ALL”

/S /v”/qn REBOOT=R”

<strong>Linux sunuculara vmtools yüklemek için ise:</strong>

<strong>CLI:</strong> sudo apt install open-vm-tools
###########################################################################
<strong>Ancak en kısa ve müsait zamanda makinenizi Yeniden başlatmanız gereklidir.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Linux için "VMware Tools" kurulumu</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>linux paketlerin güncelleyin - update linux packages</strong>
sudo apt update

<strong>Server için kurulum - For Server</strong>
sudo apt install open-vm-tools
#sudo reboot

<strong>#desktop için- for Desktops</strong>
sudo apt install open-vm-tools-desktop
#sudo reboot</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Manuel Kurulum:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Eğer Linux Sunucunuzun herhangi bir  internet erişimi yoksa <strong>vmware tools iso</strong>‘sunu manuel indirip <strong>guest</strong>‘e&nbsp;<strong>mount</strong>&nbsp;ederek aşağıdaki komutları çalıştırmalısınız.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo apt-get update
sudo apt-get install perl
sudo mkdir /mnt/cdrom
sudo mount /dev/cdrom /mnt/cdrom
ls /mnt/cdrom
tar -xvf /mnt/cdrom/VMwareTools-x.x.x-yyyy.tar.gz -C /tmp/
cd /tmp/vmware-tools-distrib/
sudo ./vmware-install.pl -d
sudo reboot</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Windows Server için "VMware Tools" kurulumu</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Yukarı kısımda vermiş olduğum linklerden windows için vmtools'u <strong>.zip .gz</strong> vs formatlarda indirip manuel olarak yükleyebilirsiniz.

<strong>#VMware Tools packages for Windows
#VMware Tools for Windows, 32-bit in-guest installer
#VMware Tools for Windows, 64-bit in-guest installer</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>VMware Tools durumunu doğrulamak için:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Ubuntu veya Debian tabanlı sistemler için:</strong>
dpkg -l open-vm-tools
systemctl status open-vm-tools

<strong>#CentOS veya RHEL tabanlı sistemler için:</strong>
rpm -qa | grep open-vm-tools
systemctl status vmtoolsd

<strong>#Windows tabanlı sistemler için:</strong>
Get-Service vmtools | Select-Object -Property *,@{Name="Version";Expression={$version}}</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Ayrıca Vcenter kullanıyorsanız, <strong>Vsphere Client</strong> ekranında yer alan summary kısmından vmware tools!un yüklendiğini teyit edebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":2716,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/wmtoolsupdate.png?w=847" alt="" class="wp-image-2716" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Kurulum sonunda taskbar'dan yapılan işlemin sonucunu görebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
