/* ------------------------ */
/*     Editor.gen.im     */
/* ------------------------ */

function gCookie(ad) { 
    var adEQ = ad + "="; var ca = document.cookie.split(';'); 
    for(var i=0;i < ca.length;i++) { 
        var c = ca[i]; while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(adEQ) == 0) return c.substring(adEQ.length,c.length); 
    } 
    return 0; 
}

 
$(document).ready(function(){
    $('#girilenMetin').focus();

    // Pasting and undo/redo fire no keyup, so track the input event as well.
    $('#girilenMetin').on('input', metinBilgisi);
    metinBilgisi();

    if(geceTercihiOku() == 1) { nightMode(); }
    $('#btn-nightmode').click(function(){
        nightMode();
    }); 

	
});

function _(id) { 
	return document.getElementById(id);
}

String.prototype.toLowerCaseTR = function() {
	return ((this.replace(/I/g,"ı")).replace(/İ/g,"i")).toLowerCase();
};

String.prototype.toUpperCaseTR = function() {
	return ((this.replace(/ı/g,"I")).replace(/i/g,"İ")).toUpperCase();
};

// Make a user typed string safe to feed into RegExp as a literal pattern.
function regexEscape(s) {
	return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Replace the whole text in one undoable step, then refresh the counters.
// Direct `value = ...` writes wipe the browser's native undo history, so try
// insertText first. Chrome re-lays out the box for every line break inserted
// that way (~1.3 ms per line), so big documents fall back to a plain write.
// insertText replaces the *selection*: if focus is held elsewhere (an open
// Bootstrap modal re-claims it), the selection is not the full text and the
// command would append instead of replace — so verify the selection first.
function setMetin(yeni) {
	var el = _('girilenMetin');
	var satirSayisi = yeni === '' ? 0 : yeni.split('\n').length;
	var ok = false;

	if (yeni.length <= 20000 && satirSayisi <= 150) {
		var secimTam = false;
		try {
			el.focus();
			el.select();
			secimTam = el.selectionStart === 0 && el.selectionEnd === el.value.length;
		} catch (e) { secimTam = false; }

		if (secimTam) {
			try { ok = document.execCommand('insertText', false, yeni); } catch (e) { ok = false; }
		}
	}

	if (!ok) { el.value = yeni; }
	metinBilgisi();
}

function nightMode() {
    var karanlik = document.body.classList.toggle('nightMode');
    geceTercihiYaz(karanlik);
    var dugme = _('btn-nightmode');
    if (dugme) { dugme.setAttribute('aria-pressed', karanlik ? 'true' : 'false'); }
}

// Preferans iki yere yazilir: coerez sunuculu kullanımda, localStorage ise
// dosyanın çift tiklamayla (file://) açıldığı durumda çalışır — orada
// tarayıcı coerez kabul etmez ve tek kalıcı yol depolamadır.
function geceTercihiYaz(acik) {
    document.cookie = 'nightMode=' + (acik ? 1 : 0) + '; path=/; max-age=31536000';
    try { window.localStorage.setItem('nightMode', acik ? '1' : '0'); } catch (e) { /* depolama kapali olabilir */ }
}

function geceTercihiOku() {
    var c = gCookie('nightMode');
    if (c && c !== 0) { return c; }
    try {
        var l = window.localStorage.getItem('nightMode');
        if (l === '1' || l === '0') { return l; }
    } catch (e) { /* depolama kapali olabilir */ }
    return 0;
}


$("#btn_temizle").click(function()
{
	setMetin('');
});
 
$("#btn_tumunuSec").click(function()
{
	_('girilenMetin').focus();
	_('girilenMetin').select();
});
 
// Noktadan once gelen sozcuk kisaltma ise bu nokta cumle bitimi sayilmaz.
var KISALTMALAR = /^(dr|prof|do[cç]|doc|vs|vb|sf|mr|mrs|ms|st|jul|mad|haz|ing|no)$/i;

// Cumle sayisi: nokta / unlem / soru ile biten parcalar sayilir. "Dr." gibi
// kisaltmalar ve ondalikli sayilardaki (3.14) nokta cumle bitimi sayilmaz,
// uzatma noktalari tek noktaya inilir, sonunda isareti olmayan parca da sayilir.
function cumleSay(metin) {
	var m = metin.replace(/\r/g, '').replace(/\.{2,}|\u2026/g, '.');
	if (m.trim() === '') { return 0; }

	var desen = /([.!?]+)(\s|$)/g;
	var eslesme, toplam = 0, sonIsarettenSonrasi = 0;

	while ((eslesme = desen.exec(m)) !== null) {
		if (eslesme[1].charAt(0) === '.') {
			var oncekiKelime = /(\S+)$/.exec(m.slice(0, eslesme.index));
			var sozcuk = oncekiKelime ? oncekiKelime[1].replace(/[^A-Za-zÇçĞğİıÖöŞşÜü]/g, '') : '';
			// Tek harfli bas harfler (A.), kisa kisaltmalar (Dr.) ve sayilar (3.14)
			if (sozcuk.length <= 2 || KISALTMALAR.test(sozcuk)) { continue; }
		}
		toplam++;
		sonIsarettenSonrasi = eslesme.index + eslesme[0].length;
	}

	if (m.slice(sonIsarettenSonrasi).trim() !== '') { toplam++; }
	return toplam;
}

function metinBilgisi()
{
	var hamMetin = _('girilenMetin').value;
	var satirSayisi = hamMetin === '' ? 0 : hamMetin.replace(/\r/g, '').split("\n").length;
	var mb = satirSayisi + ' satır  &nbsp; '

	mb+= cumleSay(hamMetin) + ' cümle &nbsp; ';

	var metin = hamMetin + " ";
	metin = metin.replace(/^[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, "");
	metin = metin.replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, " ");
	mb+= (metin.split(" ").length-1) + ' kelime  &nbsp; ';

	mb+= _('girilenMetin').value.length+' karakter  &nbsp; ';

	_('metinBilgisi').innerHTML = mb;
}
 

$("#btn_hepsiBuyuk").click(function()
{
	setMetin(_('girilenMetin').value.toUpperCaseTR());
});
 

$("#btn_hepsiKucuk").click(function()
{
	setMetin(_('girilenMetin').value.toLowerCaseTR());
});
 
$("#btn_kelimeBuyuk").click(function()
{
	setMetin((_('girilenMetin').value + '').replace(/^(.)|\s(.)/g, function ($1) {
        return $1.toUpperCaseTR();    }));
});
 
$("#btn_cumleBuyuk").click(function() {
	//_('girilenMetin').value = _('girilenMetin').value.toLowerCaseTR();
	cumleBuyukSu('.');
	cumleBuyukSu('!');
	cumleBuyukSu('?');
});


function cumleBuyukSu(k) {
	var cumleler = _('girilenMetin').value.split(k);
	var metin = '';

	for(var i=0; i < cumleler.length; i++)
	{
		metin = metin + ilkHarf(cumleler[i],0);
		if(i < (cumleler.length - 1)) metin = metin + k;
	}

	setMetin(metin);
}

function ilkHarf(m,s) {
	if(m.length < s) { return m; }

	var c = m.substring(s,s+1);
	
	if ( c.match(/[\n\t\s]/) ) {
		return ilkHarf(m,s+1);
	}
	
	if ( c.match(/^[a-zığüşöçİĞÜŞÖÇ]$/) ) {

		return m.substring(0,s) + m.substring(s,s+1).toUpperCaseTR() + m.slice(s+1);
	}
	
	return m;
}
 


// Turkish-correct case-insensitive search pattern built from a literal text:
// every character becomes a class holding its own lower/upper pair, so the
// regex never needs the "i" flag (which gets i/İ and ı/I wrong).
function trHarfDuyarsizDesen(metin) {
	var desen = '';
	for (var i = 0; i < metin.length; i++) {
		var c = metin.charAt(i);
		var kucuk = c.toLowerCaseTR();
		var buyuk = c.toUpperCaseTR();
		desen += (kucuk === buyuk) ? regexEscape(c) : '[' + regexEscape(kucuk) + regexEscape(buyuk) + ']';
	}
	return desen;
}

function bulDegistir()
{
  	var bul = _('buldegistir_bunu').value;
	var koy = _('buldegistir_su').value;

	if (bul=='') { alert('Aranacak ifadeyi girmediniz!'); return false; }

	// The replacement must be inserted verbatim: a "$&"/"$1" inside it is
	// otherwise treated as a capture group reference by String.replace().
	function koyFn() { return koy; }

	var desen = _('buldegistir_bkhd').checked ? regexEscape(bul) : trHarfDuyarsizDesen(bul);

	var gm;
	try {
		gm = _('girilenMetin').value.replace(new RegExp(desen, 'g'), koyFn);
	} catch (e) {
		alert('Aranacak ifade işlenemedi!');
		return false;
	}

	setMetin(gm);
}
 

 
function bsMetinEkle()
{
	var em = _('ekleMetin');
	var satirlar = _('girilenMetin').value.split("\n");
	var metin = '';
	var basina = _('ekleNereye').value == 'basina';

	for(var i=0; i<satirlar.length; i++)
	{
		// %S stands for the line number; every occurrence of it counts.
		var e = em.value.replace(/%S/g, i+1);
		metin = metin + (basina ? e + satirlar[i] : satirlar[i] + e);
		if(i < (satirlar.length - 1)) metin = metin + "\n";
	}

	setMetin(metin);
}

$("#btn_boslukSil").click(function(){
	setMetin(_('girilenMetin').value.replace(/\s/g, ''));
});

$("#btn_bsBoslukSil").click(function(){
	setMetin(_('girilenMetin').value.replace(/^ +| +$/mg,''));
});

$("#btn_bsTabSil").click(function(){
	setMetin(_('girilenMetin').value.replace(/^\t+|\t+$/mg,''));
});

$("#btn_fazlaBoslukSil").click(function(){
	setMetin(_('girilenMetin').value.replace(/[ \t]{2,}/g,' '));
});

$("#btn_bosSatirSil").click(function(){
	// yalnizca bosluk/sek iceren satirlar da bos sayilir
	var satirlar = _('girilenMetin').value.replace(/\r/g,'').split('\n').filter(function (s) {
		return s.replace(/[ \t]/g, '') !== '';
	});
	setMetin(satirlar.join('\n'));
});

$("#btn_gorunmezSil").click(function(){
	var m = _('girilenMetin').value;
	// nbsp ve incecik boslukler normal bosluga doner; sifir-genislik, yon
	// isaretleri, yumusak tire ve BOM silinir; satir/sek karakterleri korunur
	m = m.replace(/[\u00A0\u2007\u202F]/g, ' ')
			.replace(/[\u200B-\u200F\u202A-\u202E\u2060\uFEFF\u00AD]/g, '')
			.replace(/[\u2028\u2029]/g, '\n')
			.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '');
	setMetin(m);
});

