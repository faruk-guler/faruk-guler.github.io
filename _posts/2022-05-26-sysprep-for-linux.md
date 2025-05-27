---
layout: post
title: Sysprep for Linux - Linux İçin Sysprep
date: 2022-05-26 19:34
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":3252,"width":421,"height":241,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/sudo.jpg?w=297" alt="" class="wp-image-3252" width="421" height="241" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Sysprep, bir sanal makineyi sıfırlayabilir veya çoğu yapılandırmasını kaldırabilir, böylece ondan klonlar ve imajlar yapabilirsiniz.&nbsp;Bu süreçteki adımlar, SSH ana bilgisayar anahtarlarının kaldırılmasını, Ağ MAC yapılandırmasının kaldırılmasını ve kullanıcı hesaplarının silinmesini içerir.&nbsp;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sysprep can reset a virtual machine or remove most of its configurations so you can make clones and images from it. The steps in this process include removing SSH host keys, removing network MAC configuration, and deleting user accounts.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>WARNING</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Using virt-sysprep in live virtual machines or at the same time as other disk editing tools can be dangerous and cause disk corruption. Before using this command, the virtual machine must be shut down and disk images must not be edited at the same time. you should also have a solid backup before proceeding.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>virt-sysprep'i canlı sanal makinelerde veya diğer disk düzenleme araçlarıyla aynı anda kullanmak tehlikeli olabilir ve disk bozulmasına neden olabilir. Bu komutu kullanmadan önce sanal makine kapatılmalıdır ve disk görüntüleri aynı anda düzenlenmemelidir. ayrıca işlemden önce sağlam bir yedeğinizin olması gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I have shared 2 batches here that will be able to auto sysprep with the commands github. <strong><a href="https://github.com/theguler0x/Linux-Tools">Link:</a></strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Alttaki komutlar harici oto sysrep yapabilecek 2 adet toolu github'da paylaştım. <a href="https://github.com/theguler0x/Linux-Tools"><strong>Link:</strong></a></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"> <strong>Debian:</strong> apt-get install libguestfs-tools
 <strong>Ubuntu:</strong> apt-get install libguestfs-tools
 <strong>Kali Linux:</strong> apt-get install libguestfs-tools
 <strong>Fedora:</strong> dnf install libguestfs-tools-c-1
 <strong>Raspbian:</strong> apt-get install libguestfs-tools</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">virt-sysprep
virt-sysprep [--options] -d domname

virt-sysprep [--options] -a disk.img [-a disk.img ...]</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla - Best regards</strong></p>
<!-- /wp:paragraph -->
