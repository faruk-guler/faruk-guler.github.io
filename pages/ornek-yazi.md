---
layout: post
title: Örnek Yazı - Markdown ile Bloglama
date: 2025-08-26 10:00
author: theguler
comments: true
categories: [Teknoloji, Web]
---

Bu, Markdown formatında yazılmış bir deneme yazısıdır. Gördüğünüz gibi, başlık ve diğer meta veriler dosyanın en üstünde `---` arasına yerleştirilmiştir.

JavaScript kodumuz bu bilgileri ayrıştırarak sayfanın başlığını, tarihini ve diğer detaylarını oluşturur.

## Markdown Sözdizimi

Markdown, metinleri biçimlendirmek için harika bir yoldur. İşte bazı örnekler:

- **Kalın yazı** için `**metin**`
- *İtalik yazı* için `*metin*`
- `inline kod` için `` `kod` ``

### Kod Blokları

Kod blokları, teknik yazılar için olmazsa olmazdır. Aşağıdaki bir JavaScript kod bloğu örneğidir:

```javascript
function sayHello(name) {
  console.log(`Hello, ${name}!`);
}

sayHello('World');
```

### Alıntılar

> Bu bir alıntı bloğudur. Başkalarından alıntı yapmak veya önemli bir noktayı vurgulamak için kullanabilirsiniz.

Bu basit sistemle, sadece Markdown dosyaları oluşturarak ve `posts.json` dosyasını güncelleyerek blogunuzu kolayca yönetebilirsiniz.
