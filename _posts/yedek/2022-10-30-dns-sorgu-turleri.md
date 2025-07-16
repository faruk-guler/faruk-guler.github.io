---
layout: post
title: DNS and DNS Query Types
date: 2022-10-30 00:03
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":5224,"width":532,"height":265,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns-nedir.jpeg?w=800" alt="" class="wp-image-5224" width="532" height="265" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>What is DNS? (Domain Name System)</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It is a global name resolution protocol used for TCP/IP networks. DNS servers resolve URL (Uniform Resource Locator) or FQDN (Fully Qualified Domain Name) addresses to IPs, allowing easier server (host) names to be used instead of hard-to-remember IP addresses.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>DNS Structure:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>FQDN</strong>: The full name of the client in the domain. Example: "<strong>mail.guler.com</strong>"</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Machines within a domain use a hierarchical name structure to avoid name conflicts. The DNS database is in a tree structure with the "<strong>root</strong>" servers at the top. Each subdomain is a domain, and each part that leaves these domains is called a<strong> subdomain</strong>.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Root Servers:</strong> They are located at the top of the DNS system and are where the server name-ip conversion begins. They direct incoming requests to TLD (Top Level Domain) servers. There are 13 root servers in the world.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>TLD Servers:</strong> This is where the task distribution is made first. It consists of gTLD (generic TLD-generic TLD) and ccTLD (<strong>country code TLD-country code TLD</strong>).</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Major TLD Examples:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td><strong>&nbsp;.com</strong></td><td>Commercial Organizations</td><td>.tr</td><td>Turkey</td></tr><tr><td><strong>.net</strong></td><td>Network Organizations</td><td>.fr</td><td>&nbsp;France</td></tr><tr><td><strong>.org</strong></td><td>Non-Commercial Organizations</td><td>.de</td><td>Germany</td></tr><tr><td><strong>.mil</strong></td><td>Military Institutions</td><td>.br</td><td>Brazil</td></tr><tr><td><strong>.edu</strong></td><td>Educational institutions</td><td>.it</td><td>Italy</td></tr><tr><td><strong>.gov</strong></td><td>Government Institutions</td><td>.tr</td><td>Turkey</td></tr><tr><td><strong>.int</strong></td><td>International Institutions</td><td>.us</td><td>America</td></tr><tr><td><strong>.info</strong></td><td>Information Services</td><td>.ca</td><td>Canada</td></tr><tr><td><strong>.name</strong></td><td>Individual Use</td><td>.ru</td><td>Russia</td></tr><tr><td><strong>.tel</strong></td><td>Internet, Communication Services</td><td>.es</td><td>Spain</td></tr><tr><td><strong>.<em>travel</em>&nbsp;</strong></td><td>Travel and Holiday Sector</td><td>.travel</td><td>-</td></tr><tr><td><strong>.pro</strong></td><td>For professional workers</td><td>.pro</td><td>-</td></tr><tr><td><strong>.tv</strong></td><td>For video projects and online television</td><td>.tv</td><td>-</td></tr><tr><td><strong>.aero</strong></td><td>Uses by the aerospace industry.</td><td>.aero</td><td>-</td></tr><tr><td><strong>.museum</strong></td><td>Used for museums.</td><td>.museum</td><td>-</td></tr><tr><td><strong>.io</strong></td><td>It is mainly used by technology-related companies.</td><td>.io</td><td>-</td></tr><tr><td><strong>etc..</strong></td><td></td><td></td><td></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Second Level Domain Servers:</strong> Domain names of different lengths given to individuals or institutions. Example: "<strong>adobe.com</strong>" etc.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Subdomains:</strong> Additional domains generated from second-level domains in order to expand the DNS tree and divide it into sections at any time.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Authorization:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>For the purpose of providing ease of management, the domains in the DNS system are divided into sub-domains and their management is given to different institutions. In this way, the management, protection and responsibility of all data in that sub-domain are transferred to that institution.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>DNS Zone Structure:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>The domain managed by a DNS server is called a "<strong>zone</strong>". It contains data such as computer names, RR (<strong>resource records</strong>), FQDN.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Field Types</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Forward Lookup Zone:</strong> It is called the area that performs IP resolution from the name.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Primary Zone:</strong> It is the only type of field that cannot be managed by any other DNS server other than the master DNS server, which keeps all records on it and has the right to write to the DNS database. Also known as the admin area.<br><strong>Secondary Zone: </strong>It is a type of area that does not have the right to write to the DNS database, and works with the principle of reading only what the primary domain writes. It takes data copies from the primary domain on another DNS server at certain time intervals and works as a backup of it.<br><strong>Residue Area (Stub Zone): </strong>It is a type of area that keeps NS (Name Server-Name server), SOA (Start Of Authority-Start Of Authority) and A (Address Record-Address Record) records and does not have any authority on it. It works on the principle that other domains make NS records on their own without querying the responsible DNS server.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Reverse Lookup Zone:</strong> In contrast to the forward lookup zone, it performs name resolution from IP.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Major DNS Record Types</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5233,"width":470,"height":234,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/dns-record-types.jpg?w=799" alt="" class="wp-image-5233" width="470" height="234" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Host(A) (Address Record-Address Record):</strong> It is the address records in which server names and ip match are made.<br><strong>AAA (Address Record): </strong>It is a record designed to be used with ip V6, which performs the same function as the A record.<br><strong>NS (Name Server-Name server):</strong> It is the record used to identify the DNS servers in use on the network.<br><strong>SRV (Service Record): </strong>It is a record that enables many similar TCP/IP based servers to be found with a single DNS query.<br><strong>MX (Mail Exchanger):</strong> It is the record that enables the identification of mail servers in the system and their information to be known by DNS.<br><strong>PTR (Pointer Record):</strong> It is a record that contains the name match from the IP address and can only be used in the reverse search field.<br><strong>SOA (Start Of Authority):</strong> It is the first record for all domains that contains the name of the authoritative DNS server on a domain.<br><strong>TXT (Text-to-Text Record):</strong> A location within a text file about a particular resource, etc. record containing information.<br><strong>CNAME (Canonical Name):</strong> It is the record that allows the record in another DNS server to be registered to the domain with a different name.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>DNS Domain Transfer</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5244,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/tansfer-dns.jpg?w=512" alt="" class="wp-image-5244" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The process of copying the files in any domain database and keeping them by different DNS servers is called DNS Domain Transfer. Changes on domain files can only be made by administrator servers, and domain transfer can only occur with the necessary permissions on the primary DNS server. Domain transfer between primary and secondary DNS servers is done with the help of a serial number in which the version number of the database is kept. The serial number increases with each change of registration. Before each query, the secondary DNS server looks at these serial numbers and, if its serial number is less than the primary DNS server, transfers the changes through the primary server. The main purpose of DNS Domain Transfer is to continue the resolution on the network uninterrupted in case the administrator server crashes or stops.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>DNS system consists of name servers and resolvers. Nameservers keep information of IP addresses that match server names. Resolvers, on the other hand, are DNS clients and contain the addresses of DNS servers.<br>DNS servers are divided into two <strong>(2)</strong> according to the domain and the authorization status in the domain<strong>:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Authoritative DNS Name Server:</strong> The server responsible for all queries for a domain or domain. There are two types as Primary server (Primary/Master Server) and Secondary server (Secondary/Slave Server).<br><strong>Non-Authoritative DNS Name Caching Server (Non-Authoritative DNS Name Caching Server):</strong> It is a server that is not authorized for a domain or domain, only takes the data from the first query and stores it in the cache for TTL (Time To Live). This saves time and does not affect bandwidth traffic.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>DNS Types: 3 DNS Query Types</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>There are three types of queries in the DNS system:</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Recursive Query</strong><br>This request that can be made to a DNS Server is as follows: A user in our environment sends a Recursive Query to the DNS Server in his Local. DNS receives this request and checks the information in the Forward Lookup Zone and Cache. The found information is sent back to the Client. If no answer is found, it searches for an answer through <strong>Root Hints </strong>and Forwarder Addresses and tries to return it. However, if it is not found at the end of all efforts, not found information is returned to the Client.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Non-Recursive Query</strong><br>A non-recursive query is a query in which the DNS Resolver already knows the answer. It either immediately returns a DNS record because it already stores it in local cache, or queries a DNS Name Server which is authoritative for the record, meaning it definitely holds the correct IP for that hostname. In both cases, there is no need for additional rounds of queries (like in recursive or iterative queries). Rather, a response is immediately returned to the client.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Iterative Query</strong><br>If a local DNS Server does not receive a response regarding the request, that DNS Server finds the results by referring to other DNS and returns them to the Clients.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>DNS Structures According to Usage Patterns</strong></p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":5243,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/dns_resolver.jpg?w=1024" alt="" class="wp-image-5243" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Caching-Only Name Server: </strong>It is the DNS structure on which only the DNS server is installed, there is no field structure, and the name resolution is done through a file that is kept in the cache and updated at certain intervals. The period in which the name-IP matches are to be kept in the cache is determined is called TTL. The default value for this time is 60min.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Forwarder:</strong><br>It is the name given to the process of asking another DNS Server to resolve the Domain names that the DNS Server does not keep on itself. Thanks to this feature, Root Hints will not be used for every name that cannot be resolved.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Conditional Forwarding:</strong><br>If you know in which DNS Server a Domain is registered, Local or your system is the system that allows people who query that domain to go to the specified DNS directly by passing the Root Hints.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Umarım yararlı olmuştur.  - I hope it was helpful</strong></p>
<!-- /wp:paragraph -->
