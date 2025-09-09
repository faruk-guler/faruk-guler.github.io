---
layout: post
title: What is Bootx64 Efi Shell
date: 2022-03-19 12:59
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":2319,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/efishell.jpg?w=523" alt="" class="wp-image-2319" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>EFI (Extensible firmware interface) technology offers many innovations and opportunities. It is a new area where we can work between the BIOS and the Operating system. In this area, you can operate with EFI Shell commands. Especially for system administrators, EFI shell offers many possibilities. In the meantime, you may run the risk of corrupting the firmware as a result of incorrect use!</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Such as installing operating system without boot feature, writing scripts on EFI, installing or uninstalling software.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Indir/Downlod:</strong> <a href="https://github.com/faruk-guler/EFi_Shell_bootx64">https://github.com/faruk-guler/EFi_Shell_bootx64</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Let's ignore the virus warning?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's create the efi/boot/ folder in the Bootable USB formatted as FAT32 and put the Boot64.efi file we downloaded into boot/.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can get a shell by booting the system via Bootable USB.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#To select the relevant driver:
<strong>:fs0</strong>

#or
<strong>:fs1</strong>
<strong>:fs</strong>2

#List directories:
:<strong>dir</strong>

#List files:
<strong>-ls</strong>

#and other known commands can be used.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Yararlı olması dileğiyle. – Hope it’s useful.</strong></p>
<!-- /wp:paragraph -->
