/* global fetch */
/* eslint-disable no-console */

import 'isomorphic-fetch';

const defaultConfig = {
  endpoint: 'http://localhost:3000',
  log: false,
  getPostData: ipfsHash => ({ ipfsHash }),
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
  }
  async ipfsHashAdded(payload) {
    const postData = await this.config.getPostData(payload, this.config);
    if (this.log) {
      console.log('pinning', payload);
    }
    return this.config.dispatchPostData(postData, this.config);
  }
}
