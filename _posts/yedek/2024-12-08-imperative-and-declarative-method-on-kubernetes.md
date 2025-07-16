---
layout: post
title: Imperative and Declarative Method on Kubernetes
date: 2023-10-08 20:31
author: theguler
comments: true
categories: [Kubernetes]
---
<!-- wp:image {"id":15422,"width":"490px","height":"auto","sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/k8s.png?w=625" alt="" class="wp-image-15422" style="width:490px;height:auto" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>╰┈➤ Imperative Method</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In the imperative method, what is to be done is specified step by step and the operations are carried out directly by the user with commands. This approach requires manual interaction with the system.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Features:</strong><br>It specifies how to do it: The user initiates operations by writing specific commands.<br>It is fast: Ideal for simple and instant changes.<br>It is temporary: Long-term management is difficult because the operations are not recorded.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Examples:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Create a Pod:</strong><br>kubectl run mypod --image=nginx:latest --port=80<br><br><strong>#Delete a Pod:</strong><br>kubectl delete pod nginx-pod<br><br><strong>#Update a Pod: </strong><br>kubectl set image pod/nginx nginx=nginx:latest</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>╰┈➤ Declarative Method</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>In the declarative method, the desired end state is defined and the system automatically reaches that state. The user specifies “what to do” but does not detail “how” to do it. Kubernetes uses control loops to provide and maintain this end state.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Features:</strong><br>Specifies what to do: The user manages resources through descriptive files such as <strong>YAML or JSON.</strong><br>Repeatable: The same definitions provide the same result every time.<br>Automatic remediation: Kubernetes continuously remediates the actual state to match the defined state.</p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted"><strong>#Definition of a Deployment Example:</strong><br>apiVersion: apps/v1<br>kind: Deployment<br>metadata:<br>  name: nginx-deployment<br>spec:<br>  replicas: 3<br>  selector:<br>    matchLabels:<br>      app: nginx<br>  template:<br>    metadata:<br>      labels:<br>        app: nginx<br>    spec:<br>      containers:<br>      - name: nginx<br>        image: nginx:1.17</pre>
<!-- /wp:preformatted -->

<!-- wp:paragraph -->
<p><strong>To Apply the Definition:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">kubectl apply -f deployment.yaml</pre>
<!-- /wp:preformatted -->

<!-- wp:heading {"level":3} -->
<h3 class="wp-block-heading">🧐 Compare:</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Comparison of imperative and declarative approaches in Kubernetes:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>CrIterIon</th><th>ImperatIve</th><th>DeclaratIve</th></tr></thead><tbody><tr><td><strong>Approach</strong></td><td>Immediate and command-based</td><td>State-based and descriptive</td></tr><tr><td><strong>Implementation</strong></td><td>Uses <code>kubectl</code> commands</td><td>Uses YAML or JSON files</td></tr><tr><td><strong>Traceability</strong></td><td>Harder to track</td><td>Easier to track, integrates well with version control</td></tr><tr><td><strong>Process</strong></td><td>Step-by-step instructions</td><td>Desired state specified</td></tr></tbody></table></figure>
<!-- /wp:table -->
