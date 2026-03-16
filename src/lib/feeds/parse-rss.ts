/**
 * Lightweight server-side RSS/Atom parser.
 * No external dependencies — uses regex extraction on raw XML.
 */

export interface ParsedFeedItem {
  title: string;
  link: string;
  description: string;
  pubDate: string;
  imageUrl: string | null;
}

/** Extract text between XML tags */
function extractTag(xml: string, tag: string): string {
  const re = new RegExp(`<${tag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${tag}>|<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i');
  const m = xml.match(re);
  return (m?.[1] ?? m?.[2] ?? '').trim();
}

/** Try to extract an image URL from content/description/enclosure/media */
function extractImage(itemXml: string): string | null {
  // <enclosure url="..."/>
  const enc = itemXml.match(/<enclosure[^>]+url=["']([^"']+)["']/i);
  if (enc) return enc[1];

  // <media:content url="..." />
  const media = itemXml.match(/<media:content[^>]+url=["']([^"']+)["']/i);
  if (media) return media[1];

  // <media:thumbnail url="..." />
  const thumb = itemXml.match(/<media:thumbnail[^>]+url=["']([^"']+)["']/i);
  if (thumb) return thumb[1];

  // <image><url>...</url></image> at item level
  const imgUrl = itemXml.match(/<image>[^<]*<url>([^<]+)<\/url>/i);
  if (imgUrl) return imgUrl[1];

  // <img src="..."> inside description/content
  const imgTag = itemXml.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgTag) return imgTag[1];

  return null;
}

/** Parse an RSS 2.0 or Atom feed into normalised items */
export function parseRssFeed(xml: string): ParsedFeedItem[] {
  const items: ParsedFeedItem[] = [];

  // RSS 2.0: split on <item>
  const rssItems = xml.split(/<item[\s>]/i).slice(1);
  if (rssItems.length > 0) {
    for (const raw of rssItems) {
      const chunk = raw.split(/<\/item>/i)[0] || raw;
      const title = extractTag(chunk, 'title');
      const link = extractTag(chunk, 'link') || extractTag(chunk, 'guid');
      const description = extractTag(chunk, 'description') || extractTag(chunk, 'content:encoded');
      const pubDate = extractTag(chunk, 'pubDate') || extractTag(chunk, 'dc:date');
      const imageUrl = extractImage(chunk);

      if (title && link) {
        items.push({
          title: stripHtml(title),
          link,
          description: stripHtml(description).slice(0, 300),
          pubDate,
          imageUrl,
        });
      }
    }
    return items;
  }

  // Atom: split on <entry>
  const atomEntries = xml.split(/<entry[\s>]/i).slice(1);
  for (const raw of atomEntries) {
    const chunk = raw.split(/<\/entry>/i)[0] || raw;
    const title = extractTag(chunk, 'title');
    const linkMatch = chunk.match(/<link[^>]+href=["']([^"']+)["']/i);
    const link = linkMatch?.[1] || '';
    const description = extractTag(chunk, 'summary') || extractTag(chunk, 'content');
    const pubDate = extractTag(chunk, 'published') || extractTag(chunk, 'updated');
    const imageUrl = extractImage(chunk);

    if (title && link) {
      items.push({
        title: stripHtml(title),
        link,
        description: stripHtml(description).slice(0, 300),
        pubDate,
        imageUrl,
      });
    }
  }

  return items;
}

/** Strip HTML tags from a string */
function stripHtml(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}
