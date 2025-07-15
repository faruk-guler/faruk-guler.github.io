---
layout: post
title: How to Set Message (MOTD) Banner
date: 2022-09-04 12:56
author: theguler
comments: true
categories: [Linux / Unix]
---
<!-- wp:image {"id":7350,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/mod_issue.png?w=1009" alt="" class="wp-image-7350" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Let's edit the SSH banner file. The /"etc/motd" file is usually used. You can open the file using the following command:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nano /etc/motd</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>In the text editor, create or edit your SSH message banner.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong> _    _                ___           _                  __         <br>( )_ ( )              (  _`\        (_ )              /' _`\       <br>| ,_)| |__     __     | ( (_) _   _  | |    __   _ __ | ( ) |      <br>| |  |  _ `\ /'__`\   | |___ ( ) ( ) | |  /'__`\( '__)| | | |(`\/')<br>| |_ | | | |(  ___/   | (_, )| (_) | | | (  ___/| |   | (_) | &gt;  &lt; <br>`\__)(_) (_)`\____)   (____/'`\___/'(___)`\____)(_)   `\___/'(_/\_)<br>&gt;&gt;farukguler.com</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>After saving the changes, restart the SSH service for them to take effect. You can use the following commands:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart ssh<br>sudo systemctl restart sshd</strong><br><br><strong>sudo systemctl status ssh<br>sudo systemctl status sshd</strong><br><br>#Now SSH message banner is set on your server. When you next SSH session opens, your banner will be displayed to all your users.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Also, to apply Banner to Server Console and SSH interface with #Banner /etc/issue.net file:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You need to set the "banner path" in the SSH configuration file (sshd_config).</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo nano /etc/ssh/sshd_config</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>In the editor, look for the "Banner" parameter. If it is a comment line (starts with "#"), edit it as follows, removing the "#".</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong># Banner /etc/issue.net</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Below you will find sections where you can edit the two areas where you want to apply a banner.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#sudo nano /etc/issue.net (SSH Client)</strong><br>\S<br>Kernel \r on an \m<br><strong><br>sudo nano /etc/issue (Server Consolu)</strong><br>\S<br>Kernel \r on an \m<br><br><strong>+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+<br>                 farukguler.com<br>+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-+-++-+-+-+-+-+-+-+</strong><br>                 Host Name: \n<br>                 Time: \d \t<br>                 System IP address: \4<br>                 User Name: faruk<br>                 Location: Istanbul</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Ubuntu 22.04.2 LTS \n \l<br>   ____                       ______     _<br>  / __/__ _____  _____ ____  / ___(_)___(_)__<br> _\ \/ -_) __/ |/ / -_) __/ / (_ / / __/ (_-&lt;<br>/___/\__/_/  |___/\__/_/    \___/_/_/ /_/___/<br> &gt;&gt;&gt;Server Giris</strong><br> &gt;&gt;https://www.ascii-art-generator.org<br> &gt;&gt;https://www.coolgenerator.com/ascii-text-generator</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>After saving the changes, restart the SSH service for them to take effect. You can use the following commands:</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>sudo systemctl restart ssh
sudo systemctl restart sshd</strong>

<strong>sudo systemctl status ssh</strong>
<strong>sudo systemctl status sshd</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#You are ready<br>ssh user@server-ip<br>ssh faruk@10.5.x.x</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. – I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
