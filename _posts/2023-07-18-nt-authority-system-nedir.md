---
title: "NT AUTHORITY SYSTEM nedir?"
author: faruk-guler
categories: [Hacking - Security]
render_with_liquid: false
layout: post
published: true  
---

![Resim](https://farukguler.com/assets/post_images/nt-user.jpg)

"NT AUTHORITY\SYSTEM" refers to the user account with the highest privileges on the system in Windows NT and later versions. This account is used by the operating system to execute or manage a program or process. The "SYSTEM" account has a much higher level of permissions and authorities than regular user accounts. Access to this account is typically used for operations required at the administrator level.


<br>

## **Information**



- Has the highest privileges: SYSTEM is the account with the highest privileges on a system, including full access to the operating system's kernel mode. This includes the ability to perform operations such as making file and registry changes, starting and stopping services, and performing operations that are not permitted to other users. For example, some versions of SQL Server use the NT AUTHORITY\SYSTEM account.

- Cannot be created or deleted by the user: The SYSTEM account is automatically created by the operating system and cannot be managed by a user.

- The SYSTEM account has no password because a local "token" is used for authentication instead of a password.

- The SYSTEM account does not have a profile for logging in.
- The SYSTEM account cannot be used to access a computer remotely.
- It is used to manage the services of the operating system.
- Accessing system resources: The SYSTEM account is used to access system resources such as files and registry.
- The SYSTEM account is used to perform administrative tasks such as creating and deleting user accounts, managing groups, and configuring system policies.
- Backup and Restore: Backup software can usually access and back up all files and folders using the "NT AUTHORITY\SYSTEM" account.
- Security: This account has the highest security privileges in the system. Therefore, malwares may try to take over this account.

***Important: Due to the privileges of the SYSTEM account, it is important that only authorized users use this account. Access to the SYSTEM account by unauthorized users may compromise the security and integrity of the system.

<br>

## **Defend yourself, be stay strong. /Faruk GULER**

<style>
.center img {
  display:block;
  margin-left:auto;
  margin-right:auto;
}
.wrap pre{
    white-space: pre-wrap;
}

.post-desc {
  font-family: 'Open Sans', sans-serif !important;
}
</style>

