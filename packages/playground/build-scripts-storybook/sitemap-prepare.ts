import * as fs from 'fs';
import * as xmlbuilder from 'xmlbuilder';

console.log('Generating sitemap.xml for playground...');
const data = require('../dist/playground/stories.json');

let xml = xmlbuilder.create('urlset', { version: '1.0', encoding: 'UTF-8' });
xml.att('xmlns', 'http://www.sitemaps.org/schemas/sitemap/0.9');

for (let key in data.stories) {
    const kind = data.stories[key]?.kind?.split('/')[0]?.toLowerCase();
    xml.ele('url')
        .ele('loc', {}, `https://ui5.github.io/webcomponents/playground/?path=/${kind}/${key}`)
        .up()
        .ele('changefreq', {}, 'monthly');
}

let xmlString = xml.end({ pretty: true });
fs.writeFileSync('./dist/playground/sitemap.xml', xmlString);
console.log('sitemap.xml generated successfully!');