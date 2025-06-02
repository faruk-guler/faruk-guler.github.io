---
layout: post
title: Fixing Windows 10 Searchbox Error using PowerShell
date: 2023-09-08 10:09
author: theguler
comments: true
categories: [Fix - Troubleshooting]
---
<!-- wp:image {"id":8471,"width":"452px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/search-error.jpg?w=1024" alt="" class="wp-image-8471" style="width:452px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">#Reset Windows Searchbox Fixer
# Copyright © 2019, Microsoft Corporation. All rights reserved.

Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass

function T-R
{
    [CmdletBinding()]
    Param(
        [String] $n
    )

    $o = Get-Item -LiteralPath $n -ErrorAction SilentlyContinue
    return ($o -ne $null)
}

function R-R
{
    [CmdletBinding()]
    Param(
        [String] $l
    )

    $m = T-R $l
    if ($m) {
        Remove-Item -Path $l -Recurse -ErrorAction SilentlyContinue
    }
}

function S-D {
    R-R "HKLM:\SOFTWARE\Microsoft\Cortana\Testability"
    R-R "HKLM:\SOFTWARE\Microsoft\Search\Testability"
}

function K-P {
    [CmdletBinding()]
    Param(
        [String] $g
    )

    $h = Get-Process $g -ErrorAction SilentlyContinue

    $i = $(get-date).AddSeconds(2)
    $k = $(get-date)

    while ((($i - $k) -gt 0) -and $h) {
        $k = $(get-date)

        $h = Get-Process $g -ErrorAction SilentlyContinue
        if ($h) {
            $h.CloseMainWindow() | Out-Null
            Stop-Process -Id $h.Id -Force
        }

        $h = Get-Process $g -ErrorAction SilentlyContinue
    }
}

function D-FF {
    [CmdletBinding()]
    Param(
        [string[]] $e
    )

    foreach ($f in $e) {
        if (Test-Path -Path $f) {
            Remove-Item -Recurse -Force $f -ErrorAction SilentlyContinue
        }
    }
}

function D-W {

    $d = @("$Env:localappdata\Packages\Microsoft.Cortana_8wekyb3d8bbwe\AC\AppCache",
        "$Env:localappdata\Packages\Microsoft.Cortana_8wekyb3d8bbwe\AC\INetCache",
        "$Env:localappdata\Packages\Microsoft.Cortana_8wekyb3d8bbwe\AC\INetCookies",
        "$Env:localappdata\Packages\Microsoft.Cortana_8wekyb3d8bbwe\AC\INetHistory",
        "$Env:localappdata\Packages\Microsoft.Windows.Cortana_cw5n1h2txyewy\AC\AppCache",
        "$Env:localappdata\Packages\Microsoft.Windows.Cortana_cw5n1h2txyewy\AC\INetCache",
        "$Env:localappdata\Packages\Microsoft.Windows.Cortana_cw5n1h2txyewy\AC\INetCookies",
        "$Env:localappdata\Packages\Microsoft.Windows.Cortana_cw5n1h2txyewy\AC\INetHistory",
        "$Env:localappdata\Packages\Microsoft.Search_8wekyb3d8bbwe\AC\AppCache",
        "$Env:localappdata\Packages\Microsoft.Search_8wekyb3d8bbwe\AC\INetCache",
        "$Env:localappdata\Packages\Microsoft.Search_8wekyb3d8bbwe\AC\INetCookies",
        "$Env:localappdata\Packages\Microsoft.Search_8wekyb3d8bbwe\AC\INetHistory",
        "$Env:localappdata\Packages\Microsoft.Windows.Search_cw5n1h2txyewy\AC\AppCache",
        "$Env:localappdata\Packages\Microsoft.Windows.Search_cw5n1h2txyewy\AC\INetCache",
        "$Env:localappdata\Packages\Microsoft.Windows.Search_cw5n1h2txyewy\AC\INetCookies",
        "$Env:localappdata\Packages\Microsoft.Windows.Search_cw5n1h2txyewy\AC\INetHistory")

    D-FF $d
}

function R-L {
    [CmdletBinding()]
    Param(
        [String] $c
    )
 
    K-P $c 2&gt;&amp;1 | out-null
    D-W # 2&gt;&amp;1 | out-null
    K-P $c 2&gt;&amp;1 | out-null

    Start-Sleep -s 5
}

function D-E {
    Write-Host "Press any key to continue..."
    $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyUp") &gt; $null
}

Write-Output "Verifying that the script is running elevated"
if (-Not ([Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole] 'Administrator')) {
 if ([int](Get-CimInstance -Class Win32_OperatingSystem | Select-Object -ExpandProperty BuildNumber) -ge 6000) {
  $Cx = "-File `"" + $MyInvocation.MyCommand.Path + "`" " + $MyInvocation.UnboundArguments
  Start-Process -FilePath PowerShell.exe -Verb Runas -ArgumentList "-noexit",$Cx
  Exit
 }
}

$a = "searchui"
$b = "$Env:localappdata\Packages\Microsoft.Windows.Search_cw5n1h2txyewy"
if (Test-Path -Path $b) {
    $a = "searchapp"
} 


Write-Output "Resetting Windows Search Box"
S-D 2&gt;&amp;1 | out-null
R-L $a

Write-Output "Done..."
D-E</pre>
<!-- /wp:preformatted -->
