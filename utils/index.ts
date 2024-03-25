import { DEX_IO_URL } from '../config/config';
import { Builder } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome';

const options = new chrome.Options();
options.addArguments("--headless");
options.addArguments("--disable-gpu");
options.addArguments("--window-size=1920x1080");
options.addArguments("--disable-dev-shm-usage");
options.addArguments("--no-sandbox");
options.addArguments(`--remote-debugging-port=9999`);
options.addArguments("--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537");
options.addArguments("--disable-blink-features");
options.addArguments("--disable-blink-features=AutomationControlled");

const driver = new Builder().forBrowser("chrome").setChromeOptions(options).build();

export const isValidSolanaAddress = async (address: string) => {
  // Regular expression to match a Solana address
  const solanaAddressRegex = /^[1-9A-HJ-NP-Za-km-z]{44}$/;

  return solanaAddressRegex.test(address);
}

export const getTopTradersList = async (address: string) => {
  const io = `${DEX_IO_URL}/${address}?q=${address}`
  await driver.get(io);
  const pageSource = (await driver.getPageSource()).toString();
  const regexPattern = /X[1-9A-HJ-NP-Za-km-z]{44}/g;
  let match;
  const matches: string[] = [];
  while ((match = regexPattern.exec(pageSource)) !== null) {
    matches.push(match[0].slice(1, 45));
  }
  return matches
}