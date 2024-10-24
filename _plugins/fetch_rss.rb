require 'open-uri'
require 'nokogiri'

module Jekyll
  class FetchRSS < Generator
    safe true

    def generate(site)
      url = "https://www.tecmint.com/feed/" # RSS beslemesi URL'sini buraya değiştir
      feed = Nokogiri::XML(open(url))

      site.data['rss_feed'] = feed.xpath('//item').map do |item|
        {
          title: item.at_xpath('title').content,
          link: item.at_xpath('link').content,
          description: item.at_xpath('description').content,
          pubDate: item.at_xpath('pubDate').content
        }
      end
    end
  end
end
