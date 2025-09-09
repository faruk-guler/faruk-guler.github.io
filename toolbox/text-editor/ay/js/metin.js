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
	DeasciifyHandler.init();
    $('#girilenMetin').focus();

    if(gCookie('nightMode')==1) { nightMode(); }
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

function nightMode() {
    if(document.body.classList.contains('nightMode')) {
        document.body.classList.remove("nightMode");
        document.cookie='nightMode=0';
    }
    else {
        document.body.classList.add("nightMode");
        document.cookie='nightMode=1';
    }
}

$("#btn_nightMode").click(function(){
	
});


$("#btn_temizle").click(function()
{
	_('girilenMetin').value='';
	metinBilgisi();
});
 
$("#btn_tumunuSec").click(function()
{
	_('girilenMetin').focus();
	_('girilenMetin').select();
});
 
function metinBilgisi()
{
	var mb = _('girilenMetin').value.split("\n").length + ' satır  &nbsp; '

	var metin = _('girilenMetin').value;
	var cumlet = metin.replace(/\r/g,'').replace(/ \n/g,'\n') + '\n';
	var cumlet1 = cumlet.split('. ').length -1;
	var cumlet1b = cumlet.split('.\n').length -1;
	var cumlet2 = cumlet.split('! ').length -1;
	var cumlet2b = cumlet.split('!\n').length -1;
	var cumlet3 = cumlet.split('? ').length -1;
	var cumlet3b = cumlet.split('?\n').length -1;
	var cumlesayisi = cumlet1 + cumlet1b + cumlet2 + cumlet2b + cumlet3 + cumlet3b;
	mb+= cumlesayisi + ' cümle &nbsp; ';

	metin = _('girilenMetin').value + " ";
	metin = metin.replace(/^[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, "");
	metin = metin.replace(/[^a-z0-9ığüşöçİĞÜŞÖÇ]+/gi, " ");
	mb+= (metin.split(" ").length-1) + ' kelime  &nbsp; ';

	mb+= _('girilenMetin').value.length+' karakter  &nbsp; ';

	_('metinBilgisi').innerHTML = mb;
}
 

$("#btn_hepsiBuyuk").click(function()
{
	_('girilenMetin').value = ((_('girilenMetin').value.replace(/ı/g,"I")).replace(/i/g,"İ")).toUpperCaseTR();
});
 

$("#btn_hepsiKucuk").click(function()
{
	_('girilenMetin').value = ((_('girilenMetin').value.replace(/I/g,"ı")).replace(/İ/g,"i")).toLowerCaseTR();
});
 
$("#btn_kelimeBuyuk").click(function()
{
	_('girilenMetin').value =  (_('girilenMetin').value + '').replace(/^(.)|\s(.)/g, function ($1) {
        return (($1.replace(/ı/g,"I")).replace(/i/g,"İ")).toUpperCaseTR();    });
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

	for(i=0; i < cumleler.length; i++)
	{
		metin = metin + ilkHarf(cumleler[i],0);
		if(i < (cumleler.length - 1)) metin = metin + k;
	}

	_('girilenMetin').value = metin;
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
 


function bulDegistir()
{
  	var bul = _('buldegistir_bunu').value;
	var koy = _('buldegistir_su').value;

	if (bul=='') { alert('Aranacak ifadeyi girmediniz!'); return false; }

	var gm = _('girilenMetin').value;

	if(_('buldegistir_bkhd').checked) 
	{
		//c
		gm = gm.replace(new RegExp(bul, 'g'), koy);
	}
	else
	{
		//ci
		bul = (bul.replace(/i/g,'(-<->-|-<<->>-)')).replace(/İ/g,'(-<->-|-<<->>-)');
		bul = (bul.replace(/ı/g,'(-<-->-|-<<-->>-)')).replace(/I/g,'(-<-->-|-<<-->>-)');

		gm = (gm.replace(/i/g,'-<->-')).replace(/İ/g,'-<<->>-');
		gm = (gm.replace(/ı/g,'-<-->-')).replace(/I/g,'-<<-->>-');

		gm = gm.replace(new RegExp(bul, 'gi'), koy);

		gm = (gm.replace(/-<->-/g,'i')).replace(/-<<->>-/g,'İ');
		gm = (gm.replace(/-<-->-/g,'ı')).replace(/-<<-->>-/g,'I');

	}
  
	_('girilenMetin').value = gm;
	metinBilgisi();
}
 

 
function bsMetinEkle()
{
	var em = _('ekleMetin');
	var satirlar = _('girilenMetin').value.split("\n");
	var metin = '';

	if(_('ekleNereye').value == 'basina')
	{
		for(i=0; i<satirlar.length; i++)
		{
			e = em.value.replace("%S", i+1);
			metin = metin + e + satirlar[i];
			if(i < (satirlar.length - 1)) metin = metin + "\n";
		}
		_('girilenMetin').value = metin;
	}
	else
	{
		for(i=0; i<satirlar.length; i++)
		{
			e = em.value.replace("%S", i+1);
			metin = metin + satirlar[i] + e;
			if(i < (satirlar.length - 1)) metin = metin + "\n";
		}
		_('girilenMetin').value = metin;
	}

	metinBilgisi();
}

$("#btn_boslukSil").click(function(){
	_("girilenMetin").value = _('girilenMetin').value.replace(/\s/g, '');
	metinBilgisi();
});

$("#btn_bsBoslukSil").click(function(){
	_("girilenMetin").value = _('girilenMetin').value.replace(/^ +| +$/mg,'');
	metinBilgisi();
});

$("#btn_bsTabSil").click(function(){
	_("girilenMetin").value = _('girilenMetin').value.replace(/^\t+| +$/mg,'');
	metinBilgisi();
});

$("#btn_fazlaBoslukSil").click(function(){
	_("girilenMetin").value = _('girilenMetin').value.replace(/ +/g,' ');
	metinBilgisi();
});

$(".btn_HtmlEtiketleriniSil").click(function(){
	var metin = _("girilenMetin").value;
	if($(this).attr('satirbasiKoru')==1)
	{
		metin = metin.replace(/(<(p[^>]*)>|<(\/p[^>]*)>)/gi,'\n')
					.replace(/(<br>|<br\/>|<br \/>)/gi,'\n');
	}
	
	_("girilenMetin").value = metin.replace(/(<([^>]+)>)/mig ,'');
	metinBilgisi();
});

$(".btn_tekrarlayanSatirlariSil").click(function(){

	var satirlar = _('girilenMetin').value.replace(/\r/g,'').split('\n');
	var ss = satirlar.length;
	var yenis = {};
	var skey = '';
	var cikti = new Array();
	var sayac = 0;
	
	if($(this).attr('harfduyarli')==1)
	{
		for(var i=0; i<ss; i++){
			skey = satirlar[i];
			if(yenis[skey] == null) {
				yenis[skey] = '';
				cikti[sayac] = skey; 
				sayac++;
			}
		}
	} 
	else 
	{
		for(var i=0; i<ss; i++){
			skey = satirlar[i];
			if(yenis[skey.toLowerCaseTR()] == null) {
				yenis[skey.toLowerCaseTR()] = ''; 
				cikti[sayac] = skey; 
				sayac++;
			}
		}
	}
	_('girilenMetin').value = cikti.join('\n');
	metinBilgisi();
});


$(".btn_sirala").click(function(){

	var metin = _('girilenMetin').value.replace(/\r/gi,'');
	var tip = $(this).attr('tip');

	if(tip == 'alfabetik') _('girilenMetin').value = metin.split('\n').sort(localSirala).join('\n');
	if(tip == 'uzunluk') _('girilenMetin').value = metin.split('\n').sort(uzunlukSirala).join('\n');
	if(tip == 'ters') _('girilenMetin').value = metin.split('\n').reverse().join('\n');
	if(tip == 'rastgele') _('girilenMetin').value = metin.split('\n').rastgele().join('\n');

});

function localSirala(a,b)
{
    return a.localeCompare(b)
};

function uzunlukSirala(a,b)
{
	x = a.toString().length;
	y = b.toString().length;
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
	_('girilenMetin').value = encodeURIComponent(_('girilenMetin').value).replace(/'/g,"%27").replace(/"/g,"%22");	
});

$("#btn_urlDecode").click(function(){
	_('girilenMetin').value = decodeURIComponent(_('girilenMetin').value.replace(/\+/g,  " "));
});


$("#btn_turkceHarfliYap").click(function(){
	DeasciifyHandler.deasciify(_('girilenMetin'),true);
});


var sec = ['193','225','192','224','194','226','461','462','258','259','195','227','7842','7843','7840','7841','196','228','197','229','256','257','260','261','7844','7845','7846','7847','7850','7851','7848','7849','7852','7853','7854','7855','7856','7857','7860','7861','7858','7859','7862','7863','506','507','262','263','264','265','268','269','266','267','199','231','270','271','272','273','201','233','200','232','202','234','282','283','276','277','7868','7869','7866','7867','278','279','203','235','274','275','280','281','7870','7871','7872','7873','7876','7877','7874','7875','7864','7865','7878','7879','286','287','284','285','288','289','290','291','292','293','294','295','205','237','204','236','300','301','206','238','463','464','207','239','296','297','302','303','298','299','7880','7881','7882','7883','308','309','310','311','313','314','317','318','315','316','321','322','319','320','323','324','327','328','209','241','325','326','211','243','210','242','334','335','212','244','7888','7889','7890','7891','7894','7895','7892','7893','465','466','214','246','336','337','213','245','216','248','510','511','332','333','7886','7887','416','417','7898','7899','7900','7901','7904','7905','7902','7903','7906','7907','7884','7885','7896','7897','7764','7765','7766','7767','340','341','344','345','342','343','346','347','348','349','352','353','350','351','356','357','354','355','358','359','218','250','217','249','364','365','219','251','467','468','366','367','220','252','471','472','475','476','473','474','469','470','368','369','360','361','370','371','362','363','7910','7911','431','432','7912','7913','7914','7915','7918','7919','7916','7917','7920','7921','7908','7909','7810','7811','7808','7809','372','373','7812','7813','221','253','7922','7923','374','375','376','255','7928','7929','7926','7927','7924','7925','377','378','381','382','379','380','208','305','304'];
var rep = ['A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','A','a','C','c','C','c','C','c','C','c','C','c','D','d','D','d','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','E','e','G','g','G','g','G','g','G','g','H','h','H','h','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','I','i','J','j','K','k','L','l','L','l','L','l','L','l','L','l','N','n','N','n','N','n','N','n','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','O','o','P','p','P','p','R','r','R','r','R','r','S','s','S','s','S','s','S','s','T','t','T','t','T','t','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','U','u','W','w','W','w','W','w','W','w','Y','y','Y','y','Y','y','Y','y','Y','y','Y','y','Y','y','Z','z','Z','z','Z','z','D','i','I'];

$("#btn_ingilizHarfliYap").click(function(){
	var seclen = sec.length;
	var repwith = -1;
	var text = _('girilenMetin').value.replace(/\r/g,'').split('\n');
	var textout = new Array();
	var linecnt = text.length;
	var toremout = '';
	var chcoat = '';
	for(var x=0;x<linecnt;x++){
	torem = text[x].split('');
	toremout = new Array();
	toremlen = torem.length;
	for(var y=0;y<toremlen;y++){
	    chcoat = torem[y].charCodeAt(0);
    	if(chcoat > 124) {for(var z=0;z<seclen;z++){if(chcoat == sec[z]) {repwith = rep[z]; z = seclen;}}}
	    if(repwith != -1) {toremout[y] = repwith; repwith = -1;} else toremout[y] = torem[y];
    }
	textout[x] = toremout.join('');}
	textout = textout.join('\n');
	_('girilenMetin').value = textout;

});



//bitti