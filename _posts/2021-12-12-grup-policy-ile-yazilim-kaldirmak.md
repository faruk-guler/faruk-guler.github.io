---
layout: post
title: Uninstalling software with Group Policy
date: 2021-12-12 23:42
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":609,"width":510,"height":374,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gpo.png?w=939" alt="" class="wp-image-609" width="510" height="374" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>1]- CMD: &amp; PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>admin olarak çalıştırılıp - run as administrator</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>wmic</strong> yazıyoruz ve enter tuşuna basıyoruz. - We type <strong>wmic </strong>and press enter.<br>Ardından <strong>product get name</strong> yazarak enter...  bekliyoruz. - Type <strong>product get name</strong> enter… and wait.<br>Gelen isimlerinden kaldırılacak programı kopyalıyoruz. - copy the program name to be uninstalled.<br><strong>product where name=</strong> kısmına yazıyoruz. - <strong>product where name=</strong>  we write to. *Google Chrome *winrar<br>bu bat dosyasını gpo ile ilgili gruba dağıtabiliriz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>bat dosyası hali - bat file state: </strong>uninstaller.bat</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>wmic product where name="Google Chrome" call uninstall<br>@echo off<br>net session &gt;NUL 2&gt;&amp;1|| powershell Start-Process '%0' -Verb RunAs&amp;&amp; exit /b|| exit /b<br>cmd</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2]- ilk methot işe yaramaydıysa  ikinci işleme geçelim. - The first method may not work, we move on to the second method.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Regedit</strong> üzeride;</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>yoluna gidelim. - Let's go your way.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Açılan ekranda&nbsp;<strong>UninstallString&nbsp;</strong>parametresi içindeki değer bize gerekli olan ID bilgisini barındırıyor. - On the screen that opens, the value in the UninstallString parameter contains the ID information we need.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":635,"width":968,"height":604,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/unins.png?w=1024" alt="" class="wp-image-635" width="968" height="604" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>MsiExec.exe /X {<strong>Program_ID_Bilgisi</strong>} /qn</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>MsiExec.exe /X {<strong>Program_ID_Info</strong>} /qn</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>yazilim_kaldirma.bat</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":637,"width":506,"height":213,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/uninstall-gpo.jpg?w=582" alt="" class="wp-image-637" width="506" height="213" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>ID bilgisini kopyalayıp bat dosyası içine kayderek dağıtalım. - Let's save the copied ID information in the bat file and distribute it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Saygılarımla. – Best regards.</p>
<!-- /wp:paragraph -->
