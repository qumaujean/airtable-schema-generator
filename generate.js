const path = require("path");
const { writeJson } = require("fs-extra");
const puppeteer = require("puppeteer");
const _ = require("lodash");

function script() {
  return _.mapValues(application.tablesById, (table) =>
    _.set(
      _.omit(table, ["sampleRows"]),
      "columns",
      _.map(table.columns, (item) =>
        _.set(item, "foreignTable", _.get(item, "foreignTable.id"))
      )
    )
  );
}

function getUrl(appId) {
  return `https://airtable.com/login?continue=/${appId}/api/docs`;
}

function getPath(appId) {
  return path.resolve(__dirname, `${appId}-dump.json`); // Dumps path configuration
}

async function generateSchema({ appId, email, password }) {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  console.log("Browser opened.");
  await page.goto(getUrl(appId));
  await page.waitForSelector("#sign-in-form-fields-root > div > label > div");
  console.log("Page loaded.");
  await page.type(
    '#sign-in-form-fields-root > div > label > input[name="email"]',
    email
  );
  await page.type(
    '#sign-in-form-fields-root > div > label > input[name="password"]',
    password
  );

  try {
    await page.click(
      '#sign-in-form-fields-root > div > label > button[type="submit"]'
    );
  } catch (err) {
    await page.click(
      '#sign-in-form-fields-root > div > label > input[type="submit"]'
    );
  }

  await page.waitForSelector(".docs > .languageTabs > .tab");
  console.log("Signed in !");

  // Add lodash module to the page
  const path = `${__dirname}/node_modules/lodash`;
  await page.addScriptTag({ path: require.resolve(path) });

  // Run parsing
  const result = await page.evaluate(script);

  // Write output
  writeJson(getPath(appId), result);
  console.log("Schema generated !");

  await browser.close();
}

const appId = "app3ER7DpQLAKuVP6"; // Change this by your app id: https://airtable.com/api => https://airtable.com/{YOUR_APP_ID}/api/docs
const email = "example@example.fr"; // Change this
const password = "v3r1str0ngP4swD"; // Change this

generateSchema({ appId, email, password });
