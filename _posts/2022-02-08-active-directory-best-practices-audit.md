---
layout: post
title: Active Directory Best Practices Audit Policies GPO
date: 2022-02-08 17:05
author: theguler
comments: true
categories: [Windows Group Policy GPO]
---
<!-- wp:image {"id":1541,"width":"637px","height":"208px","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://theguler.wordpress.com/wp-content/uploads/2022/02/acc.png?w=1024" alt="" class="wp-image-1541" style="width:637px;height:208px" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading" id="microsoft-best-practices-audit-policies-tablosu-10-adet"><strong>Microsoft Best Practices  Audit Policies Tablosu: (10 adet)</strong></h2>
<!-- /wp:heading -->

<!-- wp:table {"hasFixedLayout":false} -->
<figure class="wp-block-table"><table><tbody><tr><td><strong>Audit Policy Category or Subcategory</strong></td><td><strong>Windows Default</strong></td><td><strong>Baseline Recommendation</strong></td><td><strong>Stronger Recommendation</strong></td></tr><tr><td></td><td></td><td></td><td></td></tr><tr><td></td><td>Success Failure</td><td>Success Failure</td><td>Success Failure</td></tr><tr><td><strong>Account Logon</strong></td><td></td><td></td><td></td></tr><tr><td>Audit Credential Validation</td><td>No No</td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit Kerberos Authentication Service</td><td></td><td></td><td>Yes Yes</td></tr><tr><td>Audit Kerberos Service Ticket Operations</td><td></td><td></td><td>Yes Yes</td></tr><tr><td>Audit Other Account Logon Events</td><td></td><td></td><td>Yes Yes</td></tr><tr><td><strong>Account Management</strong></td><td></td><td></td><td></td></tr><tr><td>Audit Application Group Management</td><td></td><td></td><td></td></tr><tr><td>Audit Computer Account Management</td><td></td><td>Yes DC</td><td>Yes Yes</td></tr><tr><td>Audit Distribution Group Management</td><td></td><td></td><td></td></tr><tr><td>Audit Other Account Management Events</td><td></td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit Security Group Management</td><td></td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit User Account Management</td><td>Yes No</td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td><strong>Detailed Tracking</strong></td><td></td><td></td><td></td></tr><tr><td>Audit DPAPI Activity</td><td></td><td></td><td>Yes Yes</td></tr><tr><td>Audit Process Creation</td><td></td><td>Yes No</td><td>Yes Yes</td></tr><tr><td>Audit Process Termination</td><td></td><td></td><td></td></tr><tr><td>Audit RPC Events</td><td></td><td></td><td></td></tr><tr><td><strong>DS Access</strong></td><td></td><td></td><td></td></tr><tr><td>Audit Detailed Directory Service Replication</td><td></td><td></td><td></td></tr><tr><td>Audit Directory Service Access</td><td></td><td>DC DC</td><td>DC DC</td></tr><tr><td>Audit Directory Service Changes</td><td></td><td>DC DC</td><td>DC DC</td></tr><tr><td>Audit Directory Service Replication</td><td></td><td></td><td></td></tr><tr><td><strong>Logon and Logoff</strong></td><td></td><td></td><td></td></tr><tr><td>Audit Account Lockout</td><td>Yes No</td><td></td><td>Yes No</td></tr><tr><td>Audit User/Device Claims</td><td></td><td></td><td></td></tr><tr><td>Audit IPsec Extended Mode</td><td></td><td></td><td></td></tr><tr><td>Audit IPsec Main Mode</td><td></td><td></td><td>IF IF</td></tr><tr><td>Audit IPsec Quick Mode</td><td></td><td></td><td></td></tr><tr><td>Audit Logoff</td><td>Yes No</td><td>Yes No</td><td>Yes No</td></tr><tr><td>Audit Logon</td><td>Yes No</td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit Network Policy Server</td><td>Yes Yes</td><td></td><td></td></tr><tr><td>Audit Other Logon/Logoff Events</td><td></td><td></td><td>Yes Yes</td></tr><tr><td>Audit Special Logon</td><td>Yes No</td><td>Yes No</td><td>Yes Yes</td></tr><tr><td><strong>Object Access</strong></td><td></td><td></td><td></td></tr><tr><td>Audit Application Generated</td><td></td><td></td><td></td></tr><tr><td>Audit Certification Services</td><td></td><td></td><td></td></tr><tr><td>Audit Detailed File Share</td><td></td><td></td><td></td></tr><tr><td>Audit File Share</td><td></td><td></td><td></td></tr><tr><td>Audit File System</td><td></td><td></td><td></td></tr><tr><td>Audit Filtering Platform Connection</td><td></td><td></td><td></td></tr><tr><td>Audit Filtering Platform Packet Drop</td><td></td><td></td><td></td></tr><tr><td>Audit Handle Manipulation</td><td></td><td></td><td></td></tr><tr><td>Audit Kernel Object</td><td></td><td></td><td></td></tr><tr><td>Audit Other Object Access Events</td><td></td><td></td><td></td></tr><tr><td>Audit Registry</td><td></td><td></td><td></td></tr><tr><td>Audit Removable Storage</td><td></td><td></td><td></td></tr><tr><td>Audit SAM</td><td></td><td></td><td></td></tr><tr><td>Audit Central Access Policy Staging</td><td></td><td></td><td></td></tr><tr><td><strong>Policy Change</strong></td><td></td><td></td><td></td></tr><tr><td>Audit Audit Policy Change</td><td>Yes No</td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit Authentication Policy Change</td><td>Yes No</td><td>Yes No</td><td>Yes Yes</td></tr><tr><td>Audit Authorization Policy Change</td><td></td><td></td><td></td></tr><tr><td>Audit Filtering Platform Policy Change</td><td></td><td></td><td></td></tr><tr><td>Audit MPSSVC Rule-Level Policy Change</td><td></td><td></td><td>Yes</td></tr><tr><td>Audit Other Policy Change Events</td><td></td><td></td><td></td></tr><tr><td><strong>Privilege Use</strong></td><td></td><td></td><td></td></tr><tr><td>Audit Non Sensitive Privilege Use</td><td></td><td></td><td></td></tr><tr><td>Audit Other Privilege Use Events</td><td></td><td></td><td></td></tr><tr><td>Audit Sensitive Privilege Use</td><td></td><td></td><td></td></tr><tr><td><strong>System</strong></td><td></td><td></td><td></td></tr><tr><td>Audit IPsec Driver</td><td></td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit Other System Events</td><td>Yes Yes</td><td></td><td></td></tr><tr><td>Audit Security State Change</td><td>Yes No</td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit Security System Extension</td><td></td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td>Audit System Integrity</td><td>Yes Yes</td><td>Yes Yes</td><td>Yes Yes</td></tr><tr><td><strong>Global Object Access Auditing</strong></td><td></td><td></td><td></td></tr><tr><td>Audit IPsec Driver</td><td></td><td></td><td></td></tr><tr><td>Audit Other System Events</td><td></td><td></td><td></td></tr><tr><td>Audit Security State Change</td><td></td><td></td><td></td></tr><tr><td>Audit Security System Extension</td><td></td><td></td><td></td></tr><tr><td>Audit System Integrity</td><td></td><td></td><td></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Audit Policy Tables Legend</strong><strong></strong></p>
<!-- /wp:paragraph -->

<!-- wp:table {"hasFixedLayout":false} -->
<figure class="wp-block-table"><table><tbody><tr><td><strong>Notation</strong></td><td><strong>Recommendation</strong></td></tr><tr><td>YES</td><td>Enable in general scenarios</td></tr><tr><td>NO</td><td>Do not enable in general scenarios</td></tr><tr><td>IF</td><td>Enable if needed for a specific scenario, or if a role or feature for which auditing is desired is installed on the machine</td></tr><tr><td>DC</td><td>Enable on domain controllers</td></tr><tr><td>[Blank]</td><td>No recommendation</td></tr></tbody></table></figure>
<!-- /wp:table -->