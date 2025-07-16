---
layout: post
title: PostgreSQL Tutorial
date: 2023-11-09 19:16
author: theguler
comments: true
categories: [Databases]
---
<!-- wp:image {"id":15370,"width":"385px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/elephants.jpg?w=1024" alt="" class="wp-image-15370" style="width:385px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>#PG Install &amp; Uninstall</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#PG Install</strong><br>sudo apt update<br>sudo apt install postgresql postgresql-contrib<br>#sudo apt install postgresql-14 postgresql-contrib-14<br><br><strong>#Pg Uninstall</strong><br>#sudo apt remove --purge postgresql postgresql-contrib<br>#sudo apt autoremove</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#PG Info:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">psql -V<br>/usr/lib/postgresql/15/bin/postgres -V<br>SELECT version();<br>pg_config --version<br>postgres --version<br>SHOW SERVER_VERSION;</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#PG Service Management:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">sudo systemctl enable postgresql<br>#sudo systemctl disable postgresql<br><br>sudo systemctl status postgresql<br>sudo systemctl start postgresql<br>sudo systemctl stop postgresql<br>sudo systemctl restart postgresql</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#PG DB DATA location:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">/var/lib/postgresql/&lt;version&gt;/main [Linux]<br>C:\Program Files\PostgreSQL\&lt;version&gt;\data [Win]</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Postgresql Configuration: Most Important [2] Files:</strong></h2>
<!-- /wp:heading -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Debian:</strong> /etc/postgresql/&lt;version&gt;/main/postgresql.conf<br><strong>RHEL:</strong> /var/lib/pgsql/&lt;version&gt;/data/postgresql.conf<br><strong>Windows:</strong> C:\Program Files\PostgreSQL\&lt;version&gt;\data\postgresql.conf<br><br><strong>-1 postgresql.conf:<br>-2 pg_hba.conf:</strong><br>&gt;&gt;systemctl restart postgresql<br>&gt;&gt;ss -tulpan | grep 5432<br><br><strong>#1 .postgresql.conf</strong><br>Control of performance, connection settings, security, logging, storage management, etc.<br><br><strong>#2 .pg_hba.conf [Host-Based Authentication]</strong><br>The user determines the IP address and authentication methods.</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>Getting Started with PostgreSQL:</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p><strong>#Connecting Postgresql:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">getent passwd postgres<br>sudo su postgres<br>sudo -u postgres psql<br>psql<br>#psql -h 192.168.5.50 -p 5432 -d Devs -U postgres [Remote Connections]</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Commands:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#List Roles:</strong><br>\du<br>select rolname from pg_roles;<br><br><strong>#List Schema:</strong><br>\dn<br><br><strong>#Create and Delete Role:</strong><br>CREATE ROLE new_role_name; [Create Role]<br>DROP ROLE role_name; [Delete Role]<br><br><strong>#Assigning Roles to User:</strong><br>GRANT DB_admins TO faruk;<br><br><strong>#Create &amp; Delete a User Role:</strong><br>CREATE USER: creates a user with login authority by default.<br>CREATE ROLE: creates a nologin user.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#PostgreSQL Authorization Management:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>PG access privileges are used to determine which operations users and roles can perform on specific database objects.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>-SELECT:</strong> Permission to read data in a table or view.<br><strong>-INSERT:</strong> Permission to add new data to a table.<br><strong>-UPDATE:</strong> Permission to change table data.<br><strong>-DELETE:</strong> Permission to delete data from a table.<br><strong>-TRUNCATE:</strong> Permission to quickly empty a table.<br><strong>-REFERENCES:</strong> Permission to use foreign keys.<br><strong>-TRIGGER:</strong> Permission to create triggers in a table.<br><strong>-CREATE:</strong> Permission to create a new schema or table.<br><strong>-CONNECT:</strong> Permission to connect to a database.<br><strong>-EXECUTE:</strong> Permission to run functions.<br><strong>-TEMPORARY:</strong> Permission to create temporary tables.<br><strong>-USAGE:</strong> Permission to access schemas or data types.<br><strong>-ALL PRIVILEGES:</strong> Covers all privileges, provides full access.<br><br><strong>#Privileges:</strong><br>*GRANT ALL PRIVILEGES ON DATABASE Devs TO faruk;<br>*REVOKE ALL PRIVILEGES ON DATABASE Devs FROM faruk;<br>*----------</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#User Attributes:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>LOGIN<br>SUPERUSER<br>CREATEDB<br>CREATEROLE<br>REPLICATION LOGIN<br>PASSWORD<br>INHERIT</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#VACUUM:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">SHOW autovacuum;<br><br>#VACUUM; [Normal]<br>#VACUUM FULL; [Full]</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Index:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">--------------</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Clustering, Replication, HA:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Database Cluster:</strong> One or more databases on the same PostgreSQL server.<br><strong>Redundant Cluster:</strong> Structure where multiple servers work together.<br><br><strong>#PG Replication Management:</strong><br>-Logical Replication<br>-Streaming Replication<br>-Failover<br>-Load Balancing<br>-Automatic Switchover<br>-Cascade Replication<br>-Patroni<br>-Barman<br>-PgLoader<br>-Repmanager<br>-Pgpool<br>-PAF<br>-PgBouncer<br>-PgPool-II<br>-Postgresql Citus<br>-Postgres-XL<br>-Bucardo<br>---------</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Locking:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">-----------</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Tuning:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://pgtune.sainth.de<br>https://pgtune.leopard.in.ua<br>https://postgresqlco.nf</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Monitoring</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">-ELK<br>-Pgwatch<br>-Pg_activity<br>-Zabbix<br>-PostgreSQL AWR<br>-Grafana</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Backup and Restore:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>*Explained in a different article.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#PostgreSQL WAL: (Write-Ahead Logging)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">/var/lib/postgresql/&lt;version&gt;/main/pg_wal</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#REPORTING AND LOGGING:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">/var/log/postgresql/<br>sudo tail -f /var/log/postgresql/postgresql-*.log</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Required Downloads:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://www.pgadmin.org/download<br>https://www.postgresqltutorial.com/wp-content/uploads/2019/05/dvdrental.zip<br>https://sourceforge.net/projects/dvd-rental/files/DVDRentalSource.zip/download</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>#Docs:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://tubitak-bilgem-yte.github.io/pg-yonetici<br>https://berkanyiildirim.github.io/pg-yonetici<br>https://cheatsheets.zip/postgres<br>https://quickref.me/postgres<br>https://gist.github.com/Kartones/dd3ff5ec5ea238d4c546<br>https://gist.github.com/apolloclark/ea5466d5929e63043dcf</pre>
<!-- /wp:preformatted -->
