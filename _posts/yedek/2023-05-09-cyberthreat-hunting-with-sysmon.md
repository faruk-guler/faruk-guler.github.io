---
layout: post
title: CyberThreat Hunting with (Sysmon)
date: 2023-05-09 21:36
tag: [SIEM]
author: theguler
comments: true
categories: [SIEM]
---
<!-- wp:image {"id":12328,"width":"775px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/install_sysmon64.jpg?w=731" alt="" class="wp-image-12328" style="width:775px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:separator -->
<hr class="wp-block-separator has-alpha-channel-opacity" />
<!-- /wp:separator -->

<!-- wp:paragraph -->
<p>Sysmon (System Monitor) is a Windows system service and It is one of the <strong>Sysinternals</strong> tools. that, once installed, runs permanently on system reboots. Its main function is to monitor system activity and record detailed event information in the Windows event log. Sysmon provides detailed information about changes such as process creation, network connections, and file creation. This information can be collected and analyzed through Windows Event Collection or SIEM (Security Information and Event Management) tools to identify malicious or anomalous activity and provide you with an understanding of how intruders and malware are operating on your network.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Some features of Sysmon are:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Sysmon does not analyze the events it produces on its own. Additional tools or expertise are needed to analyze these events and draw meaningful conclusions.<br>Sysmon does not try to hide itself from attackers. Therefore, there is a possibility of detection through unauthorized access or malware.<br>It can also be applied as gpo to Sysmon clients</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">https://learn.microsoft.com/en-us/sysinternals/downloads/sysmon<br>https://github.com/Sysinternals/SysmonForLinux<br><br><strong>Conf. files:</strong><br>https://github.com/SwiftOnSecurity/sysmon-config<br>https://github.com/olafhartong/sysmon-modular<br>https://github.com/Neo23x0/sysmon-config</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>##Usage on Cmdlet:</strong><br><strong>Install Default:</strong> .\Sysmon64.exe -i -accepteula<br><strong>Update existing Configuration:</strong> .\Sysmon64.exe -c sysmon-config.xml<br><strong>Show Configuration:</strong> .\Sysmon64.exe -s<br><strong>#Uninstall:</strong> .\Sysmon64.exe  -u<br><br><strong>Location:</strong> Event Viewer -&gt; Applications and Services Logs -&gt; Microsoft -&gt;<br>Windows -&gt; Sysmon -&gt; Operational<br><strong>Specific Log Size:</strong> 1 gigabayt = 1048576 kilobayt<br><strong>Log files dir:</strong> %SystemRoot%\System32\Winevt\Logs\Microsoft-Windows-Sysmon%</pre>
<!-- /wp:preformatted -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>What events are there in Sysmon?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Event ID 1: Process creation<br>Event ID 2: A process changed a file creation time<br>Event ID 3: Network connection<br>Event ID 4: Sysmon service state changed<br>Event ID 5: Process terminated<br>Event ID 6: Driver loaded<br>Event ID 7: Image loaded<br>Event ID 8: CreateRemoteThread<br>Event ID 9: RawAccessRead<br>Event ID 10: ProcessAccess<br>Event ID 11: FileCreate<br>Event ID 12: RegistryEvent (Object create and delete)<br>Event ID 13: RegistryEvent (Value Set)<br>Event ID 14: RegistryEvent (Key and Value Rename)<br>Event ID 15: FileCreateStreamHash<br>Event ID 16: ServiceConfigurationChange<br>Event ID 17: PipeEvent (Pipe Created)<br>Event ID 18: PipeEvent (Pipe Connected)<br>Event ID 19: WmiEvent (WmiEventFilter activity detected)<br>Event ID 20: WmiEvent (WmiEventConsumer activity detected)<br>Event ID 21: WmiEvent (WmiEventConsumerToFilter activity detected)<br>Event ID 22: DNSEvent (DNS query)<br>Event ID 23: FileDelete (File Delete archived)<br>Event ID 24: ClipboardChange (New content in the clipboard)<br>Event ID 25: ProcessTampering (Process image change)<br>Event ID 26: FileDeleteDetected (File Delete logged)<br>Event ID 255: Error</p>
<!-- /wp:paragraph -->
