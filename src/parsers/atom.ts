import { Entry, Feed } from "../parsers";
import { getDomain } from "../utils";

export default (src: string, feed: Feed): undefined | Entry[] => {
  if (!src.match(/xmlns="http:\/\/www\.w3\.org\/2005\/Atom"/)) return;

  const parser = new DOMParser();
  const xml = parser.parseFromString(src, "application/xml");

  const entries: Entry[] = [];
  for (const el of xml.querySelectorAll("entry")) {
    const entry: Entry = {
      author: el.querySelector("author name")!.textContent!,
      date: new Date(el.querySelector("updated")!.textContent!),
      feed: feed.id,
      icon: `http://www.google.com/s2/favicons?domain=${getDomain(feed.url)}`,
      id: el.querySelector("id")!.textContent!,
      link: el.querySelector("link")!.getAttribute("href")!,
      title: el.querySelector("title")!.textContent!
    };
    const results = /<media:thumbnail.+url="(.+)".+width="(.+?)".+height="(.+?)".*\/>/.exec(
      el.innerHTML
    );
    if (results) {
      entry.thumbnail = results[1];
      entry.thumbnailWidth = parseInt(results[2], 10);
      entry.thumbnailHeight = parseInt(results[3], 10);
    }
    entries.push(entry);
  }

  return entries;
};
