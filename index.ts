import cli from "cli";
import { Wallet } from "ethers";
import random from "lodash/random";
import {
  DELAY_FROM_SEC,
  DELAY_TO_SEC,
  KEYS_FILENAME,
  WORDS_FILENAME,
} from "./constants";
import { delayProgress, generateWord, loadFromFile, waitGas } from "./utils";
import { mint } from "./mint";

const keys = await loadFromFile(KEYS_FILENAME);
const words = await loadFromFile(WORDS_FILENAME);
const randomWords = keys.length !== words.length;

for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const count = i + 1;
  const { length } = keys;
  const last = i === keys.length - 1;
  const { address } = new Wallet(key);

  console.log(`${count}/${length} address: ${address}`);

  const word = randomWords ? generateWord() : words[i];

  try {
    await waitGas();
    await mint(key, word);
  } catch (e) {
    cli.spinner("", true);
    console.log("Error", e);
  }

  if (!last) {
    const delayTimeout = random(DELAY_FROM_SEC, DELAY_TO_SEC);
    await delayProgress(delayTimeout);
  }
}
