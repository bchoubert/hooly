import puppeteer from 'puppeteer';

/**
 * Singleton instance: we only need one browser, we open each time a new page on it
 */
class BrowserInstantiator {
  // Browser instance
  private static browser: puppeteer.Browser | undefined;

  static getBrowser = async (): Promise<puppeteer.Browser> => {
    // If intance is already populated, return it
    if (BrowserInstantiator.browser) {
      return BrowserInstantiator.browser;
    }
    // Otherwise try to instantiate a new browser and store the new instance
    // to not declare it each time
    try {
      BrowserInstantiator.browser = await puppeteer.launch({
        // Headless true: we don't need to open physically
        headless: true,
        args: ["--disable-setuid-sandbox"],
        // Ignore the HTTP errors return by the browser
        ignoreHTTPSErrors: true,
      });
    } catch (err) {
      throw new Error(`Could not create a browser instance => : ${err}`);
    }
    // Return the new instance
    return BrowserInstantiator.browser;
  };
}

export interface ScrapRequest {
  url: string;
  options?: {
    captureScreenshot?: boolean;
  };
}

export interface ScrapResponse {
  content: string;
  screenshot?: string;
}

/**
 * Utils class to scrap website page
 */
class ScraperUtils {
  // Utils function to add an artificial delay after a page is asked to be loaded
  delay = async (time: number) => new Promise(resolve => setTimeout(resolve, time));

  // Scrap a URL
  scrap = async (req: ScrapRequest): Promise<ScrapResponse> => {
    const response = { content: '', screenshot: undefined };

    // Get the browser instance
    const browser = await BrowserInstantiator.getBrowser();

    // Open a new page (permits to scrap multiple URLs at the same time)
    const page = await browser.newPage();
    // Then load the URL, wait till we don't have anymore request
    await page.goto(req.url, { waitUntil: 'networkidle0' });

    // Get the page content
    response.content = await page.content();

    if (req.options?.captureScreenshot) {
      const imgB64 = await page.screenshot({
        encoding: 'base64',
        type: 'png',
      });
      response.screenshot = imgB64;
    }

    // Close the page, we don't need it anymore, then return the page content
    await page.close();
    return response;
  }

  // Populate a page with HTML to get the needed information
  populate = async (content: string) => {
    // Get a browser instance
    const browser = await BrowserInstantiator.getBrowser();

    // Open a new page (to not interrupt current operation on current page)
    const page = await browser.newPage();
    // Load the HTML into it
    page.setContent(content);

    const urls = await page.$$eval('a', links => {
      console.log(links.length);
      return links.map(link => link.textContent);
    });

    // await page.close();
  }
}

export default ScraperUtils;
