---
layout: post
title: What is a Source List (sources.list) Configuring APT
date: 2023-06-25 16:07
author: theguler
comments: true
categories: [Debian]
---
<!-- wp:image {"id":10288,"width":"326px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/debian-12-freeze.jpg?w=1024" alt="" class="wp-image-10288" style="width:326px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>What is Debian Source List?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The Debian source list is a central component of the Debian package management system. This list is used by the Debian package manager (apt) to determine which repositories to retrieve packages from. Every Debian distribution includes some repositories by default, but users can edit this list to add or remove their own repositories.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The source list contains the repositories' URLs, distribution information, and security keys; It is usually located in the<strong> [/etc/apt/sources.list</strong>] file.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Additional and 3rd party repository definitions can be found in the <strong>[/etc/apt/sources.list.d]</strong> directory.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For example:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo nano /etc/apt/sources.list<br>sudo nano /etc/apt/sources.list.d<br>sudo apt update</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>For instance:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#deb cdrom:[Debian GNU/Linux 12.2.0 _Bookworm_ - Official amd64 DVD Binary-1 with firmware 20231007-10:29]/ bookworm main non-free-firmware<br><br>deb http://debian.gnu.gen.tr/debian/ bookworm main contrib non-free non-free-firmware<br>deb-src http://debian.gnu.gen.tr/debian/ bookworm main contrib non-free non-free-firmware<br><br>deb http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware<br>deb-src http://security.debian.org/debian-security bookworm-security main contrib non-free non-free-firmware<br><br># bookworm-updates, to get updates before a point release is made;<br># see https://www.debian.org/doc/manuals/debian-reference/ch02.en.html#_updates_and_backports<br>deb http://debian.gnu.gen.tr/debian/ bookworm-updates main contrib non-free non-free-firmware<br>deb-src http://debian.gnu.gen.tr/debian/ bookworm-updates main contrib non-free non-free-firmware</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>For instance: sources.list.d</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">cd /etc/apt/sources.list.d/<br>touch google-chrome.list<br>nano /etc/apt/sources.list.d/google-chrome.list<br>#Add File: deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main</pre>
<!-- /wp:preformatted -->
