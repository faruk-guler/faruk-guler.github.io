---
layout: post
title: Active Directory Group Policy Modeling Wizard and Results
date: 2022-08-29 11:12
author: theguler
comments: true
categories: [Active Directory]
---
<!-- wp:image {"id":4187,"width":694,"height":267,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/modeling.jpg?w=1000" alt="" class="wp-image-4187" width="694" height="267" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>If you are using the Group Policy Management Console on Active Directory, the following titles has caught your attention.<br>Due to its nature, the GPO is applied on a site, domain or OU basis. A computer or user cumulatively receives all GPO policies applied to it. You can sort of think of it so that the sum of them all (except in conflict, the nearest gpo will be the most dominant gpo at the time of conflict) is applied. In a small company organization, the system administrator can easily manage this architecture. But in very large organizations, sometimes GPO conflicts can cause even massive outages. Therefore, before you make a GPO change or if you want to check how it will turn out before applying a planned GPO change, you can use the GPO Modeling feature.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Group Policy Result is sometimes confused with Modeling because they both have concepts such as target computer, user, but Result is used to see the GPO settings applied to an existing user or machine, while Modeling will show results for a GPO model that you have not yet implemented but that you intend to test and simulate.</strong></p>
<!-- /wp:paragraph -->
