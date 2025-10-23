---
layout: post
title: Akash Network (AKT) Nedir?
date: 2024-6-11 19:45
by: faruk-guler
comments: true
categories: [Blockchain]
---

![Akash Network (AKT) Logosu](https://farukguler.com/assets/post_images/akash-network.jpg) Akash Network (AKT), sadece bir blockchain değil; o, devrim niteliğinde bir **merkeziyetsiz bulut bilişim (DeCloud - Decentralized Cloud) pazaryeridir.** Temel amacı, Amazon Web Services (AWS), Google Cloud (GCP) ve Microsoft Azure gibi dev merkezi bulut sağlayıcılarına **açık kaynaklı, izinsiz (permissionless) ve çok daha ucuz** bir alternatif sunmaktır.

Akash, **Cosmos SDK** üzerine kurulu bir Layer 1 blockchain'dir ve **AKT** token'ı, bu ağın çalışmasını sağlayan, güvenliğini temin eden ve pazaryerindeki işlemleri kolaylaştıran yerel (native) kripto para birimidir.

Projenin vizyonu, dünya çapında **kullanılmayan (underutilized)** devasa sunucu kapasitesini (veri merkezlerinden bireysel bilgisayarlara kadar) bir araya getirerek, herkesin bulut bilişim kaynaklarını **kiralamasını (Tenants/Kiracılar)** veya **kiraya vermesini (Providers/Sağlayıcılar)** sağlayan açık bir platform oluşturmaktır.

---

## Akash'ın Çözdüğü Problem: Merkezi Bulutun Kısıtlamaları 

Geleneksel bulut bilişim pazarı, birkaç dev teknoloji şirketi tarafından domine edilmektedir. Bu durum birkaç temel soruna yol açar:

1.  **Yüksek Maliyetler:** Bu devler, pazar hakimiyetlerini kullanarak genellikle yüksek fiyatlar belirlerler.
2.  **Satıcı Kilitlenmesi (Vendor Lock-in):** Bir sağlayıcıya bağımlı hale gelmek, başka bir sağlayıcıya geçişi zor ve maliyetli hale getirebilir.
3.  **Sansür Riski ve İzin Gerektirme:** Merkezi sağlayıcılar, politik nedenlerle veya kendi hizmet şartlarına aykırı buldukları uygulamaları barındırmayı reddedebilir veya kapatabilirler.
4.  **Verimsizlik:** Dünya çapında milyonlarca sunucunun işlem gücü tam olarak kullanılmamaktadır.

Akash, bu sorunları, Airbnb'nin boş odaları veya Uber'in boş araba koltuklarını bir pazaryerine dönüştürmesi gibi, **boşta duran işlem gücünü (compute resources)** merkeziyetsiz bir pazaryerine taşıyarak çözer.

---

## Akash Pazaryeri Nasıl Çalışır? (Ters Açık Artırma)

Akash'ın kalbi, bulut kaynaklarına ihtiyaç duyanlar (Kiracılar) ile bu kaynakları sunanlar (Sağlayıcılar) arasındaki etkileşimi yöneten eşler arası (P2P) pazaryeridir.

1.  **Kiracı (Tenant) İhtiyacı:** Bir geliştirici veya şirket, uygulamasını çalıştırmak için belirli kaynaklara (örn. 4 CPU, 8GB RAM, 100GB depolama) ihtiyaç duyar.
2.  **Dağıtım Tanımı (SDL):** Kiracı, bu ihtiyaçlarını **SDL (Stack Definition Language)** adı verilen basit bir konfigürasyon dosyasıyla tanımlar ve ağa bir "sipariş" (deployment request) gönderir. Bu siparişte, ödemek istediği **maksimum fiyatı** da belirtir.
3.  **Sağlayıcı (Provider) Teklifleri (Ters Açık Artırma):** Ağdaki Sağlayıcılar (veri merkezleri, hatta bireysel sunucu sahipleri), bu siparişi görürler. Kiracının istediği kaynakları sunabilen sağlayıcılar, bu işi almak için **birbirleriyle rekabet ederek fiyat teklifi verirler.** Kilit nokta burasıdır: Sağlayıcılar, kiracının maksimum fiyatından **daha düşük** bir fiyat teklif ederler. En düşük teklifi veren sağlayıcı işi kazanır. Buna **"Ters Açık Artırma" (Reverse Auction)** denir.
4.  **Dağıtım (Deployment):** Kiracı en uygun teklifi seçer, ödemeyi (genellikle AKT ile) yapar ve uygulaması seçilen sağlayıcının sunucusunda otomatik olarak (genellikle Docker konteynerları kullanılarak) çalışmaya başlar.

---

## Akash'ın Temel Avantajları

* **Maliyet Verimliliği:** Ters açık artırma modeli ve kullanılmayan kaynakların değerlendirilmesi sayesinde Akash, merkezi bulut sağlayıcılarına kıyasla **%85'e varan oranlarda daha ucuz** olabileceğini iddia eder.
* **İzinsiz ve Sansüre Dayanıklı:** Herkes ağa kaynak sağlayabilir veya kiralayabilir. Merkezi bir otoritenin uygulamaları engellemesi veya kapatması çok daha zordur.
* **Esneklik:** Kullanıcılar belirli bir sağlayıcıya kilitlenmezler. Farklı sağlayıcılar arasında kolayca geçiş yapabilirler.
* **Küresel Dağıtım:** Uygulamalarınızı dünya çapında dağılmış binlerce sağlayıcı üzerinde çalıştırabilirsiniz.
* **GPU Pazaryeri (AI/ML Odaklı):** Akash, özellikle yapay zeka (AI) ve makine öğrenimi (ML) iş yükleri için kritik olan **GPU (Grafik İşlemci) kaynakları** için de büyüyen bir pazaryeri sunar. Nvidia H100 ve A100 gibi yüksek performanslı GPU'ları merkezi sağlayıcılardan çok daha ucuza kiralamak mümkündür.

---

## AKT Token'ı Ne İşe Yarar? (Ekonomik Motor) (DeCloud)

**AKT**, Akash Network'ün güvenliğini, yönetişimini ve ekonomik işleyişini sağlayan temel varlıktır. Maksimum arzı ~389 Milyon AKT ile sınırlandırılmıştır (enflasyon modeli zamanla azalır).

1.  **Ağ Güvenliği (Staking):** Akash, bir Proof-of-Stake (PoS) ağıdır. Ağın güvenliğini sağlamak için doğrulayıcıların (validators) **AKT stake etmesi** gerekir. AKT sahipleri de token'larını güvendikleri bir doğrulayıcıya devrederek (delegating) pasif gelir (staking ödülleri) elde edebilirler.
2.  **Yönetişim (Governance):** AKT sahipleri, ağın geleceği hakkında (protokol güncellemeleri, parametre değişiklikleri, hazine harcamaları) oy kullanarak yönetimde söz sahibi olurlar.
3.  **Değer Değişimi ve Kiralama Teşviki (Settlement Currency):**
    * Akash pazaryerindeki kiralamalar (leases) için varsayılan **ödeme ve yerleşim para birimi AKT'dir.** Kiracılar, sağlayıcılara ödemeyi AKT ile yapar (veya USDC gibi stablecoin'lerle ödeme yapıp arka planda AKT'ye dönüştürülür).
    * Sağlayıcılar, daha fazla kiracı çekmek için teşvik olarak AKT stake edebilirler.
    * Ağ, gerçekleşen kiralamalardan küçük bir **"Take Rate" (Komisyon)** alır ve bu gelir, AKT staker'larına dağıtılır. Bu, AKT'ye doğrudan bir "kullanım değeri" (utility) ve "gerçek gelir" (real yield) kazandırır.

Akash Network (AKT), bulut bilişim endüstrisini kökten değiştirme potansiyeline sahip, son derece yenilikçi bir projedir. Merkezi devlere karşı daha açık, daha ucuz ve daha dirençli bir alternatif sunarak, hem bireysel geliştiriciler hem de büyük kuruluşlar için yeni olanaklar yaratmaktadır.

Özellikle yapay zeka ve makine öğrenimi gibi yoğun işlem gücü gerektiren alanlardaki büyüme göz önüne alındığında, Akash'ın sunduğu merkeziyetsiz GPU pazaryeri, onu Web3'ün temel altyapı taşlarından biri haline getirebilir.