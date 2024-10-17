---
layout: post
title: Windows "Runas" komutu nedir?
date: 2022-11-04 21:26
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":5349,"width":484,"height":322,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/runas-1.jpg?w=900" alt="" class="wp-image-5349" width="484" height="322" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>The RunAs command</strong> can be used to execute programs and commands as a different user than the one you are logged into. Runas is available in all Windows versions and was first featured in Windows 2000.<br>It usually exhibits the basic behavior of right-clicking on a program and setting the <strong>"Shift" + "Run as administrator" </strong>parameter.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Administrators use <strong>"runas"</strong> to log in to an account without administrative privileges or access a service and execute commands, programs, or other tasks, often with administrative privileges.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Bazı kullanım örnekleri:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5350,"width":528,"height":359,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/mkemalataturk.png?w=817" alt="" class="wp-image-5350" width="528" height="359" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Local Users Pass_resetter_powershell.bat</strong>

@echo off
net session &gt;nul 2&gt;&amp;1 || (powershell start -verb runas '"%~0"' &amp;exit /b)
net user guler Passw000rd</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Putty App UNC file Run CMD command</strong>
Runas /u:manager-pc\administrator /savecred "C:\Users\Faruk\Desktop\putty.exe"</pre>
<!-- /wp:preformatted -->
