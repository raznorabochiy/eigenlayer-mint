import cli from "cli";
import { Contract, JsonRpcProvider, Wallet } from "ethers";
import { ABI, CONTRACT_ADDRESS, RPC_URL } from "./constants";
import { getTxLink } from "./utils";

export async function mint(key: string, word: string) {
  const provider = new JsonRpcProvider(RPC_URL);
  const wallet = new Wallet(key, provider);

  const contract = new Contract(CONTRACT_ADDRESS, ABI, wallet);

  const txArgs = [word];

  const gasLimit = await contract.mint.estimateGas(...txArgs);

  const unsignedTx = await contract.mint.populateTransaction(...txArgs);

  const { maxFeePerGas, maxPriorityFeePerGas } = await provider.getFeeData();

  cli.spinner("Send transaction");
  const tx = await wallet.sendTransaction({
    ...unsignedTx,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
  });

  await provider.waitForTransaction(tx.hash);

  cli.spinner(getTxLink(tx.hash), true);
}
