---
layout: post
title: Disable Auto Suspend of VM on VMWare Workstation
date: 2022-07-22 08:14
author: theguler
comments: true
categories: [Vmware Virtualization]
---
<!-- wp:image {"id":1222,"width":483,"height":271,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/logo-vmware.webp?w=800" alt="" class="wp-image-1222" width="483" height="271" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>***The main reason; If Windows Server &amp; Client is not properly licensed and activated, this is the biggest reason. Please check your license term.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In the VMWare Workstation hypervisor If you do not use a virtual machine for a while, it is automatically suspended by the built-in Auto Suspend feature. To continue using the VM, you must click the Continue this virtual machine button.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":3637,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/suspend_no.jpg?w=709" alt="" class="wp-image-3637" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Unfortunately, you cannot completely disable Auto Suspend in VMWare Workstation settings. However, you can prevent a VM from suspending with a change to a hypervisor's VMX configuration file settings.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Shut down the VM;<br>Look at the path of the VMX configuration file in the VM properties;<br>Open the VMX file in any text edit file: <strong>win10x_64.vmx</strong><br>Add the line : <strong>suspend.disabled = "TRUE"</strong> to the end of the VMX text file.<br>Start the VM and make sure your VMWare Workstation administrator is no longer suspending the VM.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>suspend.disabled = "TRUE"</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
