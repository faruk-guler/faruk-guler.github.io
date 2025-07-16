---
layout: post
title: Redis Nedir ? - Redis Hakkında
date: 2022-09-09 01:18
author: theguler
comments: true
categories: [Databases]
---
<!-- wp:image {"id":4364,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/redis.png?w=826" alt="" class="wp-image-4364" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Redis; is one of the most used and known NoSQL databases by developers.</strong> Redis is open source and its source codes are available on GitHub. It gives high performance results because it is written in C language. It is supported by Linux and derivative operating systems, but is supported by the community, although there is no official support for the Windows side.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Redis is the most used key-value database in today's systems and is generally used for caching, session management, pub/sub, message broker.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p></p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>It is an abbreviation for Remote Dictionary Service.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Written in C language.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>The starting point is "speed".</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>It has the feature of being a NoSQL database designed as “Key : value”.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>It has -In memory Database approach. Optionally, it also has the ability to be written on the disc. (It happens automatically)</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>It is an advanced key-value store.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>It is not an alternative to Relational Database or Document-based Database systems.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>If you are using databases such as MySQL, PostgreSQL, it would not be the right approach if you say to use Redis instead of these databases. On the contrary, it can be used as a middleware to define the relationships of these DB types.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>Best use for structures with rapidly growing data with predictable DB size.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p><strong>What Data Types Does It Support?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-String<br>-Hash<br>-list<br>-Set<br>-Sorted Set<br>-Geospatial Index<br>-HyperLogLog can store data types in it.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>What are the Usage Areas?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Can be used as a database.<br>-It can write the stored data on the disk with its Persist capability.<br>-Caching Layer is widely used.<br>-It's very fast.<br>-Message Broker<br>-It doesn't just work as a key-value store. It can also be used as a message broker like RabbitMQ.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Use Case:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>It can be used in cache mechanisms.<br>It can be used where the Publish/Subscribe model can be applied.<br>For example, the user publishes a message (pub) that goes to all followers (sub).<br>-In the blocking and delaying of queues.<br>-In short live data<br>-Fraud detection (Fraud detection)<br>-In session controls<br>-Filtering services<br>-Comment counts<br>It is very fast in listing the products on a site like Amazon, and in viewing the comments made on these products.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-By keeping a copy of the database on redis, operations can be performed quickly without tiring the database.<br>-In analysis of real data</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Each time a unique data is stored.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>When should we use it?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-When very high speed is needed<br>When you need more than -key-value pair<br>-Where dataset is not critical.<br>-It works as (in memory) by default.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-If the disk write feature is not active, the data will be deleted when the server is shut down.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>What to Consider When Using?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Data is stored on memory, so there are a lot of memory constraints.<br>-An empty instance uses 1Mb of memory. (When a client is created in Rediste, it takes up 1MB of memory.)<br>-1 Million small key-value (string) pairs use 100Mb of memory.<br>-1 Million small key-value pairs (hash consisting of 5 fields) use 200Mb of memory.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Performance?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Since Redis does not work synchronously, the data is processed one by one. It processes 80,000 requests at less than 1msec (milliseconds). If we activate the Redis pipelined feature, it will gain incredible speed. When the Pipeline feature is activated, it does all the work collectively. The number of transactions made under 1 msec (milliseconds) increases up to 250,000.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":4377,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/redis_top.png?w=1024" alt="" class="wp-image-4377" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>The picture shows the number of processes and times of different applications.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Scaling?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Persistence: Redis provides two different mechanisms for persistence.<br>-RDB (Redis Database Snapshot): It takes an exact copy of the database.<br>-AOF (Append Only Files): It offers us the feature of adding only to the file.<br>-Replication<br>-One redis instance comes as master and other instances comes as slave.<br>-Instances that come as slaves are copies of the master instance.<br>-Client connects to one of the slave or master instances.<br>-Slave only reads by default.<br>-Partitioning: We can divide and share data.<br>-Failover: Undesirable situations may occur in network flows and may cause interruptions. It is the mechanism that specifies how to behave in such situations.<br>-Manual<br>-Automatic: Redis Sentiel – for master-slave(replication) topology<br>-Auto: Redis Cluster – for cluster(partitioning) topology</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Which companies use Redis today?</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>-Twitter<br>-Github<br>-Pinterest<br>-StackOverFlow<br>-Snapchat</p>
<!-- /wp:paragraph -->