$("#btn_satirSonuNormalize").click(function(){
	// insertText ile alana \r\n veya \r girebilir; tek duzen LF'e cevirilir
	setMetin(_('girilenMetin').value.replace(/\r\n?/g, '\n'));
});

$(".btn_HtmlEtiketleriniSil").click(function(){
	var metin = _("girilenMetin").value;
	if($(this).attr('satirbasiKoru')==1)
	{
		metin = metin.replace(/(<p[^>]*>|<\/p[^>]*>)/gi,'\n')
					.replace(/<br\s*\/?>/gi,'\n');
	}

	// Removing only the tags would leak the code or text inside these elements.
	metin = metin.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi,'')
					.replace(/<!--[\s\S]*?-->/g,'');

	setMetin(metin.replace(/(<([^>]+)>)/mig ,''));
});

$(".btn_tekrarlayanSatirlariSil").click(function(){

	var satirlar = _('girilenMetin').value.replace(/\r/g,'').split('\n');
	var ss = satirlar.length;
	var yenis = {};
	var skey = '';
	var cikti = new Array();
	var sayac = 0;
	var duyarli = $(this).attr('harfduyarli')==1;

	for(var i=0; i<ss; i++){
		skey = satirlar[i];
		// The "k" prefix stops inherited Object keys (constructor, toString, valueOf...)
		// from looking like a line that was already seen, which used to delete them.
		skey = 'k' + (duyarli ? skey : skey.toLowerCaseTR());
		if(yenis[skey] == null) {
			yenis[skey] = '';
			cikti[sayac] = satirlar[i];
			sayac++;
		}
	}
	setMetin(cikti.join('\n'));
});


