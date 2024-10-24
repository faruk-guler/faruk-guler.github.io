---
layout: post
title: Cannot Extend C Drive in Windows Server 2022
date: 2024-04-17 20:47
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":11116,"width":"513px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/extend-volume.png?w=826" alt="" class="wp-image-11116" style="width:513px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>In the latest versions of Windows Server 2022 and Windows 10, the Recovery Partition usually comes after the "C" drive. This can cause problems when you want to extend the "C" drive in virtualization environments. Deleting the recovery partition generally does not affect the boot or operation of the system. Also note that you can re-create the recovery partition if necessary.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***However, make sure to back up your data before doing this!</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#CMD Run as admin</strong><br>diskpart<br>list disk<br><strong>select disk number***</strong><br>sel disk [0, 1, 2...]<br>list part<br><strong>select healthy recovery partition number***</strong><br>sel part [0, 1, 2...]<br>delete partition override</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":11259,"width":"957px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/son_disk-1.png?w=1024" alt="" class="wp-image-11259" style="width:957px;height:auto" /></figure>
<!-- /wp:image -->
