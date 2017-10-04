/* global fetch */
/* eslint-disable no-console */

import 'isomorphic-fetch';
import fs from 'fs';
import util from 'ethereumjs-util';
import Wallet from 'ethereumjs-wallet';

const defaultConfig = {
  endpoint: 'http://localhost:3000',
  log: false,
  getPostData(ipfsHash, { signMessage, privateKey, signer } = {}) {
    if (!signMessage) { return { ipfsHash }; }
    const timestamp = new Date().getTime();
    const message = util.hashPersonalMessage(util.sha3(`${ipfsHash}${timestamp}`));
    const { r, s, v } = util.ecsign(message, privateKey);
    const signature = util.toRpcSig(v, r, s);
    return { ipfsHash, signature, timestamp, signer };
  },
  async dispatchPostData(data, config) {
    return fetch(config.endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
  },
};

export default class DijixIpfsPinningPlugin {
  constructor(config) {
    this.config = { ...defaultConfig, ...config };
    if (this.config.signMessage && typeof this.config.signMessage === 'object') {
      const { keystore, password } = this.config.signMessage;
      const data = JSON.parse(fs.readFileSync(keystore).toString());
      const wallet = Wallet.fromV3(data, password);
      this.config.privateKey = wallet.getPrivateKey();
      this.config.signer = wallet.getAddressString();
    }
  }
  async ipfsHashAdded(ipfsHash) {
    const postData = await this.config.getPostData(ipfsHash, this.config);
    if (this.log) {
      console.log('pinning', ipfsHash);
    }
    return this.config.dispatchPostData(postData, this.config);
  }
}
