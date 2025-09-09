---
layout: post
title: Active Directory Max Limits and Scalability
date: 2022-08-25 19:32
tags: [AD]
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":890,"width":"528px","height":"259px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/ads.jpeg?w=1024" alt="" class="wp-image-890" style="width:528px;height:259px" /></figure>
<!-- /wp:image -->

<!-- wp:list -->
<ul class="wp-block-list"><!-- wp:list-item -->
<li>Maximum Number of Objects</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Maximum Number of Security Identifiers</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Maximum Number of entries in Discretionary and Security Access Control Lists</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Group Memberships for Security Principals</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>FQDN Length Limitations</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>File Name and Path Length Limitations</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Additional Name Length Limitations</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Maximum Number of GPOs Applied</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Trust Limitations</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Maximum Number of Accounts per LDAP Transaction</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Recommended Maximum Number of Users in a Group</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Recommended Maximum Number of Domains in a Forest</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Recommended Maximum Number of Domain Controllers in a Domain</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Recommended Maximum Kerberos Settings</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Maximum number of non-linked attribute values</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Maximum size of Active Directory objects</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Maximum Number of Objects</strong><br>Each domain controller in an Active Directory forest can create a little bit less than 2.15 billion objects during its lifetime.<strong>(Average lifespan of 5 years)</strong><br><br><strong>#Maximum Number of Security Identifiers</strong><br>There is a limit of approximately 1 billion security identifiers (SIDs) over the life of a domain. This limit is due to the size of the global relative identifier (RID) pool of 30 bits that makes each SID (that is assigned to user, group, and computer accounts) in a domain unique. The actual limit is <strong>230</strong> or <strong>1,073,741,823</strong> RIDs<br><br><strong>#Maximum Number of entries in Discretionary and Security Access Control Lists</strong><br>The limitation for the number of entries in a discretionary access control list (DACL) or a security access control list (SACL) of an Active Directory object using the ntSecurityDescriptor attribute comes from a limitation in the size of the access control list (ACL), which is 64K. Since access control entries (ACEs) vary in size, the actual number of entries (SIDs) is approximately <strong>1,820.</strong><br><br><strong>#Group Memberships for Security Principals</strong><br>Security principals (that is, user, group, and computer accounts) can be members of a maximum of approximately <strong>1,015</strong> groups.<br><br><strong>#FQDN Length Limitations</strong><br>Fully qualified domain names (FQDNs) in Active Directory cannot exceed <strong>64</strong> characters in total length, including hyphens and periods (.)<br><br><strong>#File Name Length Limitations</strong><br>The physical files that Active Directory components use, such as SYSVOL, database (NTDS.DIT), and log file paths, are constrained by the MAX_PATH length of <strong>260 </strong>characters, as defined by the Win32 APIs. When you are determining where to place your SYSVOL and database files during Active Directory installation, avoid nested folder structures that make the full file path to the SYSVOL folder, database, and log files longer than 260 characters.<br><br><strong>#Additional Name Length Limitations</strong><br>There are additional limitations regarding name lengths in Active Directory.<br>-NetBIOS computer and domain names are limited to <strong>15 characters.</strong><br>-Domain Name System (DNS) host names are limited to <strong>24 characters.</strong><br>-OU names are limited to <strong>64 characters.</strong><br><br><strong>#Maximum Number of Group Policy Objects Applied(GPO's)</strong><br>There is a limit of <strong>999</strong> Group Policy objects (GPOs) that you can apply to a user account or computer account. This does not mean that the total number of policy settings on the system is limited to <strong>999.</strong> Rather, a single user or computer will not be able to process more than <strong>999 GPOs.</strong> This limit exists for performance reasons.<br><br><strong>#Trust Limitations</strong><br>Trust limitations arise from the number of trusted domain objects (TDOs), the length of trust paths, and the ability of clients to discover available trusts. Limitations that apply include the following:<br><br>Kerberos clients can traverse a maximum of 10 trust links to locate a requested resource in another domain. If the trust path between the domains exceeds this limit, the attempt to access the domain fails.<br>When a client searches out a trust path, the search is limited to the trusts that are established directly with a domain and the trusts that are transitive within a forest.<br>Previous testing has shown that the time to complete operations related to TDOs, such as authentication across domains, deteriorates noticeably if the Active Directory implementation in an organization contains more than <strong>2,400 TDOs.</strong><br><br><strong>#Maximum Number of Accounts per LDAP Transaction</strong><br>When you write scripts or applications that perform Lightweight Directory Access Protocol (LDAP) transactions, the recommended limit is to perform no more than <strong>5,000 </strong>operations per LDAP transaction.<br><br><strong>#Recommended Maximum Number of Users in a Group</strong><br>For Windows 2000 Active Directory environments, the recommended maximum number of members in a group is <strong>5,000.</strong> This recommendation is based on the number of concurrent atomic changes that can be committed in a single database transaction.<br><br>So far, testing in this area has yet to reveal any new recommended limits to the number of members in a group or any other linked multi-valued attribute. Production environments have been reported to exceed 4 million members, and Microsoft scalability testing reached <strong>500 million</strong> members.<br><br><strong>#Recommended Maximum Number of Domains in a Forest</strong><br>For Windows 2000 Server, the recommended maximum number of domains in a forest is <strong>800.</strong> For Windows Server 2003, the recommended maximum number of domains when the forest functional level is set to Windows Server 2003 (also known as forest functional level 2) is 1,200.<br><br><strong>#Recommended Maximum Number of Domain Controllers in a Domain</strong><br>Because the File Replication Service (FRS) is used to replicate SYSVOL in a Windows Server 2003 domain, we recommend a limit of 1,200 domain controllers per domain to ensure reliable recovery of SYSVOL.<br><br><strong>#Recommended Maximum Kerberos Settings</strong><br>The maximum recommended size for a Kerberos ticket is <strong>48,000 bytes</strong>, which is configured through the MaxTokenSize REG_DWORD value in the registry <strong>(HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\Lsa\Kerberos\Parameters)</strong> or through Group Policy,<br><br>The maximum allowed value of MaxTokenSize is <strong>65,535 bytes.</strong> If you are using Kerberos for IPSEC key management, the limit of 65,536 bytes. However, because of HTTP’s base64 encoding of authentication context tokens, we do not recommend that you set the maxTokenSize registry entry to a value larger than <strong>48,000 bytes.</strong> Starting with Windows Server 2012, the default value of the MaxTokenSize registry entry is <strong>48,000</strong> <strong>bytes.</strong><br><br><strong>#Maximum number of non-linked attribute values</strong><br>The Active Directory database stores non-linked attribute values in a linked directory that has to fit on a database page. This results in a maximum limit of non-linked attribute values of approximately <strong>1300</strong> entries for an object that carries only this attribute. In real-world deployments, errors begin to occur when reaching approximately 1200 attribute values.<br>The status code is 0x00000b and maps to error "<strong>LDAP_ADMIN_LIMIT_EXCEEDED Administration limit on the server has exceeded.</strong>"<br><br>For example, this limit might be reached when there are many DNS records on a single DNS name. That’s the case when an Active Directory domain has many DCs.<br><br><strong>#Maximum size of Active Directory objects</strong><br>To change an attribute with a lot of data, the new and old values must be stored in the database transaction. That allows to roll back the transaction if the database is closed in the middle of the transaction. The maximum size of a transaction limits the total blob size of attribute value data to approximately <strong>5 MB.</strong><br><br>The limit of the maximum number of group members prior to link-value replication and to the maximum number of transactions in group membership changes actually exist because of the maximum size of an AD transaction you can have.<br><br>Instances of this limit being reached occur with DFS volumes prior to Windows Server 2008. In versions prior to Window Server 2008, all DFS volume meta-data was stored in a single attribute “PKT” for the volume. When this attribute is updated, the total size of the transaction sometimes exceeds the database limit, causing the update to fail.<br><br>Starting with Windows Server 2008, DFS-N added version 2 namespaces where each DFS target is stored in a separate Active Directory object, thus avoiding this limit.</pre>
<!-- /wp:preformatted -->
