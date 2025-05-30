---
layout: post
title: Debian Linux Cheat Sheet IV [ RSYSLOG ]
date: 2024-03-09 11:41
author: theguler
comments: true
categories: [Debian]
---
<!-- wp:image {"id":10368,"width":"442px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/rss-1.jpg?w=1024" alt="" class="wp-image-10368" style="width:442px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>The rocket-fast Syslog Server</strong> [ RSYSLOG ]</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Syslog is a log management protocol used in UNIX-like operating systems and network devices. Creates, collects and distributes log messages. It usually contains information such as system events, error conditions and application logs. Syslog is used to collect, store and analyze log data through a central server.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Rsyslog Installation:</strong><br>sudo apt-get update<br>sudo apt-get install rsyslog<br><br><strong>#Conf. File:</strong><br>/etc/rsyslog.conf<br><br><strong>#<strong>Redirect of Log Files:</strong> Edit:</strong><br>*************************************************************<br><strong>#Writing system logs to /var/log/syslog file:</strong><br>auth,authpriv.*                 /var/log/auth.log<br><br><strong>#Redirecting "auth" and "authpriv" external logs to /var/log/syslog file:</strong><br>*.*;auth,authpriv.none          -/var/log/syslog<br><br><strong>#Sending logs to a remote syslog server:</strong><br>*.* @siemremote.guler.com:514<br><br><strong>#Redirecting All Logs to a Specific File:</strong><br>*.*                           /var/log/all.log<br><br><strong>#Redirecting Only SSH Logs to a Specific File:</strong><br>if $programname == 'sshd' then /var/log/sshd.log<br><br><strong>#Separating Only Logs for User Transactions:</strong><br>user.* /var/log/user.log<br>***************************************************************<br><br><strong># Directs "auth and authpriv" logs to a separate file.<br># Directs all logs except "auth and authpriv" to /var/log/syslog file.<br>#Also sends all logs to a specific remote syslog server.<br>#Redirects All Logs to a Specific File.<br>#Only redirects SSH Logs to a Specific File.<br>#Redirects user logs to /var/log/user.log file.</strong><br><br><strong>#System Log Files:</strong><br>/var/log<br>/var/log/syslog<br>/var/log/auth.log<br>...........<br><br><strong>#Real time log reading:</strong><br>sudo tail -f /var/log/syslog<br><br><strong>#The Service:</strong><br>sudo systemctl status rsyslog<br>sudo service rsyslog stop<br>sudo service rsyslog start<br>sudo service rsyslog restart<br>sudo systemctl enable rsyslog<br>#sudo systemctl disable rsyslog<br><br><strong>#Severity Level:</strong><br>0 <strong>Debug: </strong>Ayrıntılı hata ayıklama bilgileri.<br>1 <strong>Info: </strong>Bilgi amaçlı mesajlar.<br>2 <strong>Notice:</strong> Normal ama önemli koşullar.<br>3 <strong>Warning:</strong> Uyarı mesajları.<br>4 <strong>Error:</strong> Hata durumları.<br>5 <strong>Critical:</strong> Kritik hata durumları.<br>6 <strong>Alert:</strong> Anında dikkat gerektiren durumlar.<br>7 <strong>Emergency:</strong> Sistem çökmüş durumda.<br><br><strong>#Facility Code	Keyword	Description:</strong><br>0	<strong>kern</strong>	Kernel messages<br>1	<strong>user</strong>	User-level messages<br>2	<strong>mail</strong>	Mail system<br>3	<strong>daemon</strong>	System daemons<br>4	<strong>auth</strong>	Security/authentication messages<br>5	<strong>syslog</strong>	Messages generated internally by syslogd<br>6	<strong>lpr</strong>	Line printer subsystem<br>7	<strong>news</strong>	Network news subsystem<br>8	<strong>uucp</strong>	UUCP subsystem<br>9	<strong>cron</strong>	Cron subsystem<br>10	<strong>authpriv</strong>	Security/authentication messages<br>11	<strong>ftp</strong>	FTP daemon<br>12	<strong>ntp</strong>	NTP subsystem<br>13	<strong>security</strong>	Log audit<br>14	<strong>console</strong>	Log alert<br>15	<strong>solaris-cron</strong>	Scheduling daemon<br>16–23	<strong>local0 – local7</strong>	Locally used facilities</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Öğrenmeye aç kalın – Be hungry to learn</strong></p>
<!-- /wp:paragraph -->
