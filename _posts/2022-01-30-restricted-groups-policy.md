---
layout: post
title: What is Restricted Groups GPO?
date: 2022-01-30 16:58
author: faruk-guler
comments: true
categories: [Windows Group Policy GPO]
---

<!-- markdownlint-disable MD033 -->

<img src="https://farukguler.com/assets/post_images/gpo_logo.jpg" alt="Windows GPO Logo" width="420" />

Specifying and limiting which accounts on domain-joined computers can be members of local groups is a crucial security practice in Active Directory environments.

Specifically, the **Local Administrators** group holds the highest privileges on endpoint devices. User accounts within this group can install or uninstall applications, modify system files, execute arbitrary code, and manage other local users.

> [!WARNING]
> By default, the **Domain Admins** group is automatically a member of the **Local Administrators** group across all domain endpoints. Removing Domain Admins from endpoint local administrator groups is strongly recommended for security purposes to enforce Tiered Administration and minimize lateral movement risks.

---

## What is Restricted Groups?

The **Restricted Groups** policy setting has been available since early versions of Windows. While it is less flexible than *Group Policy Preferences (GPP) Local Users and Groups*, it serves two primary purposes depending on how it's configured: **strictly overwriting and purging unauthorized members from a local group (Members mode), or additively nesting the group into another group without purging anything (Member Of mode).** The two modes are covered in detail below.

> [!NOTE]
> **Modern Management Note:** In modern Intune/MDM-managed environments (Windows 10 20H2 and newer), Restricted Groups is gradually being replaced by the **LocalUsersAndGroups CSP**, which allows cloud-native management of local accounts and groups.

---

## How to Configure a Restricted Groups Policy

To create a Restricted Groups policy, open the Group Policy Management Editor and navigate to:

```text
Computer Configuration > Policies > Windows Settings > Security Settings > Restricted Groups
```

Right-click **Restricted Groups** and select **Add Group**. You can directly type the name of the local group you want to control (such as `Administrators` or `Remote Desktop Users`), or click **Browse** to select a domain group or account from Active Directory.

> [!NOTE]
> **Key Information:**
>
> - **OU Targeting:** Because this policy is located under *Computer Configuration*, computer accounts must reside in the OU where the Restricted Groups policy is linked.
> - **Security Risk:** Adding Domain Admins directly into local groups poses potential security risks.
> - **Policy Behavior (Non-Tattooing):** Restricted Groups settings are non-tattooing. When the GPO is deleted or unlinked, the local group membership on clients automatically reverts to its pre-policy state on the next Group Policy refresh, as the system restores the previously cached membership.

---

### 1. Members of this group (Strict / Overwrite Mode)

In this section, you add **the user accounts or groups** that you explicitly want to be members of the target group.

- **Behavior:** This option is strict and works as an **Overwrite**. Any account currently in the target group that is not included in this GPO list will be purged.

> [!CAUTION]
> **Blank Members List Behavior & Risk:**
> If the **Members of this group** list is left blank, **ALL** members of the target group will be purged on the client side.
>
> The **only exception** is the built-in local `Administrator` account inside the local **Administrators** group, which is protected at the SAM/LSA level (the well-known RID 500 account cannot be removed via the SAM API) and cannot be removed. Other local groups (such as Backup Operators or custom groups) do **NOT** have this protection—leaving the list blank will completely empty those groups, posing a severe operational risk in production!
>
> **Note:** Restricted Groups is designed to manage **local** group membership only. Microsoft does not support using it to directly target a domain group (e.g., configuring `Domain Admins` itself as the restricted group)—that scenario should be managed through standard AD tools (ADUC, PowerShell, etc.) instead.

<img src="https://farukguler.com/assets/post_images/rest_2-2.png" alt="Restricted Groups Members Configuration" width="520" />

---

### 2. This group is a member of (Additive Mode)

This section allows you to make the target group a member of another parent group (e.g., nesting a domain group like `ITHelpdesk` into the local `Administrators` group).

- **Behavior:** This section is **additive** and **non-destructive**. It enforces **inclusion only** (guaranteeing the specified group is added to the target parent group) without deleting pre-existing members.
- **Trade-off:** This mode is not strict. It does not enforce exclusion or purge unauthorized members added manually by local client administrators. Additionally, because it only governs group-to-group inclusion, it does not manage or restore the internal members of the target group itself.

<img src="https://farukguler.com/assets/post_images/rest_2-1.png" alt="Restricted Groups Member Of Configuration" width="560" />

---

> [!IMPORTANT]
> **GPO Conflict Gotcha:** Avoid configuring the same group using both *Members of this group* and *This group is a member of* across overlapping GPOs. Microsoft warns that the processing order in such scenarios is non-deterministic and can produce unpredictable membership results.

---

## How to Verify and Troubleshoot Policy Enforcement

Once you deploy the Restricted Groups policy, you can verify its execution on client endpoints using the command line or PowerShell:

### 1. Force Group Policy Update

On the client machine, open Command Prompt or PowerShell as Administrator and run:

```cmd
gpupdate /force
```

### 2. Verify Applied GPOs

Check whether the GPO was successfully applied to the computer:

```cmd
gpresult /r /scope computer
```

### 3. Inspect Local Group Membership

Verify the actual members of the local `Administrators` group:

```cmd
net localgroup administrators
```

Or via PowerShell:

```powershell
Get-LocalGroupMember -Group "Administrators"
```

---

**Hope it is useful! – Best regards.**
