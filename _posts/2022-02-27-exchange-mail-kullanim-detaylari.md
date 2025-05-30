---
layout: post
title: Examining Exchange Server Mail usage details Powershell
date: 2022-02-27 12:39
author: theguler
comments: true
categories: [PowerShell]
---
<!-- wp:image {"id":2148,"width":568,"height":319,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/powershell-as-admin.webp?w=1024" alt="" class="wp-image-2148" width="568" height="319" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>PS:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">[CmdletBinding()] 
Param ( 
    [Parameter(Position = 0, Mandatory = $True)] 
    [String] $outFile = "C:\mails_kullanim_raporlari.csv" 
) 
 
 
# From date should be a MONDAY 
$From = Get-Date "11/02/2022" 
$To = $From.AddDays(7) 
 
[Int64] $intTotalSentIntSize = $intTotalSentInt = 0 
[Int64] $intTotalSentExtSize = $intTotalSentExt = 0 
[Int64] $intTotalSentSize = $intTotalSent = 0 
 
[Int64] $intTotalRecIntSize = $intTotalRecInt = 0 
[Int64] $intTotalRecExtSize = $intTotalRecExt = 0 
[Int64] $intTotalRecSize = $intTotalRec = 0 
 
"From, To, # Total Sent, Size Sent, # Total Sent Int, Size Sent Int, # Total Sent Ext, Size Sent Ext, # Total Received, Size Received, # Total Rec Int, Size Rec Int, # Total Rec Ext, Size Rec Ext" &gt;&gt; $outFile 
 
Do 
{ 
    Get-TransportService | Get-MessageTrackingLog -ResultSize Unlimited -Start $From -End $To | ? {$_.MessageSubject -ne "Folder Content"} | ForEach { 
        # Sent E-mails 
        If ($_.EventId -eq "RECEIVE" -and $_.Source -eq "STOREDRIVER") { 
            $intTotalSentSize += $_.TotalBytes 
            $intTotalSent++ 
             
            # Internaly 
            If ($_.Recipients -match "domain.com") { 
                $intTotalSentIntSize += $_.TotalBytes; $intTotalSentInt++ 
            } 
             
            # Externaly 
            # Not an ElseIf as the same e-mail might contain internal and external recipients 
            If ($_.Recipients -notmatch "domain.com") { 
                $intTotalSentExtSize += $_.TotalBytes; $intTotalSentExt++ 
            } 
        } 
         
        # Received E-mails 
        If ($_.EventId -eq "DELIVER") 
        { 
            $intTotalRecSize += $_.TotalBytes 
            $intTotalRec += [Int] $_.RecipientCount 
             
            # From an internal sender 
            If ($_.Sender -match "domain.com") { 
                $intTotalRecIntSize += $_.TotalBytes; $intTotalRecInt += [Int] $_.RecipientCount 
            } Else { 
                # From an external sender 
                $intTotalRecExtSize += $_.TotalBytes; $intTotalRecExt += [Int] $_.RecipientCount 
            } 
        } 
    } 
 
    # Convert the sizes to MB and round them  
    $intTotalSentIntSize = [Math]::Round($intTotalSentIntSize/1MB, 0) 
    $intTotalSentExtSize = [Math]::Round($intTotalSentExtSize/1MB, 0) 
    $intTotalSentSize = [Math]::Round($intTotalSentSize/1MB, 0) 
 
    $intTotalRecIntSize = [Math]::Round($intTotalRecIntSize/1MB, 0) 
    $intTotalRecExtSize = [Math]::Round($intTotalRecExtSize/1MB, 0) 
    $intTotalRecSize = [Math]::Round($intTotalRecSize/1MB, 0) 
 
    # Create a TempTo variable as when we are searching the logs we search up to the next day, but we want to print the day before  
    $FromSmall = $From.ToShortDateString() 
    $TempTo = ($To.AddDays(-1)).ToShortDateString() 
    "$FromSmall, $TempTo, $intTotalSent, $intTotalSentSize, $intTotalSentInt, $intTotalSentIntSize, $intTotalSentExt, $intTotalSentExtSize, $intTotalRec, $intTotalRecSize, $intTotalRecInt, $intTotalRecIntSize, $intTotalRecExt, $intTotalRecExtSize" &gt;&gt; $outFile 
 
    # Reset the variables to do another search  
    $From = $From.AddDays(7) 
    $To = $From.AddDays(7) 
 
    $intTotalSentIntSize = $intTotalSentInt = 0 
    $intTotalSentExtSize = $intTotalSentExt = 0 
    $intTotalSentSize = $intTotalSent = 0 
     
    $intTotalRecIntSize = $intTotalRecInt = 0 
    $intTotalRecExtSize = $intTotalRecExt = 0 
    $intTotalRecSize = $intTotalRec = 0 
} 
While ($To -lt (Get-Date))</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>Faydalı olması dileğiyle. - Hope it will be useful</strong>.</p>
<!-- /wp:paragraph -->
