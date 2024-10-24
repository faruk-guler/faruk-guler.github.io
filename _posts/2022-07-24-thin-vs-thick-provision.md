---
layout: post
title: Thin Provision vs Thick Provision
date: 2022-07-24 01:28
author: theguler
comments: true
categories: [Storage]
---
<!-- wp:image {"id":3684,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/disks.png?w=624" alt="" class="wp-image-3684" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>While creating disk space on VMware, we encounter 2 options. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>These;</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>– Thick Provision</strong> (Lazy Zeroed, Eager Zeroed)<br><strong>– Thin Provision</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>1-) Thick Provision</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>When we choose Thick Provision, blocks are allocated as much as the area created on the storage pool. For example, if we created 100 GB of space, 100 GB blocks are allocated on the storage pool. Thick Provision comes in two variants, Lazy Zeroed and Eager Zeroed. The difference is that Lazy Zeroed resets when the first data is written on the allocated block, so it causes performance degradation when transferring data. In the Eager Zeroed option, it resets the allocated space while creating the disk. This option causes the disc creation process to be slower. This selection can be preferred according to the action that the server will take.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Thick Disk:</strong> Allocates the entire given space on the disk. Disk space cannot be used by other virtual machines. (performance)<br><strong>Thick Eager Zeroed:</strong> It is the most performing disk type. Erases the disk and fills it with <strong>(00000000000∞)</strong> <strong>[Eager]</strong><br><strong>Thick Lazy Zeroed:</strong> Erases the disk, does not write anything on it. <strong>[Lazy]</strong><br><strong>Thin Disk</strong>: As data is written to this disk, its size will increase. Unused space can be used by other virtual machines (low performance).</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>2-) Thin provision</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>This disk type reserves space as only needed and resets on demand. Unused space is available to other virtual machines. This disk type allows for more efficient use of disk space but may slightly impact performance.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If our disk space does not have a definite value or has an increasing value over time, we can choose Thin provision. When we create 100 GB of space in this option, it will occupy 30% of the storage pool, that is, 30 GB. Even if the occupancy rate exceeds 30%, it will continue without error and allocate the area it needs. When it reaches 70% occupancy rate, it gives a warning. In this case, the disk capacity can be increased. Thin Provision provides a more efficient use on the storage pool, but causes the server to perform high I/O. It will still perform as well as the Eager Zeroed.<br>(IOPS=input/output operations per second), as the name suggests, is the maximum number of writes or reads a disk can do per second.) </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Made in Turkey with ❤️</strong> <strong>Best Regards. </strong></p>
<!-- /wp:paragraph -->
