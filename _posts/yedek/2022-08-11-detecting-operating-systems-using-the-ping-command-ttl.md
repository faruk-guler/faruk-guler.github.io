---
layout: post
title: Detecting Operating Systems Using the Ping Command [TTL]
date: 2022-08-11 22:02
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":2148,"width":449,"height":252,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" width="449" height="252" /></figure>
<!-- /wp:image -->

<table>
<tbody>
<tr>
<td><strong>Device/OS</strong></td>
<td><strong>Version</strong></td>
<td><strong>Protocol</strong></td>
<td><strong>TTL</strong></td>
</tr>
<tr>
<td><strong>AIX</strong></td>
<td>&nbsp;</td>
<td><strong>TCP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>AIX</strong></td>
<td>&nbsp;</td>
<td><strong>UDP</strong></td>
<td><strong>30</strong></td>
</tr>
<tr>
<td><strong>AIX</strong></td>
<td><strong>3.2, 4.1</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>BSDI</strong></td>
<td><strong>BSD/OS 3.1 and 4.0</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>Compa</strong></td>
<td><strong>Tru64 v5.0</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>Cisco</strong></td>
<td>&nbsp;</td>
<td><strong>ICMP</strong></td>
<td><strong>254</strong></td>
</tr>
<tr>
<td><strong>DEC Pathworks</strong></td>
<td><strong>V5</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>30</strong></td>
</tr>
<tr>
<td><strong>Foundry</strong></td>
<td>&nbsp;</td>
<td><strong>ICMP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>FreeBSD</strong></td>
<td><strong>2.1R</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>FreeBSD</strong></td>
<td><strong>3.4, 4.0</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>FreeBSD</strong></td>
<td><strong>5</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>HP-UX</strong></td>
<td><strong>9.0x</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>30</strong></td>
</tr>
<tr>
<td><strong>HP-UX</strong></td>
<td><strong>10.01</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>HP-UX</strong></td>
<td><strong>10.2</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>HP-UX</strong></td>
<td><strong>11</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>HP-UX</strong></td>
<td><strong>11</strong></td>
<td><strong>TCP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>Irix</strong></td>
<td><strong>5.3</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>Irix</strong></td>
<td><strong>6.x</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>Irix</strong></td>
<td><strong>6.5.3, 6.5.8</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>juniper</strong></td>
<td>&nbsp;</td>
<td><strong>ICMP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>MPE/IX (HP)</strong></td>
<td>&nbsp;</td>
<td><strong>ICMP</strong></td>
<td><strong>200</strong></td>
</tr>
<tr>
<td><strong>Linux</strong></td>
<td><strong>2.0.x kernel</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>Linux</strong></td>
<td><strong>2.2.14 kernel</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>Linux</strong></td>
<td><strong>2.4 kernel</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>Linux</strong></td>
<td><strong>Red Hat 9</strong></td>
<td><strong>ICMP and TCP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>MacOS/MacTCP</strong></td>
<td><strong>2.0.x</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>MacOS/MacTCP</strong></td>
<td><strong>X (10.5.6)</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>NetBSD</strong></td>
<td>&nbsp;</td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>Netgear FVG318</strong></td>
<td>&nbsp;</td>
<td><strong>ICMP and UDP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>OpenBSD</strong></td>
<td><strong>2.6 &amp; 2.7</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>OpenVMS</strong></td>
<td><strong>07.01.2002</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>OS/2</strong></td>
<td><strong>TCP/IP 3.0</strong></td>
<td>&nbsp;</td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>OSF/1</strong></td>
<td><strong>V3.2A</strong></td>
<td><strong>TCP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>OSF/1</strong></td>
<td><strong>V3.2A</strong></td>
<td><strong>UDP</strong></td>
<td><strong>30</strong></td>
</tr>
<tr>
<td><strong>Solaris</strong></td>
<td><strong>2.5.1, 2.6, 2.7, 2.8</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>Solaris</strong></td>
<td><strong>2.8</strong></td>
<td><strong>TCP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>Stratus</strong></td>
<td><strong>TCP_OS</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>Stratus</strong></td>
<td><strong>TCP_OS (14.2-)</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>30</strong></td>
</tr>
<tr>
<td><strong>Stratus</strong></td>
<td><strong>TCP_OS (14.3+)</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>Stratus</strong></td>
<td><strong>STCP</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>SunOS</strong></td>
<td><strong>4.1.3/4.1.4</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>SunOS</strong></td>
<td><strong>5.7</strong></td>
<td><strong>ICMP and TCP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>Ultrix</strong></td>
<td><strong>V4.1/V4.2A</strong></td>
<td><strong>TCP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>Ultrix</strong></td>
<td><strong>V4.1/V4.2A</strong></td>
<td><strong>UDP</strong></td>
<td><strong>30</strong></td>
</tr>
<tr>
<td><strong>Ultrix</strong></td>
<td><strong>V4.2 – 4.5</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>255</strong></td>
</tr>
<tr>
<td><strong>VMS/Multinet</strong></td>
<td>&nbsp;</td>
<td><strong>TCP and UDP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>VMS/TCPware</strong></td>
<td>&nbsp;</td>
<td><strong>TCP</strong></td>
<td><strong>60</strong></td>
</tr>
<tr>
<td><strong>VMS/TCPware</strong></td>
<td>&nbsp;</td>
<td><strong>UDP</strong></td>
<td><strong>64</strong></td>
</tr>
<tr>
<td><strong>VMS/Wollongong</strong></td>
<td><strong>1.1.1.1</strong></td>
<td><strong>TCP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>VMS/Wollongong</strong></td>
<td><strong>1.1.1.1</strong></td>
<td><strong>UDP</strong></td>
<td><strong>30</strong></td>
</tr>
<tr>
<td><strong>VMS/UCX</strong></td>
<td>&nbsp;</td>
<td><strong>TCP and UDP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>for Workgroups</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>32</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>95</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>32</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>98</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>32</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>98, 98 SE</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>98</strong></td>
<td><strong>TCP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>NT 3.51</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>32</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>NT 4.0</strong></td>
<td><strong>TCP and UDP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>NT 4.0 SP5-</strong></td>
<td>&nbsp;</td>
<td><strong>32</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>NT 4.0 SP6+</strong></td>
<td>&nbsp;</td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>NT 4 WRKS SP 3, SP 6a</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>NT 4 Server SP4</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>ME</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>2000 pro</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>2000 family</strong></td>
<td><strong>ICMP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>Server 2003</strong></td>
<td>&nbsp;</td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>XP</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>Vista</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>7</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>Server 2008</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>128</strong></td>
</tr>
<tr>
<td><strong>Windows</strong></td>
<td><strong>10</strong></td>
<td><strong>ICMP/TCP/UDP</strong></td>
<td><strong>128</strong></td>
</tr>
</tbody>
</table>
