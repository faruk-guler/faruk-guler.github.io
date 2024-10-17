---
layout: post
title: Debian "Alias" Kullanımı
date: 2023-04-14 20:56
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":9741,"width":"383px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://faruk-guler.github.io/assets/post_images/debian_logo.png?w=512" alt="" class="wp-image-9741" style="width:383px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Örneğin; 🗑 <code>cls</code> (Clear Screen) komutu, özellikle Windows işletim sistemi kullanıcılarının komut istemcisinde (Command Prompt) terminal ekranını temizlemek için kullanılan bir komuttur. Bu komut, terminal penceresindeki tüm önceki çıktıları temizler ve size yeni bir boş ekran sunar.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>🗑 <code>cls</code> komutu, Linux tabanlı sistemlerde doğrudan çalışmaz. Ancak, bir taklitçi komut alias (takma ad) oluşturarak bu komutu kullanabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#To affect the current user's Bash shell:</strong><br>sudo nano .bashrc<br><br><strong>#To affect all users' Bash shells:</strong><br>sudo nano /etc/bash.bashrc<br><br><strong>#To influence a specific group of users:</strong><br>sudo nano /etc/profile<br><br><strong>#Add the following line to the end of the file.<br>#In this way, by running the cls command, you will actually be referring to the clear command.</strong><br>alias cls='clear'<br><br><strong>#For changes to take effect:</strong><br>source ~/.bashrc<br>source /etc/bash.bashrc<br><br>#On Debian-based systems such as Debian or Ubuntu, general system settings are made in /etc/bash.bashrc or /etc/profile files, while on Red Hat-based systems (e.g. Fedora, CentOS) general system settings are made in /etc/bash.bashrc or /etc/profile.d/. files are used<br><br><strong>#Saygılarımla</strong> www.farukguler.com</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Taklitlerinden sakınınız ;)</p>
<!-- /wp:paragraph -->
