---
layout: post
title: Resetting the Sql Server Forgotten “SA” Password with 4 Different Methods
date: 2022-08-29 19:45
author: theguler
comments: true
categories: [Databases]
---
<!-- wp:image {"id":4204,"width":590,"height":311,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/reset-sql-sa.png?w=854" alt="" class="wp-image-4204" width="590" height="311" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bunlar; <strong>Windows Authentication,</strong> <strong>Single User Mode</strong>,  <strong>Command Line pass reset</strong> ve <strong>Dbatools powershell</strong> yöntemleridir. Hemen bu yöntemler üzerinden adım adım şifre değiştirmeyi nasıl gerçekleştireceğimize bakalım.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>These; <strong>Windows Authentication, Single User Mode,</strong> <strong>Command Line pass reset </strong>and <strong>Dbatools are powershell </strong>methods. Let's take a look at how to change the password step by step through these methods.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>1: Windows Authentication</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">- Open Sql Server Management Studio, from the login window that appears, select the Windows Authentication Option as below and say Connect

- After the connection is established, follow the steps below, and you will change the (SA) password. To briefly explain the steps of the screenshot below, we open the Server breakdown by clicking the + sign. We open the Security breakdown, then Login and double-click the sa user here, as seen in Step 4. Press the OK button and the process is complete.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>2: Single User Mode</strong> - <strong>Tek Kullanıcı Modu</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you have not activated Windows Authentication, you can also try this method. This method will be executed via Command Prompt. Run cmd(Command Line) tool as Administrator. Then follow the steps below in order.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$net stop MSSQLSERVER
$net start MSSQLSERVER -m”SQLCMD”

<strong>#Thus, we have switched to the sqlcmd tool. Run the command below while in sqlcmd, but replace the parts that say name and password with the username-password you want and run it, then type "GO" and run it.</strong>

$CREATE LOGIN name WITH PASSWORD=’password’
$SP_ADDSRVROLEMEMBER name,’SYSADMIN’
$exit
$net stop MSSQLSERVER &amp;&amp; net start MSSQLSERVER

<strong>#Now open Sql Server Management Studio and select the Windows Authentication option in step 1 as Sql Server Authentication and log in by entering your newly created username and password.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>3: Command Line pass reset - Komut Satırı şifre reset</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Again, we open the command line in <strong>"Administrator"</strong> mode and run the command below.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$osql -L

<strong>#Then run the command below, but write your own server name in the section that says server. for example my sql server name is DESKTOP-HYJS45</strong>

$OSQL -S DESKTOP-HYJS45 -E
$EXEC sp_password NULL, ‘password’, ’sa’
$exit

<strong>#If you run the above command directly (sa) your password will be "password".</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>4: Dbatools in powershell</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Dbatools is an open source powershell project. With this project, you can do your daily work in seconds. We will use the Reset-DbaAdmin function to solve this problem.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>First of all, you should add this project to your own computer as a module. If you have an internet connection, things are very easy, you can install this module with a single command. However, if you do not have an internet connection, you will first need to learn the location of your powershell modules from the environment path. You should copy and import the file you downloaded to one of those paths.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">$Invoke-Expression (Invoke-WebRequest https://dbatools.io/in)
<strong>#OR</strong>
$Install-Module dbatools

<strong>IF YOU DO NOT HAVE AN INTERNET CONNECTION:</strong>
https://github.com/sqlcollaborative/dbatools/archive/development.zip 
<strong>download the file here!</strong>

$env:PSMODULEPATH
<strong>#Run this command in powershell and open the zip you downloaded to one of those folders. I used this folder.</strong> (C:\ProgramFiles\WindowsPowershell\Module)

$Import-Module dbatools
$Reset-DbaAdmin -SqlInstance . –Login guleruser

<strong>#It will ask you for a password. You must provide a very strong password. Otherwise, you cannot connect to the system because the password criteria do not meet.
#It will automatically restart the service. You can connect to the system and see that the user "guler-user" has been created. Problem solved.</strong></pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Umarım faydalı olmuştur. - I hope it was useful.</strong></p>
<!-- /wp:paragraph -->