$(".btn_sirala").click(function(){

	var metin = _('girilenMetin').value.replace(/\r/gi,'');
	var tip = $(this).attr('tip');
	var satirlar = metin.split('\n');

	if(tip == 'alfabetik') setMetin(satirlar.sort(localSirala).join('\n'));
	if(tip == 'dogal') setMetin(satirlar.sort(dogalSirala).join('\n'));
	if(tip == 'uzunluk') setMetin(satirlar.sort(uzunlukSirala).join('\n'));
	if(tip == 'ters') setMetin(satirlar.reverse().join('\n'));
	if(tip == 'rastgele') setMetin(satirlar.rastgele().join('\n'));

});

var trCollator = null; // shared: creating a collator per comparison is very slow
var trDogalCollator = null;

function localSirala(a,b)
{
    // Pin the collation to Turkish, so ordering does not depend on the
    // browser language (ç, ğ, ı, i, ö, ş, ü have a fixed place in the alphabet).
    if (!trCollator) { trCollator = new Intl.Collator('tr', { usage: 'sort', sensitivity: 'variant' }); }
    return trCollator.compare(a, b);
}

function dogalSirala(a,b)
{
    // numeric:true reads digit runs as numbers, so "satır 2" comes before
    // "satır 10" (plain alphabetical order puts 10 first).
    if (!trDogalCollator) { trDogalCollator = new Intl.Collator('tr', { usage: 'sort', sensitivity: 'variant', numeric: true }); }
    return trDogalCollator.compare(a, b);
}

