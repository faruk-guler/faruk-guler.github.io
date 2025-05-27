---
layout: post
title: Apache Virtual Hosts Configuration Centos Stream 9
date: 2025-01-03 00:31
tags: [Apache]
author: theguler
comments: true
categories: [Web Servers]
---
<!-- wp:image {"id":13510,"width":"496px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/apache_multihost.jpg?w=1024" alt="" class="wp-image-13510" style="width:496px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Apache Virtual Hosts allows you to host multiple websites on a single server. By using virtual hosts, you can configure different domain names to point to different websites or web applications, all on the same physical machine. This is especially useful for web hosting companies or developers who need to manage multiple websites without needing additional servers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There are two<strong> (2) </strong>main types of virtual hosts in Apache: <strong>Name-Based </strong>and <strong>IP-Based</strong>. Name-based virtual hosts use the domain name to determine which website to serve, while IP-based virtual hosts use the server's IP address.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>***Our example is on Name-based Virtual Hosts.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Creating a directory framework:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The document root is the directory where website files for a domain are stored and served to clients. The document root can be stored in any location you want.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The example directory framework is shown here.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">/var/www/<br>├── <strong>farukguler.com</strong><br>│   └── public_html<br>├── <strong>digital-defender.eu</strong><br>│   └── public_html<br>├── <strong>linuxacademy.edu.gov</strong><br>│   └── public_html<br>├── <strong>windows-server.dev</strong><br>│   └── public_html</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>You must create a separate directory for each domain name that will be kept on the server.<br>Now let's create the root directory ve web files for the domain: farukguler.com</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">echo '192.168.5.111 www.farukguler.com' &gt;&gt; /etc/hosts <br>echo '192.168.5.111 www.example.com'&gt;&gt; /etc/hosts</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo mkdir -p /var/www/farukguler.com/public_html<br>sudo mkdir -p /var/www/example.com/public_html</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo nano /var/www/farukguler.com/public_html/index.html<br>sudo nano /var/www/example.com/public_html/index.html</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#locate: /var/www/farukguler.com/public_html/index.html</strong><br>&lt;!DOCTYPE html&gt;<br>&lt;html lang="en"&gt;<br>&lt;head&gt;<br>  &lt;meta charset="UTF-8"&gt;<br>  &lt;/style&gt;<br>&lt;/head&gt;<br>&lt;body&gt;<br>  &lt;h1&gt;farukguler.com&lt;/h1&gt;<br>  &lt;p&gt;Web sitemiz şu anda bakımdadır.&lt;/p&gt;<br> &lt;img src="https://www.ns-newelding.com/wp-content/uploads/2019/10/maintenance-of-industrial-plant-1080x630.jpg" width="700" height="400" alt="bakim"&gt;<br>&lt;/body&gt;<br>&lt;/html&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>If you want to change the ownership of the Apache HTTP Server's document root directory to the "apache" user, you can use the chown command. With this process, the <strong>"apache"</strong> user gains permission to read and write the document root directory and the files within it.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Give file ownership permissions to user "apache":</strong><br>sudo chown -R apache: /var/www/farukguler.com<br><br><strong>#Give everyone "Read" and "execute" access in your directory:</strong><br>sudo chmod -R 755 /var/www/farukguler.com<br><br><strong>#Check if there are any errors.</strong><br>httpd -t</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Apache Service config file</strong>:<br>cd /etc/httpd/conf<br>nano httpd.conf<br><br><strong>#farukguler.com config file:</strong><br>cd /etc/httpd/conf.d/<br>touch farukguler.com.conf<br>nano farukguler.com.conf<br><br><strong>***</strong>A virtual host file is a configuration file that determines how the Apache HTTP Server behaves for a particular website or domain. These files allow the server to manage multiple websites or applications on the same server. <strong>Create this file</strong>.</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#locate: /etc/httpd/conf.d/farukguler.conf</strong><br><br>&lt;VirtualHost *:80&gt;<br>    ServerName farukguler.com<br>    ServerAlias www.farukguler.com<br>    ServerAdmin webmaster@farukguler.com<br>    DocumentRoot /var/www/farukguler.com/public_html<br><br>    &lt;Directory /var/www/farukguler.com/public_html&gt;<br>        Options -Indexes +FollowSymLinks<br>        AllowOverride All<br>    &lt;/Directory&gt;<br><br>    ErrorLog /var/log/httpd/farukguler.com-error.log<br>    CustomLog /var/log/httpd/farukguler.com-access.log combined<br>&lt;/VirtualHost&gt;</pre>
<!-- /wp:preformatted -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li><strong>ServerName: </strong>The name of the domain in which the virtual host configuration will be used.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ServerAlias: </strong>All other domains, such as the subdomain in which the virtual host configuration will be used, are www.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>DocumentRoot: </strong>The directory where Apache serves domain files.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>Options: </strong>This directive controls server properties on a directory basis.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>-Indexes:</strong> Prevents index listings.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>FollowSymLinks: </strong>Tells the web server to follow symbolic links.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>AllowOverride: </strong>Specifies which directives declared in the file can override .htaccess configuration directives.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>ErrorLog, CustomLog: </strong>Specifies the location of the log files.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li><strong>.etc</strong></li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo apachectl configtest<br><strong>&gt;&gt;Syntax OK</strong><br>sudo systemctl restart httpd</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Check the syntax of Apache configuration files and restart the Apache service</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Firewalld Permissions</strong> (Allow: 80,43)</h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo firewall-cmd --permanent --zone=public --add-service=http<br>sudo firewall-cmd --permanent --zone=public --add-service=https<br>sudo firewall-cmd --reload<br>sudo firewall-cmd --list-ports</pre>
<!-- /wp:preformatted -->

<!-- wp:image {"id":13478,"width":"461px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/web_multi_virt.png?w=1023" alt="" class="wp-image-13478" style="width:461px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Summary:</strong><br>I explained how to configure Apache virtual host in CentOS 9. You can repeat these steps for all your other domain names.</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Additionally, it will be beneficial for you to secure your website with an SSL/TLS certificate.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>You need to configure dns records for all your domain names.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Wait! There is another way. <strong>/Faruk GULER</strong></p>
<!-- /wp:paragraph -->
