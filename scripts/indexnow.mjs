// Tell Bing, Yandex and other IndexNow engines that the site's pages changed.
// ChatGPT search, Copilot and DuckDuckGo use Bing's index, so this speeds up AI search too.
//
// Usage, after a deploy:   npm run indexnow -- https://your-domain.in
// It reads that site's /sitemap.xml and submits every URL in it.

const KEY = "5d43cd516a22bc252e0d99fa8b82fe4d"; // also served at /5d43cd516a22bc252e0d99fa8b82fe4d.txt (public/5d43cd516a22bc252e0d99fa8b82fe4d.txt)

const site = (process.argv[2] || process.env.SITE_URL || "").replace(/\/$/, "");
if (!/^https:\/\//.test(site)) {
  console.error("Give the live site address, e.g. npm run indexnow -- https://naveenbikerentals.in");
  process.exit(1);
}

const xml = await (await fetch(`${site}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(site));
if (!urlList.length) {
  console.error(`No URLs for ${site} in its sitemap. Is NEXT_PUBLIC_SITE_URL (or the Netlify domain) set to this address?`);
  process.exit(1);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(site).host, key: KEY, keyLocation: `${site}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
