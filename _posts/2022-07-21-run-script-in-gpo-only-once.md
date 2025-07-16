---
layout: post
title: How to Run Script in GPO Only Once?
date: 2022-07-21 18:55
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":333,"width":414,"height":233,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-4-sdn.jpg?w=1024" alt="" class="wp-image-333" style="width:414px;height:233px" width="414" height="233" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>GPO login scripts allow you to run a BAT or PowerShell script at computer startup or user login/logout. In some cases, the administrator wants a particular script (command/program) to be run only once per user or computer and not run on subsequent logins.<br>You can use this by adding the following commands to your script.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Create the following BAT file ( teksefer.bat ) and save it under directory<strong> \\SYSVOL\sysvol\scripts\</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">@echo off
IF EXIST C:\Users\%UserName%\AppData\app_init.txt GOTO END
date /t &gt;&gt; C:\Users\%UserName%\AppData\app_init.txt
time /t &gt;&gt; C:\Users\%UserName%\AppData\app_init.txt
REM Put your code here, which will be executed once
:END

//my other commands
//hello word
//TheGuler!</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p>The script creates a small text file in the user's profile the first time it runs. The next time the script is run via the GPO, it checks if the file exists on a disk. If it exists, the script has already been executed and the code does not need to be rerun.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
