---
layout: post
title: Windows Event Viewer log Event ID's
date: 2022-05-26 23:09
author: theguler
comments: true
categories: [Hybride]
---
<!-- wp:image {"id":3276,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/logs.png?w=1024" alt="" class="wp-image-3276" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>1- <strong>Windows Server and Client</strong> <strong>Logs:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Microsoft</strong> <strong>General Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID  Açıklama</strong>
1100,The event logging service has shut down,Windows
1101,Audit events have been dropped by the transport.,Windows
1102,The audit log was cleared,Windows
1104,The security Log is now full,Windows
1105,Event log automatic backup,Windows
1108,The event logging service encountered an error,Windows
4608,Windows is starting up,Windows
4609,Windows is shutting down,Windows
4610,An authentication package has been loaded by the Local Security Authority,Windows
4611,A trusted logon process has been registered with the Local Security Authority,Windows
4612,"Internal resources allocated for the queuing of audit messages have been exhausted, leading to the loss of some audits.",Windows
4614,A notification package has been loaded by the Security Account Manager.,Windows
4615,Invalid use of LPC port,Windows
4616,The system time was changed.,Windows
4618,A monitored security event pattern has occurred,Windows
4621,Administrator recovered system from CrashOnAuditFail,Windows
4622,A security package has been loaded by the Local Security Authority.,Windows
4624,An account was successfully logged on,Windows
4625,An account failed to log on,Windows
4626,User/Device claims information,Windows
4627,Group membership information.,Windows
4634,An account was logged off,Windows
4646,IKE DoS-prevention mode started,Windows
4647,User initiated logoff,Windows
4648,A logon was attempted using explicit credentials,Windows
4649,A replay attack was detected,Windows
4650,An IPsec Main Mode security association was established,Windows
4651,An IPsec Main Mode security association was established,Windows
4652,An IPsec Main Mode negotiation failed,Windows
4653,An IPsec Main Mode negotiation failed,Windows
4654,An IPsec Quick Mode negotiation failed,Windows
4655,An IPsec Main Mode security association ended,Windows
4656,A handle to an object was requested,Windows
4657,A registry value was modified,Windows
4658,The handle to an object was closed,Windows
4659,A handle to an object was requested with intent to delete,Windows
4660,An object was deleted,Windows
4661,A handle to an object was requested,Windows
4662,An operation was performed on an object,Windows
4663,An attempt was made to access an object,Windows
4664,An attempt was made to create a hard link,Windows
4665,An attempt was made to create an application client context.,Windows
4666,An application attempted an operation,Windows
4667,An application client context was deleted,Windows
4668,An application was initialized,Windows
4670,Permissions on an object were changed,Windows
4671,An application attempted to access a blocked ordinal through the TBS,Windows
4672,Special privileges assigned to new logon,Windows
4673,A privileged service was called,Windows
4674,An operation was attempted on a privileged object,Windows
4675,SIDs were filtered,Windows
4688,A new process has been created,Windows
4689,A process has exited,Windows
4690,An attempt was made to duplicate a handle to an object,Windows
4691,Indirect access to an object was requested,Windows
4692,Backup of data protection master key was attempted,Windows
4693,Recovery of data protection master key was attempted,Windows
4694,Protection of auditable protected data was attempted,Windows
4695,Unprotection of auditable protected data was attempted,Windows
4696,A primary token was assigned to process,Windows
4697,A service was installed in the system,Windows
4698,A scheduled task was created,Windows
4699,A scheduled task was deleted,Windows
4700,A scheduled task was enabled,Windows
4701,A scheduled task was disabled,Windows
4702,A scheduled task was updated,Windows
4703,A token right was adjusted,Windows
4704,A user right was assigned,Windows
4705,A user right was removed,Windows
4706,A new trust was created to a domain,Windows
4707,A trust to a domain was removed,Windows
4709,IPsec Services was started,Windows
4710,IPsec Services was disabled,Windows
4711,PAStore Engine (1%),Windows
4712,IPsec Services encountered a potentially serious failure,Windows
4713,Kerberos policy was changed,Windows
4714,Encrypted data recovery policy was changed,Windows
4715,The audit policy (SACL) on an object was changed,Windows
4716,Trusted domain information was modified,Windows
4717,System security access was granted to an account,Windows
4718,System security access was removed from an account,Windows
4719,System audit policy was changed,Windows
4720,A user account was created,Windows
4722,A user account was enabled,Windows
4723,An attempt was made to change an account's password,Windows
4724,An attempt was made to reset an accounts password,Windows
4725,A user account was disabled,Windows
4726,A user account was deleted,Windows
4727,A security-enabled global group was created,Windows
4728,A member was added to a security-enabled global group,Windows
4729,A member was removed from a security-enabled global group,Windows
4730,A security-enabled global group was deleted,Windows
4731,A security-enabled local group was created,Windows
4732,A member was added to a security-enabled local group,Windows
4733,A member was removed from a security-enabled local group,Windows
4734,A security-enabled local group was deleted,Windows
4735,A security-enabled local group was changed,Windows
4737,A security-enabled global group was changed,Windows
4738,A user account was changed,Windows
4739,Domain Policy was changed,Windows
4740,A user account was locked out,Windows
4741,A computer account was created,Windows
4742,A computer account was changed,Windows
4743,A computer account was deleted,Windows
4744,A security-disabled local group was created,Windows
4745,A security-disabled local group was changed,Windows
4746,A member was added to a security-disabled local group,Windows
4747,A member was removed from a security-disabled local group,Windows
4748,A security-disabled local group was deleted,Windows
4749,A security-disabled global group was created,Windows
4750,A security-disabled global group was changed,Windows
4751,A member was added to a security-disabled global group,Windows
4752,A member was removed from a security-disabled global group,Windows
4753,A security-disabled global group was deleted,Windows
4754,A security-enabled universal group was created,Windows
4755,A security-enabled universal group was changed,Windows
4756,A member was added to a security-enabled universal group,Windows
4757,A member was removed from a security-enabled universal group,Windows
4758,A security-enabled universal group was deleted,Windows
4759,A security-disabled universal group was created,Windows
4760,A security-disabled universal group was changed,Windows
4761,A member was added to a security-disabled universal group,Windows
4762,A member was removed from a security-disabled universal group,Windows
4763,A security-disabled universal group was deleted,Windows
4764,A groups type was changed,Windows
4765,SID History was added to an account,Windows
4766,An attempt to add SID History to an account failed,Windows
4767,A user account was unlocked,Windows
4768,A Kerberos authentication ticket (TGT) was requested,Windows
4769,A Kerberos service ticket was requested,Windows
4770,A Kerberos service ticket was renewed,Windows
4771,Kerberos pre-authentication failed,Windows
4772,A Kerberos authentication ticket request failed,Windows
4773,A Kerberos service ticket request failed,Windows
4774,An account was mapped for logon,Windows
4775,An account could not be mapped for logon,Windows
4776,The domain controller attempted to validate the credentials for an account,Windows
4777,The domain controller failed to validate the credentials for an account,Windows
4778,A session was reconnected to a Window Station,Windows
4779,A session was disconnected from a Window Station,Windows
4780,The ACL was set on accounts which are members of administrators groups,Windows
4781,The name of an account was changed,Windows
4782,The password hash an account was accessed,Windows
4783,A basic application group was created,Windows
4784,A basic application group was changed,Windows
4785,A member was added to a basic application group,Windows
4786,A member was removed from a basic application group,Windows
4787,A non-member was added to a basic application group,Windows
4788,A non-member was removed from a basic application group..,Windows
4789,A basic application group was deleted,Windows
4790,An LDAP query group was created,Windows
4791,A basic application group was changed,Windows
4792,An LDAP query group was deleted,Windows
4793,The Password Policy Checking API was called,Windows
4794,An attempt was made to set the Directory Services Restore Mode administrator password,Windows
4797,An attempt was made to query the existence of a blank password for an account,Windows
4798,A user's local group membership was enumerated.,Windows
4799,A security-enabled local group membership was enumerated,Windows
4800,The workstation was locked,Windows
4801,The workstation was unlocked,Windows
4802,The screen saver was invoked,Windows
4803,The screen saver was dismissed,Windows
4816,RPC detected an integrity violation while decrypting an incoming message,Windows
4817,Auditing settings on object were changed.,Windows
4818,Proposed Central Access Policy does not grant the same access permissions as the current Central Access Policy,Windows
4819,Central Access Policies on the machine have been changed,Windows
4820,A Kerberos Ticket-granting-ticket (TGT) was denied because the device does not meet the access control restrictions,Windows
4821,"A Kerberos service ticket was denied because the user, device, or both does not meet the access control restrictions",Windows
4822,NTLM authentication failed because the account was a member of the Protected User group,Windows
4823,NTLM authentication failed because access control restrictions are required,Windows
4824,Kerberos preauthentication by using DES or RC4 failed because the account was a member of the Protected User group,Windows
4825,"A user was denied the access to Remote Desktop. By default, users are allowed to connect only if they are members of the Remote Desktop Users group or Administrators group",Windows
4826,Boot Configuration Data loaded,Windows
4830,SID History was removed from an account,Windows
4864,A namespace collision was detected,Windows
4865,A trusted forest information entry was added,Windows
4866,A trusted forest information entry was removed,Windows
4867,A trusted forest information entry was modified,Windows
4868,The certificate manager denied a pending certificate request,Windows
4869,Certificate Services received a resubmitted certificate request,Windows
4870,Certificate Services revoked a certificate,Windows
4871,Certificate Services received a request to publish the certificate revocation list (CRL),Windows
4872,Certificate Services published the certificate revocation list (CRL),Windows
4873,A certificate request extension changed,Windows
4874,One or more certificate request attributes changed.,Windows
4875,Certificate Services received a request to shut down,Windows
4876,Certificate Services backup started,Windows
4877,Certificate Services backup completed,Windows
4878,Certificate Services restore started,Windows
4879,Certificate Services restore completed,Windows
4880,Certificate Services started,Windows
4881,Certificate Services stopped,Windows
4882,The security permissions for Certificate Services changed,Windows
4883,Certificate Services retrieved an archived key,Windows
4884,Certificate Services imported a certificate into its database,Windows
4885,The audit filter for Certificate Services changed,Windows
4886,Certificate Services received a certificate request,Windows
4887,Certificate Services approved a certificate request and issued a certificate,Windows
4888,Certificate Services denied a certificate request,Windows
4889,Certificate Services set the status of a certificate request to pending,Windows
4890,The certificate manager settings for Certificate Services changed.,Windows
4891,A configuration entry changed in Certificate Services,Windows
4892,A property of Certificate Services changed,Windows
4893,Certificate Services archived a key,Windows
4894,Certificate Services imported and archived a key,Windows
4895,Certificate Services published the CA certificate to Active Directory Domain Services,Windows
4896,One or more rows have been deleted from the certificate database,Windows
4897,Role separation enabled,Windows
4898,Certificate Services loaded a template,Windows
4899,A Certificate Services template was updated,Windows
4900,Certificate Services template security was updated,Windows
4902,The Per-user audit policy table was created,Windows
4904,An attempt was made to register a security event source,Windows
4905,An attempt was made to unregister a security event source,Windows
4906,The CrashOnAuditFail value has changed,Windows
4907,Auditing settings on object were changed,Windows
4908,Special Groups Logon table modified,Windows
4909,The local policy settings for the TBS were changed,Windows
4910,The group policy settings for the TBS were changed,Windows
4911,Resource attributes of the object were changed,Windows
4912,Per User Audit Policy was changed,Windows
4913,Central Access Policy on the object was changed,Windows
4928,An Active Directory replica source naming context was established,Windows
4929,An Active Directory replica source naming context was removed,Windows
4930,An Active Directory replica source naming context was modified,Windows
4931,An Active Directory replica destination naming context was modified,Windows
4932,Synchronization of a replica of an Active Directory naming context has begun,Windows
4933,Synchronization of a replica of an Active Directory naming context has ended,Windows
4934,Attributes of an Active Directory object were replicated,Windows
4935,Replication failure begins,Windows
4936,Replication failure ends,Windows
4937,A lingering object was removed from a replica,Windows
4944,The following policy was active when the Windows Firewall started,Windows
4945,A rule was listed when the Windows Firewall started,Windows
4946,A change has been made to Windows Firewall exception list. A rule was added,Windows
4947,A change has been made to Windows Firewall exception list. A rule was modified,Windows
4948,A change has been made to Windows Firewall exception list. A rule was deleted,Windows
4949,Windows Firewall settings were restored to the default values,Windows
4950,A Windows Firewall setting has changed,Windows
4951,A rule has been ignored because its major version number was not recognized by Windows Firewall,Windows
4952,Parts of a rule have been ignored because its minor version number was not recognized by Windows Firewall,Windows
4953,A rule has been ignored by Windows Firewall because it could not parse the rule,Windows
4954,Windows Firewall Group Policy settings has changed. The new settings have been applied,Windows
4956,Windows Firewall has changed the active profile,Windows
4957,Windows Firewall did not apply the following rule,Windows
4958,Windows Firewall did not apply the following rule because the rule referred to items not configured on this computer,Windows
4960,IPsec dropped an inbound packet that failed an integrity check,Windows
4961,IPsec dropped an inbound packet that failed a replay check,Windows
4962,IPsec dropped an inbound packet that failed a replay check,Windows
4963,IPsec dropped an inbound clear text packet that should have been secured,Windows
4964,Special groups have been assigned to a new logon,Windows
4965,IPsec received a packet from a remote computer with an incorrect Security Parameter Index (SPI).,Windows
4976,"During Main Mode negotiation, IPsec received an invalid negotiation packet.",Windows
4977,"During Quick Mode negotiation, IPsec received an invalid negotiation packet.",Windows
4978,"During Extended Mode negotiation, IPsec received an invalid negotiation packet.",Windows
4979,IPsec Main Mode and Extended Mode security associations were established.,Windows
4980,IPsec Main Mode and Extended Mode security associations were established,Windows
4981,IPsec Main Mode and Extended Mode security associations were established,Windows
4982,IPsec Main Mode and Extended Mode security associations were established,Windows
4983,An IPsec Extended Mode negotiation failed,Windows
4984,An IPsec Extended Mode negotiation failed,Windows
4985,The state of a transaction has changed,Windows
5024,The Windows Firewall Service has started successfully,Windows
5025,The Windows Firewall Service has been stopped,Windows
5027,The Windows Firewall Service was unable to retrieve the security policy from the local storage,Windows
5028,The Windows Firewall Service was unable to parse the new security policy.,Windows
5029,The Windows Firewall Service failed to initialize the driver,Windows
5030,The Windows Firewall Service failed to start,Windows
5031,The Windows Firewall Service blocked an application from accepting incoming connections on the network.,Windows
5032,Windows Firewall was unable to notify the user that it blocked an application from accepting incoming connections on the network,Windows
5033,The Windows Firewall Driver has started successfully,Windows
5034,The Windows Firewall Driver has been stopped,Windows
5035,The Windows Firewall Driver failed to start,Windows
5037,The Windows Firewall Driver detected critical runtime error. Terminating,Windows
5038,Code integrity determined that the image hash of a file is not valid,Windows
5039,A registry key was virtualized.,Windows
5040,A change has been made to IPsec settings. An Authentication Set was added.,Windows
5041,A change has been made to IPsec settings. An Authentication Set was modified,Windows
5042,A change has been made to IPsec settings. An Authentication Set was deleted,Windows
5043,A change has been made to IPsec settings. A Connection Security Rule was added,Windows
5044,A change has been made to IPsec settings. A Connection Security Rule was modified,Windows
5045,A change has been made to IPsec settings. A Connection Security Rule was deleted,Windows
5046,A change has been made to IPsec settings. A Crypto Set was added,Windows
5047,A change has been made to IPsec settings. A Crypto Set was modified,Windows
5048,A change has been made to IPsec settings. A Crypto Set was deleted,Windows
5049,An IPsec Security Association was deleted,Windows
5050,An attempt to programmatically disable the Windows Firewall using a call to INetFwProfile.FirewallEnabled(FALSE,Windows
5051,A file was virtualized,Windows
5056,A cryptographic self test was performed,Windows
5057,A cryptographic primitive operation failed,Windows
5058,Key file operation,Windows
5059,Key migration operation,Windows
5060,Verification operation failed,Windows
5061,Cryptographic operation,Windows
5062,A kernel-mode cryptographic self test was performed,Windows
5063,A cryptographic provider operation was attempted,Windows
5064,A cryptographic context operation was attempted,Windows
5065,A cryptographic context modification was attempted,Windows
5066,A cryptographic function operation was attempted,Windows
5067,A cryptographic function modification was attempted,Windows
5068,A cryptographic function provider operation was attempted,Windows
5069,A cryptographic function property operation was attempted,Windows
5070,A cryptographic function property operation was attempted,Windows
5071,Key access denied by Microsoft key distribution service,Windows
5120,OCSP Responder Service Started,Windows
5121,OCSP Responder Service Stopped,Windows
5122,A Configuration entry changed in the OCSP Responder Service,Windows
5123,A configuration entry changed in the OCSP Responder Service,Windows
5124,A security setting was updated on OCSP Responder Service,Windows
5125,A request was submitted to OCSP Responder Service,Windows
5126,Signing Certificate was automatically updated by the OCSP Responder Service,Windows
5127,The OCSP Revocation Provider successfully updated the revocation information,Windows
5136,A directory service object was modified,Windows
5137,A directory service object was created,Windows
5138,A directory service object was undeleted,Windows
5139,A directory service object was moved,Windows
5140,A network share object was accessed,Windows
5141,A directory service object was deleted,Windows
5142,A network share object was added.,Windows
5143,A network share object was modified,Windows
5144,A network share object was deleted.,Windows
5145,A network share object was checked to see whether client can be granted desired access,Windows
5146,The Windows Filtering Platform has blocked a packet,Windows
5147,A more restrictive Windows Filtering Platform filter has blocked a packet,Windows
5148,The Windows Filtering Platform has detected a DoS attack and entered a defensive mode; packets associated with this attack will be discarded.,Windows
5149,The DoS attack has subsided and normal processing is being resumed.,Windows
5150,The Windows Filtering Platform has blocked a packet.,Windows
5151,A more restrictive Windows Filtering Platform filter has blocked a packet.,Windows
5152,The Windows Filtering Platform blocked a packet,Windows
5153,A more restrictive Windows Filtering Platform filter has blocked a packet,Windows
5154,The Windows Filtering Platform has permitted an application or service to listen on a port for incoming connections,Windows
5155,The Windows Filtering Platform has blocked an application or service from listening on a port for incoming connections,Windows
5156,The Windows Filtering Platform has allowed a connection,Windows
5157,The Windows Filtering Platform has blocked a connection,Windows
5158,The Windows Filtering Platform has permitted a bind to a local port,Windows
5159,The Windows Filtering Platform has blocked a bind to a local port,Windows
5168,Spn check for SMB/SMB2 fails.,Windows
5169,A directory service object was modified,Windows
5170,A directory service object was modified during a background cleanup task,Windows
5376,Credential Manager credentials were backed up,Windows
5377,Credential Manager credentials were restored from a backup,Windows
5378,The requested credentials delegation was disallowed by policy,Windows
5440,The following callout was present when the Windows Filtering Platform Base Filtering Engine started,Windows
5441,The following filter was present when the Windows Filtering Platform Base Filtering Engine started,Windows
5442,The following provider was present when the Windows Filtering Platform Base Filtering Engine started,Windows
5443,The following provider context was present when the Windows Filtering Platform Base Filtering Engine started,Windows
5444,The following sub-layer was present when the Windows Filtering Platform Base Filtering Engine started,Windows
5446,A Windows Filtering Platform callout has been changed,Windows
5447,A Windows Filtering Platform filter has been changed,Windows
5448,A Windows Filtering Platform provider has been changed,Windows
5449,A Windows Filtering Platform provider context has been changed,Windows
5450,A Windows Filtering Platform sub-layer has been changed,Windows
5451,An IPsec Quick Mode security association was established,Windows
5452,An IPsec Quick Mode security association ended,Windows
5453,An IPsec negotiation with a remote computer failed because the IKE and AuthIP IPsec Keying Modules (IKEEXT) service is not started,Windows
5456,PAStore Engine applied Active Directory storage IPsec policy on the computer,Windows
5457,PAStore Engine failed to apply Active Directory storage IPsec policy on the computer,Windows
5458,PAStore Engine applied locally cached copy of Active Directory storage IPsec policy on the computer,Windows
5459,PAStore Engine failed to apply locally cached copy of Active Directory storage IPsec policy on the computer,Windows
5460,PAStore Engine applied local registry storage IPsec policy on the computer,Windows
5461,PAStore Engine failed to apply local registry storage IPsec policy on the computer,Windows
5462,PAStore Engine failed to apply some rules of the active IPsec policy on the computer,Windows
5463,PAStore Engine polled for changes to the active IPsec policy and detected no changes,Windows
5464,"PAStore Engine polled for changes to the active IPsec policy, detected changes, and applied them to IPsec Services",Windows
5465,PAStore Engine received a control for forced reloading of IPsec policy and processed the control successfully,Windows
5466,"PAStore Engine polled for changes to the Active Directory IPsec policy, determined that Active Directory cannot be reached, and will use the cached copy of the Active Directory IPsec policy instead",Windows
5467,"PAStore Engine polled for changes to the Active Directory IPsec policy, determined that Active Directory can be reached, and found no changes to the policy",Windows
5468,"PAStore Engine polled for changes to the Active Directory IPsec policy, determined that Active Directory can be reached, found changes to the policy, and applied those changes",Windows
5471,PAStore Engine loaded local storage IPsec policy on the computer,Windows
5472,PAStore Engine failed to load local storage IPsec policy on the computer,Windows
5473,PAStore Engine loaded directory storage IPsec policy on the computer,Windows
5474,PAStore Engine failed to load directory storage IPsec policy on the computer,Windows
5477,PAStore Engine failed to add quick mode filter,Windows
5478,IPsec Services has started successfully,Windows
5479,IPsec Services has been shut down successfully,Windows
5480,IPsec Services failed to get the complete list of network interfaces on the computer,Windows
5483,IPsec Services failed to initialize RPC server. IPsec Services could not be started,Windows
5484,IPsec Services has experienced a critical failure and has been shut down,Windows
5485,IPsec Services failed to process some IPsec filters on a plug-and-play event for network interfaces,Windows
5632,A request was made to authenticate to a wireless network,Windows
5633,A request was made to authenticate to a wired network,Windows
5712,A Remote Procedure Call (RPC) was attempted,Windows
5888,An object in the COM+ Catalog was modified,Windows
5889,An object was deleted from the COM+ Catalog,Windows
5890,An object was added to the COM+ Catalog,Windows
6144,Security policy in the group policy objects has been applied successfully,Windows
6145,One or more errors occured while processing security policy in the group policy objects,Windows
6272,Network Policy Server granted access to a user,Windows
6273,Network Policy Server denied access to a user,Windows
6274,Network Policy Server discarded the request for a user,Windows
6275,Network Policy Server discarded the accounting request for a user,Windows
6276,Network Policy Server quarantined a user,Windows
6277,Network Policy Server granted access to a user but put it on probation because the host did not meet the defined health policy,Windows
6278,Network Policy Server granted full access to a user because the host met the defined health policy,Windows
6279,Network Policy Server locked the user account due to repeated failed authentication attempts,Windows
6280,Network Policy Server unlocked the user account,Windows
6281,Code Integrity determined that the page hashes of an image file are not valid...,Windows
6400,BranchCache: Received an incorrectly formatted response while discovering availability of content.,Windows
6401,BranchCache: Received invalid data from a peer. Data discarded.,Windows
6402,BranchCache: The message to the hosted cache offering it data is incorrectly formatted.,Windows
6403,BranchCache: The hosted cache sent an incorrectly formatted response to the client's message to offer it data.,Windows
6404,BranchCache: Hosted cache could not be authenticated using the provisioned SSL certificate.,Windows
6405,BranchCache: %2 instance(s) of event id %1 occurred.,Windows
6406,%1 registered to Windows Firewall to control filtering for the following:,Windows
6407,%1,Windows
6408,Registered product %1 failed and Windows Firewall is now controlling the filtering for %2.,Windows
6409,BranchCache: A service connection point object could not be parsed,Windows
6410,Code integrity determined that a file does not meet the security requirements to load into a process. This could be due to the use of shared sections or other issues,Windows
6416,A new external device was recognized by the system.,Windows
6417,The FIPS mode crypto selftests succeeded,Windows
6418,The FIPS mode crypto selftests failed,Windows
6419,A request was made to disable a device,Windows
6420,A device was disabled,Windows
6421,A request was made to enable a device,Windows
6422,A device was enabled,Windows
6423,The installation of this device is forbidden by system policy,Windows
6424,"The installation of this device was allowed, after having previously been forbidden by policy",Windows
8191,Highest System-Defined Audit Message Value,Windows
11,Site collection audit policy changed,SharePoint
12,Audit policy changed,SharePoint
13,Document checked in,SharePoint
14,Document checked out,SharePoint
15,Child object deleted,SharePoint
16,Child object moved,SharePoint
17,Object copied,SharePoint
18,Custom event,SharePoint
19,Object deleted,SharePoint
20,SharePoint audit logs deleted,SharePoint
21,Object moved,SharePoint
22,Object profile changed,SharePoint
23,SharePoint object structure changed,SharePoint
24,Search performed,SharePoint
25,SharePoint group created,SharePoint
26,SharePoint group deleted,SharePoint
27,SharePoint group member added,SharePoint
28,SharePoint group member removed,SharePoint
29,Unique permissions created,SharePoint
30,Unique permissions removed,SharePoint
31,Permissions updated,SharePoint
32,Permissions removed,SharePoint
33,Unique permission levels created,SharePoint
34,Permission level created,SharePoint
35,Permission level deleted,SharePoint
36,Permission level modified,SharePoint
37,SharePoint site collection administrator added,SharePoint
38,SharePoint site collection administrator removed,SharePoint
39,Object restored,SharePoint
40,Site collection updated,SharePoint
41,Web updated,SharePoint
42,Document library updated,SharePoint
43,Document updated,SharePoint
44,List updated,SharePoint
45,List item updated,SharePoint
46,Folder updated,SharePoint
47,Document viewed,SharePoint
48,Document library viewed,SharePoint
49,List viewed,SharePoint
50,Object viewed,SharePoint
51,Workflow accessed,SharePoint
52,Information management policy created,SharePoint
53,Information management policy changed,SharePoint
54,Site collection information management policy created,SharePoint
55,Site collection information management policy changed,SharePoint
56,Export of objects started,SharePoint
57,Export of objects completed,SharePoint
58,Import of objects started,SharePoint
59,Import of objects completed,SharePoint
60,Possible tampering warning,SharePoint
61,Retention policy processed,SharePoint
62,Document fragment updated,SharePoint
63,Content type imported,SharePoint
64,Information management policy deleted,SharePoint
65,Item declared as a record,SharePoint
66,Item undeclared as a record,SharePoint
24000,SQL audit event,SQL Server
24001,Login succeeded (action_id LGIS),SQL Server
24002,Logout succeeded (action_id LGO),SQL Server
24003,Login failed (action_id LGIF),SQL Server
24004,Change own password succeeded (action_id PWCS; class_type LX),SQL Server
24005,Change own password failed (action_id PWCS; class_type LX),SQL Server
24006,Change password succeeded (action_id PWC class_type LX),SQL Server
24007,Change password failed (action_id PWC class_type LX),SQL Server
24008,Reset own password succeeded (action_id PWRS; class_type LX),SQL Server
24009,Reset own password failed (action_id PWRS; class_type LX),SQL Server
24010,Reset password succeeded (action_id PWR; class_type LX),SQL Server
24011,Reset password failed (action_id PWR; class_type LX),SQL Server
24012,Must change password (action_id PWMC),SQL Server
24013,Account unlocked (action_id PWU),SQL Server
24014,Change application role password succeeded (action_id PWC; class_type AR),SQL Server
24015,Change application role password failed (action_id PWC class_type AR),SQL Server
24016,Add member to server role succeeded (action_id APRL class_type SG),SQL Server
24017,Add member to server role failed (action_id APRL class_type SG),SQL Server
24018,Remove member from server role succeeded (action_id DPRL class_type SG),SQL Server
24019,Remove member from server role failed (action_id DPRL class_type SG),SQL Server
24020,Add member to database role succeeded (action_id APRL class_type RL),SQL Server
24021,Add member to database role failed (action_id APRL class_type RL),SQL Server
24022,Remove member from database role succeeded (action_id DPRL class_type RL),SQL Server
24023,Remove member from database role failed (action_id DPRL class_type RL),SQL Server
24024,Issued database backup command (action_id BA class_type DB),SQL Server
24025,Issued transaction log backup command (action_id BAL),SQL Server
24026,Issued database restore command (action_id RS class_type DB),SQL Server
24027,Issued transaction log restore command (action_id RS class_type DB),SQL Server
24028,Issued database console command (action_id DBCC),SQL Server
24029,Issued a bulk administration command (action_id ADBO),SQL Server
24030,Issued an alter connection command (action_id ALCN),SQL Server
24031,Issued an alter resources command (action_id ALRS),SQL Server
24032,Issued an alter server state command (action_id ALSS),SQL Server
24033,Issued an alter server settings command (action_id ALST),SQL Server
24034,Issued a view server state command (action_id VSST),SQL Server
24035,Issued an external access assembly command (action_id XA),SQL Server
24036,Issued an unsafe assembly command (action_id XU),SQL Server
24037,Issued an alter resource governor command (action_id ALRS class_type RG),SQL Server
24038,Issued a database authenticate command (action_id AUTH),SQL Server
24039,Issued a database checkpoint command (action_id CP),SQL Server
24040,Issued a database show plan command (action_id SPLN),SQL Server
24041,Issued a subscribe to query information command (action_id SUQN),SQL Server
24042,Issued a view database state command (action_id VDST),SQL Server
24043,Issued a change server audit command (action_id AL class_type A),SQL Server
24044,Issued a change server audit specification command (action_id AL class_type SA),SQL Server
24045,Issued a change database audit specification command (action_id AL class_type DA),SQL Server
24046,Issued a create server audit command (action_id CR class_type A),SQL Server
24047,Issued a create server audit specification command (action_id CR class_type SA),SQL Server
24048,Issued a create database audit specification command (action_id CR class_type DA),SQL Server
24049,Issued a delete server audit command (action_id DR class_type A),SQL Server
24050,Issued a delete server audit specification command (action_id DR class_type SA),SQL Server
24051,Issued a delete database audit specification command (action_id DR class_type DA),SQL Server
24052,Audit failure (action_id AUSF),SQL Server
24053,Audit session changed (action_id AUSC),SQL Server
24054,Started SQL server (action_id SVSR),SQL Server
24055,Paused SQL server (action_id SVPD),SQL Server
24056,Resumed SQL server (action_id SVCN),SQL Server
24057,Stopped SQL server (action_id SVSD),SQL Server
24058,"Issued a create server object command (action_id CR; class_type AG, EP, SD, SE, T)",SQL Server
24059,"Issued a change server object command (action_id AL; class_type AG, EP, SD, SE, T)",SQL Server
24060,"Issued a delete server object command (action_id DR; class_type AG, EP, SD, SE, T)",SQL Server
24061,Issued a create server setting command (action_id CR class_type SR),SQL Server
24062,Issued a change server setting command (action_id AL class_type SR),SQL Server
24063,Issued a delete server setting command (action_id DR class_type SR),SQL Server
24064,Issued a create server cryptographic provider command (action_id CR class_type CP),SQL Server
24065,Issued a delete server cryptographic provider command (action_id DR class_type CP),SQL Server
24066,Issued a change server cryptographic provider command (action_id AL class_type CP),SQL Server
24067,Issued a create server credential command (action_id CR class_type CD),SQL Server
24068,Issued a delete server credential command (action_id DR class_type CD),SQL Server
24069,Issued a change server credential command (action_id AL class_type CD),SQL Server
24070,Issued a change server master key command (action_id AL class_type MK),SQL Server
24071,Issued a back up server master key command (action_id BA class_type MK),SQL Server
24072,Issued a restore server master key command (action_id RS class_type MK),SQL Server
24073,Issued a map server credential to login command (action_id CMLG),SQL Server
24074,Issued a remove map between server credential and login command (action_id NMLG),SQL Server
24075,"Issued a create server principal command (action_id CR class_type LX, SL)",SQL Server
24076,"Issued a delete server principal command (action_id DR class_type LX, SL)",SQL Server
24077,Issued a change server principal credentials command (action_id CCLG),SQL Server
24078,Issued a disable server principal command (action_id LGDA),SQL Server
24079,Issued a change server principal default database command (action_id LGDB),SQL Server
24080,Issued an enable server principal command (action_id LGEA),SQL Server
24081,Issued a change server principal default language command (action_id LGLG),SQL Server
24082,Issued a change server principal password expiration command (action_id PWEX),SQL Server
24083,Issued a change server principal password policy command (action_id PWPL),SQL Server
24084,Issued a change server principal name command (action_id LGNM),SQL Server
24085,Issued a create database command (action_id CR class_type DB),SQL Server
24086,Issued a change database command (action_id AL class_type DB),SQL Server
24087,Issued a delete database command (action_id DR class_type DB),SQL Server
24088,Issued a create certificate command (action_id CR class_type CR),SQL Server
24089,Issued a change certificate command (action_id AL class_type CR),SQL Server
24090,Issued a delete certificate command (action_id DR class_type CR),SQL Server
24091,Issued a back up certificate command (action_id BA class_type CR),SQL Server
24092,Issued an access certificate command (action_id AS class_type CR),SQL Server
24093,Issued a create asymmetric key command (action_id CR class_type AK),SQL Server
24094,Issued a change asymmetric key command (action_id AL class_type AK),SQL Server
24095,Issued a delete asymmetric key command (action_id DR class_type AK),SQL Server
24096,Issued an access asymmetric key command (action_id AS class_type AK),SQL Server
24097,Issued a create database master key command (action_id CR class_type MK),SQL Server
24098,Issued a change database master key command (action_id AL class_type MK),SQL Server
24099,Issued a delete database master key command (action_id DR class_type MK),SQL Server
24100,Issued a back up database master key command (action_id BA class_type MK),SQL Server
24101,Issued a restore database master key command (action_id RS class_type MK),SQL Server
24102,Issued an open database master key command (action_id OP class_type MK),SQL Server
24103,Issued a create database symmetric key command (action_id CR class_type SK),SQL Server
24104,Issued a change database symmetric key command (action_id AL class_type SK),SQL Server
24105,Issued a delete database symmetric key command (action_id DR class_type SK),SQL Server
24106,Issued a back up database symmetric key command (action_id BA class_type SK),SQL Server
24107,Issued an open database symmetric key command (action_id OP class_type SK),SQL Server
24108,Issued a create database object command (action_id CR),SQL Server
24109,Issued a change database object command (action_id AL),SQL Server
24110,Issued a delete database object command (action_id DR),SQL Server
24111,Issued an access database object command (action_id AS),SQL Server
24112,Issued a create assembly command (action_id CR class_type AS),SQL Server
24113,Issued a change assembly command (action_id AL class_type AS),SQL Server
24114,Issued a delete assembly command (action_id DR class_type AS),SQL Server
24115,Issued a create schema command (action_id CR class_type SC),SQL Server
24116,Issued a change schema command (action_id AL class_type SC),SQL Server
24117,Issued a delete schema command (action_id DR class_type SC),SQL Server
24118,Issued a create database encryption key command (action_id CR class_type DK),SQL Server
24119,Issued a change database encryption key command (action_id AL class_type DK),SQL Server
24120,Issued a delete database encryption key command (action_id DR class_type DK),SQL Server
24121,Issued a create database user command (action_id CR; class_type US),SQL Server
24122,Issued a change database user command (action_id AL; class_type US),SQL Server
24123,Issued a delete database user command (action_id DR; class_type US),SQL Server
24124,Issued a create database role command (action_id CR class_type RL),SQL Server
24125,Issued a change database role command (action_id AL class_type RL),SQL Server
24126,Issued a delete database role command (action_id DR class_type RL),SQL Server
24127,Issued a create application role command (action_id CR class_type AR),SQL Server
24128,Issued a change application role command (action_id AL class_type AR),SQL Server
24129,Issued a delete application role command (action_id DR class_type AR),SQL Server
24130,Issued a change database user login command (action_id USAF),SQL Server
24131,Issued an auto-change database user login command (action_id USLG),SQL Server
24132,Issued a create schema object command (action_id CR class_type D),SQL Server
24133,Issued a change schema object command (action_id AL class_type D),SQL Server
24134,Issued a delete schema object command (action_id DR class_type D),SQL Server
24135,Issued a transfer schema object command (action_id TRO class_type D),SQL Server
24136,Issued a create schema type command (action_id CR class_type TY),SQL Server
24137,Issued a change schema type command (action_id AL class_type TY),SQL Server
24138,Issued a delete schema type command (action_id DR class_type TY),SQL Server
24139,Issued a transfer schema type command (action_id TRO class_type TY),SQL Server
24140,Issued a create XML schema collection command (action_id CR class_type SX),SQL Server
24141,Issued a change XML schema collection command (action_id AL class_type SX),SQL Server
24142,Issued a delete XML schema collection command (action_id DR class_type SX),SQL Server
24143,Issued a transfer XML schema collection command (action_id TRO class_type SX),SQL Server
24144,Issued an impersonate within server scope command (action_id IMP; class_type LX),SQL Server
24145,Issued an impersonate within database scope command (action_id IMP; class_type US),SQL Server
24146,Issued a change server object owner command (action_id TO class_type SG),SQL Server
24147,Issued a change database owner command (action_id TO class_type DB),SQL Server
24148,Issued a change schema owner command (action_id TO class_type SC),SQL Server
24150,Issued a change role owner command (action_id TO class_type RL),SQL Server
24151,Issued a change database object owner command (action_id TO),SQL Server
24152,Issued a change symmetric key owner command (action_id TO class_type SK),SQL Server
24153,Issued a change certificate owner command (action_id TO class_type CR),SQL Server
24154,Issued a change asymmetric key owner command (action_id TO class_type AK),SQL Server
24155,Issued a change schema object owner command (action_id TO class_type OB),SQL Server
24156,Issued a change schema type owner command (action_id TO class_type TY),SQL Server
24157,Issued a change XML schema collection owner command (action_id TO class_type SX),SQL Server
24158,Grant server permissions succeeded (action_id G class_type SR),SQL Server
24159,Grant server permissions failed (action_id G class_type SR),SQL Server
24160,Grant server permissions with grant succeeded (action_id GWG class_type SR),SQL Server
24161,Grant server permissions with grant failed (action_id GWG class_type SR),SQL Server
24162,Deny server permissions succeeded (action_id D class_type SR),SQL Server
24163,Deny server permissions failed (action_id D class_type SR),SQL Server
24164,Deny server permissions with cascade succeeded (action_id DWC class_type SR),SQL Server
24165,Deny server permissions with cascade failed (action_id DWC class_type SR),SQL Server
24166,Revoke server permissions succeeded (action_id R class_type SR),SQL Server
24167,Revoke server permissions failed (action_id R class_type SR),SQL Server
24168,Revoke server permissions with grant succeeded (action_id RWG class_type SR),SQL Server
24169,Revoke server permissions with grant failed (action_id RWG class_type SR),SQL Server
24170,Revoke server permissions with cascade succeeded (action_id RWC class_type SR),SQL Server
24171,Revoke server permissions with cascade failed (action_id RWC class_type SR),SQL Server
24172,Issued grant server object permissions command (action_id G; class_type LX),SQL Server
24173,Issued grant server object permissions with grant command (action_id GWG; class_type LX),SQL Server
24174,Issued deny server object permissions command (action_id D; class_type LX),SQL Server
24175,Issued deny server object permissions with cascade command (action_id DWC; class_type LX),SQL Server
24176,Issued revoke server object permissions command (action_id R; class_type LX),SQL Server
24177,Issued revoke server object permissions with grant command (action_id; RWG class_type LX),SQL Server
24178,Issued revoke server object permissions with cascade command (action_id RWC; class_type LX),SQL Server
24179,Grant database permissions succeeded (action_id G class_type DB),SQL Server
24180,Grant database permissions failed (action_id G class_type DB),SQL Server
24181,Grant database permissions with grant succeeded (action_id GWG class_type DB),SQL Server
24182,Grant database permissions with grant failed (action_id GWG class_type DB),SQL Server
24183,Deny database permissions succeeded (action_id D class_type DB),SQL Server
24184,Deny database permissions failed (action_id D class_type DB),SQL Server
24185,Deny database permissions with cascade succeeded (action_id DWC class_type DB),SQL Server
24186,Deny database permissions with cascade failed (action_id DWC class_type DB),SQL Server
24187,Revoke database permissions succeeded (action_id R class_type DB),SQL Server
24188,Revoke database permissions failed (action_id R class_type DB),SQL Server
24189,Revoke database permissions with grant succeeded (action_id RWG class_type DB),SQL Server
24190,Revoke database permissions with grant failed (action_id RWG class_type DB),SQL Server
24191,Revoke database permissions with cascade succeeded (action_id RWC class_type DB),SQL Server
24192,Revoke database permissions with cascade failed (action_id RWC class_type DB),SQL Server
24193,Issued grant database object permissions command (action_id G class_type US),SQL Server
24194,Issued grant database object permissions with grant command (action_id GWG; class_type US),SQL Server
24195,Issued deny database object permissions command (action_id D; class_type US),SQL Server
24196,Issued deny database object permissions with cascade command (action_id DWC; class_type US),SQL Server
24197,Issued revoke database object permissions command (action_id R; class_type US),SQL Server
24198,Issued revoke database object permissions with grant command (action_id RWG; class_type US),SQL Server
24199,Issued revoke database object permissions with cascade command (action_id RWC; class_type US),SQL Server
24200,Issued grant schema permissions command (action_id G class_type SC),SQL Server
24201,Issued grant schema permissions with grant command (action_id GWG class_type SC),SQL Server
24202,Issued deny schema permissions command (action_id D class_type SC),SQL Server
24203,Issued deny schema permissions with cascade command (action_id DWC class_type SC),SQL Server
24204,Issued revoke schema permissions command (action_id R class_type SC),SQL Server
24205,Issued revoke schema permissions with grant command (action_id RWG class_type SC),SQL Server
24206,Issued revoke schema permissions with cascade command (action_id RWC class_type SC),SQL Server
24207,Issued grant assembly permissions command (action_id G class_type AS),SQL Server
24208,Issued grant assembly permissions with grant command (action_id GWG class_type AS),SQL Server
24209,Issued deny assembly permissions command (action_id D class_type AS),SQL Server
24210,Issued deny assembly permissions with cascade command (action_id DWC class_type AS),SQL Server
24211,Issued revoke assembly permissions command (action_id R class_type AS),SQL Server
24212,Issued revoke assembly permissions with grant command (action_id RWG class_type AS),SQL Server
24213,Issued revoke assembly permissions with cascade command (action_id RWC class_type AS),SQL Server
24214,Issued grant database role permissions command (action_id G class_type RL),SQL Server
24215,Issued grant database role permissions with grant command (action_id GWG class_type RL),SQL Server
24216,Issued deny database role permissions command (action_id D class_type RL),SQL Server
24217,Issued deny database role permissions with cascade command (action_id DWC class_type RL),SQL Server
24218,Issued revoke database role permissions command (action_id R class_type RL),SQL Server
24219,Issued revoke database role permissions with grant command (action_id RWG class_type RL),SQL Server
24220,Issued revoke database role permissions with cascade command (action_id RWC class_type RL),SQL Server
24221,Issued grant application role permissions command (action_id G class_type AR),SQL Server
24222,Issued grant application role permissions with grant command (action_id GWG class_type AR),SQL Server
24223,Issued deny application role permissions command (action_id D class_type AR),SQL Server
24224,Issued deny application role permissions with cascade command (action_id DWC class_type AR),SQL Server
24225,Issued revoke application role permissions command (action_id R class_type AR),SQL Server
24226,Issued revoke application role permissions with grant command (action_id RWG class_type AR),SQL Server
24227,Issued revoke application role permissions with cascade command (action_id RWC class_type AR),SQL Server
24228,Issued grant symmetric key permissions command (action_id G class_type SK),SQL Server
24229,Issued grant symmetric key permissions with grant command (action_id GWG class_type SK),SQL Server
24230,Issued deny symmetric key permissions command (action_id D class_type SK),SQL Server
24231,Issued deny symmetric key permissions with cascade command (action_id DWC class_type SK),SQL Server
24232,Issued revoke symmetric key permissions command (action_id R class_type SK),SQL Server
24233,Issued revoke symmetric key permissions with grant command (action_id RWG class_type SK),SQL Server
24234,Issued revoke symmetric key permissions with cascade command (action_id RWC class_type SK),SQL Server
24235,Issued grant certificate permissions command (action_id G class_type CR),SQL Server
24236,Issued grant certificate permissions with grant command (action_id GWG class_type CR),SQL Server
24237,Issued deny certificate permissions command (action_id D class_type CR),SQL Server
24238,Issued deny certificate permissions with cascade command (action_id DWC class_type CR),SQL Server
24239,Issued revoke certificate permissions command (action_id R class_type CR),SQL Server
24240,Issued revoke certificate permissions with grant command (action_id RWG class_type CR),SQL Server
24241,Issued revoke certificate permissions with cascade command (action_id RWC class_type CR),SQL Server
24242,Issued grant asymmetric key permissions command (action_id G class_type AK),SQL Server
24243,Issued grant asymmetric key permissions with grant command (action_id GWG class_type AK),SQL Server
24244,Issued deny asymmetric key permissions command (action_id D class_type AK),SQL Server
24245,Issued deny asymmetric key permissions with cascade command (action_id DWC class_type AK),SQL Server
24246,Issued revoke asymmetric key permissions command (action_id R class_type AK),SQL Server
24247,Issued revoke asymmetric key permissions with grant command (action_id RWG class_type AK),SQL Server
24248,Issued revoke asymmetric key permissions with cascade command (action_id RWC class_type AK),SQL Server
24249,Issued grant schema object permissions command (action_id G class_type OB),SQL Server
24250,Issued grant schema object permissions with grant command (action_id GWG class_type OB),SQL Server
24251,Issued deny schema object permissions command (action_id D class_type OB),SQL Server
24252,Issued deny schema object permissions with cascade command (action_id DWC class_type OB),SQL Server
24253,Issued revoke schema object permissions command (action_id R class_type OB),SQL Server
24254,Issued revoke schema object permissions with grant command (action_id RWG class_type OB),SQL Server
24255,Issued revoke schema object permissions with cascade command (action_id RWC class_type OB),SQL Server
24256,Issued grant schema type permissions command (action_id G class_type TY),SQL Server
24257,Issued grant schema type permissions with grant command (action_id GWG class_type TY),SQL Server
24258,Issued deny schema type permissions command (action_id D class_type TY),SQL Server
24259,Issued deny schema type permissions with cascade command (action_id DWC class_type TY),SQL Server
24260,Issued revoke schema type permissions command (action_id R class_type TY),SQL Server
24261,Issued revoke schema type permissions with grant command (action_id RWG class_type TY),SQL Server
24262,Issued revoke schema type permissions with cascade command (action_id RWC class_type TY),SQL Server
24263,Issued grant XML schema collection permissions command (action_id G class_type SX),SQL Server
24264,Issued grant XML schema collection permissions with grant command (action_id GWG class_type SX),SQL Server
24265,Issued deny XML schema collection permissions command (action_id D class_type SX),SQL Server
24266,Issued deny XML schema collection permissions with cascade command (action_id DWC class_type SX),SQL Server
24267,Issued revoke XML schema collection permissions command (action_id R class_type SX),SQL Server
24268,Issued revoke XML schema collection permissions with grant command (action_id RWG class_type SX),SQL Server
24269,Issued revoke XML schema collection permissions with cascade command (action_id RWC class_type SX),SQL Server
24270,Issued reference database object permissions command (action_id RF),SQL Server
24271,Issued send service request command (action_id SN),SQL Server
24272,Issued check permissions with schema command (action_id VWCT),SQL Server
24273,Issued use service broker transport security command (action_id LGB),SQL Server
24274,Issued use database mirroring transport security command (action_id LGM),SQL Server
24275,Issued alter trace command (action_id ALTR),SQL Server
24276,Issued start trace command (action_id TASA),SQL Server
24277,Issued stop trace command (action_id TASP),SQL Server
24278,Issued enable trace C2 audit mode command (action_id C2ON),SQL Server
24279,Issued disable trace C2 audit mode command (action_id C2OF),SQL Server
24280,Issued server full-text command (action_id FT),SQL Server
24281,Issued select command (action_id SL),SQL Server
24282,Issued update command (action_id UP),SQL Server
24283,Issued insert command (action_id IN),SQL Server
24284,Issued delete command (action_id DL),SQL Server
24285,Issued execute command (action_id EX),SQL Server
24286,Issued receive command (action_id RC),SQL Server
24287,Issued check references command (action_id RF),SQL Server
24288,Issued a create user-defined server role command (action_id CR class_type SG),SQL Server
24289,Issued a change user-defined server role command (action_id AL class_type SG),SQL Server
24290,Issued a delete user-defined server role command (action_id DR class_type SG),SQL Server
24291,Issued grant user-defined server role permissions command (action_id G class_type SG),SQL Server
24292,Issued grant user-defined server role permissions with grant command (action_id GWG class_type SG),SQL Server
24293,Issued deny user-defined server role permissions command (action_id D class_type SG),SQL Server
24294,Issued deny user-defined server role permissions with cascade command (action_id DWC class_type SG),SQL Server
24295,Issued revoke user-defined server role permissions command (action_id R class_type SG),SQL Server
24296,Issued revoke user-defined server role permissions with grant command (action_id RWG class_type SG),SQL Server
24297,Issued revoke user-defined server role permissions with cascade command (action_id RWC class_type SG),SQL Server
24298,Database login succeeded (action_id DBAS),SQL Server
24299,Database login failed (action_id DBAF),SQL Server
24300,Database logout successful (action_id DAGL),SQL Server
24301,Change password succeeded (action_id PWC; class_type US),SQL Server
24302,Change password failed (action_id PWC; class_type US),SQL Server
24303,Change own password succeeded (action_id PWCS; class_type US),SQL Server
24304,Change own password failed (action_id PWCS; class_type US),SQL Server
24305,Reset own password succeeded (action_id PWRS; class_type US),SQL Server
24306,Reset own password failed (action_id PWRS; class_type US),SQL Server
24307,Reset password succeeded (action_id PWR; class_type US),SQL Server
24308,Reset password failed (action_id PWR; class_type US),SQL Server
24309,Copy password (action_id USTC),SQL Server
24310,User-defined SQL audit event (action_id UDAU),SQL Server
24311,Issued a change database audit command (action_id AL class_type DU),SQL Server
24312,Issued a create database audit command (action_id CR class_type DU),SQL Server
24313,Issued a delete database audit command (action_id DR class_type DU),SQL Server
24314,Issued a begin transaction command (action_id TXBG),SQL Server
24315,Issued a commit transaction command (action_id TXCM),SQL Server
24316,Issued a rollback transaction command (action_id TXRB),SQL Server
24317,Issued a create column master key command (action_id CR; class_type CM),SQL Server
24318,Issued a delete column master key command (action_id DR; class_type CM),SQL Server
24319,A column master key was viewed (action_id VW; class_type CM),SQL Server
24320,Issued a create column encryption key command (action_id CR; class_type CK),SQL Server
24321,Issued a change column encryption key command (action_id AL; class_type CK),SQL Server
24322,Issued a delete column encryption key command (action_id DR; class_type CK),SQL Server
24323,A column encryption key was viewed (action_id VW; class_type CK),SQL Server
24324,Issued a create database credential command (action_id CR; class_type DC),SQL Server
24325,Issued a change database credential command (action_id AL; class_type DC),SQL Server
24326,Issued a delete database credential command (action_id DR; class_type DC),SQL Server
24327,Issued a change database scoped configuration command (action_id AL; class_type DS),SQL Server
24328,Issued a create external data source command (action_id CR; class_type ED),SQL Server
24329,Issued a change external data source command (action_id AL; class_type ED),SQL Server
24330,Issued a delete external data source command (action_id DR; class_type ED),SQL Server
24331,Issued a create external file format command (action_id CR; class_type EF),SQL Server
24332,Issued a delete external file format command (action_id DR; class_type EF),SQL Server
24333,Issued a create external resource pool command (action_id CR; class_type ER),SQL Server
24334,Issued a change external resource pool command (action_id AL; class_type ER),SQL Server
24335,Issued a delete external resource pool command (action_id DR; class_type ER),SQL Server
24337,Global transaction login (action_id LGG),SQL Server
24338,Grant permissions on a database scoped credential succeeded (action_id G; class_type DC),SQL Server
24339,Grant permissions on a database scoped credential failed (action_id G; class_type DC),SQL Server
24340,Grant permissions on a database scoped credential with grant succeeded (action_id GWG; class_type DC),SQL Server
24341,Grant permissions on a database scoped credential with grant failed (action_id GWG; class_type DC),SQL Server
24342,Deny permissions on a database scoped credential succeeded (action_id D; class_type DC),SQL Server
24343,Deny permissions on a database scoped credential failed (action_id D; class_type DC),SQL Server
24344,Deny permissions on a database scoped credential with cascade succeeded (action_id DWC; class_type DC),SQL Server
24345,Deny permissions on a database scoped credential with cascade failed (action_id DWC; class_type DC),SQL Server
24346,Revoke permissions on a database scoped credential succeeded (action_id R; class_type DC),SQL Server
24347,Revoke permissions on a database scoped credential failed (action_id R; class_type DC),SQL Server
24348,Revoke permissions with cascade on a database scoped credential succeeded (action_id RWC; class_type DC),SQL Server
24349,Issued a change assembly owner command (action_id TO class_type AS),SQL Server
24350,Revoke permissions with cascade on a database scoped credential failed (action_id RWC; class_type DC),SQL Server
24351,Revoke permissions with grant on a database scoped credential succeeded (action_id RWG; class_type DC),SQL Server
24352,Revoke permissions with grant on a database scoped credential failed (action_id RWG; class_type DC),SQL Server
24353,Issued a change database scoped credential owner command (action_id TO; class_type DC),SQL Server
24354,Issued a create external library command (action_id CR; class_type EL),SQL Server
24355,Issued a change external library command (action_id AL; class_type EL),SQL Server
24356,Issued a drop external library command (action_id DR; class_type EL),SQL Server
24357,Grant permissions on an external library succeeded (action_id G; class_type EL),SQL Server
24358,Grant permissions on an external library failed (action_id G; class_type EL),SQL Server
24359,Grant permissions on an external library with grant succeeded (action_id GWG; class_type EL),SQL Server
24360,Grant permissions on an external library with grant failed (action_id GWG; class_type EL),SQL Server
24361,Deny permissions on an external library succeeded (action_id D; class_type EL),SQL Server
24362,Deny permissions on an external library failed (action_id D; class_type EL),SQL Server
24363,Deny permissions on an external library with cascade succeeded (action_id DWC; class_type EL),SQL Server
24364,Deny permissions on an external library with cascade failed (action_id DWC; class_type EL),SQL Server
24365,Revoke permissions on an external library succeeded (action_id R; class_type EL),SQL Server
24366,Revoke permissions on an external library failed (action_id R; class_type EL),SQL Server
24367,Revoke permissions with cascade on an external library succeeded (action_id RWC; class_type EL),SQL Server
24368,Revoke permissions with cascade on an external library failed (action_id RWC; class_type EL),SQL Server
24369,Revoke permissions with grant on an external library succeeded (action_id RWG; class_type EL),SQL Server
24370,Revoke permissions with grant on an external library failed (action_id RWG; class_type EL),SQL Server
24371,Issued a create database scoped resource governor command (action_id CR; class_type DR),SQL Server
24372,Issued a change database scoped resource governor command (action_id AL; class_type DR),SQL Server
24373,Issued a drop database scoped resource governor command (action_id DR; class_type DR),SQL Server
24374,Issued a database bulk administration command (action_id DABO; class_type DB),SQL Server
24375,"Command to change permission failed (action_id D, DWC, G, GWG, R, RWC, RWG; class_type DC, EL)",SQL Server
25000,Undocumented Exchange mailbox operation,Exchange
25001,Operation Copy - Copy item to another Exchange mailbox folder,Exchange
25002,Operation Create - Create item in Exchange mailbox,Exchange
25003,Operation FolderBind - Access Exchange mailbox folder,Exchange
25004,Operation HardDelete - Delete Exchange mailbox item permanently from Recoverable Items folder,Exchange
25005,Operation MessageBind - Access Exchange mailbox item,Exchange
25006,Operation Move - Move item to another Exchange mailbox folder,Exchange
25007,Operation MoveToDeletedItems - Move Exchange mailbox item to Deleted Items folder,Exchange
25008,Operation SendAs - Send message using Send As Exchange mailbox permissions,Exchange
25009,Operation SendOnBehalf - Send message using Send on Behalf Exchange mailbox permissions,Exchange
25010,Operation SoftDelete - Delete Exchange mailbox item from Deleted Items folder,Exchange
25011,Operation Update - Update Exchange mailbox item's properties,Exchange
25100,Information Event - Mailbox audit policy applied,Exchange
25100,Undocumented Exchange admin operation,Exchange
25101,Add-ADPermission Exchange cmdlet issued,Exchange
25102,Add-AvailabilityAddressSpace Exchange cmdlet issued,Exchange
25103,Add-ContentFilterPhrase Exchange cmdlet issued,Exchange
25104,Add-DatabaseAvailabilityGroupServer Exchange cmdlet issued,Exchange
25105,Add-DistributionGroupMember Exchange cmdlet issued,Exchange
25106,Add-FederatedDomain Exchange cmdlet issued,Exchange
25107,Add-IPAllowListEntry Exchange cmdlet issued,Exchange
25108,Add-IPAllowListProvider Exchange cmdlet issued,Exchange
25109,Add-IPBlockListEntry Exchange cmdlet issued,Exchange
25110,Add-IPBlockListProvider Exchange cmdlet issued,Exchange
25111,Add-MailboxDatabaseCopy Exchange cmdlet issued,Exchange
25112,Add-MailboxFolderPermission Exchange cmdlet issued,Exchange
25113,Add-MailboxPermission Exchange cmdlet issued,Exchange
25114,Add-ManagementRoleEntry Exchange cmdlet issued,Exchange
25115,Add-PublicFolderAdministrativePermission Exchange cmdlet issued,Exchange
25116,Add-PublicFolderClientPermission Exchange cmdlet issued,Exchange
25117,Add-RoleGroupMember Exchange cmdlet issued,Exchange
25118,Clean-MailboxDatabase Exchange cmdlet issued,Exchange
25119,Clear-ActiveSyncDevice Exchange cmdlet issued,Exchange
25120,Clear-TextMessagingAccount Exchange cmdlet issued,Exchange
25121,Compare-TextMessagingVerificationCode Exchange cmdlet issued,Exchange
25122,Connect-Mailbox Exchange cmdlet issued,Exchange
25123,Disable-AddressListPaging Exchange cmdlet issued,Exchange
25124,Disable-CmdletExtensionAgent Exchange cmdlet issued,Exchange
25125,Disable-DistributionGroup Exchange cmdlet issued,Exchange
25126,Disable-InboxRule Exchange cmdlet issued,Exchange
25127,Disable-JournalRule Exchange cmdlet issued,Exchange
25128,Disable-Mailbox Exchange cmdlet issued,Exchange
25129,Disable-MailContact Exchange cmdlet issued,Exchange
25130,Disable-MailPublicFolder Exchange cmdlet issued,Exchange
25131,Disable-MailUser Exchange cmdlet issued,Exchange
25132,Disable-OutlookAnywhere Exchange cmdlet issued,Exchange
25133,Disable-OutlookProtectionRule Exchange cmdlet issued,Exchange
25134,Disable-RemoteMailbox Exchange cmdlet issued,Exchange
25135,Disable-ServiceEmailChannel Exchange cmdlet issued,Exchange
25136,Disable-TransportAgent Exchange cmdlet issued,Exchange
25137,Disable-TransportRule Exchange cmdlet issued,Exchange
25138,Disable-UMAutoAttendant Exchange cmdlet issued,Exchange
25139,Disable-UMIPGateway Exchange cmdlet issued,Exchange
25140,Disable-UMMailbox Exchange cmdlet issued,Exchange
25141,Disable-UMServer Exchange cmdlet issued,Exchange
25142,Dismount-Database Exchange cmdlet issued,Exchange
25143,Enable-AddressListPaging Exchange cmdlet issued,Exchange
25144,Enable-AntispamUpdates Exchange cmdlet issued,Exchange
25145,Enable-CmdletExtensionAgent Exchange cmdlet issued,Exchange
25146,Enable-DistributionGroup Exchange cmdlet issued,Exchange
25147,Enable-ExchangeCertificate Exchange cmdlet issued,Exchange
25148,Enable-InboxRule Exchange cmdlet issued,Exchange
25149,Enable-JournalRule Exchange cmdlet issued,Exchange
25150,Enable-Mailbox Exchange cmdlet issued,Exchange
25151,Enable-MailContact Exchange cmdlet issued,Exchange
25152,Enable-MailPublicFolder Exchange cmdlet issued,Exchange
25153,Enable-MailUser Exchange cmdlet issued,Exchange
25154,Enable-OutlookAnywhere Exchange cmdlet issued,Exchange
25155,Enable-OutlookProtectionRule Exchange cmdlet issued,Exchange
25156,Enable-RemoteMailbox Exchange cmdlet issued,Exchange
25157,Enable-ServiceEmailChannel Exchange cmdlet issued,Exchange
25158,Enable-TransportAgent Exchange cmdlet issued,Exchange
25159,Enable-TransportRule Exchange cmdlet issued,Exchange
25160,Enable-UMAutoAttendant Exchange cmdlet issued,Exchange
25161,Enable-UMIPGateway Exchange cmdlet issued,Exchange
25162,Enable-UMMailbox Exchange cmdlet issued,Exchange
25163,Enable-UMServer Exchange cmdlet issued,Exchange
25164,Export-ActiveSyncLog Exchange cmdlet issued,Exchange
25165,Export-AutoDiscoverConfig Exchange cmdlet issued,Exchange
25166,Export-ExchangeCertificate Exchange cmdlet issued,Exchange
25167,Export-JournalRuleCollection Exchange cmdlet issued,Exchange
25168,Export-MailboxDiagnosticLogs Exchange cmdlet issued,Exchange
25169,Export-Message Exchange cmdlet issued,Exchange
25170,Export-RecipientDataProperty Exchange cmdlet issued,Exchange
25171,Export-TransportRuleCollection Exchange cmdlet issued,Exchange
25172,Export-UMCallDataRecord Exchange cmdlet issued,Exchange
25173,Export-UMPrompt Exchange cmdlet issued,Exchange
25174,Import-ExchangeCertificate Exchange cmdlet issued,Exchange
25175,Import-JournalRuleCollection Exchange cmdlet issued,Exchange
25176,Import-RecipientDataProperty Exchange cmdlet issued,Exchange
25177,Import-TransportRuleCollection Exchange cmdlet issued,Exchange
25178,Import-UMPrompt Exchange cmdlet issued,Exchange
25179,Install-TransportAgent Exchange cmdlet issued,Exchange
25180,Mount-Database Exchange cmdlet issued,Exchange
25181,Move-ActiveMailboxDatabase Exchange cmdlet issued,Exchange
25182,Move-AddressList Exchange cmdlet issued,Exchange
25183,Move-DatabasePath Exchange cmdlet issued,Exchange
25184,Move-OfflineAddressBook Exchange cmdlet issued,Exchange
25185,New-AcceptedDomain Exchange cmdlet issued,Exchange
25186,New-ActiveSyncDeviceAccessRule Exchange cmdlet issued,Exchange
25187,New-ActiveSyncMailboxPolicy Exchange cmdlet issued,Exchange
25188,New-ActiveSyncVirtualDirectory Exchange cmdlet issued,Exchange
25189,New-AddressList Exchange cmdlet issued,Exchange
25190,New-AdminAuditLogSearch Exchange cmdlet issued,Exchange
25191,New-AutodiscoverVirtualDirectory Exchange cmdlet issued,Exchange
25192,New-AvailabilityReportOutage Exchange cmdlet issued,Exchange
25193,New-ClientAccessArray Exchange cmdlet issued,Exchange
25194,New-DatabaseAvailabilityGroup Exchange cmdlet issued,Exchange
25195,New-DatabaseAvailabilityGroupNetwork Exchange cmdlet issued,Exchange
25196,New-DeliveryAgentConnector Exchange cmdlet issued,Exchange
25197,New-DistributionGroup Exchange cmdlet issued,Exchange
25198,New-DynamicDistributionGroup Exchange cmdlet issued,Exchange
25199,New-EcpVirtualDirectory Exchange cmdlet issued,Exchange
25200,New-EdgeSubscription Exchange cmdlet issued,Exchange
25201,New-EdgeSyncServiceConfig Exchange cmdlet issued,Exchange
25202,New-EmailAddressPolicy Exchange cmdlet issued,Exchange
25203,New-ExchangeCertificate Exchange cmdlet issued,Exchange
25204,New-FederationTrust Exchange cmdlet issued,Exchange
25205,New-ForeignConnector Exchange cmdlet issued,Exchange
25206,New-GlobalAddressList Exchange cmdlet issued,Exchange
25207,New-InboxRule Exchange cmdlet issued,Exchange
25208,New-JournalRule Exchange cmdlet issued,Exchange
25209,New-Mailbox Exchange cmdlet issued,Exchange
25210,New-MailboxAuditLogSearch Exchange cmdlet issued,Exchange
25211,New-MailboxDatabase Exchange cmdlet issued,Exchange
25212,New-MailboxFolder Exchange cmdlet issued,Exchange
25213,New-MailboxRepairRequest Exchange cmdlet issued,Exchange
25214,New-MailboxRestoreRequest Exchange cmdlet issued,Exchange
25215,New-MailContact Exchange cmdlet issued,Exchange
25216,New-MailMessage Exchange cmdlet issued,Exchange
25217,New-MailUser Exchange cmdlet issued,Exchange
25218,New-ManagedContentSettings Exchange cmdlet issued,Exchange
25219,New-ManagedFolder Exchange cmdlet issued,Exchange
25220,New-ManagedFolderMailboxPolicy Exchange cmdlet issued,Exchange
25221,New-ManagementRole Exchange cmdlet issued,Exchange
25222,New-ManagementRoleAssignment Exchange cmdlet issued,Exchange
25223,New-ManagementScope Exchange cmdlet issued,Exchange
25224,New-MessageClassification Exchange cmdlet issued,Exchange
25225,New-MoveRequest Exchange cmdlet issued,Exchange
25226,New-OabVirtualDirectory Exchange cmdlet issued,Exchange
25227,New-OfflineAddressBook Exchange cmdlet issued,Exchange
25228,New-OrganizationRelationship Exchange cmdlet issued,Exchange
25229,New-OutlookProtectionRule Exchange cmdlet issued,Exchange
25230,New-OutlookProvider Exchange cmdlet issued,Exchange
25231,New-OwaMailboxPolicy Exchange cmdlet issued,Exchange
25232,New-OwaVirtualDirectory Exchange cmdlet issued,Exchange
25233,New-PublicFolder Exchange cmdlet issued,Exchange
25234,New-PublicFolderDatabase Exchange cmdlet issued,Exchange
25235,New-PublicFolderDatabaseRepairRequest Exchange cmdlet issued,Exchange
25236,New-ReceiveConnector Exchange cmdlet issued,Exchange
25237,New-RemoteDomain Exchange cmdlet issued,Exchange
25238,New-RemoteMailbox Exchange cmdlet issued,Exchange
25239,New-RetentionPolicy Exchange cmdlet issued,Exchange
25240,New-RetentionPolicyTag Exchange cmdlet issued,Exchange
25241,New-RoleAssignmentPolicy Exchange cmdlet issued,Exchange
25242,New-RoleGroup Exchange cmdlet issued,Exchange
25243,New-RoutingGroupConnector Exchange cmdlet issued,Exchange
25244,New-RpcClientAccess Exchange cmdlet issued,Exchange
25245,New-SendConnector Exchange cmdlet issued,Exchange
25246,New-SharingPolicy Exchange cmdlet issued,Exchange
25247,New-SystemMessage Exchange cmdlet issued,Exchange
25248,New-ThrottlingPolicy Exchange cmdlet issued,Exchange
25249,New-TransportRule Exchange cmdlet issued,Exchange
25250,New-UMAutoAttendant Exchange cmdlet issued,Exchange
25251,New-UMDialPlan Exchange cmdlet issued,Exchange
25252,New-UMHuntGroup Exchange cmdlet issued,Exchange
25253,New-UMIPGateway Exchange cmdlet issued,Exchange
25254,New-UMMailboxPolicy Exchange cmdlet issued,Exchange
25255,New-WebServicesVirtualDirectory Exchange cmdlet issued,Exchange
25256,New-X400AuthoritativeDomain Exchange cmdlet issued,Exchange
25257,Remove-AcceptedDomain Exchange cmdlet issued,Exchange
25258,Remove-ActiveSyncDevice Exchange cmdlet issued,Exchange
25259,Remove-ActiveSyncDeviceAccessRule Exchange cmdlet issued,Exchange
25260,Remove-ActiveSyncDeviceClass Exchange cmdlet issued,Exchange
25261,Remove-ActiveSyncMailboxPolicy Exchange cmdlet issued,Exchange
25262,Remove-ActiveSyncVirtualDirectory Exchange cmdlet issued,Exchange
25263,Remove-AddressList Exchange cmdlet issued,Exchange
25264,Remove-ADPermission Exchange cmdlet issued,Exchange
25265,Remove-AutodiscoverVirtualDirectory Exchange cmdlet issued,Exchange
25266,Remove-AvailabilityAddressSpace Exchange cmdlet issued,Exchange
25267,Remove-AvailabilityReportOutage Exchange cmdlet issued,Exchange
25268,Remove-ClientAccessArray Exchange cmdlet issued,Exchange
25269,Remove-ContentFilterPhrase Exchange cmdlet issued,Exchange
25270,Remove-DatabaseAvailabilityGroup Exchange cmdlet issued,Exchange
25271,Remove-DatabaseAvailabilityGroupNetwork Exchange cmdlet issued,Exchange
25272,Remove-DatabaseAvailabilityGroupServer Exchange cmdlet issued,Exchange
25273,Remove-DeliveryAgentConnector Exchange cmdlet issued,Exchange
25274,Remove-DistributionGroup Exchange cmdlet issued,Exchange
25275,Remove-DistributionGroupMember Exchange cmdlet issued,Exchange
25276,Remove-DynamicDistributionGroup Exchange cmdlet issued,Exchange
25277,Remove-EcpVirtualDirectory Exchange cmdlet issued,Exchange
25278,Remove-EdgeSubscription Exchange cmdlet issued,Exchange
25279,Remove-EmailAddressPolicy Exchange cmdlet issued,Exchange
25280,Remove-ExchangeCertificate Exchange cmdlet issued,Exchange
25281,Remove-FederatedDomain Exchange cmdlet issued,Exchange
25282,Remove-FederationTrust Exchange cmdlet issued,Exchange
25283,Remove-ForeignConnector Exchange cmdlet issued,Exchange
25284,Remove-GlobalAddressList Exchange cmdlet issued,Exchange
25285,Remove-InboxRule Exchange cmdlet issued,Exchange
25286,Remove-IPAllowListEntry Exchange cmdlet issued,Exchange
25287,Remove-IPAllowListProvider Exchange cmdlet issued,Exchange
25288,Remove-IPBlockListEntry Exchange cmdlet issued,Exchange
25289,Remove-IPBlockListProvider Exchange cmdlet issued,Exchange
25290,Remove-JournalRule Exchange cmdlet issued,Exchange
25291,Remove-Mailbox Exchange cmdlet issued,Exchange
25292,Remove-MailboxDatabase Exchange cmdlet issued,Exchange
25293,Remove-MailboxDatabaseCopy Exchange cmdlet issued,Exchange
25294,Remove-MailboxFolderPermission Exchange cmdlet issued,Exchange
25295,Remove-MailboxPermission Exchange cmdlet issued,Exchange
25296,Remove-MailboxRestoreRequest Exchange cmdlet issued,Exchange
25297,Remove-MailContact Exchange cmdlet issued,Exchange
25298,Remove-MailUser Exchange cmdlet issued,Exchange
25299,Remove-ManagedContentSettings Exchange cmdlet issued,Exchange
25300,Remove-ManagedFolder Exchange cmdlet issued,Exchange
25301,Remove-ManagedFolderMailboxPolicy Exchange cmdlet issued,Exchange
25302,Remove-ManagementRole Exchange cmdlet issued,Exchange
25303,Remove-ManagementRoleAssignment Exchange cmdlet issued,Exchange
25304,Remove-ManagementRoleEntry Exchange cmdlet issued,Exchange
25305,Remove-ManagementScope Exchange cmdlet issued,Exchange
25306,Remove-Message Exchange cmdlet issued,Exchange
25307,Remove-MessageClassification Exchange cmdlet issued,Exchange
25308,Remove-MoveRequest Exchange cmdlet issued,Exchange
25309,Remove-OabVirtualDirectory Exchange cmdlet issued,Exchange
25310,Remove-OfflineAddressBook Exchange cmdlet issued,Exchange
25311,Remove-OrganizationRelationship Exchange cmdlet issued,Exchange
25312,Remove-OutlookProtectionRule Exchange cmdlet issued,Exchange
25313,Remove-OutlookProvider Exchange cmdlet issued,Exchange
25314,Remove-OwaMailboxPolicy Exchange cmdlet issued,Exchange
25315,Remove-OwaVirtualDirectory Exchange cmdlet issued,Exchange
25316,Remove-PublicFolder Exchange cmdlet issued,Exchange
25317,Remove-PublicFolderAdministrativePermission Exchange cmdlet issued,Exchange
25318,Remove-PublicFolderClientPermission Exchange cmdlet issued,Exchange
25319,Remove-PublicFolderDatabase Exchange cmdlet issued,Exchange
25320,Remove-ReceiveConnector Exchange cmdlet issued,Exchange
25321,Remove-RemoteDomain Exchange cmdlet issued,Exchange
25322,Remove-RemoteMailbox Exchange cmdlet issued,Exchange
25323,Remove-RetentionPolicy Exchange cmdlet issued,Exchange
25324,Remove-RetentionPolicyTag Exchange cmdlet issued,Exchange
25325,Remove-RoleAssignmentPolicy Exchange cmdlet issued,Exchange
25326,Remove-RoleGroup Exchange cmdlet issued,Exchange
25327,Remove-RoleGroupMember Exchange cmdlet issued,Exchange
25328,Remove-RoutingGroupConnector Exchange cmdlet issued,Exchange
25329,Remove-RpcClientAccess Exchange cmdlet issued,Exchange
25330,Remove-SendConnector Exchange cmdlet issued,Exchange
25331,Remove-SharingPolicy Exchange cmdlet issued,Exchange
25332,Remove-StoreMailbox Exchange cmdlet issued,Exchange
25333,Remove-SystemMessage Exchange cmdlet issued,Exchange
25334,Remove-ThrottlingPolicy Exchange cmdlet issued,Exchange
25335,Remove-TransportRule Exchange cmdlet issued,Exchange
25336,Remove-UMAutoAttendant Exchange cmdlet issued,Exchange
25337,Remove-UMDialPlan Exchange cmdlet issued,Exchange
25338,Remove-UMHuntGroup Exchange cmdlet issued,Exchange
25339,Remove-UMIPGateway Exchange cmdlet issued,Exchange
25340,Remove-UMMailboxPolicy Exchange cmdlet issued,Exchange
25341,Remove-WebServicesVirtualDirectory Exchange cmdlet issued,Exchange
25342,Remove-X400AuthoritativeDomain Exchange cmdlet issued,Exchange
25343,Restore-DatabaseAvailabilityGroup Exchange cmdlet issued,Exchange
25344,Restore-DetailsTemplate Exchange cmdlet issued,Exchange
25345,Restore-Mailbox Exchange cmdlet issued,Exchange
25346,Resume-MailboxDatabaseCopy Exchange cmdlet issued,Exchange
25347,Resume-MailboxExportRequest Exchange cmdlet issued,Exchange
25348,Resume-MailboxRestoreRequest Exchange cmdlet issued,Exchange
25349,Resume-Message Exchange cmdlet issued,Exchange
25350,Resume-MoveRequest Exchange cmdlet issued,Exchange
25351,Resume-PublicFolderReplication Exchange cmdlet issued,Exchange
25352,Resume-Queue Exchange cmdlet issued,Exchange
25353,Retry-Queue Exchange cmdlet issued,Exchange
25354,Send-TextMessagingVerificationCode Exchange cmdlet issued,Exchange
25355,Set-AcceptedDomain Exchange cmdlet issued,Exchange
25356,Set-ActiveSyncDeviceAccessRule Exchange cmdlet issued,Exchange
25357,Set-ActiveSyncMailboxPolicy Exchange cmdlet issued,Exchange
25358,Set-ActiveSyncOrganizationSettings Exchange cmdlet issued,Exchange
25359,Set-ActiveSyncVirtualDirectory Exchange cmdlet issued,Exchange
25360,Set-AddressList Exchange cmdlet issued,Exchange
25361,Set-AdminAuditLogConfig Exchange cmdlet issued,Exchange
25362,Set-ADServerSettings Exchange cmdlet issued,Exchange
25363,Set-ADSite Exchange cmdlet issued,Exchange
25364,Set-AdSiteLink Exchange cmdlet issued,Exchange
25365,Set-AutodiscoverVirtualDirectory Exchange cmdlet issued,Exchange
25366,Set-AvailabilityConfig Exchange cmdlet issued,Exchange
25367,Set-AvailabilityReportOutage Exchange cmdlet issued,Exchange
25368,Set-CalendarNotification Exchange cmdlet issued,Exchange
25369,Set-CalendarProcessing Exchange cmdlet issued,Exchange
25370,Set-CASMailbox Exchange cmdlet issued,Exchange
25371,Set-ClientAccessArray Exchange cmdlet issued,Exchange
25372,Set-ClientAccessServer Exchange cmdlet issued,Exchange
25373,Set-CmdletExtensionAgent Exchange cmdlet issued,Exchange
25374,Set-Contact Exchange cmdlet issued,Exchange
25375,Set-ContentFilterConfig Exchange cmdlet issued,Exchange
25376,Set-DatabaseAvailabilityGroup Exchange cmdlet issued,Exchange
25377,Set-DatabaseAvailabilityGroupNetwork Exchange cmdlet issued,Exchange
25378,Set-DeliveryAgentConnector Exchange cmdlet issued,Exchange
25379,Set-DetailsTemplate Exchange cmdlet issued,Exchange
25380,Set-DistributionGroup Exchange cmdlet issued,Exchange
25381,Set-DynamicDistributionGroup Exchange cmdlet issued,Exchange
25382,Set-EcpVirtualDirectory Exchange cmdlet issued,Exchange
25383,Set-EdgeSyncServiceConfig Exchange cmdlet issued,Exchange
25384,Set-EmailAddressPolicy Exchange cmdlet issued,Exchange
25385,Set-EventLogLevel Exchange cmdlet issued,Exchange
25386,Set-ExchangeAssistanceConfig Exchange cmdlet issued,Exchange
25387,Set-ExchangeServer Exchange cmdlet issued,Exchange
25388,Set-FederatedOrganizationIdentifier Exchange cmdlet issued,Exchange
25389,Set-FederationTrust Exchange cmdlet issued,Exchange
25390,Set-ForeignConnector Exchange cmdlet issued,Exchange
25391,Set-GlobalAddressList Exchange cmdlet issued,Exchange
25392,Set-Group Exchange cmdlet issued,Exchange
25393,Set-ImapSettings Exchange cmdlet issued,Exchange
25394,Set-InboxRule Exchange cmdlet issued,Exchange
25395,Set-IPAllowListConfig Exchange cmdlet issued,Exchange
25396,Set-IPAllowListProvider Exchange cmdlet issued,Exchange
25397,Set-IPAllowListProvidersConfig Exchange cmdlet issued,Exchange
25398,Set-IPBlockListConfig Exchange cmdlet issued,Exchange
25399,Set-IPBlockListProvider Exchange cmdlet issued,Exchange
25400,Set-IPBlockListProvidersConfig Exchange cmdlet issued,Exchange
25401,Set-IRMConfiguration Exchange cmdlet issued,Exchange
25402,Set-JournalRule Exchange cmdlet issued,Exchange
25403,Set-Mailbox Exchange cmdlet issued,Exchange
25404,Set-MailboxAuditBypassAssociation Exchange cmdlet issued,Exchange
25405,Set-MailboxAutoReplyConfiguration Exchange cmdlet issued,Exchange
25406,Set-MailboxCalendarConfiguration Exchange cmdlet issued,Exchange
25407,Set-MailboxCalendarFolder Exchange cmdlet issued,Exchange
25408,Set-MailboxDatabase Exchange cmdlet issued,Exchange
25409,Set-MailboxDatabaseCopy Exchange cmdlet issued,Exchange
25410,Set-MailboxFolderPermission Exchange cmdlet issued,Exchange
25411,Set-MailboxJunkEmailConfiguration Exchange cmdlet issued,Exchange
25412,Set-MailboxMessageConfiguration Exchange cmdlet issued,Exchange
25413,Set-MailboxRegionalConfiguration Exchange cmdlet issued,Exchange
25414,Set-MailboxRestoreRequest Exchange cmdlet issued,Exchange
25415,Set-MailboxServer Exchange cmdlet issued,Exchange
25416,Set-MailboxSpellingConfiguration Exchange cmdlet issued,Exchange
25417,Set-MailContact Exchange cmdlet issued,Exchange
25418,Set-MailPublicFolder Exchange cmdlet issued,Exchange
25419,Set-MailUser Exchange cmdlet issued,Exchange
25420,Set-ManagedContentSettings Exchange cmdlet issued,Exchange
25421,Set-ManagedFolder Exchange cmdlet issued,Exchange
25422,Set-ManagedFolderMailboxPolicy Exchange cmdlet issued,Exchange
25423,Set-ManagementRoleAssignment Exchange cmdlet issued,Exchange
25424,Set-ManagementRoleEntry Exchange cmdlet issued,Exchange
25425,Set-ManagementScope Exchange cmdlet issued,Exchange
25426,Set-MessageClassification Exchange cmdlet issued,Exchange
25427,Set-MoveRequest Exchange cmdlet issued,Exchange
25428,Set-OabVirtualDirectory Exchange cmdlet issued,Exchange
25429,Set-OfflineAddressBook Exchange cmdlet issued,Exchange
25430,Set-OrganizationConfig Exchange cmdlet issued,Exchange
25431,Set-OrganizationRelationship Exchange cmdlet issued,Exchange
25432,Set-OutlookAnywhere Exchange cmdlet issued,Exchange
25433,Set-OutlookProtectionRule Exchange cmdlet issued,Exchange
25434,Set-OutlookProvider Exchange cmdlet issued,Exchange
25435,Set-OwaMailboxPolicy Exchange cmdlet issued,Exchange
25436,Set-OwaVirtualDirectory Exchange cmdlet issued,Exchange
25437,Set-PopSettings Exchange cmdlet issued,Exchange
25438,Set-PowerShellVirtualDirectory Exchange cmdlet issued,Exchange
25439,Set-PublicFolder Exchange cmdlet issued,Exchange
25440,Set-PublicFolderDatabase Exchange cmdlet issued,Exchange
25441,Set-ReceiveConnector Exchange cmdlet issued,Exchange
25442,Set-RecipientFilterConfig Exchange cmdlet issued,Exchange
25443,Set-RemoteDomain Exchange cmdlet issued,Exchange
25444,Set-RemoteMailbox Exchange cmdlet issued,Exchange
25445,Set-ResourceConfig Exchange cmdlet issued,Exchange
25446,Set-RetentionPolicy Exchange cmdlet issued,Exchange
25447,Set-RetentionPolicyTag Exchange cmdlet issued,Exchange
25448,Set-RoleAssignmentPolicy Exchange cmdlet issued,Exchange
25449,Set-RoleGroup Exchange cmdlet issued,Exchange
25450,Set-RoutingGroupConnector Exchange cmdlet issued,Exchange
25451,Set-RpcClientAccess Exchange cmdlet issued,Exchange
25452,Set-SendConnector Exchange cmdlet issued,Exchange
25453,Set-SenderFilterConfig Exchange cmdlet issued,Exchange
25454,Set-SenderIdConfig Exchange cmdlet issued,Exchange
25455,Set-SenderReputationConfig Exchange cmdlet issued,Exchange
25456,Set-SharingPolicy Exchange cmdlet issued,Exchange
25457,Set-SystemMessage Exchange cmdlet issued,Exchange
25458,Set-TextMessagingAccount Exchange cmdlet issued,Exchange
25459,Set-ThrottlingPolicy Exchange cmdlet issued,Exchange
25460,Set-ThrottlingPolicyAssociation Exchange cmdlet issued,Exchange
25461,Set-TransportAgent Exchange cmdlet issued,Exchange
25462,Set-TransportConfig Exchange cmdlet issued,Exchange
25463,Set-TransportRule Exchange cmdlet issued,Exchange
25464,Set-TransportServer Exchange cmdlet issued,Exchange
25465,Set-UMAutoAttendant Exchange cmdlet issued,Exchange
25466,Set-UMDialPlan Exchange cmdlet issued,Exchange
25467,Set-UMIPGateway Exchange cmdlet issued,Exchange
25468,Set-UMMailbox Exchange cmdlet issued,Exchange
25469,Set-UMMailboxPIN Exchange cmdlet issued,Exchange
25470,Set-UMMailboxPolicy Exchange cmdlet issued,Exchange
25471,Set-UmServer Exchange cmdlet issued,Exchange
25472,Set-User Exchange cmdlet issued,Exchange
25473,Set-WebServicesVirtualDirectory Exchange cmdlet issued,Exchange
25474,Set-X400AuthoritativeDomain Exchange cmdlet issued,Exchange
25475,Start-DatabaseAvailabilityGroup Exchange cmdlet issued,Exchange
25476,Start-EdgeSynchronization Exchange cmdlet issued,Exchange
25477,Start-ManagedFolderAssistant Exchange cmdlet issued,Exchange
25478,Start-RetentionAutoTagLearning Exchange cmdlet issued,Exchange
25479,Stop-DatabaseAvailabilityGroup Exchange cmdlet issued,Exchange
25480,Stop-ManagedFolderAssistant Exchange cmdlet issued,Exchange
25481,Suspend-MailboxDatabaseCopy Exchange cmdlet issued,Exchange
25482,Suspend-MailboxRestoreRequest Exchange cmdlet issued,Exchange
25483,Suspend-Message Exchange cmdlet issued,Exchange
25484,Suspend-MoveRequest Exchange cmdlet issued,Exchange
25485,Suspend-PublicFolderReplication Exchange cmdlet issued,Exchange
25486,Suspend-Queue Exchange cmdlet issued,Exchange
25487,Test-ActiveSyncConnectivity Exchange cmdlet issued,Exchange
25488,Test-AssistantHealth Exchange cmdlet issued,Exchange
25489,Test-CalendarConnectivity Exchange cmdlet issued,Exchange
25490,Test-EcpConnectivity Exchange cmdlet issued,Exchange
25491,Test-EdgeSynchronization Exchange cmdlet issued,Exchange
25492,Test-ExchangeSearch Exchange cmdlet issued,Exchange
25493,Test-FederationTrust Exchange cmdlet issued,Exchange
25494,Test-FederationTrustCertificate Exchange cmdlet issued,Exchange
25495,Test-ImapConnectivity Exchange cmdlet issued,Exchange
25496,Test-IPAllowListProvider Exchange cmdlet issued,Exchange
25497,Test-IPBlockListProvider Exchange cmdlet issued,Exchange
25498,Test-IRMConfiguration Exchange cmdlet issued,Exchange
25499,Test-Mailflow Exchange cmdlet issued,Exchange
25500,Test-MAPIConnectivity Exchange cmdlet issued,Exchange
25501,Test-MRSHealth Exchange cmdlet issued,Exchange
25502,Test-OrganizationRelationship Exchange cmdlet issued,Exchange
25503,Test-OutlookConnectivity Exchange cmdlet issued,Exchange
25504,Test-OutlookWebServices Exchange cmdlet issued,Exchange
25505,Test-OwaConnectivity Exchange cmdlet issued,Exchange
25506,Test-PopConnectivity Exchange cmdlet issued,Exchange
25507,Test-PowerShellConnectivity Exchange cmdlet issued,Exchange
25508,Test-ReplicationHealth Exchange cmdlet issued,Exchange
25509,Test-SenderId Exchange cmdlet issued,Exchange
25510,Test-ServiceHealth Exchange cmdlet issued,Exchange
25511,Test-SmtpConnectivity Exchange cmdlet issued,Exchange
25512,Test-SystemHealth Exchange cmdlet issued,Exchange
25513,Test-UMConnectivity Exchange cmdlet issued,Exchange
25514,Test-WebServicesConnectivity Exchange cmdlet issued,Exchange
25515,Uninstall-TransportAgent Exchange cmdlet issued,Exchange
25516,Update-AddressList Exchange cmdlet issued,Exchange
25517,Update-DistributionGroupMember Exchange cmdlet issued,Exchange
25518,Update-EmailAddressPolicy Exchange cmdlet issued,Exchange
25519,Update-FileDistributionService Exchange cmdlet issued,Exchange
25520,Update-GlobalAddressList Exchange cmdlet issued,Exchange
25521,Update-MailboxDatabaseCopy Exchange cmdlet issued,Exchange
25522,Update-OfflineAddressBook Exchange cmdlet issued,Exchange
25523,Update-PublicFolder Exchange cmdlet issued,Exchange
25524,Update-PublicFolderHierarchy Exchange cmdlet issued,Exchange
25525,Update-Recipient Exchange cmdlet issued,Exchange
25526,Update-RoleGroupMember Exchange cmdlet issued,Exchange
25527,Update-SafeList Exchange cmdlet issued,Exchange
25528,Write-AdminAuditLog Exchange cmdlet issued,Exchange
25529,Add-GlobalMonitoringOverride Exchange cmdlet issued,Exchange
25530,Add-ResubmitRequest Exchange cmdlet issued,Exchange
25531,Add-ServerMonitoringOverride Exchange cmdlet issued,Exchange
25532,Clear-MobileDevice Exchange cmdlet issued,Exchange
25533,Complete-MigrationBatch Exchange cmdlet issued,Exchange
25534,Disable-App Exchange cmdlet issued,Exchange
25535,Disable-MailboxQuarantine Exchange cmdlet issued,Exchange
25536,Disable-UMCallAnsweringRule Exchange cmdlet issued,Exchange
25537,Disable-UMService Exchange cmdlet issued,Exchange
25538,Dump-ProvisioningCache Exchange cmdlet issued,Exchange
25539,Enable-App Exchange cmdlet issued,Exchange
25540,Enable-MailboxQuarantine Exchange cmdlet issued,Exchange
25541,Enable-UMCallAnsweringRule Exchange cmdlet issued,Exchange
25542,Enable-UMService Exchange cmdlet issued,Exchange
25543,Export-DlpPolicyCollection Exchange cmdlet issued,Exchange
25544,Export-MigrationReport Exchange cmdlet issued,Exchange
25545,Import-DlpPolicyCollection Exchange cmdlet issued,Exchange
25546,Import-DlpPolicyTemplate Exchange cmdlet issued,Exchange
25547,Invoke-MonitoringProbe Exchange cmdlet issued,Exchange
25548,New-AddressBookPolicy Exchange cmdlet issued,Exchange
25549,New-App Exchange cmdlet issued,Exchange
25550,New-AuthServer Exchange cmdlet issued,Exchange
25551,New-ClassificationRuleCollection Exchange cmdlet issued,Exchange
25552,New-DlpPolicy Exchange cmdlet issued,Exchange
25553,New-HybridConfiguration Exchange cmdlet issued,Exchange
25554,New-MailboxExportRequest Exchange cmdlet issued,Exchange
25555,New-MailboxImportRequest Exchange cmdlet issued,Exchange
25556,New-MailboxSearch Exchange cmdlet issued,Exchange
25557,New-MalwareFilterPolicy Exchange cmdlet issued,Exchange
25558,New-MigrationBatch Exchange cmdlet issued,Exchange
25559,New-MigrationEndpoint Exchange cmdlet issued,Exchange
25560,New-MobileDeviceMailboxPolicy Exchange cmdlet issued,Exchange
25561,New-OnPremisesOrganization Exchange cmdlet issued,Exchange
25562,New-PartnerApplication Exchange cmdlet issued,Exchange
25563,New-PolicyTipConfig Exchange cmdlet issued,Exchange
25564,New-PowerShellVirtualDirectory Exchange cmdlet issued,Exchange
25565,New-PublicFolderMigrationRequest Exchange cmdlet issued,Exchange
25566,New-ResourcePolicy Exchange cmdlet issued,Exchange
25567,New-SiteMailboxProvisioningPolicy Exchange cmdlet issued,Exchange
25568,New-SyncMailPublicFolder Exchange cmdlet issued,Exchange
25569,New-UMCallAnsweringRule Exchange cmdlet issued,Exchange
25570,New-WorkloadManagementPolicy Exchange cmdlet issued,Exchange
25571,New-WorkloadPolicy Exchange cmdlet issued,Exchange
25572,Redirect-Message Exchange cmdlet issued,Exchange
25573,Remove-AddressBookPolicy Exchange cmdlet issued,Exchange
25574,Remove-App Exchange cmdlet issued,Exchange
25575,Remove-AuthServer Exchange cmdlet issued,Exchange
25576,Remove-ClassificationRuleCollection Exchange cmdlet issued,Exchange
25577,Remove-DlpPolicy Exchange cmdlet issued,Exchange
25578,Remove-DlpPolicyTemplate Exchange cmdlet issued,Exchange
25579,Remove-GlobalMonitoringOverride Exchange cmdlet issued,Exchange
25580,Remove-HybridConfiguration Exchange cmdlet issued,Exchange
25581,Remove-LinkedUser Exchange cmdlet issued,Exchange
25582,Remove-MailboxExportRequest Exchange cmdlet issued,Exchange
25583,Remove-MailboxImportRequest Exchange cmdlet issued,Exchange
25584,Remove-MailboxSearch Exchange cmdlet issued,Exchange
25585,Remove-MalwareFilterPolicy Exchange cmdlet issued,Exchange
25586,Remove-MalwareFilterRecoveryItem Exchange cmdlet issued,Exchange
25587,Remove-MigrationBatch Exchange cmdlet issued,Exchange
25588,Remove-MigrationEndpoint Exchange cmdlet issued,Exchange
25589,Remove-MigrationUser Exchange cmdlet issued,Exchange
25590,Remove-MobileDevice Exchange cmdlet issued,Exchange
25591,Remove-MobileDeviceMailboxPolicy Exchange cmdlet issued,Exchange
25592,Remove-OnPremisesOrganization Exchange cmdlet issued,Exchange
25593,Remove-PartnerApplication Exchange cmdlet issued,Exchange
25594,Remove-PolicyTipConfig Exchange cmdlet issued,Exchange
25595,Remove-PowerShellVirtualDirectory Exchange cmdlet issued,Exchange
25596,Remove-PublicFolderMigrationRequest Exchange cmdlet issued,Exchange
25597,Remove-ResourcePolicy Exchange cmdlet issued,Exchange
25598,Remove-ResubmitRequest Exchange cmdlet issued,Exchange
25599,Remove-SiteMailboxProvisioningPolicy Exchange cmdlet issued,Exchange
25600,Remove-UMCallAnsweringRule Exchange cmdlet issued,Exchange
25601,Remove-UserPhoto Exchange cmdlet issued,Exchange
25602,Remove-WorkloadManagementPolicy Exchange cmdlet issued,Exchange
25603,Remove-WorkloadPolicy Exchange cmdlet issued,Exchange
25604,Reset-ProvisioningCache Exchange cmdlet issued,Exchange
25605,Resume-MailboxImportRequest Exchange cmdlet issued,Exchange
25606,Resume-MalwareFilterRecoveryItem Exchange cmdlet issued,Exchange
25607,Resume-PublicFolderMigrationRequest Exchange cmdlet issued,Exchange
25608,Set-ActiveSyncDeviceAccessRule Exchange cmdlet issued,Exchange
25609,Set-AddressBookPolicy Exchange cmdlet issued,Exchange
25610,Set-App Exchange cmdlet issued,Exchange
25611,Set-AuthConfig Exchange cmdlet issued,Exchange
25612,Set-AuthServer Exchange cmdlet issued,Exchange
25613,Set-ClassificationRuleCollection Exchange cmdlet issued,Exchange
25614,Set-DlpPolicy Exchange cmdlet issued,Exchange
25615,Set-FrontendTransportService Exchange cmdlet issued,Exchange
25616,Set-HybridConfiguration Exchange cmdlet issued,Exchange
25617,Set-HybridMailflow Exchange cmdlet issued,Exchange
25618,Set-MailboxExportRequest Exchange cmdlet issued,Exchange
25619,Set-MailboxImportRequest Exchange cmdlet issued,Exchange
25620,Set-MailboxSearch Exchange cmdlet issued,Exchange
25621,Set-MailboxTransportService Exchange cmdlet issued,Exchange
25622,Set-MalwareFilteringServer Exchange cmdlet issued,Exchange
25623,Set-MalwareFilterPolicy Exchange cmdlet issued,Exchange
25624,Set-MigrationBatch Exchange cmdlet issued,Exchange
25625,Set-MigrationConfig Exchange cmdlet issued,Exchange
25626,Set-MigrationEndpoint Exchange cmdlet issued,Exchange
25627,Set-MobileDeviceMailboxPolicy Exchange cmdlet issued,Exchange
25628,Set-Notification Exchange cmdlet issued,Exchange
25629,Set-OnPremisesOrganization Exchange cmdlet issued,Exchange
25630,Set-PartnerApplication Exchange cmdlet issued,Exchange
25631,Set-PendingFederatedDomain Exchange cmdlet issued,Exchange
25632,Set-PolicyTipConfig Exchange cmdlet issued,Exchange
25633,Set-PublicFolderMigrationRequest Exchange cmdlet issued,Exchange
25634,Set-ResourcePolicy Exchange cmdlet issued,Exchange
25635,Set-ResubmitRequest Exchange cmdlet issued,Exchange
25636,Set-RMSTemplate Exchange cmdlet issued,Exchange
25637,Set-ServerComponentState Exchange cmdlet issued,Exchange
25638,Set-ServerMonitor Exchange cmdlet issued,Exchange
25639,Set-SiteMailbox Exchange cmdlet issued,Exchange
25640,Set-SiteMailboxProvisioningPolicy Exchange cmdlet issued,Exchange
25641,Set-TransportService Exchange cmdlet issued,Exchange
25642,Set-UMCallAnsweringRule Exchange cmdlet issued,Exchange
25643,Set-UMCallRouterSettings Exchange cmdlet issued,Exchange
25644,Set-UMService Exchange cmdlet issued,Exchange
25645,Set-UserPhoto Exchange cmdlet issued,Exchange
25646,Set-WorkloadPolicy Exchange cmdlet issued,Exchange
25647,Start-MailboxSearch Exchange cmdlet issued,Exchange
25648,Start-MigrationBatch Exchange cmdlet issued,Exchange
25649,Stop-MailboxSearch Exchange cmdlet issued,Exchange
25650,Stop-MigrationBatch Exchange cmdlet issued,Exchange
25651,Suspend-MailboxExportRequest Exchange cmdlet issued,Exchange
25652,Suspend-MailboxImportRequest Exchange cmdlet issued,Exchange
25653,Suspend-PublicFolderMigrationRequest Exchange cmdlet issued,Exchange
25654,Test-ArchiveConnectivity Exchange cmdlet issued,Exchange
25655,Test-MigrationServerAvailability Exchange cmdlet issued,Exchange
25656,Test-OAuthConnectivity Exchange cmdlet issued,Exchange
25657,Test-SiteMailbox Exchange cmdlet issued,Exchange
25658,Update-HybridConfiguration Exchange cmdlet issued,Exchange
25659,Update-PublicFolderMailbox Exchange cmdlet issued,Exchange
25660,Update-SiteMailbox Exchange cmdlet issued,Exchange
25661,Add-AttachmentFilterEntry Exchange cmdlet issued,Exchange
25662,Remove-AttachmentFilterEntry Exchange cmdlet issued,Exchange
25663,New-AddressRewriteEntry Exchange cmdlet issued,Exchange
25664,Remove-AddressRewriteEntry Exchange cmdlet issued,Exchange
25665,Set-AddressRewriteEntry Exchange cmdlet issued,Exchange
25666,Set-AttachmentFilterListConfig Exchange cmdlet issued,Exchange
25667,Set-MailboxSentItemsConfiguration Exchange cmdlet issued,Exchange
25668,Update-MovedMailbox Exchange cmdlet issued,Exchange
25669,Disable-MalwareFilterRule Exchange cmdlet issued,Exchange
25670,Enable-MalwareFilterRule Exchange cmdlet issued,Exchange
25671,New-MalwareFilterRule Exchange cmdlet issued,Exchange
25672,Remove-MalwareFilterRule Exchange cmdlet issued,Exchange
25673,Set-MalwareFilterRule Exchange cmdlet issued,Exchange
25674,Remove-MailboxRepairRequest Exchange cmdlet issued,Exchange
25675,Remove-ServerMonitoringOverride Exchange cmdlet issued,Exchange
25676,Update-ExchangeHelp Exchange cmdlet issued,Exchange
25677,Update-StoreMailboxState Exchange cmdlet issued,Exchange
25678,Disable-PushNotificationProxy Exchange cmdlet issued,Exchange
25679,Enable-PushNotificationProxy Exchange cmdlet issued,Exchange
25680,New-PublicFolderMoveRequest Exchange cmdlet issued,Exchange
25681,Remove-PublicFolderMoveRequest Exchange cmdlet issued,Exchange
25682,Resume-PublicFolderMoveRequest Exchange cmdlet issued,Exchange
25683,Set-PublicFolderMoveRequest Exchange cmdlet issued,Exchange
25684,Suspend-PublicFolderMoveRequest Exchange cmdlet issued,Exchange
25685,Update-DatabaseSchema Exchange cmdlet issued,Exchange
25686,Set-SearchDocumentFormat Exchange cmdlet issued,Exchange
25687,New-AuthRedirect Exchange cmdlet issued,Exchange
25688,New-CompliancePolicySyncNotification Exchange cmdlet issued,Exchange
25689,New-ComplianceServiceVirtualDirectory Exchange cmdlet issued,Exchange
25690,New-DatabaseAvailabilityGroupConfiguration Exchange cmdlet issued,Exchange
25691,New-DataClassification Exchange cmdlet issued,Exchange
25692,New-Fingerprint Exchange cmdlet issued,Exchange
25693,New-IntraOrganizationConnector Exchange cmdlet issued,Exchange
25694,New-MailboxDeliveryVirtualDirectory Exchange cmdlet issued,Exchange
25695,New-MapiVirtualDirectory Exchange cmdlet issued,Exchange
25696,New-OutlookServiceVirtualDirectory Exchange cmdlet issued,Exchange
25697,New-RestVirtualDirectory Exchange cmdlet issued,Exchange
25698,New-SearchDocumentFormat Exchange cmdlet issued,Exchange
25699,New-SettingOverride Exchange cmdlet issued,Exchange
25700,New-SiteMailbox Exchange cmdlet issued,Exchange
25701,Remove-AuthRedirect Exchange cmdlet issued,Exchange
25702,Remove-CompliancePolicySyncNotification Exchange cmdlet issued,Exchange
25703,Remove-ComplianceServiceVirtualDirectory Exchange cmdlet issued,Exchange
25704,Remove-DatabaseAvailabilityGroupConfiguration Exchange cmdlet issued,Exchange
25705,Remove-DataClassification Exchange cmdlet issued,Exchange
25706,Remove-IntraOrganizationConnector Exchange cmdlet issued,Exchange
25707,Remove-MailboxDeliveryVirtualDirectory Exchange cmdlet issued,Exchange
25708,Remove-MapiVirtualDirectory Exchange cmdlet issued,Exchange
25709,Remove-OutlookServiceVirtualDirectory Exchange cmdlet issued,Exchange
25710,Remove-PublicFolderMailboxMigrationRequest Exchange cmdlet issued,Exchange
25711,Remove-PushNotificationSubscription Exchange cmdlet issued,Exchange
25712,Remove-RestVirtualDirectory Exchange cmdlet issued,Exchange
25713,Remove-SearchDocumentFormat Exchange cmdlet issued,Exchange
25714,Remove-SettingOverride Exchange cmdlet issued,Exchange
25715,Remove-SyncMailPublicFolder Exchange cmdlet issued,Exchange
25716,Resume-PublicFolderMailboxMigrationRequest Exchange cmdlet issued,Exchange
25717,Send-MapiSubmitSystemProbe Exchange cmdlet issued,Exchange
25718,Set-AuthRedirect Exchange cmdlet issued,Exchange
25719,Set-ClientAccessService Exchange cmdlet issued,Exchange
25720,Set-Clutter Exchange cmdlet issued,Exchange
25721,Set-ComplianceServiceVirtualDirectory Exchange cmdlet issued,Exchange
25722,Set-ConsumerMailbox Exchange cmdlet issued,Exchange
25723,Set-DatabaseAvailabilityGroupConfiguration Exchange cmdlet issued,Exchange
25724,Set-DataClassification Exchange cmdlet issued,Exchange
25725,Set-IntraOrganizationConnector Exchange cmdlet issued,Exchange
25726,Set-LogExportVirtualDirectory Exchange cmdlet issued,Exchange
25727,Set-MailboxDeliveryVirtualDirectory Exchange cmdlet issued,Exchange
25728,Set-MapiVirtualDirectory Exchange cmdlet issued,Exchange
25729,Set-OutlookServiceVirtualDirectory Exchange cmdlet issued,Exchange
25730,Set-PublicFolderMailboxMigrationRequest Exchange cmdlet issued,Exchange
25731,Set-RestVirtualDirectory Exchange cmdlet issued,Exchange
25732,Set-SettingOverride Exchange cmdlet issued,Exchange
25733,Set-SmimeConfig Exchange cmdlet issued,Exchange
25734,Set-SubmissionMalwareFilteringServer Exchange cmdlet issued,Exchange
25735,Set-UMMailboxConfiguration Exchange cmdlet issued,Exchange
25736,Set-UnifiedAuditSetting Exchange cmdlet issued,Exchange
25737,Start-AuditAssistant Exchange cmdlet issued,Exchange
25738,Start-UMPhoneSession Exchange cmdlet issued,Exchange
25739,Stop-UMPhoneSession Exchange cmdlet issued,Exchange
25740,Test-DataClassification Exchange cmdlet issued,Exchange
25741,Test-TextExtraction Exchange cmdlet issued,Exchange
Exchange	25000	Undocumented Exchange mailbox operation
Exchange	25001	Operation Copy - Copy item to another Exchange mailbox folder
Exchange	25002	Operation Create - Create item in Exchange mailbox
Exchange	25003	Operation FolderBind - Access Exchange mailbox folder
Exchange	25004	Operation HardDelete - Delete Exchange mailbox item permanently from Recoverable Items folder
Exchange	25005	Operation MessageBind - Access Exchange mailbox item
Exchange	25006	Operation Move - Move item to another Exchange mailbox folder
Exchange	25007	Operation MoveToDeletedItems - Move Exchange mailbox item to Deleted Items folder
Exchange	25008	Operation SendAs - Send message using Send As Exchange mailbox permissions
Exchange	25009	Operation SendOnBehalf - Send message using Send on Behalf Exchange mailbox permissions
Exchange	25010	Operation SoftDelete - Delete Exchange mailbox item from Deleted Items folder
Exchange	25011	Operation Update - Update Exchange mailbox item's properties
Exchange	25100	Information Event - Mailbox audit policy applied
Exchange	25100	Undocumented Exchange admin operation
Exchange	25101	Add-ADPermission Exchange cmdlet issued
Exchange	25102	Add-AvailabilityAddressSpace Exchange cmdlet issued
Exchange	25103	Add-ContentFilterPhrase Exchange cmdlet issued
Exchange	25104	Add-DatabaseAvailabilityGroupServer Exchange cmdlet issued
Exchange	25105	Add-DistributionGroupMember Exchange cmdlet issued
Exchange	25106	Add-FederatedDomain Exchange cmdlet issued
Exchange	25107	Add-IPAllowListEntry Exchange cmdlet issued
Exchange	25108	Add-IPAllowListProvider Exchange cmdlet issued
Exchange	25109	Add-IPBlockListEntry Exchange cmdlet issued
Exchange	25110	Add-IPBlockListProvider Exchange cmdlet issued
Exchange	25111	Add-MailboxDatabaseCopy Exchange cmdlet issued
Exchange	25112	Add-MailboxFolderPermission Exchange cmdlet issued
Exchange	25113	Add-MailboxPermission Exchange cmdlet issued
Exchange	25114	Add-ManagementRoleEntry Exchange cmdlet issued
Exchange	25115	Add-PublicFolderAdministrativePermission Exchange cmdlet issued
Exchange	25116	Add-PublicFolderClientPermission Exchange cmdlet issued
Exchange	25117	Add-RoleGroupMember Exchange cmdlet issued
Exchange	25118	Clean-MailboxDatabase Exchange cmdlet issued
Exchange	25119	Clear-ActiveSyncDevice Exchange cmdlet issued
Exchange	25120	Clear-TextMessagingAccount Exchange cmdlet issued
Exchange	25121	Compare-TextMessagingVerificationCode Exchange cmdlet issued
Exchange	25122	Connect-Mailbox Exchange cmdlet issued
Exchange	25123	Disable-AddressListPaging Exchange cmdlet issued
Exchange	25124	Disable-CmdletExtensionAgent Exchange cmdlet issued
Exchange	25125	Disable-DistributionGroup Exchange cmdlet issued
Exchange	25126	Disable-InboxRule Exchange cmdlet issued
Exchange	25127	Disable-JournalRule Exchange cmdlet issued
Exchange	25128	Disable-Mailbox Exchange cmdlet issued
Exchange	25129	Disable-MailContact Exchange cmdlet issued
Exchange	25130	Disable-MailPublicFolder Exchange cmdlet issued
Exchange	25131	Disable-MailUser Exchange cmdlet issued
Exchange	25132	Disable-OutlookAnywhere Exchange cmdlet issued
Exchange	25133	Disable-OutlookProtectionRule Exchange cmdlet issued
Exchange	25134	Disable-RemoteMailbox Exchange cmdlet issued
Exchange	25135	Disable-ServiceEmailChannel Exchange cmdlet issued
Exchange	25136	Disable-TransportAgent Exchange cmdlet issued
Exchange	25137	Disable-TransportRule Exchange cmdlet issued
Exchange	25138	Disable-UMAutoAttendant Exchange cmdlet issued
Exchange	25139	Disable-UMIPGateway Exchange cmdlet issued
Exchange	25140	Disable-UMMailbox Exchange cmdlet issued
Exchange	25141	Disable-UMServer Exchange cmdlet issued
Exchange	25142	Dismount-Database Exchange cmdlet issued
Exchange	25143	Enable-AddressListPaging Exchange cmdlet issued
Exchange	25144	Enable-AntispamUpdates Exchange cmdlet issued
Exchange	25145	Enable-CmdletExtensionAgent Exchange cmdlet issued
Exchange	25146	Enable-DistributionGroup Exchange cmdlet issued
Exchange	25147	Enable-ExchangeCertificate Exchange cmdlet issued
Exchange	25148	Enable-InboxRule Exchange cmdlet issued
Exchange	25149	Enable-JournalRule Exchange cmdlet issued
Exchange	25150	Enable-Mailbox Exchange cmdlet issued
Exchange	25151	Enable-MailContact Exchange cmdlet issued
Exchange	25152	Enable-MailPublicFolder Exchange cmdlet issued
Exchange	25153	Enable-MailUser Exchange cmdlet issued
Exchange	25154	Enable-OutlookAnywhere Exchange cmdlet issued
Exchange	25155	Enable-OutlookProtectionRule Exchange cmdlet issued
Exchange	25156	Enable-RemoteMailbox Exchange cmdlet issued
Exchange	25157	Enable-ServiceEmailChannel Exchange cmdlet issued
Exchange	25158	Enable-TransportAgent Exchange cmdlet issued
Exchange	25159	Enable-TransportRule Exchange cmdlet issued
Exchange	25160	Enable-UMAutoAttendant Exchange cmdlet issued
Exchange	25161	Enable-UMIPGateway Exchange cmdlet issued
Exchange	25162	Enable-UMMailbox Exchange cmdlet issued
Exchange	25163	Enable-UMServer Exchange cmdlet issued
Exchange	25164	Export-ActiveSyncLog Exchange cmdlet issued
Exchange	25165	Export-AutoDiscoverConfig Exchange cmdlet issued
Exchange	25166	Export-ExchangeCertificate Exchange cmdlet issued
Exchange	25167	Export-JournalRuleCollection Exchange cmdlet issued
Exchange	25168	Export-MailboxDiagnosticLogs Exchange cmdlet issued
Exchange	25169	Export-Message Exchange cmdlet issued
Exchange	25170	Export-RecipientDataProperty Exchange cmdlet issued
Exchange	25171	Export-TransportRuleCollection Exchange cmdlet issued
Exchange	25172	Export-UMCallDataRecord Exchange cmdlet issued
Exchange	25173	Export-UMPrompt Exchange cmdlet issued
Exchange	25174	Import-ExchangeCertificate Exchange cmdlet issued
Exchange	25175	Import-JournalRuleCollection Exchange cmdlet issued
Exchange	25176	Import-RecipientDataProperty Exchange cmdlet issued
Exchange	25177	Import-TransportRuleCollection Exchange cmdlet issued
Exchange	25178	Import-UMPrompt Exchange cmdlet issued
Exchange	25179	Install-TransportAgent Exchange cmdlet issued
Exchange	25180	Mount-Database Exchange cmdlet issued
Exchange	25181	Move-ActiveMailboxDatabase Exchange cmdlet issued
Exchange	25182	Move-AddressList Exchange cmdlet issued
Exchange	25183	Move-DatabasePath Exchange cmdlet issued
Exchange	25184	Move-OfflineAddressBook Exchange cmdlet issued
Exchange	25185	New-AcceptedDomain Exchange cmdlet issued
Exchange	25186	New-ActiveSyncDeviceAccessRule Exchange cmdlet issued
Exchange	25187	New-ActiveSyncMailboxPolicy Exchange cmdlet issued
Exchange	25188	New-ActiveSyncVirtualDirectory Exchange cmdlet issued
Exchange	25189	New-AddressList Exchange cmdlet issued
Exchange	25190	New-AdminAuditLogSearch Exchange cmdlet issued
Exchange	25191	New-AutodiscoverVirtualDirectory Exchange cmdlet issued
Exchange	25192	New-AvailabilityReportOutage Exchange cmdlet issued
Exchange	25193	New-ClientAccessArray Exchange cmdlet issued
Exchange	25194	New-DatabaseAvailabilityGroup Exchange cmdlet issued
Exchange	25195	New-DatabaseAvailabilityGroupNetwork Exchange cmdlet issued
Exchange	25196	New-DeliveryAgentConnector Exchange cmdlet issued
Exchange	25197	New-DistributionGroup Exchange cmdlet issued
Exchange	25198	New-DynamicDistributionGroup Exchange cmdlet issued
Exchange	25199	New-EcpVirtualDirectory Exchange cmdlet issued
Exchange	25200	New-EdgeSubscription Exchange cmdlet issued
Exchange	25201	New-EdgeSyncServiceConfig Exchange cmdlet issued
Exchange	25202	New-EmailAddressPolicy Exchange cmdlet issued
Exchange	25203	New-ExchangeCertificate Exchange cmdlet issued
Exchange	25204	New-FederationTrust Exchange cmdlet issued
Exchange	25205	New-ForeignConnector Exchange cmdlet issued
Exchange	25206	New-GlobalAddressList Exchange cmdlet issued
Exchange	25207	New-InboxRule Exchange cmdlet issued
Exchange	25208	New-JournalRule Exchange cmdlet issued
Exchange	25209	New-Mailbox Exchange cmdlet issued
Exchange	25210	New-MailboxAuditLogSearch Exchange cmdlet issued
Exchange	25211	New-MailboxDatabase Exchange cmdlet issued
Exchange	25212	New-MailboxFolder Exchange cmdlet issued
Exchange	25213	New-MailboxRepairRequest Exchange cmdlet issued
Exchange	25214	New-MailboxRestoreRequest Exchange cmdlet issued
Exchange	25215	New-MailContact Exchange cmdlet issued
Exchange	25216	New-MailMessage Exchange cmdlet issued
Exchange	25217	New-MailUser Exchange cmdlet issued
Exchange	25218	New-ManagedContentSettings Exchange cmdlet issued
Exchange	25219	New-ManagedFolder Exchange cmdlet issued
Exchange	25220	New-ManagedFolderMailboxPolicy Exchange cmdlet issued
Exchange	25221	New-ManagementRole Exchange cmdlet issued
Exchange	25222	New-ManagementRoleAssignment Exchange cmdlet issued
Exchange	25223	New-ManagementScope Exchange cmdlet issued
Exchange	25224	New-MessageClassification Exchange cmdlet issued
Exchange	25225	New-MoveRequest Exchange cmdlet issued
Exchange	25226	New-OabVirtualDirectory Exchange cmdlet issued
Exchange	25227	New-OfflineAddressBook Exchange cmdlet issued
Exchange	25228	New-OrganizationRelationship Exchange cmdlet issued
Exchange	25229	New-OutlookProtectionRule Exchange cmdlet issued
Exchange	25230	New-OutlookProvider Exchange cmdlet issued
Exchange	25231	New-OwaMailboxPolicy Exchange cmdlet issued
Exchange	25232	New-OwaVirtualDirectory Exchange cmdlet issued
Exchange	25233	New-PublicFolder Exchange cmdlet issued
Exchange	25234	New-PublicFolderDatabase Exchange cmdlet issued
Exchange	25235	New-PublicFolderDatabaseRepairRequest Exchange cmdlet issued
Exchange	25236	New-ReceiveConnector Exchange cmdlet issued
Exchange	25237	New-RemoteDomain Exchange cmdlet issued
Exchange	25238	New-RemoteMailbox Exchange cmdlet issued
Exchange	25239	New-RetentionPolicy Exchange cmdlet issued
Exchange	25240	New-RetentionPolicyTag Exchange cmdlet issued
Exchange	25241	New-RoleAssignmentPolicy Exchange cmdlet issued
Exchange	25242	New-RoleGroup Exchange cmdlet issued
Exchange	25243	New-RoutingGroupConnector Exchange cmdlet issued
Exchange	25244	New-RpcClientAccess Exchange cmdlet issued
Exchange	25245	New-SendConnector Exchange cmdlet issued
Exchange	25246	New-SharingPolicy Exchange cmdlet issued
Exchange	25247	New-SystemMessage Exchange cmdlet issued
Exchange	25248	New-ThrottlingPolicy Exchange cmdlet issued
Exchange	25249	New-TransportRule Exchange cmdlet issued
Exchange	25250	New-UMAutoAttendant Exchange cmdlet issued
Exchange	25251	New-UMDialPlan Exchange cmdlet issued
Exchange	25252	New-UMHuntGroup Exchange cmdlet issued
Exchange	25253	New-UMIPGateway Exchange cmdlet issued
Exchange	25254	New-UMMailboxPolicy Exchange cmdlet issued
Exchange	25255	New-WebServicesVirtualDirectory Exchange cmdlet issued
Exchange	25256	New-X400AuthoritativeDomain Exchange cmdlet issued
Exchange	25257	Remove-AcceptedDomain Exchange cmdlet issued
Exchange	25258	Remove-ActiveSyncDevice Exchange cmdlet issued
Exchange	25259	Remove-ActiveSyncDeviceAccessRule Exchange cmdlet issued
Exchange	25260	Remove-ActiveSyncDeviceClass Exchange cmdlet issued
Exchange	25261	Remove-ActiveSyncMailboxPolicy Exchange cmdlet issued
Exchange	25262	Remove-ActiveSyncVirtualDirectory Exchange cmdlet issued
Exchange	25263	Remove-AddressList Exchange cmdlet issued
Exchange	25264	Remove-ADPermission Exchange cmdlet issued
Exchange	25265	Remove-AutodiscoverVirtualDirectory Exchange cmdlet issued
Exchange	25266	Remove-AvailabilityAddressSpace Exchange cmdlet issued
Exchange	25267	Remove-AvailabilityReportOutage Exchange cmdlet issued
Exchange	25268	Remove-ClientAccessArray Exchange cmdlet issued
Exchange	25269	Remove-ContentFilterPhrase Exchange cmdlet issued
Exchange	25270	Remove-DatabaseAvailabilityGroup Exchange cmdlet issued
Exchange	25271	Remove-DatabaseAvailabilityGroupNetwork Exchange cmdlet issued
Exchange	25272	Remove-DatabaseAvailabilityGroupServer Exchange cmdlet issued
Exchange	25273	Remove-DeliveryAgentConnector Exchange cmdlet issued
Exchange	25274	Remove-DistributionGroup Exchange cmdlet issued
Exchange	25275	Remove-DistributionGroupMember Exchange cmdlet issued
Exchange	25276	Remove-DynamicDistributionGroup Exchange cmdlet issued
Exchange	25277	Remove-EcpVirtualDirectory Exchange cmdlet issued
Exchange	25278	Remove-EdgeSubscription Exchange cmdlet issued
Exchange	25279	Remove-EmailAddressPolicy Exchange cmdlet issued
Exchange	25280	Remove-ExchangeCertificate Exchange cmdlet issued
Exchange	25281	Remove-FederatedDomain Exchange cmdlet issued
Exchange	25282	Remove-FederationTrust Exchange cmdlet issued
Exchange	25283	Remove-ForeignConnector Exchange cmdlet issued
Exchange	25284	Remove-GlobalAddressList Exchange cmdlet issued
Exchange	25285	Remove-InboxRule Exchange cmdlet issued
Exchange	25286	Remove-IPAllowListEntry Exchange cmdlet issued
Exchange	25287	Remove-IPAllowListProvider Exchange cmdlet issued
Exchange	25288	Remove-IPBlockListEntry Exchange cmdlet issued
Exchange	25289	Remove-IPBlockListProvider Exchange cmdlet issued
Exchange	25290	Remove-JournalRule Exchange cmdlet issued
Exchange	25291	Remove-Mailbox Exchange cmdlet issued
Exchange	25292	Remove-MailboxDatabase Exchange cmdlet issued
Exchange	25293	Remove-MailboxDatabaseCopy Exchange cmdlet issued
Exchange	25294	Remove-MailboxFolderPermission Exchange cmdlet issued
Exchange	25295	Remove-MailboxPermission Exchange cmdlet issued
Exchange	25296	Remove-MailboxRestoreRequest Exchange cmdlet issued
Exchange	25297	Remove-MailContact Exchange cmdlet issued
Exchange	25298	Remove-MailUser Exchange cmdlet issued
Exchange	25299	Remove-ManagedContentSettings Exchange cmdlet issued
Exchange	25300	Remove-ManagedFolder Exchange cmdlet issued
Exchange	25301	Remove-ManagedFolderMailboxPolicy Exchange cmdlet issued
Exchange	25302	Remove-ManagementRole Exchange cmdlet issued
Exchange	25303	Remove-ManagementRoleAssignment Exchange cmdlet issued
Exchange	25304	Remove-ManagementRoleEntry Exchange cmdlet issued
Exchange	25305	Remove-ManagementScope Exchange cmdlet issued
Exchange	25306	Remove-Message Exchange cmdlet issued
Exchange	25307	Remove-MessageClassification Exchange cmdlet issued
Exchange	25308	Remove-MoveRequest Exchange cmdlet issued
Exchange	25309	Remove-OabVirtualDirectory Exchange cmdlet issued
Exchange	25310	Remove-OfflineAddressBook Exchange cmdlet issued
Exchange	25311	Remove-OrganizationRelationship Exchange cmdlet issued
Exchange	25312	Remove-OutlookProtectionRule Exchange cmdlet issued
Exchange	25313	Remove-OutlookProvider Exchange cmdlet issued
Exchange	25314	Remove-OwaMailboxPolicy Exchange cmdlet issued
Exchange	25315	Remove-OwaVirtualDirectory Exchange cmdlet issued
Exchange	25316	Remove-PublicFolder Exchange cmdlet issued
Exchange	25317	Remove-PublicFolderAdministrativePermission Exchange cmdlet issued
Exchange	25318	Remove-PublicFolderClientPermission Exchange cmdlet issued
Exchange	25319	Remove-PublicFolderDatabase Exchange cmdlet issued
Exchange	25320	Remove-ReceiveConnector Exchange cmdlet issued
Exchange	25321	Remove-RemoteDomain Exchange cmdlet issued
Exchange	25322	Remove-RemoteMailbox Exchange cmdlet issued
Exchange	25323	Remove-RetentionPolicy Exchange cmdlet issued
Exchange	25324	Remove-RetentionPolicyTag Exchange cmdlet issued
Exchange	25325	Remove-RoleAssignmentPolicy Exchange cmdlet issued
Exchange	25326	Remove-RoleGroup Exchange cmdlet issued
Exchange	25327	Remove-RoleGroupMember Exchange cmdlet issued
Exchange	25328	Remove-RoutingGroupConnector Exchange cmdlet issued
Exchange	25329	Remove-RpcClientAccess Exchange cmdlet issued
Exchange	25330	Remove-SendConnector Exchange cmdlet issued
Exchange	25331	Remove-SharingPolicy Exchange cmdlet issued
Exchange	25332	Remove-StoreMailbox Exchange cmdlet issued
Exchange	25333	Remove-SystemMessage Exchange cmdlet issued
Exchange	25334	Remove-ThrottlingPolicy Exchange cmdlet issued
Exchange	25335	Remove-TransportRule Exchange cmdlet issued
Exchange	25336	Remove-UMAutoAttendant Exchange cmdlet issued
Exchange	25337	Remove-UMDialPlan Exchange cmdlet issued
Exchange	25338	Remove-UMHuntGroup Exchange cmdlet issued
Exchange	25339	Remove-UMIPGateway Exchange cmdlet issued
Exchange	25340	Remove-UMMailboxPolicy Exchange cmdlet issued
Exchange	25341	Remove-WebServicesVirtualDirectory Exchange cmdlet issued
Exchange	25342	Remove-X400AuthoritativeDomain Exchange cmdlet issued
Exchange	25343	Restore-DatabaseAvailabilityGroup Exchange cmdlet issued
Exchange	25344	Restore-DetailsTemplate Exchange cmdlet issued
Exchange	25345	Restore-Mailbox Exchange cmdlet issued
Exchange	25346	Resume-MailboxDatabaseCopy Exchange cmdlet issued
Exchange	25347	Resume-MailboxExportRequest Exchange cmdlet issued
Exchange	25348	Resume-MailboxRestoreRequest Exchange cmdlet issued
Exchange	25349	Resume-Message Exchange cmdlet issued
Exchange	25350	Resume-MoveRequest Exchange cmdlet issued
Exchange	25351	Resume-PublicFolderReplication Exchange cmdlet issued
Exchange	25352	Resume-Queue Exchange cmdlet issued
Exchange	25353	Retry-Queue Exchange cmdlet issued
Exchange	25354	Send-TextMessagingVerificationCode Exchange cmdlet issued
Exchange	25355	Set-AcceptedDomain Exchange cmdlet issued
Exchange	25356	Set-ActiveSyncDeviceAccessRule Exchange cmdlet issued
Exchange	25357	Set-ActiveSyncMailboxPolicy Exchange cmdlet issued
Exchange	25358	Set-ActiveSyncOrganizationSettings Exchange cmdlet issued
Exchange	25359	Set-ActiveSyncVirtualDirectory Exchange cmdlet issued
Exchange	25360	Set-AddressList Exchange cmdlet issued
Exchange	25361	Set-AdminAuditLogConfig Exchange cmdlet issued
Exchange	25362	Set-ADServerSettings Exchange cmdlet issued
Exchange	25363	Set-ADSite Exchange cmdlet issued
Exchange	25364	Set-AdSiteLink Exchange cmdlet issued
Exchange	25365	Set-AutodiscoverVirtualDirectory Exchange cmdlet issued
Exchange	25366	Set-AvailabilityConfig Exchange cmdlet issued
Exchange	25367	Set-AvailabilityReportOutage Exchange cmdlet issued
Exchange	25368	Set-CalendarNotification Exchange cmdlet issued
Exchange	25369	Set-CalendarProcessing Exchange cmdlet issued
Exchange	25370	Set-CASMailbox Exchange cmdlet issued
Exchange	25371	Set-ClientAccessArray Exchange cmdlet issued
Exchange	25372	Set-ClientAccessServer Exchange cmdlet issued
Exchange	25373	Set-CmdletExtensionAgent Exchange cmdlet issued
Exchange	25374	Set-Contact Exchange cmdlet issued
Exchange	25375	Set-ContentFilterConfig Exchange cmdlet issued
Exchange	25376	Set-DatabaseAvailabilityGroup Exchange cmdlet issued
Exchange	25377	Set-DatabaseAvailabilityGroupNetwork Exchange cmdlet issued
Exchange	25378	Set-DeliveryAgentConnector Exchange cmdlet issued
Exchange	25379	Set-DetailsTemplate Exchange cmdlet issued
Exchange	25380	Set-DistributionGroup Exchange cmdlet issued
Exchange	25381	Set-DynamicDistributionGroup Exchange cmdlet issued
Exchange	25382	Set-EcpVirtualDirectory Exchange cmdlet issued
Exchange	25383	Set-EdgeSyncServiceConfig Exchange cmdlet issued
Exchange	25384	Set-EmailAddressPolicy Exchange cmdlet issued
Exchange	25385	Set-EventLogLevel Exchange cmdlet issued
Exchange	25386	Set-ExchangeAssistanceConfig Exchange cmdlet issued
Exchange	25387	Set-ExchangeServer Exchange cmdlet issued
Exchange	25388	Set-FederatedOrganizationIdentifier Exchange cmdlet issued
Exchange	25389	Set-FederationTrust Exchange cmdlet issued
Exchange	25390	Set-ForeignConnector Exchange cmdlet issued
Exchange	25391	Set-GlobalAddressList Exchange cmdlet issued
Exchange	25392	Set-Group Exchange cmdlet issued
Exchange	25393	Set-ImapSettings Exchange cmdlet issued
Exchange	25394	Set-InboxRule Exchange cmdlet issued
Exchange	25395	Set-IPAllowListConfig Exchange cmdlet issued
Exchange	25396	Set-IPAllowListProvider Exchange cmdlet issued
Exchange	25397	Set-IPAllowListProvidersConfig Exchange cmdlet issued
Exchange	25398	Set-IPBlockListConfig Exchange cmdlet issued
Exchange	25399	Set-IPBlockListProvider Exchange cmdlet issued
Exchange	25400	Set-IPBlockListProvidersConfig Exchange cmdlet issued
Exchange	25401	Set-IRMConfiguration Exchange cmdlet issued
Exchange	25402	Set-JournalRule Exchange cmdlet issued
Exchange	25403	Set-Mailbox Exchange cmdlet issued
Exchange	25404	Set-MailboxAuditBypassAssociation Exchange cmdlet issued
Exchange	25405	Set-MailboxAutoReplyConfiguration Exchange cmdlet issued
Exchange	25406	Set-MailboxCalendarConfiguration Exchange cmdlet issued
Exchange	25407	Set-MailboxCalendarFolder Exchange cmdlet issued
Exchange	25408	Set-MailboxDatabase Exchange cmdlet issued
Exchange	25409	Set-MailboxDatabaseCopy Exchange cmdlet issued
Exchange	25410	Set-MailboxFolderPermission Exchange cmdlet issued
Exchange	25411	Set-MailboxJunkEmailConfiguration Exchange cmdlet issued
Exchange	25412	Set-MailboxMessageConfiguration Exchange cmdlet issued
Exchange	25413	Set-MailboxRegionalConfiguration Exchange cmdlet issued
Exchange	25414	Set-MailboxRestoreRequest Exchange cmdlet issued
Exchange	25415	Set-MailboxServer Exchange cmdlet issued
Exchange	25416	Set-MailboxSpellingConfiguration Exchange cmdlet issued
Exchange	25417	Set-MailContact Exchange cmdlet issued
Exchange	25418	Set-MailPublicFolder Exchange cmdlet issued
Exchange	25419	Set-MailUser Exchange cmdlet issued
Exchange	25420	Set-ManagedContentSettings Exchange cmdlet issued
Exchange	25421	Set-ManagedFolder Exchange cmdlet issued
Exchange	25422	Set-ManagedFolderMailboxPolicy Exchange cmdlet issued
Exchange	25423	Set-ManagementRoleAssignment Exchange cmdlet issued
Exchange	25424	Set-ManagementRoleEntry Exchange cmdlet issued
Exchange	25425	Set-ManagementScope Exchange cmdlet issued
Exchange	25426	Set-MessageClassification Exchange cmdlet issued
Exchange	25427	Set-MoveRequest Exchange cmdlet issued
Exchange	25428	Set-OabVirtualDirectory Exchange cmdlet issued
Exchange	25429	Set-OfflineAddressBook Exchange cmdlet issued
Exchange	25430	Set-OrganizationConfig Exchange cmdlet issued
Exchange	25431	Set-OrganizationRelationship Exchange cmdlet issued
Exchange	25432	Set-OutlookAnywhere Exchange cmdlet issued
Exchange	25433	Set-OutlookProtectionRule Exchange cmdlet issued
Exchange	25434	Set-OutlookProvider Exchange cmdlet issued
Exchange	25435	Set-OwaMailboxPolicy Exchange cmdlet issued
Exchange	25436	Set-OwaVirtualDirectory Exchange cmdlet issued
Exchange	25437	Set-PopSettings Exchange cmdlet issued
Exchange	25438	Set-PowerShellVirtualDirectory Exchange cmdlet issued
Exchange	25439	Set-PublicFolder Exchange cmdlet issued
Exchange	25440	Set-PublicFolderDatabase Exchange cmdlet issued
Exchange	25441	Set-ReceiveConnector Exchange cmdlet issued
Exchange	25442	Set-RecipientFilterConfig Exchange cmdlet issued
Exchange	25443	Set-RemoteDomain Exchange cmdlet issued
Exchange	25444	Set-RemoteMailbox Exchange cmdlet issued
Exchange	25445	Set-ResourceConfig Exchange cmdlet issued
Exchange	25446	Set-RetentionPolicy Exchange cmdlet issued
Exchange	25447	Set-RetentionPolicyTag Exchange cmdlet issued
Exchange	25448	Set-RoleAssignmentPolicy Exchange cmdlet issued
Exchange	25449	Set-RoleGroup Exchange cmdlet issued
Exchange	25450	Set-RoutingGroupConnector Exchange cmdlet issued
Exchange	25451	Set-RpcClientAccess Exchange cmdlet issued
Exchange	25452	Set-SendConnector Exchange cmdlet issued
Exchange	25453	Set-SenderFilterConfig Exchange cmdlet issued
Exchange	25454	Set-SenderIdConfig Exchange cmdlet issued
Exchange	25455	Set-SenderReputationConfig Exchange cmdlet issued
Exchange	25456	Set-SharingPolicy Exchange cmdlet issued
Exchange	25457	Set-SystemMessage Exchange cmdlet issued
Exchange	25458	Set-TextMessagingAccount Exchange cmdlet issued
Exchange	25459	Set-ThrottlingPolicy Exchange cmdlet issued
Exchange	25460	Set-ThrottlingPolicyAssociation Exchange cmdlet issued
Exchange	25461	Set-TransportAgent Exchange cmdlet issued
Exchange	25462	Set-TransportConfig Exchange cmdlet issued
Exchange	25463	Set-TransportRule Exchange cmdlet issued
Exchange	25464	Set-TransportServer Exchange cmdlet issued
Exchange	25465	Set-UMAutoAttendant Exchange cmdlet issued
Exchange	25466	Set-UMDialPlan Exchange cmdlet issued
Exchange	25467	Set-UMIPGateway Exchange cmdlet issued
Exchange	25468	Set-UMMailbox Exchange cmdlet issued
Exchange	25469	Set-UMMailboxPIN Exchange cmdlet issued
Exchange	25470	Set-UMMailboxPolicy Exchange cmdlet issued
Exchange	25471	Set-UmServer Exchange cmdlet issued
Exchange	25472	Set-User Exchange cmdlet issued
Exchange	25473	Set-WebServicesVirtualDirectory Exchange cmdlet issued
Exchange	25474	Set-X400AuthoritativeDomain Exchange cmdlet issued
Exchange	25475	Start-DatabaseAvailabilityGroup Exchange cmdlet issued
Exchange	25476	Start-EdgeSynchronization Exchange cmdlet issued
Exchange	25477	Start-ManagedFolderAssistant Exchange cmdlet issued
Exchange	25478	Start-RetentionAutoTagLearning Exchange cmdlet issued
Exchange	25479	Stop-DatabaseAvailabilityGroup Exchange cmdlet issued
Exchange	25480	Stop-ManagedFolderAssistant Exchange cmdlet issued
Exchange	25481	Suspend-MailboxDatabaseCopy Exchange cmdlet issued
Exchange	25482	Suspend-MailboxRestoreRequest Exchange cmdlet issued
Exchange	25483	Suspend-Message Exchange cmdlet issued
Exchange	25484	Suspend-MoveRequest Exchange cmdlet issued
Exchange	25485	Suspend-PublicFolderReplication Exchange cmdlet issued
Exchange	25486	Suspend-Queue Exchange cmdlet issued
Exchange	25487	Test-ActiveSyncConnectivity Exchange cmdlet issued
Exchange	25488	Test-AssistantHealth Exchange cmdlet issued
Exchange	25489	Test-CalendarConnectivity Exchange cmdlet issued
Exchange	25490	Test-EcpConnectivity Exchange cmdlet issued
Exchange	25491	Test-EdgeSynchronization Exchange cmdlet issued
Exchange	25492	Test-ExchangeSearch Exchange cmdlet issued
Exchange	25493	Test-FederationTrust Exchange cmdlet issued
Exchange	25494	Test-FederationTrustCertificate Exchange cmdlet issued
Exchange	25495	Test-ImapConnectivity Exchange cmdlet issued
Exchange	25496	Test-IPAllowListProvider Exchange cmdlet issued
Exchange	25497	Test-IPBlockListProvider Exchange cmdlet issued
Exchange	25498	Test-IRMConfiguration Exchange cmdlet issued
Exchange	25499	Test-Mailflow Exchange cmdlet issued
Exchange	25500	Test-MAPIConnectivity Exchange cmdlet issued
Exchange	25501	Test-MRSHealth Exchange cmdlet issued
Exchange	25502	Test-OrganizationRelationship Exchange cmdlet issued
Exchange	25503	Test-OutlookConnectivity Exchange cmdlet issued
Exchange	25504	Test-OutlookWebServices Exchange cmdlet issued
Exchange	25505	Test-OwaConnectivity Exchange cmdlet issued
Exchange	25506	Test-PopConnectivity Exchange cmdlet issued
Exchange	25507	Test-PowerShellConnectivity Exchange cmdlet issued
Exchange	25508	Test-ReplicationHealth Exchange cmdlet issued
Exchange	25509	Test-SenderId Exchange cmdlet issued
Exchange	25510	Test-ServiceHealth Exchange cmdlet issued
Exchange	25511	Test-SmtpConnectivity Exchange cmdlet issued
Exchange	25512	Test-SystemHealth Exchange cmdlet issued
Exchange	25513	Test-UMConnectivity Exchange cmdlet issued
Exchange	25514	Test-WebServicesConnectivity Exchange cmdlet issued
Exchange	25515	Uninstall-TransportAgent Exchange cmdlet issued
Exchange	25516	Update-AddressList Exchange cmdlet issued
Exchange	25517	Update-DistributionGroupMember Exchange cmdlet issued
Exchange	25518	Update-EmailAddressPolicy Exchange cmdlet issued
Exchange	25519	Update-FileDistributionService Exchange cmdlet issued
Exchange	25520	Update-GlobalAddressList Exchange cmdlet issued
Exchange	25521	Update-MailboxDatabaseCopy Exchange cmdlet issued
Exchange	25522	Update-OfflineAddressBook Exchange cmdlet issued
Exchange	25523	Update-PublicFolder Exchange cmdlet issued
Exchange	25524	Update-PublicFolderHierarchy Exchange cmdlet issued
Exchange	25525	Update-Recipient Exchange cmdlet issued
Exchange	25526	Update-RoleGroupMember Exchange cmdlet issued
Exchange	25527	Update-SafeList Exchange cmdlet issued
Exchange	25528	Write-AdminAuditLog Exchange cmdlet issued
Exchange	25529	Add-GlobalMonitoringOverride Exchange cmdlet issued
Exchange	25530	Add-ResubmitRequest Exchange cmdlet issued
Exchange	25531	Add-ServerMonitoringOverride Exchange cmdlet issued
Exchange	25532	Clear-MobileDevice Exchange cmdlet issued
Exchange	25533	Complete-MigrationBatch Exchange cmdlet issued
Exchange	25534	Disable-App Exchange cmdlet issued
Exchange	25535	Disable-MailboxQuarantine Exchange cmdlet issued
Exchange	25536	Disable-UMCallAnsweringRule Exchange cmdlet issued
Exchange	25537	Disable-UMService Exchange cmdlet issued
Exchange	25538	Dump-ProvisioningCache Exchange cmdlet issued
Exchange	25539	Enable-App Exchange cmdlet issued
Exchange	25540	Enable-MailboxQuarantine Exchange cmdlet issued
Exchange	25541	Enable-UMCallAnsweringRule Exchange cmdlet issued
Exchange	25542	Enable-UMService Exchange cmdlet issued
Exchange	25543	Export-DlpPolicyCollection Exchange cmdlet issued
Exchange	25544	Export-MigrationReport Exchange cmdlet issued
Exchange	25545	Import-DlpPolicyCollection Exchange cmdlet issued
Exchange	25546	Import-DlpPolicyTemplate Exchange cmdlet issued
Exchange	25547	Invoke-MonitoringProbe Exchange cmdlet issued
Exchange	25548	New-AddressBookPolicy Exchange cmdlet issued
Exchange	25549	New-App Exchange cmdlet issued
Exchange	25550	New-AuthServer Exchange cmdlet issued
Exchange	25551	New-ClassificationRuleCollection Exchange cmdlet issued
Exchange	25552	New-DlpPolicy Exchange cmdlet issued
Exchange	25553	New-HybridConfiguration Exchange cmdlet issued
Exchange	25554	New-MailboxExportRequest Exchange cmdlet issued
Exchange	25555	New-MailboxImportRequest Exchange cmdlet issued
Exchange	25556	New-MailboxSearch Exchange cmdlet issued
Exchange	25557	New-MalwareFilterPolicy Exchange cmdlet issued
Exchange	25558	New-MigrationBatch Exchange cmdlet issued
Exchange	25559	New-MigrationEndpoint Exchange cmdlet issued
Exchange	25560	New-MobileDeviceMailboxPolicy Exchange cmdlet issued
Exchange	25561	New-OnPremisesOrganization Exchange cmdlet issued
Exchange	25562	New-PartnerApplication Exchange cmdlet issued
Exchange	25563	New-PolicyTipConfig Exchange cmdlet issued
Exchange	25564	New-PowerShellVirtualDirectory Exchange cmdlet issued
Exchange	25565	New-PublicFolderMigrationRequest Exchange cmdlet issued
Exchange	25566	New-ResourcePolicy Exchange cmdlet issued
Exchange	25567	New-SiteMailboxProvisioningPolicy Exchange cmdlet issued
Exchange	25568	New-SyncMailPublicFolder Exchange cmdlet issued
Exchange	25569	New-UMCallAnsweringRule Exchange cmdlet issued
Exchange	25570	New-WorkloadManagementPolicy Exchange cmdlet issued
Exchange	25571	New-WorkloadPolicy Exchange cmdlet issued
Exchange	25572	Redirect-Message Exchange cmdlet issued
Exchange	25573	Remove-AddressBookPolicy Exchange cmdlet issued
Exchange	25574	Remove-App Exchange cmdlet issued
Exchange	25575	Remove-AuthServer Exchange cmdlet issued
Exchange	25576	Remove-ClassificationRuleCollection Exchange cmdlet issued
Exchange	25577	Remove-DlpPolicy Exchange cmdlet issued
Exchange	25578	Remove-DlpPolicyTemplate Exchange cmdlet issued
Exchange	25579	Remove-GlobalMonitoringOverride Exchange cmdlet issued
Exchange	25580	Remove-HybridConfiguration Exchange cmdlet issued
Exchange	25581	Remove-LinkedUser Exchange cmdlet issued
Exchange	25582	Remove-MailboxExportRequest Exchange cmdlet issued
Exchange	25583	Remove-MailboxImportRequest Exchange cmdlet issued
Exchange	25584	Remove-MailboxSearch Exchange cmdlet issued
Exchange	25585	Remove-MalwareFilterPolicy Exchange cmdlet issued
Exchange	25586	Remove-MalwareFilterRecoveryItem Exchange cmdlet issued
Exchange	25587	Remove-MigrationBatch Exchange cmdlet issued
Exchange	25588	Remove-MigrationEndpoint Exchange cmdlet issued
Exchange	25589	Remove-MigrationUser Exchange cmdlet issued
Exchange	25590	Remove-MobileDevice Exchange cmdlet issued
Exchange	25591	Remove-MobileDeviceMailboxPolicy Exchange cmdlet issued
Exchange	25592	Remove-OnPremisesOrganization Exchange cmdlet issued
Exchange	25593	Remove-PartnerApplication Exchange cmdlet issued
Exchange	25594	Remove-PolicyTipConfig Exchange cmdlet issued
Exchange	25595	Remove-PowerShellVirtualDirectory Exchange cmdlet issued
Exchange	25596	Remove-PublicFolderMigrationRequest Exchange cmdlet issued
Exchange	25597	Remove-ResourcePolicy Exchange cmdlet issued
Exchange	25598	Remove-ResubmitRequest Exchange cmdlet issued
Exchange	25599	Remove-SiteMailboxProvisioningPolicy Exchange cmdlet issued
Exchange	25600	Remove-UMCallAnsweringRule Exchange cmdlet issued
Exchange	25601	Remove-UserPhoto Exchange cmdlet issued
Exchange	25602	Remove-WorkloadManagementPolicy Exchange cmdlet issued
Exchange	25603	Remove-WorkloadPolicy Exchange cmdlet issued
Exchange	25604	Reset-ProvisioningCache Exchange cmdlet issued
Exchange	25605	Resume-MailboxImportRequest Exchange cmdlet issued
Exchange	25606	Resume-MalwareFilterRecoveryItem Exchange cmdlet issued
Exchange	25607	Resume-PublicFolderMigrationRequest Exchange cmdlet issued
Exchange	25608	Set-ActiveSyncDeviceAccessRule Exchange cmdlet issued
Exchange	25609	Set-AddressBookPolicy Exchange cmdlet issued
Exchange	25610	Set-App Exchange cmdlet issued
Exchange	25611	Set-AuthConfig Exchange cmdlet issued
Exchange	25612	Set-AuthServer Exchange cmdlet issued
Exchange	25613	Set-ClassificationRuleCollection Exchange cmdlet issued
Exchange	25614	Set-DlpPolicy Exchange cmdlet issued
Exchange	25615	Set-FrontendTransportService Exchange cmdlet issued
Exchange	25616	Set-HybridConfiguration Exchange cmdlet issued
Exchange	25617	Set-HybridMailflow Exchange cmdlet issued
Exchange	25618	Set-MailboxExportRequest Exchange cmdlet issued
Exchange	25619	Set-MailboxImportRequest Exchange cmdlet issued
Exchange	25620	Set-MailboxSearch Exchange cmdlet issued
Exchange	25621	Set-MailboxTransportService Exchange cmdlet issued
Exchange	25622	Set-MalwareFilteringServer Exchange cmdlet issued
Exchange	25623	Set-MalwareFilterPolicy Exchange cmdlet issued
Exchange	25624	Set-MigrationBatch Exchange cmdlet issued
Exchange	25625	Set-MigrationConfig Exchange cmdlet issued
Exchange	25626	Set-MigrationEndpoint Exchange cmdlet issued
Exchange	25627	Set-MobileDeviceMailboxPolicy Exchange cmdlet issued
Exchange	25628	Set-Notification Exchange cmdlet issued
Exchange	25629	Set-OnPremisesOrganization Exchange cmdlet issued
Exchange	25630	Set-PartnerApplication Exchange cmdlet issued
Exchange	25631	Set-PendingFederatedDomain Exchange cmdlet issued
Exchange	25632	Set-PolicyTipConfig Exchange cmdlet issued
Exchange	25633	Set-PublicFolderMigrationRequest Exchange cmdlet issued
Exchange	25634	Set-ResourcePolicy Exchange cmdlet issued
Exchange	25635	Set-ResubmitRequest Exchange cmdlet issued
Exchange	25636	Set-RMSTemplate Exchange cmdlet issued
Exchange	25637	Set-ServerComponentState Exchange cmdlet issued
Exchange	25638	Set-ServerMonitor Exchange cmdlet issued
Exchange	25639	Set-SiteMailbox Exchange cmdlet issued
Exchange	25640	Set-SiteMailboxProvisioningPolicy Exchange cmdlet issued
Exchange	25641	Set-TransportService Exchange cmdlet issued
Exchange	25642	Set-UMCallAnsweringRule Exchange cmdlet issued
Exchange	25643	Set-UMCallRouterSettings Exchange cmdlet issued
Exchange	25644	Set-UMService Exchange cmdlet issued
Exchange	25645	Set-UserPhoto Exchange cmdlet issued
Exchange	25646	Set-WorkloadPolicy Exchange cmdlet issued
Exchange	25647	Start-MailboxSearch Exchange cmdlet issued
Exchange	25648	Start-MigrationBatch Exchange cmdlet issued
Exchange	25649	Stop-MailboxSearch Exchange cmdlet issued
Exchange	25650	Stop-MigrationBatch Exchange cmdlet issued
Exchange	25651	Suspend-MailboxExportRequest Exchange cmdlet issued
Exchange	25652	Suspend-MailboxImportRequest Exchange cmdlet issued
Exchange	25653	Suspend-PublicFolderMigrationRequest Exchange cmdlet issued
Exchange	25654	Test-ArchiveConnectivity Exchange cmdlet issued
Exchange	25655	Test-MigrationServerAvailability Exchange cmdlet issued
Exchange	25656	Test-OAuthConnectivity Exchange cmdlet issued
Exchange	25657	Test-SiteMailbox Exchange cmdlet issued
Exchange	25658	Update-HybridConfiguration Exchange cmdlet issued
Exchange	25659	Update-PublicFolderMailbox Exchange cmdlet issued
Exchange	25660	Update-SiteMailbox Exchange cmdlet issued
Exchange	25661	Add-AttachmentFilterEntry Exchange cmdlet issued
Exchange	25662	Remove-AttachmentFilterEntry Exchange cmdlet issued
Exchange	25663	New-AddressRewriteEntry Exchange cmdlet issued
Exchange	25664	Remove-AddressRewriteEntry Exchange cmdlet issued
Exchange	25665	Set-AddressRewriteEntry Exchange cmdlet issued
Exchange	25666	Set-AttachmentFilterListConfig Exchange cmdlet issued
Exchange	25667	Set-MailboxSentItemsConfiguration Exchange cmdlet issued
Exchange	25668	Update-MovedMailbox Exchange cmdlet issued
Exchange	25669	Disable-MalwareFilterRule Exchange cmdlet issued
Exchange	25670	Enable-MalwareFilterRule Exchange cmdlet issued
Exchange	25671	New-MalwareFilterRule Exchange cmdlet issued
Exchange	25672	Remove-MalwareFilterRule Exchange cmdlet issued
Exchange	25673	Set-MalwareFilterRule Exchange cmdlet issued
Exchange	25674	Remove-MailboxRepairRequest Exchange cmdlet issued
Exchange	25675	Remove-ServerMonitoringOverride Exchange cmdlet issued
Exchange	25676	Update-ExchangeHelp Exchange cmdlet issued
Exchange	25677	Update-StoreMailboxState Exchange cmdlet issued
Exchange	25678	Disable-PushNotificationProxy Exchange cmdlet issued
Exchange	25679	Enable-PushNotificationProxy Exchange cmdlet issued
Exchange	25680	New-PublicFolderMoveRequest Exchange cmdlet issued
Exchange	25681	Remove-PublicFolderMoveRequest Exchange cmdlet issued
Exchange	25682	Resume-PublicFolderMoveRequest Exchange cmdlet issued
Exchange	25683	Set-PublicFolderMoveRequest Exchange cmdlet issued
Exchange	25684	Suspend-PublicFolderMoveRequest Exchange cmdlet issued
Exchange	25685	Update-DatabaseSchema Exchange cmdlet issued
Exchange	25686	Set-SearchDocumentFormat Exchange cmdlet issued
Exchange	25687	New-AuthRedirect Exchange cmdlet issued
Exchange	25688	New-CompliancePolicySyncNotification Exchange cmdlet issued
Exchange	25689	New-ComplianceServiceVirtualDirectory Exchange cmdlet issued
Exchange	25690	New-DatabaseAvailabilityGroupConfiguration Exchange cmdlet issued
Exchange	25691	New-DataClassification Exchange cmdlet issued
Exchange	25692	New-Fingerprint Exchange cmdlet issued
Exchange	25693	New-IntraOrganizationConnector Exchange cmdlet issued
Exchange	25694	New-MailboxDeliveryVirtualDirectory Exchange cmdlet issued
Exchange	25695	New-MapiVirtualDirectory Exchange cmdlet issued
Exchange	25696	New-OutlookServiceVirtualDirectory Exchange cmdlet issued
Exchange	25697	New-RestVirtualDirectory Exchange cmdlet issued
Exchange	25698	New-SearchDocumentFormat Exchange cmdlet issued
Exchange	25699	New-SettingOverride Exchange cmdlet issued
Exchange	25700	New-SiteMailbox Exchange cmdlet issued
Exchange	25701	Remove-AuthRedirect Exchange cmdlet issued
Exchange	25702	Remove-CompliancePolicySyncNotification Exchange cmdlet issued
Exchange	25703	Remove-ComplianceServiceVirtualDirectory Exchange cmdlet issued
Exchange	25704	Remove-DatabaseAvailabilityGroupConfiguration Exchange cmdlet issued
Exchange	25705	Remove-DataClassification Exchange cmdlet issued
Exchange	25706	Remove-IntraOrganizationConnector Exchange cmdlet issued
Exchange	25707	Remove-MailboxDeliveryVirtualDirectory Exchange cmdlet issued
Exchange	25708	Remove-MapiVirtualDirectory Exchange cmdlet issued
Exchange	25709	Remove-OutlookServiceVirtualDirectory Exchange cmdlet issued
Exchange	25710	Remove-PublicFolderMailboxMigrationRequest Exchange cmdlet issued
Exchange	25711	Remove-PushNotificationSubscription Exchange cmdlet issued
Exchange	25712	Remove-RestVirtualDirectory Exchange cmdlet issued
Exchange	25713	Remove-SearchDocumentFormat Exchange cmdlet issued
Exchange	25714	Remove-SettingOverride Exchange cmdlet issued
Exchange	25715	Remove-SyncMailPublicFolder Exchange cmdlet issued
Exchange	25716	Resume-PublicFolderMailboxMigrationRequest Exchange cmdlet issued
Exchange	25717	Send-MapiSubmitSystemProbe Exchange cmdlet issued
Exchange	25718	Set-AuthRedirect Exchange cmdlet issued
Exchange	25719	Set-ClientAccessService Exchange cmdlet issued
Exchange	25720	Set-Clutter Exchange cmdlet issued
Exchange	25721	Set-ComplianceServiceVirtualDirectory Exchange cmdlet issued
Exchange	25722	Set-ConsumerMailbox Exchange cmdlet issued
Exchange	25723	Set-DatabaseAvailabilityGroupConfiguration Exchange cmdlet issued
Exchange	25724	Set-DataClassification Exchange cmdlet issued
Exchange	25725	Set-IntraOrganizationConnector Exchange cmdlet issued
Exchange	25726	Set-LogExportVirtualDirectory Exchange cmdlet issued
Exchange	25727	Set-MailboxDeliveryVirtualDirectory Exchange cmdlet issued
Exchange	25728	Set-MapiVirtualDirectory Exchange cmdlet issued
Exchange	25729	Set-OutlookServiceVirtualDirectory Exchange cmdlet issued
Exchange	25730	Set-PublicFolderMailboxMigrationRequest Exchange cmdlet issued
Exchange	25731	Set-RestVirtualDirectory Exchange cmdlet issued
Exchange	25732	Set-SettingOverride Exchange cmdlet issued
Exchange	25733	Set-SmimeConfig Exchange cmdlet issued
Exchange	25734	Set-SubmissionMalwareFilteringServer Exchange cmdlet issued
Exchange	25735	Set-UMMailboxConfiguration Exchange cmdlet issued
Exchange	25736	Set-UnifiedAuditSetting Exchange cmdlet issued
Exchange	25737	Start-AuditAssistant Exchange cmdlet issued
Exchange	25738	Start-UMPhoneSession Exchange cmdlet issued
Exchange	25739	Stop-UMPhoneSession Exchange cmdlet issued
Exchange	25740	Test-DataClassification Exchange cmdlet issued
Exchange	25741	Test-TextExtraction Exchange cmdlet issued
SharePoint	11	Site collection audit policy changed
SharePoint	12	Audit policy changed
SharePoint	13	Document checked in
SharePoint	14	Document checked out
SharePoint	15	Child object deleted
SharePoint	16	Child object moved
SharePoint	17	Object copied
SharePoint	18	Custom event
SharePoint	19	Object deleted
SharePoint	20	SharePoint audit logs deleted
SharePoint	21	Object moved
SharePoint	22	Object profile changed
SharePoint	23	SharePoint object structure changed
SharePoint	24	Search performed
SharePoint	25	SharePoint group created
SharePoint	26	SharePoint group deleted
SharePoint	27	SharePoint group member added
SharePoint	28	SharePoint group member removed
SharePoint	29	Unique permissions created
SharePoint	30	Unique permissions removed
SharePoint	31	Permissions updated
SharePoint	32	Permissions removed
SharePoint	33	Unique permission levels created
SharePoint	34	Permission level created
SharePoint	35	Permission level deleted
SharePoint	36	Permission level modified
SharePoint	37	SharePoint site collection administrator added
SharePoint	38	SharePoint site collection administrator removed
SharePoint	39	Object restored
SharePoint	40	Site collection updated
SharePoint	41	Web updated
SharePoint	42	Document library updated
SharePoint	43	Document updated
SharePoint	44	List updated
SharePoint	45	List item updated
SharePoint	46	Folder updated
SharePoint	47	Document viewed
SharePoint	48	Document library viewed
SharePoint	49	List viewed
SharePoint	50	Object viewed
SharePoint	51	Workflow accessed
SharePoint	52	Information management policy created
SharePoint	53	Information management policy changed
SharePoint	54	Site collection information management policy created
SharePoint	55	Site collection information management policy changed
SharePoint	56	Export of objects started
SharePoint	57	Export of objects completed
SharePoint	58	Import of objects started
SharePoint	59	Import of objects completed
SharePoint	60	Possible tampering warning
SharePoint	61	Retention policy processed
SharePoint	62	Document fragment updated
SharePoint	63	Content type imported
SharePoint	64	Information management policy deleted
SharePoint	65	Item declared as a record
SharePoint	66	Item undeclared as a record
SharePoint	67	Netwrix SharePoint Audit Event
SQL Server	24000	SQL audit event
SQL Server	24001	Login succeeded (action_id LGIS)
SQL Server	24002	Logout succeeded (action_id LGO)
SQL Server	24003	Login failed (action_id LGIF)
SQL Server	24004	Change own password succeeded (action_id PWCS; class_type LX)
SQL Server	24005	Change own password failed (action_id PWCS; class_type LX)
SQL Server	24006	Change password succeeded (action_id PWC class_type LX)
SQL Server	24007	Change password failed (action_id PWC class_type LX)
SQL Server	24008	Reset own password succeeded (action_id PWRS; class_type LX)
SQL Server	24009	Reset own password failed (action_id PWRS; class_type LX)
SQL Server	24010	Reset password succeeded (action_id PWR; class_type LX)
SQL Server	24011	Reset password failed (action_id PWR; class_type LX)
SQL Server	24012	Must change password (action_id PWMC)
SQL Server	24013	Account unlocked (action_id PWU)
SQL Server	24014	Change application role password succeeded (action_id PWC; class_type AR)
SQL Server	24015	Change application role password failed (action_id PWC class_type AR)
SQL Server	24016	Add member to server role succeeded (action_id APRL class_type SG)
SQL Server	24017	Add member to server role failed (action_id APRL class_type SG)
SQL Server	24018	Remove member from server role succeeded (action_id DPRL class_type SG)
SQL Server	24019	Remove member from server role failed (action_id DPRL class_type SG)
SQL Server	24020	Add member to database role succeeded (action_id APRL class_type RL)
SQL Server	24021	Add member to database role failed (action_id APRL class_type RL)
SQL Server	24022	Remove member from database role succeeded (action_id DPRL class_type RL)
SQL Server	24023	Remove member from database role failed (action_id DPRL class_type RL)
SQL Server	24024	Issued database backup command (action_id BA class_type DB)
SQL Server	24025	Issued transaction log backup command (action_id BAL)
SQL Server	24026	Issued database restore command (action_id RS class_type DB)
SQL Server	24027	Issued transaction log restore command (action_id RS class_type DB)
SQL Server	24028	Issued database console command (action_id DBCC)
SQL Server	24029	Issued a bulk administration command (action_id ADBO)
SQL Server	24030	Issued an alter connection command (action_id ALCN)
SQL Server	24031	Issued an alter resources command (action_id ALRS)
SQL Server	24032	Issued an alter server state command (action_id ALSS)
SQL Server	24033	Issued an alter server settings command (action_id ALST)
SQL Server	24034	Issued a view server state command (action_id VSST)
SQL Server	24035	Issued an external access assembly command (action_id XA)
SQL Server	24036	Issued an unsafe assembly command (action_id XU)
SQL Server	24037	Issued an alter resource governor command (action_id ALRS class_type RG)
SQL Server	24038	Issued a database authenticate command (action_id AUTH)
SQL Server	24039	Issued a database checkpoint command (action_id CP)
SQL Server	24040	Issued a database show plan command (action_id SPLN)
SQL Server	24041	Issued a subscribe to query information command (action_id SUQN)
SQL Server	24042	Issued a view database state command (action_id VDST)
SQL Server	24043	Issued a change server audit command (action_id AL class_type A)
SQL Server	24044	Issued a change server audit specification command (action_id AL class_type SA)
SQL Server	24045	Issued a change database audit specification command (action_id AL class_type DA)
SQL Server	24046	Issued a create server audit command (action_id CR class_type A)
SQL Server	24047	Issued a create server audit specification command (action_id CR class_type SA)
SQL Server	24048	Issued a create database audit specification command (action_id CR class_type DA)
SQL Server	24049	Issued a delete server audit command (action_id DR class_type A)
SQL Server	24050	Issued a delete server audit specification command (action_id DR class_type SA)
SQL Server	24051	Issued a delete database audit specification command (action_id DR class_type DA)
SQL Server	24052	Audit failure (action_id AUSF)
SQL Server	24053	Audit session changed (action_id AUSC)
SQL Server	24054	Started SQL server (action_id SVSR)
SQL Server	24055	Paused SQL server (action_id SVPD)
SQL Server	24056	Resumed SQL server (action_id SVCN)
SQL Server	24057	Stopped SQL server (action_id SVSD)
SQL Server	24058	Issued a create server object command (action_id CR; class_type AG, EP, SD, SE, T)
SQL Server	24059	Issued a change server object command (action_id AL; class_type AG, EP, SD, SE, T)
SQL Server	24060	Issued a delete server object command (action_id DR; class_type AG, EP, SD, SE, T)
SQL Server	24061	Issued a create server setting command (action_id CR class_type SR)
SQL Server	24062	Issued a change server setting command (action_id AL class_type SR)
SQL Server	24063	Issued a delete server setting command (action_id DR class_type SR)
SQL Server	24064	Issued a create server cryptographic provider command (action_id CR class_type CP)
SQL Server	24065	Issued a delete server cryptographic provider command (action_id DR class_type CP)
SQL Server	24066	Issued a change server cryptographic provider command (action_id AL class_type CP)
SQL Server	24067	Issued a create server credential command (action_id CR class_type CD)
SQL Server	24068	Issued a delete server credential command (action_id DR class_type CD)
SQL Server	24069	Issued a change server credential command (action_id AL class_type CD)
SQL Server	24070	Issued a change server master key command (action_id AL class_type MK)
SQL Server	24071	Issued a back up server master key command (action_id BA class_type MK)
SQL Server	24072	Issued a restore server master key command (action_id RS class_type MK)
SQL Server	24073	Issued a map server credential to login command (action_id CMLG)
SQL Server	24074	Issued a remove map between server credential and login command (action_id NMLG)
SQL Server	24075	Issued a create server principal command (action_id CR class_type LX, SL)
SQL Server	24076	Issued a delete server principal command (action_id DR class_type LX, SL)
SQL Server	24077	Issued a change server principal credentials command (action_id CCLG)
SQL Server	24078	Issued a disable server principal command (action_id LGDA)
SQL Server	24079	Issued a change server principal default database command (action_id LGDB)
SQL Server	24080	Issued an enable server principal command (action_id LGEA)
SQL Server	24081	Issued a change server principal default language command (action_id LGLG)
SQL Server	24082	Issued a change server principal password expiration command (action_id PWEX)
SQL Server	24083	Issued a change server principal password policy command (action_id PWPL)
SQL Server	24084	Issued a change server principal name command (action_id LGNM)
SQL Server	24085	Issued a create database command (action_id CR class_type DB)
SQL Server	24086	Issued a change database command (action_id AL class_type DB)
SQL Server	24087	Issued a delete database command (action_id DR class_type DB)
SQL Server	24088	Issued a create certificate command (action_id CR class_type CR)
SQL Server	24089	Issued a change certificate command (action_id AL class_type CR)
SQL Server	24090	Issued a delete certificate command (action_id DR class_type CR)
SQL Server	24091	Issued a back up certificate command (action_id BA class_type CR)
SQL Server	24092	Issued an access certificate command (action_id AS class_type CR)
SQL Server	24093	Issued a create asymmetric key command (action_id CR class_type AK)
SQL Server	24094	Issued a change asymmetric key command (action_id AL class_type AK)
SQL Server	24095	Issued a delete asymmetric key command (action_id DR class_type AK)
SQL Server	24096	Issued an access asymmetric key command (action_id AS class_type AK)
SQL Server	24097	Issued a create database master key command (action_id CR class_type MK)
SQL Server	24098	Issued a change database master key command (action_id AL class_type MK)
SQL Server	24099	Issued a delete database master key command (action_id DR class_type MK)
SQL Server	24100	Issued a back up database master key command (action_id BA class_type MK)
SQL Server	24101	Issued a restore database master key command (action_id RS class_type MK)
SQL Server	24102	Issued an open database master key command (action_id OP class_type MK)
SQL Server	24103	Issued a create database symmetric key command (action_id CR class_type SK)
SQL Server	24104	Issued a change database symmetric key command (action_id AL class_type SK)
SQL Server	24105	Issued a delete database symmetric key command (action_id DR class_type SK)
SQL Server	24106	Issued a back up database symmetric key command (action_id BA class_type SK)
SQL Server	24107	Issued an open database symmetric key command (action_id OP class_type SK)
SQL Server	24108	Issued a create database object command (action_id CR)
SQL Server	24109	Issued a change database object command (action_id AL)
SQL Server	24110	Issued a delete database object command (action_id DR)
SQL Server	24111	Issued an access database object command (action_id AS)
SQL Server	24112	Issued a create assembly command (action_id CR class_type AS)
SQL Server	24113	Issued a change assembly command (action_id AL class_type AS)
SQL Server	24114	Issued a delete assembly command (action_id DR class_type AS)
SQL Server	24115	Issued a create schema command (action_id CR class_type SC)
SQL Server	24116	Issued a change schema command (action_id AL class_type SC)
SQL Server	24117	Issued a delete schema command (action_id DR class_type SC)
SQL Server	24118	Issued a create database encryption key command (action_id CR class_type DK)
SQL Server	24119	Issued a change database encryption key command (action_id AL class_type DK)
SQL Server	24120	Issued a delete database encryption key command (action_id DR class_type DK)
SQL Server	24121	Issued a create database user command (action_id CR; class_type US)
SQL Server	24122	Issued a change database user command (action_id AL; class_type US)
SQL Server	24123	Issued a delete database user command (action_id DR; class_type US)
SQL Server	24124	Issued a create database role command (action_id CR class_type RL)
SQL Server	24125	Issued a change database role command (action_id AL class_type RL)
SQL Server	24126	Issued a delete database role command (action_id DR class_type RL)
SQL Server	24127	Issued a create application role command (action_id CR class_type AR)
SQL Server	24128	Issued a change application role command (action_id AL class_type AR)
SQL Server	24129	Issued a delete application role command (action_id DR class_type AR)
SQL Server	24130	Issued a change database user login command (action_id USAF)
SQL Server	24131	Issued an auto-change database user login command (action_id USLG)
SQL Server	24132	Issued a create schema object command (action_id CR class_type D)
SQL Server	24133	Issued a change schema object command (action_id AL class_type D)
SQL Server	24134	Issued a delete schema object command (action_id DR class_type D)
SQL Server	24135	Issued a transfer schema object command (action_id TRO class_type D)
SQL Server	24136	Issued a create schema type command (action_id CR class_type TY)
SQL Server	24137	Issued a change schema type command (action_id AL class_type TY)
SQL Server	24138	Issued a delete schema type command (action_id DR class_type TY)
SQL Server	24139	Issued a transfer schema type command (action_id TRO class_type TY)
SQL Server	24140	Issued a create XML schema collection command (action_id CR class_type SX)
SQL Server	24141	Issued a change XML schema collection command (action_id AL class_type SX)
SQL Server	24142	Issued a delete XML schema collection command (action_id DR class_type SX)
SQL Server	24143	Issued a transfer XML schema collection command (action_id TRO class_type SX)
SQL Server	24144	Issued an impersonate within server scope command (action_id IMP; class_type LX)
SQL Server	24145	Issued an impersonate within database scope command (action_id IMP; class_type US)
SQL Server	24146	Issued a change server object owner command (action_id TO class_type SG)
SQL Server	24147	Issued a change database owner command (action_id TO class_type DB)
SQL Server	24148	Issued a change schema owner command (action_id TO class_type SC)
SQL Server	24150	Issued a change role owner command (action_id TO class_type RL)
SQL Server	24151	Issued a change database object owner command (action_id TO)
SQL Server	24152	Issued a change symmetric key owner command (action_id TO class_type SK)
SQL Server	24153	Issued a change certificate owner command (action_id TO class_type CR)
SQL Server	24154	Issued a change asymmetric key owner command (action_id TO class_type AK)
SQL Server	24155	Issued a change schema object owner command (action_id TO class_type OB)
SQL Server	24156	Issued a change schema type owner command (action_id TO class_type TY)
SQL Server	24157	Issued a change XML schema collection owner command (action_id TO class_type SX)
SQL Server	24158	Grant server permissions succeeded (action_id G class_type SR)
SQL Server	24159	Grant server permissions failed (action_id G class_type SR)
SQL Server	24160	Grant server permissions with grant succeeded (action_id GWG class_type SR)
SQL Server	24161	Grant server permissions with grant failed (action_id GWG class_type SR)
SQL Server	24162	Deny server permissions succeeded (action_id D class_type SR)
SQL Server	24163	Deny server permissions failed (action_id D class_type SR)
SQL Server	24164	Deny server permissions with cascade succeeded (action_id DWC class_type SR)
SQL Server	24165	Deny server permissions with cascade failed (action_id DWC class_type SR)
SQL Server	24166	Revoke server permissions succeeded (action_id R class_type SR)
SQL Server	24167	Revoke server permissions failed (action_id R class_type SR)
SQL Server	24168	Revoke server permissions with grant succeeded (action_id RWG class_type SR)
SQL Server	24169	Revoke server permissions with grant failed (action_id RWG class_type SR)
SQL Server	24170	Revoke server permissions with cascade succeeded (action_id RWC class_type SR)
SQL Server	24171	Revoke server permissions with cascade failed (action_id RWC class_type SR)
SQL Server	24172	Issued grant server object permissions command (action_id G; class_type LX)
SQL Server	24173	Issued grant server object permissions with grant command (action_id GWG; class_type LX)
SQL Server	24174	Issued deny server object permissions command (action_id D; class_type LX)
SQL Server	24175	Issued deny server object permissions with cascade command (action_id DWC; class_type LX)
SQL Server	24176	Issued revoke server object permissions command (action_id R; class_type LX)
SQL Server	24177	Issued revoke server object permissions with grant command (action_id; RWG class_type LX)
SQL Server	24178	Issued revoke server object permissions with cascade command (action_id RWC; class_type LX)
SQL Server	24179	Grant database permissions succeeded (action_id G class_type DB)
SQL Server	24180	Grant database permissions failed (action_id G class_type DB)
SQL Server	24181	Grant database permissions with grant succeeded (action_id GWG class_type DB)
SQL Server	24182	Grant database permissions with grant failed (action_id GWG class_type DB)
SQL Server	24183	Deny database permissions succeeded (action_id D class_type DB)
SQL Server	24184	Deny database permissions failed (action_id D class_type DB)
SQL Server	24185	Deny database permissions with cascade succeeded (action_id DWC class_type DB)
SQL Server	24186	Deny database permissions with cascade failed (action_id DWC class_type DB)
SQL Server	24187	Revoke database permissions succeeded (action_id R class_type DB)
SQL Server	24188	Revoke database permissions failed (action_id R class_type DB)
SQL Server	24189	Revoke database permissions with grant succeeded (action_id RWG class_type DB)
SQL Server	24190	Revoke database permissions with grant failed (action_id RWG class_type DB)
SQL Server	24191	Revoke database permissions with cascade succeeded (action_id RWC class_type DB)
SQL Server	24192	Revoke database permissions with cascade failed (action_id RWC class_type DB)
SQL Server	24193	Issued grant database object permissions command (action_id G class_type US)
SQL Server	24194	Issued grant database object permissions with grant command (action_id GWG; class_type US)
SQL Server	24195	Issued deny database object permissions command (action_id D; class_type US)
SQL Server	24196	Issued deny database object permissions with cascade command (action_id DWC; class_type US)
SQL Server	24197	Issued revoke database object permissions command (action_id R; class_type US)
SQL Server	24198	Issued revoke database object permissions with grant command (action_id RWG; class_type US)
SQL Server	24199	Issued revoke database object permissions with cascade command (action_id RWC; class_type US)
SQL Server	24200	Issued grant schema permissions command (action_id G class_type SC)
SQL Server	24201	Issued grant schema permissions with grant command (action_id GWG class_type SC)
SQL Server	24202	Issued deny schema permissions command (action_id D class_type SC)
SQL Server	24203	Issued deny schema permissions with cascade command (action_id DWC class_type SC)
SQL Server	24204	Issued revoke schema permissions command (action_id R class_type SC)
SQL Server	24205	Issued revoke schema permissions with grant command (action_id RWG class_type SC)
SQL Server	24206	Issued revoke schema permissions with cascade command (action_id RWC class_type SC)
SQL Server	24207	Issued grant assembly permissions command (action_id G class_type AS)
SQL Server	24208	Issued grant assembly permissions with grant command (action_id GWG class_type AS)
SQL Server	24209	Issued deny assembly permissions command (action_id D class_type AS)
SQL Server	24210	Issued deny assembly permissions with cascade command (action_id DWC class_type AS)
SQL Server	24211	Issued revoke assembly permissions command (action_id R class_type AS)
SQL Server	24212	Issued revoke assembly permissions with grant command (action_id RWG class_type AS)
SQL Server	24213	Issued revoke assembly permissions with cascade command (action_id RWC class_type AS)
SQL Server	24214	Issued grant database role permissions command (action_id G class_type RL)
SQL Server	24215	Issued grant database role permissions with grant command (action_id GWG class_type RL)
SQL Server	24216	Issued deny database role permissions command (action_id D class_type RL)
SQL Server	24217	Issued deny database role permissions with cascade command (action_id DWC class_type RL)
SQL Server	24218	Issued revoke database role permissions command (action_id R class_type RL)
SQL Server	24219	Issued revoke database role permissions with grant command (action_id RWG class_type RL)
SQL Server	24220	Issued revoke database role permissions with cascade command (action_id RWC class_type RL)
SQL Server	24221	Issued grant application role permissions command (action_id G class_type AR)
SQL Server	24222	Issued grant application role permissions with grant command (action_id GWG class_type AR)
SQL Server	24223	Issued deny application role permissions command (action_id D class_type AR)
SQL Server	24224	Issued deny application role permissions with cascade command (action_id DWC class_type AR)
SQL Server	24225	Issued revoke application role permissions command (action_id R class_type AR)
SQL Server	24226	Issued revoke application role permissions with grant command (action_id RWG class_type AR)
SQL Server	24227	Issued revoke application role permissions with cascade command (action_id RWC class_type AR)
SQL Server	24228	Issued grant symmetric key permissions command (action_id G class_type SK)
SQL Server	24229	Issued grant symmetric key permissions with grant command (action_id GWG class_type SK)
SQL Server	24230	Issued deny symmetric key permissions command (action_id D class_type SK)
SQL Server	24231	Issued deny symmetric key permissions with cascade command (action_id DWC class_type SK)
SQL Server	24232	Issued revoke symmetric key permissions command (action_id R class_type SK)
SQL Server	24233	Issued revoke symmetric key permissions with grant command (action_id RWG class_type SK)
SQL Server	24234	Issued revoke symmetric key permissions with cascade command (action_id RWC class_type SK)
SQL Server	24235	Issued grant certificate permissions command (action_id G class_type CR)
SQL Server	24236	Issued grant certificate permissions with grant command (action_id GWG class_type CR)
SQL Server	24237	Issued deny certificate permissions command (action_id D class_type CR)
SQL Server	24238	Issued deny certificate permissions with cascade command (action_id DWC class_type CR)
SQL Server	24239	Issued revoke certificate permissions command (action_id R class_type CR)
SQL Server	24240	Issued revoke certificate permissions with grant command (action_id RWG class_type CR)
SQL Server	24241	Issued revoke certificate permissions with cascade command (action_id RWC class_type CR)
SQL Server	24242	Issued grant asymmetric key permissions command (action_id G class_type AK)
SQL Server	24243	Issued grant asymmetric key permissions with grant command (action_id GWG class_type AK)
SQL Server	24244	Issued deny asymmetric key permissions command (action_id D class_type AK)
SQL Server	24245	Issued deny asymmetric key permissions with cascade command (action_id DWC class_type AK)
SQL Server	24246	Issued revoke asymmetric key permissions command (action_id R class_type AK)
SQL Server	24247	Issued revoke asymmetric key permissions with grant command (action_id RWG class_type AK)
SQL Server	24248	Issued revoke asymmetric key permissions with cascade command (action_id RWC class_type AK)
SQL Server	24249	Issued grant schema object permissions command (action_id G class_type OB)
SQL Server	24250	Issued grant schema object permissions with grant command (action_id GWG class_type OB)
SQL Server	24251	Issued deny schema object permissions command (action_id D class_type OB)
SQL Server	24252	Issued deny schema object permissions with cascade command (action_id DWC class_type OB)
SQL Server	24253	Issued revoke schema object permissions command (action_id R class_type OB)
SQL Server	24254	Issued revoke schema object permissions with grant command (action_id RWG class_type OB)
SQL Server	24255	Issued revoke schema object permissions with cascade command (action_id RWC class_type OB)
SQL Server	24256	Issued grant schema type permissions command (action_id G class_type TY)
SQL Server	24257	Issued grant schema type permissions with grant command (action_id GWG class_type TY)
SQL Server	24258	Issued deny schema type permissions command (action_id D class_type TY)
SQL Server	24259	Issued deny schema type permissions with cascade command (action_id DWC class_type TY)
SQL Server	24260	Issued revoke schema type permissions command (action_id R class_type TY)
SQL Server	24261	Issued revoke schema type permissions with grant command (action_id RWG class_type TY)
SQL Server	24262	Issued revoke schema type permissions with cascade command (action_id RWC class_type TY)
SQL Server	24263	Issued grant XML schema collection permissions command (action_id G class_type SX)
SQL Server	24264	Issued grant XML schema collection permissions with grant command (action_id GWG class_type SX)
SQL Server	24265	Issued deny XML schema collection permissions command (action_id D class_type SX)
SQL Server	24266	Issued deny XML schema collection permissions with cascade command (action_id DWC class_type SX)
SQL Server	24267	Issued revoke XML schema collection permissions command (action_id R class_type SX)
SQL Server	24268	Issued revoke XML schema collection permissions with grant command (action_id RWG class_type SX)
SQL Server	24269	Issued revoke XML schema collection permissions with cascade command (action_id RWC class_type SX)
SQL Server	24270	Issued reference database object permissions command (action_id RF)
SQL Server	24271	Issued send service request command (action_id SN)
SQL Server	24272	Issued check permissions with schema command (action_id VWCT)
SQL Server	24273	Issued use service broker transport security command (action_id LGB)
SQL Server	24274	Issued use database mirroring transport security command (action_id LGM)
SQL Server	24275	Issued alter trace command (action_id ALTR)
SQL Server	24276	Issued start trace command (action_id TASA)
SQL Server	24277	Issued stop trace command (action_id TASP)
SQL Server	24278	Issued enable trace C2 audit mode command (action_id C2ON)
SQL Server	24279	Issued disable trace C2 audit mode command (action_id C2OF)
SQL Server	24280	Issued server full-text command (action_id FT)
SQL Server	24281	Issued select command (action_id SL)
SQL Server	24282	Issued update command (action_id UP)
SQL Server	24283	Issued insert command (action_id IN)
SQL Server	24284	Issued delete command (action_id DL)
SQL Server	24285	Issued execute command (action_id EX)
SQL Server	24286	Issued receive command (action_id RC)
SQL Server	24287	Issued check references command (action_id RF)
SQL Server	24288	Issued a create user-defined server role command (action_id CR class_type SG)
SQL Server	24289	Issued a change user-defined server role command (action_id AL class_type SG)
SQL Server	24290	Issued a delete user-defined server role command (action_id DR class_type SG)
SQL Server	24291	Issued grant user-defined server role permissions command (action_id G class_type SG)
SQL Server	24292	Issued grant user-defined server role permissions with grant command (action_id GWG class_type SG)
SQL Server	24293	Issued deny user-defined server role permissions command (action_id D class_type SG)
SQL Server	24294	Issued deny user-defined server role permissions with cascade command (action_id DWC class_type SG)
SQL Server	24295	Issued revoke user-defined server role permissions command (action_id R class_type SG)
SQL Server	24296	Issued revoke user-defined server role permissions with grant command (action_id RWG class_type SG)
SQL Server	24297	Issued revoke user-defined server role permissions with cascade command (action_id RWC class_type SG)
SQL Server	24298	Database login succeeded (action_id DBAS)
SQL Server	24299	Database login failed (action_id DBAF)
SQL Server	24300	Database logout successful (action_id DAGL)
SQL Server	24301	Change password succeeded (action_id PWC; class_type US)
SQL Server	24302	Change password failed (action_id PWC; class_type US)
SQL Server	24303	Change own password succeeded (action_id PWCS; class_type US)
SQL Server	24304	Change own password failed (action_id PWCS; class_type US)
SQL Server	24305	Reset own password succeeded (action_id PWRS; class_type US)
SQL Server	24306	Reset own password failed (action_id PWRS; class_type US)
SQL Server	24307	Reset password succeeded (action_id PWR; class_type US)
SQL Server	24308	Reset password failed (action_id PWR; class_type US)
SQL Server	24309	Copy password (action_id USTC)
SQL Server	24310	User-defined SQL audit event (action_id UDAU)
SQL Server	24311	Issued a change database audit command (action_id AL class_type DU)
SQL Server	24312	Issued a create database audit command (action_id CR class_type DU)
SQL Server	24313	Issued a delete database audit command (action_id DR class_type DU)
SQL Server	24314	Issued a begin transaction command (action_id TXBG)
SQL Server	24315	Issued a commit transaction command (action_id TXCM)
SQL Server	24316	Issued a rollback transaction command (action_id TXRB)
SQL Server	24317	Issued a create column master key command (action_id CR; class_type CM)
SQL Server	24318	Issued a delete column master key command (action_id DR; class_type CM)
SQL Server	24319	A column master key was viewed (action_id VW; class_type CM)
SQL Server	24320	Issued a create column encryption key command (action_id CR; class_type CK)
SQL Server	24321	Issued a change column encryption key command (action_id AL; class_type CK)
SQL Server	24322	Issued a delete column encryption key command (action_id DR; class_type CK)
SQL Server	24323	A column encryption key was viewed (action_id VW; class_type CK)
SQL Server	24324	Issued a create database credential command (action_id CR; class_type DC)
SQL Server	24325	Issued a change database credential command (action_id AL; class_type DC)
SQL Server	24326	Issued a delete database credential command (action_id DR; class_type DC)
SQL Server	24327	Issued a change database scoped configuration command (action_id AL; class_type DS)
SQL Server	24328	Issued a create external data source command (action_id CR; class_type ED)
SQL Server	24329	Issued a change external data source command (action_id AL; class_type ED)
SQL Server	24330	Issued a delete external data source command (action_id DR; class_type ED)
SQL Server	24331	Issued a create external file format command (action_id CR; class_type EF)
SQL Server	24332	Issued a delete external file format command (action_id DR; class_type EF)
SQL Server	24333	Issued a create external resource pool command (action_id CR; class_type ER)
SQL Server	24334	Issued a change external resource pool command (action_id AL; class_type ER)
SQL Server	24335	Issued a delete external resource pool command (action_id DR; class_type ER)
SQL Server	24337	Global transaction login (action_id LGG)
SQL Server	24338	Grant permissions on a database scoped credential succeeded (action_id G; class_type DC)
SQL Server	24339	Grant permissions on a database scoped credential failed (action_id G; class_type DC)
SQL Server	24340	Grant permissions on a database scoped credential with grant succeeded (action_id GWG; class_type DC)
SQL Server	24341	Grant permissions on a database scoped credential with grant failed (action_id GWG; class_type DC)
SQL Server	24342	Deny permissions on a database scoped credential succeeded (action_id D; class_type DC)
SQL Server	24343	Deny permissions on a database scoped credential failed (action_id D; class_type DC)
SQL Server	24344	Deny permissions on a database scoped credential with cascade succeeded (action_id DWC; class_type DC)
SQL Server	24345	Deny permissions on a database scoped credential with cascade failed (action_id DWC; class_type DC)
SQL Server	24346	Revoke permissions on a database scoped credential succeeded (action_id R; class_type DC)
SQL Server	24347	Revoke permissions on a database scoped credential failed (action_id R; class_type DC)
SQL Server	24348	Revoke permissions with cascade on a database scoped credential succeeded (action_id RWC; class_type DC)
SQL Server	24349	Issued a change assembly owner command (action_id TO class_type AS)
SQL Server	24350	Revoke permissions with cascade on a database scoped credential failed (action_id RWC; class_type DC)
SQL Server	24351	Revoke permissions with grant on a database scoped credential succeeded (action_id RWG; class_type DC)
SQL Server	24352	Revoke permissions with grant on a database scoped credential failed (action_id RWG; class_type DC)
SQL Server	24353	Issued a change database scoped credential owner command (action_id TO; class_type DC)
SQL Server	24354	Issued a create external library command (action_id CR; class_type EL)
SQL Server	24355	Issued a change external library command (action_id AL; class_type EL)
SQL Server	24356	Issued a drop external library command (action_id DR; class_type EL)
SQL Server	24357	Grant permissions on an external library succeeded (action_id G; class_type EL)
SQL Server	24358	Grant permissions on an external library failed (action_id G; class_type EL)
SQL Server	24359	Grant permissions on an external library with grant succeeded (action_id GWG; class_type EL)
SQL Server	24360	Grant permissions on an external library with grant failed (action_id GWG; class_type EL)
SQL Server	24361	Deny permissions on an external library succeeded (action_id D; class_type EL)
SQL Server	24362	Deny permissions on an external library failed (action_id D; class_type EL)
SQL Server	24363	Deny permissions on an external library with cascade succeeded (action_id DWC; class_type EL)
SQL Server	24364	Deny permissions on an external library with cascade failed (action_id DWC; class_type EL)
SQL Server	24365	Revoke permissions on an external library succeeded (action_id R; class_type EL)
SQL Server	24366	Revoke permissions on an external library failed (action_id R; class_type EL)
SQL Server	24367	Revoke permissions with cascade on an external library succeeded (action_id RWC; class_type EL)
SQL Server	24368	Revoke permissions with cascade on an external library failed (action_id RWC; class_type EL)
SQL Server	24369	Revoke permissions with grant on an external library succeeded (action_id RWG; class_type EL)
SQL Server	24370	Revoke permissions with grant on an external library failed (action_id RWG; class_type EL)
SQL Server	24371	Issued a create database scoped resource governor command (action_id CR; class_type DR)
SQL Server	24372	Issued a change database scoped resource governor command (action_id AL; class_type DR)
SQL Server	24373	Issued a drop database scoped resource governor command (action_id DR; class_type DR)
SQL Server	24374	Issued a database bulk administration command (action_id DABO; class_type DB)
SQL Server	24375	Command to change permission failed (action_id D, DWC, G, GWG, R, RWC, RWG; class_type DC, EL)
Sysmon	1	Process creation
Sysmon	2	A process changed a file creation time
Sysmon	3	Network connection
Sysmon	4	Sysmon service state changed
Sysmon	5	Process terminated
Sysmon	6	Driver loaded
Sysmon	7	Image loaded
Sysmon	8	CreateRemoteThread
Sysmon	9	RawAccessRead
Sysmon	10	ProcessAccess
Sysmon	11	FileCreate
Sysmon	12	RegistryEvent (Object create and delete)
Sysmon	13	RegistryEvent (Value Set)
Sysmon	14	RegistryEvent (Key and Value Rename)
Sysmon	15	FileCreateStreamHash
Sysmon	16	Sysmon config state changed
Sysmon	17	Pipe created
Sysmon	18	Pipe connected
Sysmon	19	WmiEventFilter activity detected
Sysmon	20	WmiEventConsumer activity detected
Sysmon	21	WmiEventConsumerToFilter activity detected
Sysmon	22	DNSEvent
Sysmon	23	FileDelete
Sysmon	24	ClipboardChange
Sysmon	225	Error
Windows	512	Windows NT is starting up
Windows	513	Windows is shutting down
Windows	514	An authentication package has been loaded by the Local Security Authority
Windows	515	A trusted logon process has registered with the Local Security Authority
Windows	516	Internal resources allocated for the queuing of audit messages have been exhausted, leading to the loss of some audits
Windows	517	The audit log was cleared
Windows	518	A notification package has been loaded by the Security Account Manager
Windows	519	A process is using an invalid local procedure call (LPC) port
Windows	520	The system time was changed
Windows	521	Unable to log events to security log
Windows	528	Successful Logon
Windows	529	Logon Failure - Unknown user name or bad password
Windows	530	Logon Failure - Account logon time restriction violation
Windows	531	Logon Failure - Account currently disabled
Windows	532	Logon Failure - The specified user account has expired
Windows	533	Logon Failure - User not allowed to logon at this computer
Windows	534	Logon Failure - The user has not been granted the requested logon type at this machine
Windows	535	Logon Failure - The specified account's password has expired
Windows	536	Logon Failure - The NetLogon component is not active
Windows	537	Logon failure - The logon attempt failed for other reasons.
Windows	538	User Logoff
Windows	539	Logon Failure - Account locked out
Windows	540	Successful Network Logon
Windows	551	User initiated logoff
Windows	552	Logon attempt using explicit credentials
Windows	560	Object Open
Windows	561	Handle Allocated
Windows	562	Handle Closed
Windows	563	Object Open for Delete
Windows	564	Object Deleted
Windows	565	Object Open (Active Directory)
Windows	566	Object Operation (W3 Active Directory)
Windows	567	Object Access Attempt
Windows	576	Special privileges assigned to new logon
Windows	577	Privileged Service Called
Windows	578	Privileged object operation
Windows	592	A new process has been created
Windows	593	A process has exited
Windows	594	A handle to an object has been duplicated
Windows	595	Indirect access to an object has been obtained
Windows	596	Backup of data protection master key
Windows	600	A process was assigned a primary token
Windows	601	Attempt to install service
Windows	602	Scheduled Task created
Windows	608	User Right Assigned
Windows	609	User Right Removed
Windows	610	New Trusted Domain
Windows	611	Removing Trusted Domain
Windows	612	Audit Policy Change
Windows	613	IPSec policy agent started
Windows	614	IPSec policy agent disabled
Windows	615	IPSEC PolicyAgent Service
Windows	616	IPSec policy agent encountered a potentially serious failure.
Windows	617	Kerberos Policy Changed
Windows	618	Encrypted Data Recovery Policy Changed
Windows	619	Quality of Service Policy Changed
Windows	620	Trusted Domain Information Modified
Windows	621	System Security Access Granted
Windows	622	System Security Access Removed
Windows	623	Per User Audit Policy was refreshed
Windows	624	User Account Created
Windows	625	User Account Type Changed
Windows	626	User Account Enabled
Windows	627	Change Password Attempt
Windows	628	User Account password set
Windows	629	User Account Disabled
Windows	630	User Account Deleted
Windows	631	Security Enabled Global Group Created
Windows	632	Security Enabled Global Group Member Added
Windows	633	Security Enabled Global Group Member Removed
Windows	634	Security Enabled Global Group Deleted
Windows	635	Security Enabled Local Group Created
Windows	636	Security Enabled Local Group Member Added
Windows	637	Security Enabled Local Group Member Removed
Windows	638	Security Enabled Local Group Deleted
Windows	639	Security Enabled Local Group Changed
Windows	640	General Account Database Change
Windows	641	Security Enabled Global Group Changed
Windows	642	User Account Changed
Windows	643	Domain Policy Changed
Windows	644	User Account Locked Out
Windows	645	Computer Account Created
Windows	646	Computer Account Changed
Windows	647	Computer Account Deleted
Windows	648	Security Disabled Local Group Created
Windows	649	Security Disabled Local Group Changed
Windows	650	Security Disabled Local Group Member Added
Windows	651	Security Disabled Local Group Member Removed
Windows	652	Security Disabled Local Group Deleted
Windows	653	Security Disabled Global Group Created
Windows	654	Security Disabled Global Group Changed
Windows	655	Security Disabled Global Group Member Added
Windows	656	Security Disabled Global Group Member Removed
Windows	657	Security Disabled Global Group Deleted
Windows	658	Security Enabled Universal Group Created
Windows	659	Security Enabled Universal Group Changed
Windows	660	Security Enabled Universal Group Member Added
Windows	661	Security Enabled Universal Group Member Removed
Windows	662	Security Enabled Universal Group Deleted
Windows	663	Security Disabled Universal Group Created
Windows	664	Security Disabled Universal Group Changed
Windows	665	Security Disabled Universal Group Member Added
Windows	666	Security Disabled Universal Group Member Removed
Windows	667	Security Disabled Universal Group Deleted
Windows	668	Group Type Changed
Windows	669	Add SID History
Windows	670	Add SID History
Windows	671	User Account Unlocked
Windows	672	Authentication Ticket Granted
Windows	673	Service Ticket Granted
Windows	674	Ticket Granted Renewed
Windows	675	Pre-authentication failed
Windows	676	Authentication Ticket Request Failed
Windows	677	Service Ticket Request Failed
Windows	678	Account Mapped for Logon by
Windows	679	The name: %2 could not be mapped for logon by: %1
Windows	680	Account Used for Logon by
Windows	681	The logon to account: %2 by: %1 from workstation: %3 failed.
Windows	682	Session reconnected to winstation
Windows	683	Session disconnected from winstation
Windows	684	Set ACLs of members in administrators groups
Windows	685	Account Name Changed
Windows	686	Password of the following user accessed
Windows	687	Basic Application Group Created
Windows	688	Basic Application Group Changed
Windows	689	Basic Application Group Member Added
Windows	690	Basic Application Group Member Removed
Windows	691	Basic Application Group Non-Member Added
Windows	692	Basic Application Group Non-Member Removed
Windows	693	Basic Application Group Deleted
Windows	694	LDAP Query Group Created
Windows	695	LDAP Query Group Changed
Windows	696	LDAP Query Group Deleted
Windows	697	Password Policy Checking API is called
Windows	806	Per User Audit Policy was refreshed
Windows	807	Per user auditing policy set for user
Windows	808	A security event source has attempted to register
Windows	809	A security event source has attempted to unregister
Windows	848	The following policy was active when the Windows Firewall started
Windows	849	An application was listed as an exception when the Windows Firewall started
Windows	850	A port was listed as an exception when the Windows Firewall started
Windows	851	A change has been made to the Windows Firewall application exception list
Windows	852	A change has been made to the Windows Firewall port exception list
Windows	853	The Windows Firewall operational mode has changed
Windows	854	The Windows Firewall logging settings have changed
Windows	855	A Windows Firewall ICMP setting has changed
Windows	856	The Windows Firewall setting to allow unicast responses to multicast/broadcast traffic has changed
Windows	857	The Windows Firewall setting to allow remote administration, allowing port TCP 135 and DCOM/RPC, has changed
Windows	858	Windows Firewall group policy settings have been applied
Windows	859	The Windows Firewall group policy settings have been removed
Windows	860	The Windows Firewall has switched the active policy profile
Windows	861	The Windows Firewall has detected an application listening for incoming traffic
Windows	1100	The event logging service has shut down
Windows	1101	Audit events have been dropped by the transport.
Windows	1102	The audit log was cleared
Windows	1104	The security Log is now full
Windows	1105	Event log automatic backup
Windows	1108	The event logging service encountered an error
Windows	4608	Windows is starting up
Windows	4609	Windows is shutting down
Windows	4610	An authentication package has been loaded by the Local Security Authority
Windows	4611	A trusted logon process has been registered with the Local Security Authority
Windows	4612	Internal resources allocated for the queuing of audit messages have been exhausted, leading to the loss of some audits.
Windows	4614	A notification package has been loaded by the Security Account Manager.
Windows	4615	Invalid use of LPC port
Windows	4616	The system time was changed.
Windows	4618	A monitored security event pattern has occurred
Windows	4621	Administrator recovered system from CrashOnAuditFail
Windows	4622	A security package has been loaded by the Local Security Authority.
Windows	4624	An account was successfully logged on
Windows	4625	An account failed to log on
Windows	4626	User/Device claims information
Windows	4627	Group membership information.
Windows	4634	An account was logged off
Windows	4646	IKE DoS-prevention mode started
Windows	4647	User initiated logoff
Windows	4648	A logon was attempted using explicit credentials
Windows	4649	A replay attack was detected
Windows	4650	An IPsec Main Mode security association was established
Windows	4651	An IPsec Main Mode security association was established
Windows	4652	An IPsec Main Mode negotiation failed
Windows	4653	An IPsec Main Mode negotiation failed
Windows	4654	An IPsec Quick Mode negotiation failed
Windows	4655	An IPsec Main Mode security association ended
Windows	4656	A handle to an object was requested
Windows	4657	A registry value was modified
Windows	4658	The handle to an object was closed
Windows	4659	A handle to an object was requested with intent to delete
Windows	4660	An object was deleted
Windows	4661	A handle to an object was requested
Windows	4662	An operation was performed on an object
Windows	4663	An attempt was made to access an object
Windows	4664	An attempt was made to create a hard link
Windows	4665	An attempt was made to create an application client context.
Windows	4666	An application attempted an operation
Windows	4667	An application client context was deleted
Windows	4668	An application was initialized
Windows	4670	Permissions on an object were changed
Windows	4671	An application attempted to access a blocked ordinal through the TBS
Windows	4672	Special privileges assigned to new logon
Windows	4673	A privileged service was called
Windows	4674	An operation was attempted on a privileged object
Windows	4675	SIDs were filtered
Windows	4688	A new process has been created
Windows	4689	A process has exited
Windows	4690	An attempt was made to duplicate a handle to an object
Windows	4691	Indirect access to an object was requested
Windows	4692	Backup of data protection master key was attempted
Windows	4693	Recovery of data protection master key was attempted
Windows	4694	Protection of auditable protected data was attempted
Windows	4695	Unprotection of auditable protected data was attempted
Windows	4696	A primary token was assigned to process
Windows	4697	A service was installed in the system
Windows	4698	A scheduled task was created
Windows	4699	A scheduled task was deleted
Windows	4700	A scheduled task was enabled
Windows	4701	A scheduled task was disabled
Windows	4702	A scheduled task was updated
Windows	4703	A token right was adjusted
Windows	4704	A user right was assigned
Windows	4705	A user right was removed
Windows	4706	A new trust was created to a domain
Windows	4707	A trust to a domain was removed
Windows	4709	IPsec Services was started
Windows	4710	IPsec Services was disabled
Windows	4711	PAStore Engine (1%)
Windows	4712	IPsec Services encountered a potentially serious failure
Windows	4713	Kerberos policy was changed
Windows	4714	Encrypted data recovery policy was changed
Windows	4715	The audit policy (SACL) on an object was changed
Windows	4716	Trusted domain information was modified
Windows	4717	System security access was granted to an account
Windows	4718	System security access was removed from an account
Windows	4719	System audit policy was changed
Windows	4720	A user account was created
Windows	4722	A user account was enabled
Windows	4723	An attempt was made to change an account's password
Windows	4724	An attempt was made to reset an accounts password
Windows	4725	A user account was disabled
Windows	4726	A user account was deleted
Windows	4727	A security-enabled global group was created
Windows	4728	A member was added to a security-enabled global group
Windows	4729	A member was removed from a security-enabled global group
Windows	4730	A security-enabled global group was deleted
Windows	4731	A security-enabled local group was created
Windows	4732	A member was added to a security-enabled local group
Windows	4733	A member was removed from a security-enabled local group
Windows	4734	A security-enabled local group was deleted
Windows	4735	A security-enabled local group was changed
Windows	4737	A security-enabled global group was changed
Windows	4738	A user account was changed
Windows	4739	Domain Policy was changed
Windows	4740	A user account was locked out
Windows	4741	A computer account was created
Windows	4742	A computer account was changed
Windows	4743	A computer account was deleted
Windows	4744	A security-disabled local group was created
Windows	4745	A security-disabled local group was changed
Windows	4746	A member was added to a security-disabled local group
Windows	4747	A member was removed from a security-disabled local group
Windows	4748	A security-disabled local group was deleted
Windows	4749	A security-disabled global group was created
Windows	4750	A security-disabled global group was changed
Windows	4751	A member was added to a security-disabled global group
Windows	4752	A member was removed from a security-disabled global group
Windows	4753	A security-disabled global group was deleted
Windows	4754	A security-enabled universal group was created
Windows	4755	A security-enabled universal group was changed
Windows	4756	A member was added to a security-enabled universal group
Windows	4757	A member was removed from a security-enabled universal group
Windows	4758	A security-enabled universal group was deleted
Windows	4759	A security-disabled universal group was created
Windows	4760	A security-disabled universal group was changed
Windows	4761	A member was added to a security-disabled universal group
Windows	4762	A member was removed from a security-disabled universal group
Windows	4763	A security-disabled universal group was deleted
Windows	4764	A groups type was changed
Windows	4765	SID History was added to an account
Windows	4766	An attempt to add SID History to an account failed
Windows	4767	A user account was unlocked
Windows	4768	A Kerberos authentication ticket (TGT) was requested
Windows	4769	A Kerberos service ticket was requested
Windows	4770	A Kerberos service ticket was renewed
Windows	4771	Kerberos pre-authentication failed
Windows	4772	A Kerberos authentication ticket request failed
Windows	4773	A Kerberos service ticket request failed
Windows	4774	An account was mapped for logon
Windows	4775	An account could not be mapped for logon
Windows	4776	The domain controller attempted to validate the credentials for an account
Windows	4777	The domain controller failed to validate the credentials for an account
Windows	4778	A session was reconnected to a Window Station
Windows	4779	A session was disconnected from a Window Station
Windows	4780	The ACL was set on accounts which are members of administrators groups
Windows	4781	The name of an account was changed
Windows	4782	The password hash an account was accessed
Windows	4783	A basic application group was created
Windows	4784	A basic application group was changed
Windows	4785	A member was added to a basic application group
Windows	4786	A member was removed from a basic application group
Windows	4787	A non-member was added to a basic application group
Windows	4788	A non-member was removed from a basic application group..
Windows	4789	A basic application group was deleted
Windows	4790	An LDAP query group was created
Windows	4791	A basic application group was changed
Windows	4792	An LDAP query group was deleted
Windows	4793	The Password Policy Checking API was called
Windows	4794	An attempt was made to set the Directory Services Restore Mode administrator password
Windows	4797	An attempt was made to query the existence of a blank password for an account
Windows	4798	A user's local group membership was enumerated.
Windows	4799	A security-enabled local group membership was enumerated
Windows	4800	The workstation was locked
Windows	4801	The workstation was unlocked
Windows	4802	The screen saver was invoked
Windows	4803	The screen saver was dismissed
Windows	4816	RPC detected an integrity violation while decrypting an incoming message
Windows	4817	Auditing settings on object were changed.
Windows	4818	Proposed Central Access Policy does not grant the same access permissions as the current Central Access Policy
Windows	4819	Central Access Policies on the machine have been changed
Windows	4820	A Kerberos Ticket-granting-ticket (TGT) was denied because the device does not meet the access control restrictions
Windows	4821	A Kerberos service ticket was denied because the user, device, or both does not meet the access control restrictions
Windows	4822	NTLM authentication failed because the account was a member of the Protected User group
Windows	4823	NTLM authentication failed because access control restrictions are required
Windows	4824	Kerberos preauthentication by using DES or RC4 failed because the account was a member of the Protected User group
Windows	4825	A user was denied the access to Remote Desktop. By default, users are allowed to connect only if they are members of the Remote Desktop Users group or Administrators group
Windows	4826	Boot Configuration Data loaded
Windows	4830	SID History was removed from an account
Windows	4864	A namespace collision was detected
Windows	4865	A trusted forest information entry was added
Windows	4866	A trusted forest information entry was removed
Windows	4867	A trusted forest information entry was modified
Windows	4868	The certificate manager denied a pending certificate request
Windows	4869	Certificate Services received a resubmitted certificate request
Windows	4870	Certificate Services revoked a certificate
Windows	4871	Certificate Services received a request to publish the certificate revocation list (CRL)
Windows	4872	Certificate Services published the certificate revocation list (CRL)
Windows	4873	A certificate request extension changed
Windows	4874	One or more certificate request attributes changed.
Windows	4875	Certificate Services received a request to shut down
Windows	4876	Certificate Services backup started
Windows	4877	Certificate Services backup completed
Windows	4878	Certificate Services restore started
Windows	4879	Certificate Services restore completed
Windows	4880	Certificate Services started
Windows	4881	Certificate Services stopped
Windows	4882	The security permissions for Certificate Services changed
Windows	4883	Certificate Services retrieved an archived key
Windows	4884	Certificate Services imported a certificate into its database
Windows	4885	The audit filter for Certificate Services changed
Windows	4886	Certificate Services received a certificate request
Windows	4887	Certificate Services approved a certificate request and issued a certificate
Windows	4888	Certificate Services denied a certificate request
Windows	4889	Certificate Services set the status of a certificate request to pending
Windows	4890	The certificate manager settings for Certificate Services changed.
Windows	4891	A configuration entry changed in Certificate Services
Windows	4892	A property of Certificate Services changed
Windows	4893	Certificate Services archived a key
Windows	4894	Certificate Services imported and archived a key
Windows	4895	Certificate Services published the CA certificate to Active Directory Domain Services
Windows	4896	One or more rows have been deleted from the certificate database
Windows	4897	Role separation enabled
Windows	4898	Certificate Services loaded a template
Windows	4899	A Certificate Services template was updated
Windows	4900	Certificate Services template security was updated
Windows	4902	The Per-user audit policy table was created
Windows	4904	An attempt was made to register a security event source
Windows	4905	An attempt was made to unregister a security event source
Windows	4906	The CrashOnAuditFail value has changed
Windows	4907	Auditing settings on object were changed
Windows	4908	Special Groups Logon table modified
Windows	4909	The local policy settings for the TBS were changed
Windows	4910	The group policy settings for the TBS were changed
Windows	4911	Resource attributes of the object were changed
Windows	4912	Per User Audit Policy was changed
Windows	4913	Central Access Policy on the object was changed
Windows	4928	An Active Directory replica source naming context was established
Windows	4929	An Active Directory replica source naming context was removed
Windows	4930	An Active Directory replica source naming context was modified
Windows	4931	An Active Directory replica destination naming context was modified
Windows	4932	Synchronization of a replica of an Active Directory naming context has begun
Windows	4933	Synchronization of a replica of an Active Directory naming context has ended
Windows	4934	Attributes of an Active Directory object were replicated
Windows	4935	Replication failure begins
Windows	4936	Replication failure ends
Windows	4937	A lingering object was removed from a replica
Windows	4944	The following policy was active when the Windows Firewall started
Windows	4945	A rule was listed when the Windows Firewall started
Windows	4946	A change has been made to Windows Firewall exception list. A rule was added
Windows	4947	A change has been made to Windows Firewall exception list. A rule was modified
Windows	4948	A change has been made to Windows Firewall exception list. A rule was deleted
Windows	4949	Windows Firewall settings were restored to the default values
Windows	4950	A Windows Firewall setting has changed
Windows	4951	A rule has been ignored because its major version number was not recognized by Windows Firewall
Windows	4952	Parts of a rule have been ignored because its minor version number was not recognized by Windows Firewall
Windows	4953	A rule has been ignored by Windows Firewall because it could not parse the rule
Windows	4954	Windows Firewall Group Policy settings has changed. The new settings have been applied
Windows	4956	Windows Firewall has changed the active profile
Windows	4957	Windows Firewall did not apply the following rule
Windows	4958	Windows Firewall did not apply the following rule because the rule referred to items not configured on this computer
Windows	4960	IPsec dropped an inbound packet that failed an integrity check
Windows	4961	IPsec dropped an inbound packet that failed a replay check
Windows	4962	IPsec dropped an inbound packet that failed a replay check
Windows	4963	IPsec dropped an inbound clear text packet that should have been secured
Windows	4964	Special groups have been assigned to a new logon
Windows	4965	IPsec received a packet from a remote computer with an incorrect Security Parameter Index (SPI).
Windows	4976	During Main Mode negotiation, IPsec received an invalid negotiation packet.
Windows	4977	During Quick Mode negotiation, IPsec received an invalid negotiation packet.
Windows	4978	During Extended Mode negotiation, IPsec received an invalid negotiation packet.
Windows	4979	IPsec Main Mode and Extended Mode security associations were established.
Windows	4980	IPsec Main Mode and Extended Mode security associations were established
Windows	4981	IPsec Main Mode and Extended Mode security associations were established
Windows	4982	IPsec Main Mode and Extended Mode security associations were established
Windows	4983	An IPsec Extended Mode negotiation failed
Windows	4984	An IPsec Extended Mode negotiation failed
Windows	4985	The state of a transaction has changed
Windows	5024	The Windows Firewall Service has started successfully
Windows	5025	The Windows Firewall Service has been stopped
Windows	5027	The Windows Firewall Service was unable to retrieve the security policy from the local storage
Windows	5028	The Windows Firewall Service was unable to parse the new security policy.
Windows	5029	The Windows Firewall Service failed to initialize the driver
Windows	5030	The Windows Firewall Service failed to start
Windows	5031	The Windows Firewall Service blocked an application from accepting incoming connections on the network.
Windows	5032	Windows Firewall was unable to notify the user that it blocked an application from accepting incoming connections on the network
Windows	5033	The Windows Firewall Driver has started successfully
Windows	5034	The Windows Firewall Driver has been stopped
Windows	5035	The Windows Firewall Driver failed to start
Windows	5037	The Windows Firewall Driver detected critical runtime error. Terminating
Windows	5038	Code integrity determined that the image hash of a file is not valid
Windows	5039	A registry key was virtualized.
Windows	5040	A change has been made to IPsec settings. An Authentication Set was added.
Windows	5041	A change has been made to IPsec settings. An Authentication Set was modified
Windows	5042	A change has been made to IPsec settings. An Authentication Set was deleted
Windows	5043	A change has been made to IPsec settings. A Connection Security Rule was added
Windows	5044	A change has been made to IPsec settings. A Connection Security Rule was modified
Windows	5045	A change has been made to IPsec settings. A Connection Security Rule was deleted
Windows	5046	A change has been made to IPsec settings. A Crypto Set was added
Windows	5047	A change has been made to IPsec settings. A Crypto Set was modified
Windows	5048	A change has been made to IPsec settings. A Crypto Set was deleted
Windows	5049	An IPsec Security Association was deleted
Windows	5050	An attempt to programmatically disable the Windows Firewall using a call to INetFwProfile.FirewallEnabled(FALSE
Windows	5051	A file was virtualized
Windows	5056	A cryptographic self test was performed
Windows	5057	A cryptographic primitive operation failed
Windows	5058	Key file operation
Windows	5059	Key migration operation
Windows	5060	Verification operation failed
Windows	5061	Cryptographic operation
Windows	5062	A kernel-mode cryptographic self test was performed
Windows	5063	A cryptographic provider operation was attempted
Windows	5064	A cryptographic context operation was attempted
Windows	5065	A cryptographic context modification was attempted
Windows	5066	A cryptographic function operation was attempted
Windows	5067	A cryptographic function modification was attempted
Windows	5068	A cryptographic function provider operation was attempted
Windows	5069	A cryptographic function property operation was attempted
Windows	5070	A cryptographic function property operation was attempted
Windows	5071	Key access denied by Microsoft key distribution service
Windows	5120	OCSP Responder Service Started
Windows	5121	OCSP Responder Service Stopped
Windows	5122	A Configuration entry changed in the OCSP Responder Service
Windows	5123	A configuration entry changed in the OCSP Responder Service
Windows	5124	A security setting was updated on OCSP Responder Service
Windows	5125	A request was submitted to OCSP Responder Service
Windows	5126	Signing Certificate was automatically updated by the OCSP Responder Service
Windows	5127	The OCSP Revocation Provider successfully updated the revocation information
Windows	5136	A directory service object was modified
Windows	5137	A directory service object was created
Windows	5138	A directory service object was undeleted
Windows	5139	A directory service object was moved
Windows	5140	A network share object was accessed
Windows	5141	A directory service object was deleted
Windows	5142	A network share object was added.
Windows	5143	A network share object was modified
Windows	5144	A network share object was deleted.
Windows	5145	A network share object was checked to see whether client can be granted desired access
Windows	5146	The Windows Filtering Platform has blocked a packet
Windows	5147	A more restrictive Windows Filtering Platform filter has blocked a packet
Windows	5148	The Windows Filtering Platform has detected a DoS attack and entered a defensive mode; packets associated with this attack will be discarded.
Windows	5149	The DoS attack has subsided and normal processing is being resumed.
Windows	5150	The Windows Filtering Platform has blocked a packet.
Windows	5151	A more restrictive Windows Filtering Platform filter has blocked a packet.
Windows	5152	The Windows Filtering Platform blocked a packet
Windows	5153	A more restrictive Windows Filtering Platform filter has blocked a packet
Windows	5154	The Windows Filtering Platform has permitted an application or service to listen on a port for incoming connections
Windows	5155	The Windows Filtering Platform has blocked an application or service from listening on a port for incoming connections
Windows	5156	The Windows Filtering Platform has allowed a connection
Windows	5157	The Windows Filtering Platform has blocked a connection
Windows	5158	The Windows Filtering Platform has permitted a bind to a local port
Windows	5159	The Windows Filtering Platform has blocked a bind to a local port
Windows	5168	Spn check for SMB/SMB2 fails.
Windows	5169	A directory service object was modified
Windows	5170	A directory service object was modified during a background cleanup task
Windows	5376	Credential Manager credentials were backed up
Windows	5377	Credential Manager credentials were restored from a backup
Windows	5378	The requested credentials delegation was disallowed by policy
Windows	5379	Credential Manager credentials were read
Windows	5380	Vault Find Credential
Windows	5381	Vault credentials were read
Windows	5382	Vault credentials were read
Windows	5440	The following callout was present when the Windows Filtering Platform Base Filtering Engine started
Windows	5441	The following filter was present when the Windows Filtering Platform Base Filtering Engine started
Windows	5442	The following provider was present when the Windows Filtering Platform Base Filtering Engine started
Windows	5443	The following provider context was present when the Windows Filtering Platform Base Filtering Engine started
Windows	5444	The following sub-layer was present when the Windows Filtering Platform Base Filtering Engine started
Windows	5446	A Windows Filtering Platform callout has been changed
Windows	5447	A Windows Filtering Platform filter has been changed
Windows	5448	A Windows Filtering Platform provider has been changed
Windows	5449	A Windows Filtering Platform provider context has been changed
Windows	5450	A Windows Filtering Platform sub-layer has been changed
Windows	5451	An IPsec Quick Mode security association was established
Windows	5452	An IPsec Quick Mode security association ended
Windows	5453	An IPsec negotiation with a remote computer failed because the IKE and AuthIP IPsec Keying Modules (IKEEXT) service is not started
Windows	5456	PAStore Engine applied Active Directory storage IPsec policy on the computer
Windows	5457	PAStore Engine failed to apply Active Directory storage IPsec policy on the computer
Windows	5458	PAStore Engine applied locally cached copy of Active Directory storage IPsec policy on the computer
Windows	5459	PAStore Engine failed to apply locally cached copy of Active Directory storage IPsec policy on the computer
Windows	5460	PAStore Engine applied local registry storage IPsec policy on the computer
Windows	5461	PAStore Engine failed to apply local registry storage IPsec policy on the computer
Windows	5462	PAStore Engine failed to apply some rules of the active IPsec policy on the computer
Windows	5463	PAStore Engine polled for changes to the active IPsec policy and detected no changes
Windows	5464	PAStore Engine polled for changes to the active IPsec policy, detected changes, and applied them to IPsec Services
Windows	5465	PAStore Engine received a control for forced reloading of IPsec policy and processed the control successfully
Windows	5466	PAStore Engine polled for changes to the Active Directory IPsec policy, determined that Active Directory cannot be reached, and will use the cached copy of the Active Directory IPsec policy instead
Windows	5467	PAStore Engine polled for changes to the Active Directory IPsec policy, determined that Active Directory can be reached, and found no changes to the policy
Windows	5468	PAStore Engine polled for changes to the Active Directory IPsec policy, determined that Active Directory can be reached, found changes to the policy, and applied those changes
Windows	5471	PAStore Engine loaded local storage IPsec policy on the computer
Windows	5472	PAStore Engine failed to load local storage IPsec policy on the computer
Windows	5473	PAStore Engine loaded directory storage IPsec policy on the computer
Windows	5474	PAStore Engine failed to load directory storage IPsec policy on the computer
Windows	5477	PAStore Engine failed to add quick mode filter
Windows	5478	IPsec Services has started successfully
Windows	5479	IPsec Services has been shut down successfully
Windows	5480	IPsec Services failed to get the complete list of network interfaces on the computer
Windows	5483	IPsec Services failed to initialize RPC server. IPsec Services could not be started
Windows	5484	IPsec Services has experienced a critical failure and has been shut down
Windows	5485	IPsec Services failed to process some IPsec filters on a plug-and-play event for network interfaces
Windows	5632	A request was made to authenticate to a wireless network
Windows	5633	A request was made to authenticate to a wired network
Windows	5712	A Remote Procedure Call (RPC) was attempted
Windows	5888	An object in the COM+ Catalog was modified
Windows	5889	An object was deleted from the COM+ Catalog
Windows	5890	An object was added to the COM+ Catalog
Windows	6144	Security policy in the group policy objects has been applied successfully
Windows	6145	One or more errors occured while processing security policy in the group policy objects
Windows	6272	Network Policy Server granted access to a user
Windows	6273	Network Policy Server denied access to a user
Windows	6274	Network Policy Server discarded the request for a user
Windows	6275	Network Policy Server discarded the accounting request for a user
Windows	6276	Network Policy Server quarantined a user
Windows	6277	Network Policy Server granted access to a user but put it on probation because the host did not meet the defined health policy
Windows	6278	Network Policy Server granted full access to a user because the host met the defined health policy
Windows	6279	Network Policy Server locked the user account due to repeated failed authentication attempts
Windows	6280	Network Policy Server unlocked the user account
Windows	6281	Code Integrity determined that the page hashes of an image file are not valid...
Windows	6400	BranchCache: Received an incorrectly formatted response while discovering availability of content.
Windows	6401	BranchCache: Received invalid data from a peer. Data discarded.
Windows	6402	BranchCache: The message to the hosted cache offering it data is incorrectly formatted.
Windows	6403	BranchCache: The hosted cache sent an incorrectly formatted response to the client's message to offer it data.
Windows	6404	BranchCache: Hosted cache could not be authenticated using the provisioned SSL certificate.
Windows	6405	BranchCache: %2 instance(s) of event id %1 occurred.
Windows	6406	%1 registered to Windows Firewall to control filtering for the following:
Windows	6407	%1
Windows	6408	Registered product %1 failed and Windows Firewall is now controlling the filtering for %2.
Windows	6409	BranchCache: A service connection point object could not be parsed
Windows	6410	Code integrity determined that a file does not meet the security requirements to load into a process. This could be due to the use of shared sections or other issues
Windows	6416	A new external device was recognized by the system.
Windows	6417	The FIPS mode crypto selftests succeeded
Windows	6418	The FIPS mode crypto selftests failed
Windows	6419	A request was made to disable a device
Windows	6420	A device was disabled
Windows	6421	A request was made to enable a device
Windows	6422	A device was enabled
Windows	6423	The installation of this device is forbidden by system policy
Windows	6424	The installation of this device was allowed, after having previously been forbidden by policy
Windows	8191	Highest System-Defined Audit Message Value</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>File and Network Access Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID	Açıklama</strong>

4688,	Process Created (Program Execution)
4656,	Access to File or Other Object Requested
4663,	Attempt made to access a file or object (dosya sildi veya editledi vs)
4658,	Access to a File or object closed
4697,	New Service has been Installed
1102,   Log Clearing -  logları silindi
4800,   Screen locked - Ekran kilitlendi
4782,    Password Hash of an Account has been Accessed
5140,	Network Share Accessed -Ağ paylaşımı planlandı</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>logon/logoff Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID  Açıklama</strong>
4624,	Network logon
4625,	Login Failed
4634,	Logoff
4647,   Success Logoff
4648,	Attempted Login
4672,	Administrator has Logged in
4778,	Session Reconnect (RDP or FastUser Switch)- RDP oturum isteği geldi
4779,    RDP Session halted-  RDP oturumu kapandı
4770,	Kerberos Ticket Renewed
4771,    Etki alanında ön kimlik doğrulama başarısız oldu
4776,    Etki alanında başarılı ya da başarısız login
4793,	Password Policy Checking API called</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>User Activity Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID	Açıklama</strong>
4704,	User Right Assigned
4720,	New User Account Created
4722,	New User Account Enabled
4725,	User Account Disabled
4726,	User Account Deleted
4728,	Member Added to Global Group
4731,	Security Enabled Group Created
4732,	Member Added to Local Group
4733,	Account removed from Local Security Group 
4765,	SID History added to Account
4634,	Local Group Deleted
4735,	Local Group Changed
4740,	Account Locked Out
4748,	Local Group Deleted
4756,	Member Added to Universal Group
4766,	SID History add attempted on Account 
4767,	User Account Unlocked
4781,	Account Name Changed</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Firewall' Settings Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID  Açıklama</strong>
5025,    Firewall durduruldu
4946,	Firewall Rule has been Added
4947,	Firewall Rule has been Modified
4948,	Firewall Rule has been Deleted
4950,	Firewall Rule has been Changed</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Application Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID  Açıklama</strong>
1033/1034 Indicates successful installation or removal of .MSI and .EXE files.
11707/11708 Indicates successful installation or removal of .MSI and .EXE files
865,	GPO Blocked – Exe Default Security Level
866,	PO Blocked exe – Restricted Path
867,	GPO Blocked Exe – Certificate rule
868,	GPO Blocked Exe – zone or hash rule
882,	GPO Blocke Exe by Policy Rule
1000,	Application Error 1001 – WER Info
1001,	EMET 1=Warning 2=Error
1002,	Application Hang Software Policy Events</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>System and Service Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID  Açıklama</strong>
1074, System Halted - Windows Ne zaman Kapandı
7000,	Service failed to start: did not respond to the start control request
7022,	Service hung on start
7023,	Service terminated with error
7024,	Service terminated with error
7026,	Service failed on system start
7031,	Service terminated unexpectedly
7034,	Service terminated unexpectedly
7035,	Service sent a request to Stop or Start
7036,	Service was Started or Stopped
7045,	Service Installed
7040,	Service changed from "auto start" to "disabled" (Başlangıçta, elle vs.)</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Task Schedular Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID  Açıklama</strong>
100	Task Started
101	Task Start Failed
102	Task completed
103	Action start failed
106	Task registered
107	Task triggered on scheduler
108	Task triggered on event
110	Task triggered by user
111	Task terminated
118	Task triggered by computer startup
119	Task triggered on logon
129	Created Task Process
135	Launch condition not met, machine not idle
140	Task registration updated
141	Task registration deleted
142	Task disabled
200	Action started
201	Action completed
203	Action failed to start
301	Task engine properly shut down
310	Task Engine started
311	Task Engine failed to start
314	Task Engine idle
317	Task Engine started
318	Task engine properly shut down
319	Task Engine received message to start task
322	Launch request ignored, instance already running
329	Task stopping due to timeout reached
332	Launch condition not met, user not logged-on
400	Service started
411	Service signaled time change
700	Compatibility module started</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Windows Defender Antivirus Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID	Açıklama</strong>
1001,   Scan finished.
1002,   Scan cancelled.
1003,   Scan was paused.
1005,	Scan Failed
1006,	Malware Detected
1008,	Action on Malware Failed
2000,	Signature Updated
2001,	Signature Update Failed
2003,	Engine Update Failed
2004,	Reverting to Last Known Gadd Signatures
3001,	Real-Time Protection Stopped
5008,	Unexpected Error</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Terminal Services-Remote Connection Manager and Terminal Services-Local Session Manager Log</strong> <strong>ID's</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>Event ID	Açıklama</strong>
261,	Terminal Service Received Connection
1006,	Large Number of Connection Attempts 
1149,	User authenticated
21,	Logon Success
23,	Logoff
24,	Disconnect</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p> <strong>Saygılarımla - Best Regards</strong></p>
<!-- /wp:paragraph -->
