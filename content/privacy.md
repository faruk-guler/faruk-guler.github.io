---
title: "Privacy"
---
This website uses [Umami](https://umami.is/) to provide me with information about visits to each web page.

Umami does not use cookies to track your activity but uses a script located [here](/mercurio.js).

Collected information when you visit a page is described in detail [here](https://umami.is/docs/metric-definitions).

From the link above, information from the user end includes:

- **Browser name** extracted from the [`User-Agent`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent);  
- **OS name** extracted from the [`User-Agent`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent);  
- **Screen resolution** extracted from [`window.screen`](https://developer.mozilla.org/en-US/docs/Web/API/Screen);  
- **Language** extracted from [`navigator.language`](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/language);  
- **Device form factor** obtained by combining **OS** and **Screen resolution**;  
- **Location** extracted from headers if the IP is masked by [Cloudflare](https://developers.cloudflare.com/fundamentals/reference/http-request-headers/#docs-content) or [Vercel](https://vercel.com/guides/geo-ip-headers-geolocation-vercel-functions). Otherwise, it looks into the [MaxMind Geolite Database](https://dev.maxmind.com/geoip/geolocate-an-ip). **The IP address is never saved—only the extracted location is**.  

I self-host Umami on a server in Milan, and I am the only one with access to the above data.  

### How to Avoid Tracking of Browser and OS Information  

Websites often use the **User-Agent** to obtain this kind of information.  

You can use a common **User-Agent** instead of yours.  

A handy open-source extension to change it is [User-Agent Switcher](https://github.com/ray-lothian/UserAgent-Switcher).  

### How to Completely Block Tracking  

You can disable JavaScript entirely to prevent the script from loading, which will stop this website from recording your visit.  

Disabling JavaScript may break some website functionality, but my static blog should work fine without it.  

Keep in mind that other websites might still track your information through direct HTTP(s) requests, even with JavaScript disabled.  

To expose less information possible to websites:  
- Use a **spoofed User-Agent**; 
- Use a **VPN** or **Tor** to mask and change often your IP (Tor also provides anonimity);  
- **Disable JavaScript** and selectively enable it, using an extension like [uBlock Origin in medium mode](https://github.com/gorhill/ublock/wiki/Blocking-mode:-medium-mode) (disable all third party scripts by default), or if you are brave [in hard mode](https://github.com/gorhill/ublock/wiki/Blocking-mode:-hard-mode) (disable all scripts by default);
- **Clear cookies** between visits to avoid recognition on different browsing sessions.
