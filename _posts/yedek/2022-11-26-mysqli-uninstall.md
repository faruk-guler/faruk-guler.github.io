---
layout: post
title: Uninstall MYSQL on Ubuntu in the cleanest way!
date: 2022-11-26 19:59
author: theguler
comments: true
categories: [Databases]
---
<!-- wp:image {"id":5634,"width":"509px","height":"339px","sizeSlug":"large","linkDestination":"none","style":{"color":{"duotone":"unset"}}} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/mysql-removed.jpg?w=900" alt="" class="wp-image-5634" style="width:509px;height:339px" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>If #MySQL is running, you need to stop it using the following command.</strong><br>sudo systemctl stop mysql<br><br><strong>#You should also stop MySQL related daemons</strong><br>sudo killall -9 mysql<br>sudo killall -9 mysqld</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#If you have configured your MySQL, delete all directories and users for complete removal.</strong><br>sudo rm -rf /var/log/mysql<br>sudo rm -rf /etc/mysql<br>sudo rm -rf /usr/bin/mysql<br>sudo rm -rf /var/lib/mysql<br>sudo deluser -f mysql</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#MySQL Ubuntu packages start with "mysql-server", remove all these packages.</strong><br>sudo apt-get remove --purge mysql*<br>sudo apt-get purge mysql-server*</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Run the command below to uninstall #MySQL.</strong><br>sudo apt-get purge mysql*</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Run autoremove to remove all dependency packages installed by MySQL.</strong><br>sudo apt-get autoremove</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Deleting downloaded packages (from archive-repo)</strong><br>sudo apt-get autoclean</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Delete the database config file.</strong><br>sudo apt-get remove dbconfig-mysql</pre>
<!-- /wp:preformatted -->
