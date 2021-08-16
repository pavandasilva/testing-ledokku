import cheerio from 'cheerio'
import puppeteer  from 'puppeteer'
import { Asset } from '../models'


export async function getAssetPrice(initials: string): Promise<Asset> {
  let result: Asset = {
    initials,
    price: 'N/A',
    company: 'N/A'
  }

  const url = `https://www.google.com/finance/quote/${initials}:BVMF`
  const browser = await puppeteer.launch({
    headless: true
  });

  const page = await browser.newPage();
  page.setDefaultNavigationTimeout(0)

  await page.setJavaScriptEnabled(false);

  page.on('request', (req) => {
    if(req.resourceType() !=='document'){
      req.abort();
    }
    else {
      req.continue();
    }
  });

  await page.setRequestInterception(true);
  await page.goto(url, { waitUntil: "networkidle0" });
  const mainSelector = 'div.T4LgNb > div.e1AOyf > div > div > main'
  await page.waitForSelector(mainSelector)
  const content = await page.content()
  
  browser.close()
  
  const $ = cheerio.load(content)
  const company = $(`${mainSelector} h1`).text()
  const price = $(`${mainSelector} div.YMlKec.fxKbKc`).text()
  const priceFormatted = price.replace('R$', '').trim()

  if(price) {
    result.price = priceFormatted
  }

  if(company) {
    result.company = company
  }
  
  return result
}