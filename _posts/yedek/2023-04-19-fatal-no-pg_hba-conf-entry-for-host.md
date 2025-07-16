---
layout: post
title: FATAL no pg_hba.conf entry for host "", user "postgres", database "postgres", no encryption
date: 2023-04-19 20:45
author: theguler
comments: true
categories: [Databases]
tags: [DB]
---
<!-- wp:image {"id":14423,"width":"326px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/veritabanlarini-tutan-bir-fil-ciz.png?w=625" alt="" class="wp-image-14423" style="width:326px;height:auto" /></figure>
<!-- /wp:image -->

Remote connection errors are usually related to PostgreSQL permission settings.
It is important to carefully review these connection permissions.

After installing PostgreSQL, you should make the necessary configurations:
- **Firewall Rules**: Make sure the port that PostgreSQL is listening on (usually `5432`) is open.
- **Network Connections**: Set which IP addresses can connect in the `pg_hba.conf` file.
- **User Roles/Permissions**: Make sure that the users who will be connecting have sufficient permissions.

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>------Linux:</strong><br><strong>File: </strong>/etc/postgresql/10/main/pg_hba.conf<br><strong># TYPE  DATABASE        USER            ADDRESS                 METHOD</strong><br>host  all  all 0.0.0.0/0 md5<br>host  marketdb faruk  0.0.0.0/0 md5 <strong>(spesific ip, user etc.)</strong><br><br><strong>File:</strong> /etc/postgresql/12/main/postgresql.conf<br>listen_addresses = '*'<br><br><strong>Firewall Rules:</strong><br>ss -nlp | grep 5432<br>ufw status verbose<br>sudo ufw allow 5432<br><br><strong>------Windows:</strong><br><strong>File:</strong> C:\Program Files\PostgreSQL\xxxxx\data\pg_hba.conf<br><strong># TYPE  DATABASE        USER            ADDRESS                 METHOD</strong><br>host  all  all 0.0.0.0/0 md5<br>host  marketdb faruk  0.0.0.0/0 md5 <strong>(spesific ip, user etc.)</strong><br><br><strong>File:</strong> C:\Program Files\PostgreSQL\xxxxx\data\postgresql.conf<br>listen_addresses = <strong>'*'</strong><br><br><strong>Firewall Rules:</strong><br>netstat -a | grep 5432<br>Windows Firewall -&gt; Advanced Settings -&gt; New Rule:<br><br><strong>#Default '</strong>postgres<strong>' user password change</strong>:<br>sudo -u postgres psql<br>ALTER USER postgres WITH PASSWORD 'passwd12345';<br>\q<br><br><strong>#PostgreSQL Users Perm Configuration:</strong> [*for SUPERUSER]<br>\du<br>\l+<br>ALTER USER postgres WITH SUPERUSER;<br>ALTER USER faruk WITH SUPERUSER;<br><br><strong>#Service restart:</strong><br>systemctl restart postgresql <strong>[Linux]</strong><br>service postgresql restart <strong>[Windows]</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>Wait! there is another more way</p>
<!-- /wp:paragraph -->
