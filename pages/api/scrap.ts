import { NextApiRequest, NextApiResponse } from 'next';
import PageService from '../../services/page.service';
import PageInstanceService from '../../services/pageInstance.service';
import WebsiteService from '../../services/website.service';
import ScraperUtils, { ScrapRequest } from '../../utils/scraper';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(400).send({ message: 'Only POST requests allowed' })
    return
  }
  const body = JSON.parse(req.body);
  if (body.url) {
    console.log(WebsiteService.extractDetailsFromUrl(body.url));

    const su = new ScraperUtils();
    // Don't wait here, launch it in background
    const sr = await su.scrap({
      url: body.url,
      options: {
        captureScreenshot: true,
      },
    } as ScrapRequest);

    // create website if not exist, then page if not exist
    const websiteToUpsert = WebsiteService.extractDetailsFromUrl(body.url);
    await WebsiteService.upsert(websiteToUpsert);
    await PageService.upsert({ websiteDomain: websiteToUpsert.domain, url: body.url });

    // Insert the instance
    await PageInstanceService.create({
      screenshot: sr.screenshot,
      content: sr.content,
      pageUrl: body.url,
    });
  }
  res.status(200).json({ name: 'John Doe' });
}