// Delimiters offered in the "Kolona göre sırala" dialog.
var KOLON_AYIRICILARI = {
	'sek': /\t+/,
	'virgul': /,/,
	'noktali-virgul': /;/,
	'iki-nokta': /:/,
	'bosluk': / +/,
	'ardisik-bosluk': / {2,}/
};

$("#btn_kolonSirala").click(function(){
	var ayirici = KOLON_AYIRICILARI[_('kolonAyirici').value] || KOLON_AYIRICILARI['bosluk'];
	var no = parseInt(_('kolonNo').value, 10);
	if (!(no >= 1)) { no = 1; }
	var azalan = _('kolonYon').value === 'azalan';

	var satirlar = _('girilenMetin').value.replace(/\r/g,'').split('\n');

	function hucre(satir) {
		var parcalar = satir.split(ayirici);
		var deger = parcalar[no - 1];
		return (deger === undefined) ? null : deger.replace(/^[ \t]+|[ \t]+$/g, '');
	}

	// Sort indexes so lines without the requested column can be kept at the
	// end, and equal cells keep their original order (Array.sort is stable).
	var sira = satirlar.map(function (s, i) { return i; });
	sira.sort(function (i, j) {
		var a = hucre(satirlar[i]);
		var b = hucre(satirlar[j]);
		if (a === null && b === null) { return 0; }
		if (a === null) { return 1; }
		if (b === null) { return -1; }
		var fark = dogalSirala(a, b);
		return azalan ? -fark : fark;
	});

	// Close the dialog first: while it is open it re-claims focus, which would
	// force setMetin() into its non-undoable fallback path.
	$('#kolonModal').modal('hide');
	setMetin(sira.map(function (i) { return satirlar[i]; }).join('\n'));
});

function uzunlukSirala(a,b)
{
	var x = a.length;
	var y = b.length;
	if(x < y) return -1;
	if(x > y) return 1;
	return 0;
}

Array.prototype.rastgele = function()
{
	var x = this.length;
	if(x == 0) return false;
	var y = 0;
	var temp_x = '';
	var temp_y = '';
	while(--x){
		y = Math.floor(Math.random()*(x + 1));
		temp_x = this[x];
		temp_y = this[y];
		this[x] = temp_y;
		this[y] = temp_x;
	}
	return this;
}


