import cli from "cli";
import { Presets, SingleBar } from "cli-progress";
import fs from "fs/promises";
import { formatUnits, JsonRpcProvider } from "ethers";
import {
  adjectives,
  animals,
  Config,
  names,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { MAX_GAS_GWEI, RPC_URL, TX_SCAN } from "./constants";

const provider = new JsonRpcProvider(RPC_URL);

export const delay = (seconds: number) =>
  new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));

export const delayProgress = (seconds: number) => {
  return new Promise<void>((resolve) => {
    const bar = new SingleBar({
      format: "Delay [{bar}] {value}/{total}",
    }, Presets.shades_classic);

    bar.start(seconds, 0);
    let counter = 0;

    const timer = setInterval(() => {
      counter = counter + 1;
      bar.update(counter);
      if (counter === seconds) {
        clearInterval(timer);
        bar.stop();
        resolve();
      }
    }, 1000);
  });
};

export async function loadFromFile(fileName: string) {
  const file = await fs.readFile(fileName, { encoding: "utf8" });

  return file.split("\n").filter(Boolean).map((item) => item.trim());
}

export function getTxLink(txHash: string) {
  const url = TX_SCAN;
  return `${url}${txHash}`;
}

async function getBaseGas() {
  const { gasPrice } = await provider.getFeeData();
  return formatUnits(gasPrice, "gwei");
}

export async function waitGas() {
  while (true) {
    const gas = parseInt(await getBaseGas());

    cli.spinner(`L1 gas : ${gas}`, true);

    if (gas > MAX_GAS_GWEI) {
      cli.spinner(
        `Gas price is higher than ${MAX_GAS_GWEI} GWEI, waiting 1 minute`,
      );
      await delay(60);
    } else {
      break;
    }
  }
}

export function generateWord() {
  const config: Config = {
    dictionaries: [adjectives, animals, names],
    length: 1,
    style: "lowerCase",
  };

  return uniqueNamesGenerator(config);
}
