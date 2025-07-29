---
layout: post
title: NT AUTHORITY SYSTEM Nedir
date: 2022-02-02 19:07:00 +0300
author: faruk-guler
comments: true
categories: [Hacking, Security]
---

# NT AUTHORITY\SYSTEM Nedir?

"NT AUTHORITY\\SYSTEM", Windows NT ve sonraki sürümlerinde sistemdeki en yüksek ayrıcalıklara sahip kullanıcı hesabını ifade eder. Bu hesap, işletim sistemi tarafından bir program veya işlemi yürütmek ya da yönetmek için kullanılır. "SYSTEM" hesabı, normal kullanıcı hesaplarından çok daha yüksek izin ve yetki seviyesine sahiptir. Bu hesaba erişim, genellikle yönetici seviyesinde gereken işlemler için kullanılır.

## Özellikler
- **En yüksek ayrıcalıklara sahiptir**: SYSTEM, sistemdeki en yüksek ayrıcalıklara sahip hesaptır ve işletim sisteminin çekirdek moduna tam erişim içerir. Bu, dosya ve kayıt defteri değişiklikleri yapma, hizmetleri başlatma ve durdurma gibi diğer kullanıcılara izin verilmeyen işlemleri gerçekleştirme yeteneğini içerir. Örneğin, bazı SQL Server sürümleri NT AUTHORITY\\SYSTEM hesabını kullanır.
- **Kullanıcı tarafından oluşturulamaz veya silinemez**: SYSTEM hesabı, işletim sistemi tarafından otomatik olarak oluşturulur ve bir kullanıcı tarafından yönetilemez.
- **Şifre yoktur**: SYSTEM hesabının şifresi yoktur, çünkü kimlik doğrulama için yerel bir "token" kullanılır.
- **Oturum açma profili yoktur**: SYSTEM hesabı, oturum açma için bir profile sahip değildir.
- **Uzak erişim için kullanılamaz**: SYSTEM hesabı, bir bilgisayara uzaktan erişim için kullanılamaz.
- **İşletim sistemi hizmetlerini yönetir**: SYSTEM hesabı, işletim sisteminin hizmetlerini yönetmek için kullanılır.
- **Sistem kaynaklarına erişim**: Dosyalar ve kayıt defteri gibi sistem kaynaklarına erişmek için kullanılır.
- **Yönetim görevleri**: Kullanıcı hesapları oluşturma ve silme, grupları yönetme ve sistem politikalarını yapılandırma gibi yönetim görevleri için kullanılır.
- **Yedekleme ve geri yükleme**: Yedekleme yazılımları genellikle "NT AUTHORITY\\SYSTEM" hesabını kullanarak tüm dosya ve klasörlere erişebilir ve yedekleyebilir.
- **Güvenlik**: Bu hesap, sistemdeki en yüksek güvenlik ayrıcalıklarına sahiptir. Bu nedenle, kötü amaçlı yazılımlar bu hesabı ele geçirmeye çalışabilir.

## Önemli Not
SYSTEM hesabının ayrıcalıkları nedeniyle, yalnızca yetkili kullanıcıların bu hesaba erişmesi önemlidir. Yetkisiz kullanıcılar tarafından SYSTEM hesabına erişilmesi, sistemin güvenliğini ve bütünlüğünü tehlikeye atabilir.

**Kendinizi koruyun, güçlü kalın.**  
*Faruk Güler*