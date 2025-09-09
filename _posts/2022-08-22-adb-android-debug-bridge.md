---
layout: post
title: What is FastBoot and ADB (Android Debug Bridge)
date: 2022-08-22 10:39
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:gallery {"linkTo":"none"} -->
<figure class="wp-block-gallery has-nested-images columns-default is-cropped"><!-- wp:image {"id":4149,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/adb-1.jpg?w=1024" alt="" class="wp-image-4149" /></figure>
<!-- /wp:image -->

<!-- wp:image {"id":4150,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/fastboot-1.jpg?w=780" alt="" class="wp-image-4150" /></figure>
<!-- /wp:image --></figure>
<!-- /wp:gallery -->

<!-- wp:paragraph -->
<p><strong>1)</strong> <strong>ADB</strong>; is a versatile command line tool that lets you communicate with an Android device. It has functions such as ADB commands, application installation, debugging, taking screenshots from the device. You can also transfer files bidirectionally via ADB.<br>It can also perform many other actions, such as installing a custom ROM (replacing the manufacturer's Android).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Client: </strong>The client runs on your development machine. You can invoke the client from terminal with ADB commands.<br><strong>ADBD (Service):</strong> A daemon that runs commands on the device.<br><strong>Client (Server): </strong>Manages the communication between the client and the background program.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>2)</strong> <strong>Fastboot</strong>; is a menu used on Android devices. Through this menu, you can reinstall the Android operating system on your Android device and perform the boot operations. It is a menu that is generally used to install Rom on the phone. In addition to the official version via Fastboot, you can use the Beta versions opened for developers by installing them on your device.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>How ADB Works?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4106,"width":600,"height":313,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/adb-android.jpg?w=1024" alt="" class="wp-image-4106" width="600" height="313" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><br>When you start ADB, the client first checks to see if there is a running ADB server process. If not, the server starts the process. When the server first starts, it connects to 'local' TCP port 5037 and listens for requests from the client. All clients use port 5037 to communicate with the server.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Then the server connects with all running devices and the first 16 devices establish ports with odd numbers in the range of 5555 to 5585. Note that every emulator links with an even number.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For example;<br>Emulator 1, console : 5554<br>Emulator 1, adb : 5555<br>Emulator 2, console : 5556<br>Emulator 2, adb : 5557<br>…………...<br>……….</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If the server has successfully connected to all devices, you can access them using adb commands. You can control it from any client or script.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>A) How to Install ADB ?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>How to turn on USB Debugging?</strong><br><strong>Step #1: </strong>Enter Settings,<br><strong>Step #2: </strong>Enter the system partition,<br><strong>Step #3:</strong> Go to About phone section,<br><strong>Step #4:</strong> Tap the Build number line 4 times in a row,<br>"You are now a developer" will appear on the screen.<br><strong>Step #5:</strong> Go back to Settings,<br><strong>Step #6:</strong> Tap on the Developer Options line,<br><strong>Step #7:</strong> You can turn “USB Debugging” on or off on the bottom line,<br>If you're not a developer, we recommend keeping it turned off.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>B)</strong> <strong>ADB setup and setup for Windows</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>#Adb driver download links are at the end of the article</strong>.<br>-Download the ADB ZIP file for Windows<br>-Extract the contents of this ZIP file to a folder<br>-Enter the extracted file<br>-Then, hold down Shift and right-click here and click "open command system here"<br>-Connect your phone or tablet to your computer with a USB cable<br>-Change your USB mode to file transfer mode (Some phones may want it, some don't)<br>-To see the devices that start ADB in the background, type the "adb devices" command in the command prompt we opened<br>-A warning will appear on the screen of your phone as allow or not to allow USB Debugging mode.<br>-Finally, enter the "adb devices" command again and you will see the device name or ip address</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>C)</strong> <strong>Installation (for Linux devices)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Extract the zip content on your desktop. Open a command prompt or terminal.<br>-Now go to the folder where you extracted the ADB content and enter the following command:<br>cd /path/to/extracted/folder/<br>-Now you need to connect your phone to your Linux PC.<br>-Finally, enter the following command to check the connection between your Phone and Mac PC<br>"adb devices"</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>D)</strong> <strong>ADB setup and setup for macOS</strong><br>-Download the ADB ZIP file for macOS<br>-Extract the contents of this ZIP file to a folder<br>-Open the terminal,<br>-Go to the location where you extracted the ADB example; cd/Users/Theguler/Desktop/adb-tools<br>-Connect your phone or tablet to your computer with a USB cable<br>-Enable file transfer mode (MTP)<br>-A warning will appear on your phone's screen as allow or disallow USB Debugging mode.<br>-Finally, enter the "adb devices" command again and you will see the device name or ip address</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>E) Connecting to a device via Wi-Fi using ADB:</strong><br>ADB usually communicates with the device via USB, but you can also use adb over Wi-Fi after the initial setup via USB as below.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Setup to use with ADB Wi-Fi:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Connect your Android device and your device using ADB to the same wireless network.<br>-Connect the device to the device you are using ADB with a USB cable<br>-Set the target device to listen for a TCP/IP connection on port 5555 by saying adb tcpip 5555</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Disconnect the USB cable from the target device<br>-See the IP address of your device by saying Settings&gt;Wifi Settings&gt;Advanced Connect to the device with IP address "adb connect device_ip_address"<br>-You can use the adb devices command to see if it is connected.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>ALL ADB and FastBoot Commands:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#<strong>ADB Debugging</strong>
<strong>adb devices</strong> :Displays the list of connected devices.
<strong>adb devices </strong>-l :detailed
<strong>adb forward --list</strong> :Lists all socket connections.
<strong>adb forward tcp:xxxx tcp:yyyy </strong>:xxxx allows port forwarding to yyyy.
<strong>adb kill-server </strong>:Kills the server process.

<strong>#Wireless</strong>
<strong>adb connect </strong>:It is used to establish a connection with the target device.
<strong>adb tcpip 5555</strong> :Sets the target device to listen for a TCP/IP connection on port 5555.
<strong>adb connect 192.168.xx.xxx</strong> :Connects to a device over Wi-Fi.
<strong>adb devices</strong> :Lists all devices connected to ADB.
<strong>adb usb</strong> :Reboots in usb mode

<strong>#Package Manager</strong>
<strong>adb install</strong> :Used to install on the target device.
<strong>adb install test.apk</strong> :You can transfer and install a single package.
<strong>adb install-multiple test.apk test2.apk</strong> :You can transfer and install multiple apks.
<strong>adb install-multi-package test.apk demo.apk</strong> :You can transfer multiple apks to the device and install them atomically.
<strong>adb install -r test.apk</strong> :You can reinstall the application while preserving the existing data.
<strong>adb install -t test.apk </strong>:You can allow test packages. (only for debuggable packages)
<strong>adb install -d test.apk </strong>:Allows version code to downgrade (For debuggable packages only)
<strong>adb install -g test.apk </strong>:Grant all runtime permissions ( Grant all permissions listed in the app manifest.
<strong>adb install --instant test.apk</strong> :Allows the application to be installed as a temporary install.
<strong>adb install --fastdeploy test.apk</strong> :It causes fast installation.
<strong>adb install --no-streaming test.apk</strong> :Allows installing the apk by always calling the package manager as separate steps.

<strong>#ADB uninstall, shell and pm commands</strong>

<strong>adb uninstall test.apk </strong>:It is used to delete test.apk from the device
<strong>adb unistall -k test.apk</strong> :Stores the data in the cache, then performs deletion.
<strong>adb shell pm list packages</strong> :Lists all packages
<strong>adb shell pm list packages </strong>-f :Related packages are listed
<strong>adb shell pm list packages -a</strong> :All known packages are listed (except APEXs)
<strong>adb shell pm list packages –apex—only</strong> :Lists only APEX packages
<strong>adb shell pm list packages -d </strong>:Lists only disabled packages
<strong>adb shell pm list packages -e</strong> :Lists only active packages
<strong>adb shell pm list packages -s </strong>:Lists only system packages
<strong>adb shell pm list packages -3</strong> :Lists only third-party packages
<strong>adb shell pm list packages -i </strong>:Shows installation files only.
<strong>adb shell pm list packages -U </strong>:Show package Uid
<strong>adb shell pm list packages -u</strong> :Include uninstalled packages
<strong>adb shell pm list packages –show-versioncode</strong> :For Version version
<strong>adb shell pm list packages –uid UID</strong> :Shows only packages with this uid
<strong>adb shell pm list packages -user USER_ID</strong> :Shows subpackages with the specified id
<strong>adb shell pm path com.android.chrome</strong> :Print the name of the apk path of the installed package name
<strong>adb shell pm clear com.test.abc </strong>:Deletes all data associated with the package.

<strong>#File Manager</strong>
<strong>adb pull/mny/sdcard/Download/test.apk pc.apk</strong> :Copy files from your Android device
<strong>adb push pc.apk mnt/sdcard/Download/test.apk</strong> :Allows you to copy files from your local device to your Android device
<strong>adb shell ls /system/bin </strong>:Lists file paths and files
<strong>adb shell ls -a </strong>:Lists all confidential files
<strong>adb shell ls -d </strong>:Lists file paths only
<strong>adb shell ls -R mntsdcard/Download </strong>:Recursive subfolders lists
<strong>adb shell cd /mnt/sdcard/Download</strong> :You change the file path
<strong>adb shell rm /mnt/sdcard/Download/test.apk</strong> :rm is a command line utility for removing files, directories and symlinks
<strong>adb shell rm -f /mnt/sdcard/Download/test.apk</strong> :Forcibly removes without confirmation.
<strong>adb shell rm -i /mnt/sdcard/Download/test.apk </strong>:Uninstall process with confirmation.
<strong>adb shell rm -rR /mnt/sdcard/Download </strong>:Recursively removes the directory.
<strong>adb shell rm -v /mnt/sdcardDownload/test.apk</strong> :It provides information and removes it.
mkdir /sdcard/tmp :Used to create a directory.
<strong>mkdir -m 777 sdcard/tmp set permission mode</strong> :Creates a directory by specifying permissions.
<strong>mkdir -p sdcardtmp/sub1/sub2 create parent directories as needed </strong>:Creates the necessary directory structure and creates the directory.
<strong>adb shell touch mntsdcard/Download/test.txt</strong> :Used to generate timestamps of a file.
<strong>adb shell pw</strong>d :It is used to change the password.
<strong>cp sdcard/test.txt sdcard/demo.txt</strong> :used to copy the file.
<strong>adb shell mv mnt/sdcard/Download/test.txt</strong> <strong>mnt/sdcard/DCIM/test.txt</strong> :Used to move files and directories from one place to another.
<strong>adb shell mv -f mnt/sdcard/Download/test.txt mnt/sdcard/DCIM/test.txt</strong> :Moves the desired file to the desired directory and deletes the file from the old directory.
<strong>adb shell mv -i /mnt/sdcard/Download/test.txt /mnt/sdcard/DCIM/test.tx</strong>t :Gives a warning if there is a file with the same name in the directory to be moved.
<strong>adb shell mv -n /mnt/sdcard/Download/test.txt /mnt/sdcard/DCIM/test.txt</strong> :If there is a file with the same name in the directory to be moved, it will not overwrite.

<strong>#Fastboot commands</strong>
<strong>fastboot devices </strong>: Shows connected devices on your PC/laptop
<strong>fastboot reboot </strong>: To reboot your device
<strong>fastboot reboot recovery</strong> : To put your device into recovery mode
<strong>fastboot oem device-info </strong>:To check bootloader unlock status:
<strong>fastboot oem unlock </strong>: If the above command doesn't work, run the following to unlock the bootloader
<strong>fastboot flashing unlock </strong>: A few OEMs can use this command to unlock the bootloader
<strong>fastboot flashing unlock_critical </strong>:Allow bootloader related partitions to be flashed as well:
<strong>fastboot oem device-info</strong> :check bootloader unlock

<strong>fastboot flash recovery [recovery.img]</strong> : To flash the recovery process on your device
<strong>fastboot boot [boot.img] :</strong> To test recovery without flashing permanently
<strong>fastboot format:ext4 userdata </strong>:To format the data partition
<strong>fastboot flash boot [boot img name] </strong>: flash flashable boot.img with fastboot mode
<strong>fastboot getvar cid </strong>: Check the phone's display CID

<strong>#Flashing ROM with Fastboot ROM zip pack</strong>
<strong>fastboot -w</strong>
<strong>fastboot update &lt;ROM's location line.zip&gt; </strong>: Erases device and flashes flash.zip

<strong>#ADB errors: Common error messages and solutions</strong>

<strong>Command Not Found:</strong> You made a mistake or the command is not yet available in your version of ADB. Check the command with the help of adb or update to a newer ADB version.

<strong>No Device:</strong> Your USB cable is not connected properly, the ADB interface on your phone is not working or your computer does not recognize your smartphone. Try using a different USB port, another cable, enable USB debugging, check drivers, computer and reboot your device.

<strong>Server is out of date:</strong> ADB Tools on your computer and Android version on your smartphone must be compatible. If they don't, this error occurs. Update your ADB Tools version.

<strong>Waiting for device: </strong>This error is largely the same as the No Device error. Your computer does not recognize your smartphone.</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Fastboot menu key combinations for each brand:</strong>

<strong>Samsung:</strong>
Power button, Volume down and Home

<strong>HTC:</strong>
Power button and volume down
<strong>LG:</strong>
Press and hold the "phone up" and "volume up" buttons at the same time. Do not forget to connect the USB cable from the phone to the computer while doing this.
<strong>Huawei:</strong>
  Press and hold the "volume down" and "volume up" keys at the same time. On some Huawei phones they are the "phone up" and "volume down" keys
<strong>Xiaomi:</strong>
Press “volume up” and “Power” at the same time. On some Xiaomi phone models, they are the "Power" and "volume down and up" keys.</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Is it safe to leave USB Debugging mode on?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4121,"width":549,"height":309,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/hhh.webp?w=770" alt="" class="wp-image-4121" width="549" height="309" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>USB Debugging, which enables the connection of Android devices with computers and is the companion of developers, is an option that is recommended to be turned off if not needed. Enabling USB Debugging leaves your Android device vulnerable to many dangers. Even charging your device in a public area with this feature turned on is a problem for your device. When a malicious user takes over your device, if the USB Debugging feature is active, they can access the device without the need for any PIN.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>If you do not constantly connect your Android device to your computer or do not have a routine operation with USB Debugging, we recommend leaving this setting off. Thus, you will take the right move to protect your device.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>What can be done with USB Debugging?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>With USB Debugging, you can speed up the application development process, use advanced commands and Root your device by connecting your Android device to a computer. In addition to all this, you can also use USB Debugging to send ADB (Android Debug Bridge) commands to your Android device. In this way, you can install an APK file on the computer to the device and even perform a recovery of a device that does not work.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Adb driver and <strong>Fastboot</strong></strong> <strong>download Links:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Windows:</strong> https://adbdriver.com/downloads/</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Linux:</strong> https://dl.google.com/android/repository/platform-tools_r30.0.5-linux.zip</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Mac/OS:</strong> https://dl.google.com/android/repository/platform-tools_r33.0.2-darwin.zip</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Minimal ADB and Fastboot</strong>:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4135,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/minimal-adb-fastboot.png?w=659" alt="" class="wp-image-4135" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Minimal ADB and Fastboot Tool is a small utility created by shimp208 (xda developer) that allows you to install the latest version of adb and fastboot files on your computer without needing to install the whole android sdk package.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Features of Minimal ADB and Fastboot Tool<br><strong>Lightness :</strong> The total installation of Minimal ADB and Fastboot tool is only 2mb (for those who don't know, the android sdk package is more than 500mb).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Installer :</strong> You don't need to do manual action for minimal adb and fastboot tool, just run setup and it will install files in C: Program Files/Minimal ADB and Fastboot folder.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Quick Installation :</strong> It takes a few seconds to install on the computer as the minimum adb and fastboot installation package is almost 2mb</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Download link: <a href="https://xiaomitools.com/minimal-adb-and-fastboot">https://xiaomitools.com/minimal-adb-and-fastboot</a></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best regards</strong></p>
<!-- /wp:paragraph -->
