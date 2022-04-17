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
        let lst = [];
        let lsth = [];
        let lstb = [];
        for (let i = 1; i < 7; i++) {
          const el1 = document.querySelector(`#tab_cc th:nth-child(${i})`);
          lsth.push(el1.innerText.trim());
        }

        for (let i = 1; i < 12; i++) {
          let lstbc = [];
          for (let j = 1; j < 7; j++) {
            const el1 = document.querySelector(
              `#tab_cc tr:nth-child(${i}) td:nth-child(${j})`
            );
            lstbc.push(el1.innerText.trim());
          }
          lstb.push(lstbc);
        }
        lst.push(lsth);
        lst.push(lstb);
        return lst;
      });
      scr = { text: title, tHead: marks[0], tBody: marks[1] };
      console.log(marks);
      browser.close();
    };
    await scraped(data.usr, data.pass);
    await res.status(200).json(scr);
  }
}

export default handler;
