---
layout: post
title: Windows yanlış bir parola girildikten sonra oturum açmak için neden bekliyor?
date: 2023-09-17 18:57
author: theguler
comments: true
categories: [Windows OS]
---
<!-- wp:image {"id":8590,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/loaders.jpg?w=1024" alt="" class="wp-image-8590" /></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>#Windows'ta yanlış bir parolayı reddetmek neden geçerli bir parolayı kabul etmekten daha uzun sürer?</strong></h2>
<!-- /wp:heading -->

<!-- wp:heading -->
<h2 class="wp-block-heading"><strong>#Why does it take longer to reject a wrong password than to accept a valid password in Windows?</strong></h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Sizde geçersiz veya hatalı bir parolayı reddetmenin geçerli bir parolayı kabul etmekten daha uzun sürdüğünü fark etmiş olabilirsiniz. Hatta bu çoğu zaman can sıkıcı olabiliyor. <strong>Aslında bunun birkaç nedeni vardır. </strong>Öncelikle, bir parolanın geçersiz veya hatalı olduğunu onaylamak daha uzun sürer. Yerel bilgisayarınız bir parola önbelleği tutar. Bu parola önbelleği, bir iş istasyonunun kilidini açma gibi yerel kimlik doğrulama işlemlerinin performansını artırır. İş istasyonunun kilidini oturum açarken kullandığınız parolayla açarsanız, parolanın iyi olduğu varsayılır. Bu, iş istasyonunun kilidinin hızlı bir şekilde açılmasını sağlar. Parola önbelleği olmadan, iş istasyonunun kilidini açmak için parolayı doğrulamak üzere etki alanı denetleyicisine geri dönmek gerekir ki bu da yavaş ağ bağlantıları için çok uzun sürebilir. Aslında, hiç ağ bağlantınız olmayabilir (aşırı yavaş bir durumdur), örneğin dizüstü bilgisayarınızı yolda olduğunuzu ve artık şirket ağına bağlı olmadığınızı düşünün böyle bir durumda, parola önbelleği olmadan iş istasyonunuzun kilidini açmanız imkansız olacaktır! Ayrıca bu sizi rahatsız ediyorsa bu parola önbelleklerini devre dışı bırakabileceğinizde aklınızda bulunsun.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>#Bir parolanın geçerli olup olmadığını test etmek için kullanılan algoritma şu şekilde işler:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>#1 Parola önbellekteyse ve eşleşiyorsa: </strong>Geçerli olarak döndürülecek ve oturum sorunsuz açılacaktır.<br><strong>#2 Aksi takdirde: </strong>Parola doğrulaması için etki alanı denetleyicisine başvurun uyarısı görüntülenir.<br>Eğer geçerli bir parola girerseniz, doğrulama 1. adımda başarılı olur. Adım 1'in tamamen yerel makinede gerçekleştirildiği de önemlidir. Çünkü yanıt almak için başka bilgisayarlarla iletişim kurması gerekmez. Diğer yandan, geçersiz bir parola girerseniz, parolayı doğrulamak için etki alanı denetleyicisiyle iletişim kurmaya çalışan 2. adıma geçer ve oradan gelecek cevabı beklersiniz. Kısaca bunu önbellekte olmayan parolalar için yapmanız gerekir, çünkü bu parolalar hakkında hiçbir bilgimiz yoktur. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ancak neden önbellekte olan ve eşleşmeyen parolalar için de bunu yapmak zorunda kalasınız ki? Neden etki alanı denetleyicisine başvurmadan sadece geçersiz uyarısı almıyorsunuz dimi? Çünkü önbelleğinizin kendisi geçersiz olabilir. Kullanıcı yakın zamanda başka bir makinede parolasını değiştirdiyse, makinenizin önbelleğindeki parola geçerli değildir. Kullanıcı yeni parolayı kullanmaya çalışırsa, bilgisayarınızın önbelleği <strong>"Hayır, bu doğru parola değil"</strong> der. Etki alanı denetleyicisine başvurmak yerine hemen geçersiz yanıtını verirseniz, parolaları değişen kullanıcılar eski parolayı önbelleğe almış olan herhangi bir bilgisayara erişmek için bu parolayı kullanamazlar! ve oturup eski parolanın önbellekten düşmesini beklemek zorunda kalırlar. Böylece bilgisayarınız 2. adıma devam edecek ve etki alanı denetleyicisinden yeni parolayı alacaktır. <strong>"Şimdi şifrenizi değiştirdiğinizi varsayalım, ancak sistem reddetmeye başlayana kadar eski şifrenizi kullanmaya devam etmeniz gerekiyor ve ardından yeni şifreye geçiyorsunuz. Ve reddetme süresi, bilgisayarı kaç kişinin daha kullandığına bağlı olarak bilgisayardan bilgisayara değişecektir. Eğer bilgisayarı kullanan tek kişi sizseniz, yeni şifrenizi asla kabul etmeyecektir. Ancak bilgisayarda eski parola ile oturum açtığınızda, bu makineden diğer makinelere bağlanırken yeni parolanızı vermeniz gerekebilir, çünkü diğer makineler yeni parolanızı almış olabilir."</strong> </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>****<strong>Geçersiz parolaların reddedilmesinin daha uzun sürmesinin en geçerli nedeni de "Brute Force" </strong> saldırılarının etkinliğini ve gücünü azaltmaktır. Geçersiz parolalar geçerli parolaların kabul edildiği kadar hızlı bir şekilde reddedilseydi, kötü niyetli bir kişi geçersiz parolaları yüksek hızda deneyerek bir Brute Force saldırısı oluşturabilirdi. Geçersiz parolaları reddetmeden önce birkaç saniyelik bir gecikme eklemek, parolalarını yanlış yazan kullanıcılar için evet küçükte olsa bir rahatsızlık yaratacaktır. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ancak bu özellik <strong>"Brute Force"</strong> saldırılarını durdurmada büyük bir öneme sahiptir. Örneğin elinizde 5.000 kelimelik bir <strong>"Wordlist" </strong>olduğunu ve buradaki parolaların 100 saniye içinde kabul veya reddedildiğini varsayalım. Wordlist'teki her parolayı denemek üç saatten fazla zaman alacaktır. Geçersiz parolaların reddedilmesine 5 saniyelik basit bir gecikme eklenmesi bile Wordlist'te arama yapma süresini dört günün üzerine çıkaracaktır.</p>
<!-- /wp:paragraph -->

<!-- wp:image {"id":8593,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large"><img src="https://farukguler.com/assets/post_images/login-bruteforce.png?w=657" alt="" class="wp-image-8593" /></figure>
<!-- /wp:image -->

<!-- wp:paragraph -->
<p><strong>"Örnek görsel:</strong></p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Ayrıca bazı yerlerde geçersiz parolanın reddedilme süresi oldukça yüksek olabilir, özellikle de parolayı her yanlış yazdığınızda gecikme artıyorsa. </p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>Son olarak Windows'un tekrar denemenize izin vermeden önce "30 saniye" kadar sizi bekletmesi standart bir güvenlik önlemidir ve bu eşiğe <strong>"yasal olmayan yollar" </strong>hariç (Tersine Mühendislik vs.) şimdilik müdahale edilememektedir.</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p><strong>Saygılarımla – Best Regards</strong></p>
<!-- /wp:paragraph -->
