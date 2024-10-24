require "net/http"
require "uri"
require "nori"

module WordpressPosts
  class Generator < Jekyll::Generator
    def generate(site)

      @post_page_config = site.config['wp_posts_page']
      raise 'Missing Wordpress configuration in _config.yml' unless @post_page_config

      page_layout = @post_page_config['layout']
      page_title = @post_page_config['title']
      page_slug = page_title.strip
        .downcase
        .gsub(/[\s\.\/\\]/, '-')
        .gsub(/[^\w-]/, '')
        .gsub(/[-_]{2,}/, '-')
        .gsub(/^[-_]/, '')
        .gsub(/[-_]$/, '')

      feed_url = @post_page_config['feed_url']
      post_feed = WordpressFeed.new(feed_url)

      # get template
      posts_page = site.pages.find { |page| page.name == 'wp_posts_page.html' }

      posts_page.data['post_feed'] = post_feed.items
    end
  end
end

class WordpressFeed
  attr_accessor :rss_url

  def initialize(rss_url)
    self.rss_url = rss_url
  end

  def rss_channel
    @channel ||= begin
      rss = hash_data['rss'] || {}
      rss['channel']
    end
  end

  def items
    @item ||= begin
      [rss_channel['item']].flatten.collect do |item|
        ItemDrop.new(item)
      end
    end
  end

  private

  def hash_data
    @hash_data ||= begin
      if !xml_string.blank?
        return Nori.new.parse(xml_string)
      end
    end
  end

  def xml_string
    @xml_string ||= begin
      uri = URI(rss_url)
      Net::HTTP.get(uri)
    end
  end

  class ItemDrop < Liquid::Drop
    attr_accessor :feed_item
    def initialize(feed_item)
      self.feed_item = feed_item || {}
    end

    def content
      feed_item['content:encoded']
    end

    def title
      feed_item['title']
    end
  end
end