/* diger */
$("#btn_urlEncode").click(function(){
	setMetin(encodeURIComponent(_('girilenMetin').value).replace(/'/g,"%27").replace(/"/g,"%22"));
});

$("#btn_urlDecode").click(function(){
	var kodlanmis = _('girilenMetin').value.replace(/\+/g,  " ");
	var coz;
	try { coz = decodeURIComponent(kodlanmis); }
	catch (e) { alert('Metin URL kodu olarak çözülemedi!'); return false; }
	setMetin(coz);
});


var deasciifier = null; // reused: building the pattern tables is expensive

$("#btn_turkceHarfliYap").click(function(){
	var el = _('girilenMetin');
	if (!deasciifier) { deasciifier = new Deasciifier(); }

	var metin = el.value;
	var yeni;
	// Convert the selection only when the user made one, otherwise the whole text.
	if (typeof el.selectionStart == 'number' && el.selectionStart != el.selectionEnd) {
		yeni = deasciifier.deasciifyRange(metin, el.selectionStart, Math.min(el.selectionEnd, metin.length - 1));
	} else {
		yeni = deasciifier.deasciify(metin);
	}
	setMetin(yeni);
});


var sec = ['193','225','192','224','194','226','461','462','258','259','195','227','7842','7843','7840','7841','196','228','197','229','256','257','260','261','7844','7845','7846','7847','7850','7851','7848','7849','7852','7853','7854','7855','7856','7857','7860','7861','7858','7859','7862','7863','506','507','262','263','264','265','268','269','266','267','199','231','270','271','272','273','201','233','200','232','202','234','282','283','276','277','7868','7869','7866','7867','278','279','203','235','274','275','280','281','7870','7871','7872','7873','7876','7877','7874','7875','7864','7865','7878','7879','286','287','284','285','288','289','290','291','292','293','294','295','205','237','204','236','300','301','206','238','463','464','207','239','296','297','302','303','298','299','7880','7881','7882','7883','308','309','310','311','313','314','317','318','315','316','321','322','319','320','323','324','327','328','209','241','325','326','211','243','210','242','334','335','212','244','7888','7889','7890','7891','7894','7895','7892','7893','465','466','214','246','336','337','213','245','216','248','510','511','332','333','7886','7887','416','417','7898','7899','7900','7901','7904','7905','7902','7903','7906','7907','7884','7885','7896','7897','7764','7765','7766','7767','340','341','344','345','342','343','346','347','348','349','352','353','350','351','356','357','354','355','358','359','218','250','217','249','364','365','219','251','467','468','366','367','220','252','471','472','475','476','473','474','469','470','368','369','360','361','370','371','362','363','7910','7911','431','432','7912','7913','7914','7915','7918','7919','7916','7917','7920','7921','7908','7909','7810','7811','7808','7809','372','373','7812','7813','221','253','7922','7923','374','375','376','255','7928','7929','7926','7927','7924','7925','377','378','381','382','379','380','208','305','304'];
var rep = ['A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','C','c','C','c','C','c','C','c','C','c','D','d','D','d','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','G','g','G','g','G','g','G','g','H','h','H','h','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','J','j','K','k','L','l','L','l','L','l','L','l','L','l','N','n','N','n','N','n','N','n','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','P','p','P','p','R','r','R','r','R','r','S','s','S','s','S','s','S','s','T','t','T','t','T','t','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','W','w','W','w','W','w','W','w','Y','y','Y','y','Y','y','Y','y','Y','y','Y','y','Y','y','Z','z','Z','z','Z','z','D','i','I'];

$("#btn_ingilizHarfliYap").click(function(){
	var seclen = sec.length;
	var text = _('girilenMetin').value.replace(/\r/g,'').split('\n');
	var textout = new Array();
	var linecnt = text.length;
	var torem, toremout, toremlen, chcoat, repwith, x, y, z;
	for(x=0;x<linecnt;x++){
		torem = text[x].split('');
		toremout = new Array();
		toremlen = torem.length;
		for(y=0;y<toremlen;y++){
			repwith = -1;
			chcoat = torem[y].charCodeAt(0);
			if(chcoat > 124) {for(z=0;z<seclen;z++){if(chcoat == sec[z]) {repwith = rep[z]; z = seclen;}}}
			if(repwith != -1) {toremout[y] = repwith;} else {toremout[y] = torem[y];}
		}
		textout[x] = toremout.join('');}
	setMetin(textout.join('\n'));

});



//bitti