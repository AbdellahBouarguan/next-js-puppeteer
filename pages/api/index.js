const puppeteer = require("puppeteer");
const cheerio = require("cheerio");
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    console.log(data);
    let scr = {};
    const scraped = async (usr, pass) => {
      const browser = await puppeteer.launch({ headless: true });
      const page = await browser.newPage();
      await page.goto(
        "https://massarservice.men.gov.ma/moutamadris/TuteurEleves/GetNotesEleve"
      );

      await page.type("#UserName", usr);
      await page.type("#Password", pass);
      await page.click("#btnSubmit");
      await page.waitForSelector("h1.welcomeUser");
      const title = await page.$eval("h1.welcomeUser", (node) =>
        node.innerText.trim()
      );

      await page.select("select#SelectedSession.form-control", "1");
      await page.click("#btnSearchNotes");
      await page.waitForNetworkIdle();
      //const marks = await page.$eval("#tab_cc", (el) => el.innerText.trim());
      const marks = await page.evaluate(() => {
        const slctDt = document.querySelector("#tab_cc");
        return slctDt.innerHTML;
      });
      scr = { text: title, info: marks };
      console.log(marks);
      browser.close();
    };
    await scraped(data.usr, data.pass);
    await res.status(200).json(scr);
  }
}

export default handler;
