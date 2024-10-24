---
layout: post
title: Windows Server 2019 Print Service Installation and Configuration
date: 2022-05-15 12:16
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":5291,"width":575,"height":323,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/win2019printserver.jpg?w=1024" alt="" class="wp-image-5291" width="575" height="323" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>First of all, if I need to briefly talk about what <strong>Print Server </strong>is and what it does,<br><strong>Print Server </strong>is a service that allows you to use printers without a physical connection between the printers and your PCs in a network where there are many printers on the service.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>There are (2) two main types of Printers on the market:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5294,"width":441,"height":207,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/printer_two.jpg?w=936" alt="" class="wp-image-5294" width="441" height="207" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>A) </strong>Wired<br><strong>B) </strong>Wireless</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Print and Document Services Installation</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>We start the Printer Server configuration process with the installation o<strong>f Print and Document Services</strong> on the Windows Server 2019 system. In Windows Server 2019, you can setup the Print Server service from the Dashboard console on Server Manager.<br>We choose Add roles and Features from the Windows Server Manager page.<br>After selecting the Print and Document Services role from the <strong>Server Roles page</strong>, continue on <strong>Add Features</strong> from the screen that appears.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5297,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ps_adder.png?w=928" alt="" class="wp-image-5297" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5267,"width":501,"height":353,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/print-roles.png?w=797" alt="" class="wp-image-5267" width="501" height="353" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Print Server:</strong> is the main print service.<br><strong>Distributed Scan Server: </strong>Allows you to collect and manage your scanned documents on the network.<br><strong>Internet Printing: </strong>Allows clients to use print service from remote locations thanks to the Browser.<br><strong>LPD(line printer deamon) Service: </strong>Allows Unix/Linux systems to use the printer service.<br></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5262,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/print_local.png?w=1024" alt="" class="wp-image-5262" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>All Printers:</strong> Shows all printers.<br><strong>All Drivers: </strong>We can see all the printer drivers installed on the server.<br><strong>Forms: </strong>Imports custom page formats and color profiles.<br><strong>Ports:</strong> It shows the existing ports and the IP addresses of the printers we have added/will add.<br><strong>Deployed Printers</strong>: Shows the printers you have deployed with the GPO.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Next, let's talk about the options we encounter on any printer.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5264,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/fronted.png?w=983" alt="" class="wp-image-5264" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Open Printer Queue: </strong>Shows the sequential jobs of the printer.<br>Pause Printing: Stops all output activity of the printer.<br><strong>Deploy with Group Policy:</strong> Using this option, we can distribute printers with GPO to clients in our Active Directory structure.<br><strong>Set Printing Defaults: </strong>This is where we can check or make changes to the default settings of the selected printer.<br><strong>List in Directory: </strong>Used to add the printer to the active directory.<br><strong>Manage Sharing:</strong> This is where we can make sharing settings.<br><strong>Print Test Page: </strong>It is the area where we print the test page to test the printer we have installed.<br><strong>Enable Branch Office Direct Printing:</strong> Enables direct printing.<br><strong>Properties: </strong>This is the section where we can access the printer properties.<br><strong>Delete and Rename: </strong>we can change the name of the printer or delete it completely.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>What are the printer connection types?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5277,"width":552,"height":309,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/printer-connections.jpg?w=849" alt="" class="wp-image-5277" width="552" height="309" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Ethernet: </strong>Printers with a network card use this connection type. Ethernet technology provides faster and more stable output by using TCP/IP protocol.<br>Large institutions with a high number of users and printer usage prefer this connection type.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Universal Serial Bus (USB):</strong><br>It is the most used connection type along with Ethernet. With the latest version of USB 3.0, it has been announced that it reaches a speed of 4.8 Gbit / s. With its Plug and Play feature, it has become the standard connection method not only for printers but also for many other external hardware units.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Serial Communication (Serial Port):</strong><br>Serial ports get their name from the fact that data is sent from the port in a serial format (1 bit at a time). They are also called COM ports.<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Parallel Port (LPT):</strong><br>Parallel ports are also known as LPT (LinePrinter) ports. This name is given because the data is transmitted in parallel (1 byte at a time) from the port. It is much faster than the serial port. It uses the port named DB25.<br></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FireWire IEEE 1394:</strong><br>Apple Computer Inc. Developed by It is used in large printers that we call pointers.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>After the printer connection types, we can now move on to adding a printer.</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5271,"width":543,"height":342,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/add_pinters.png?w=939" alt="" class="wp-image-5271" width="543" height="342" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Search the network for printers:</strong> We can find the printers that exist in the network by scanning.<br><strong>Add a TCP/IP or Web Services Printer by IP address or hostname:</strong> It allows us to find the IP address or hostname of a printer on the network.<br><strong>Add a new printer using an existing port: </strong>Allows adding a printer over existing ports.<br><strong>Create a new port and add a new printer: </strong>You can choose one of the TCP/IP ports.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>By saying “Add a TCP/IP or Web Services Printer by IP address or hostname”, I will install over the IP address that I have given to the printer before. <strong>"My Printer IP:10.5.8.153"</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Let's fix the ip addresses of the printers in your network, you have to do this from the interface panel of each printer itself, DHCP is not recommended for printers.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5279,"width":501,"height":391,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ip_add.png?w=709" alt="" class="wp-image-5279" width="501" height="391" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5280,"width":518,"height":413,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ip_adder.png?w=691" alt="" class="wp-image-5280" width="518" height="413" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>If our server can contact the printer, it will automatically detect the model and driver of the printer (if the driver is in the Microsoft catalog).<br>But if it cannot make contact or if the driver we need is not in the Microsoft catalog, we have to intervene.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>By saying “Use an existing printer driver on the computer”, you can show one of the drivers that we have installed on the server before, or by saying “Add driver” you can import the driver from the Microsoft catalog or from outside.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5283,"width":749,"height":335,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/driver_import.png?w=1024" alt="" class="wp-image-5283" width="749" height="335" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>As you can see, the printer named <strong>"Kat3_Renkli CANON"</strong> has been installed.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5285,"width":621,"height":422,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/canon.png?w=1024" alt="" class="wp-image-5285" width="621" height="422" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Deploy with Group Policy (GPO) For Print Services</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5290,"width":361,"height":200,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/gpo_deployed.jpg?w=1024" alt="" class="wp-image-5290" width="361" height="200" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You can use Group Policies (GPOs) to bind shared printers to specific users, computers, and groups in an Active Directory domain. In this article, we will look at how to automatically connect a shared printer for a domain user when they log on to a Windows computer.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Edit the GPO and browse to<strong> Computer Configuration &gt; Preferences &gt; Control Panel Settings &gt; Printers</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5609,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/printerpgo.png?w=1024" alt="" class="wp-image-5609" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5618,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/ip-add.png?w=1024" alt="" class="wp-image-5618" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":5611,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/gpo-add.png?w=1024" alt="" class="wp-image-5611" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>"kat_3_printers"</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>You must create a security group named "kat_3_printers".</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Next, let's add the <strong>computers</strong> to which we want to distribute our printer to this security group.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5614,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/computers.png?w=961" alt="" class="wp-image-5614" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Check the box “Run in logged-on user’s security context (user policy option)</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Select item-level targeting and select the security group <strong>"kat_3_printers"</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5617,"width":755,"height":308,"sizeSlug":"large","linkDestination":"none","className":"is-style-default"} -->
<figure class="wp-block-image size-large is-resized is-style-default"><img src="https://farukguler.com/assets/post_images/son-printers.png?w=1024" alt="" class="wp-image-5617" width="755" height="308" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Run the <strong>gpupdate /force</strong> command and restart your computer.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5620,"width":511,"height":396,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/printer-son.png?w=824" alt="" class="wp-image-5620" width="511" height="396" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
