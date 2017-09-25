/* globals fetch */

import 'isomorphic-fetch';
import assert from 'assert';
import fetchMock from 'fetch-mock';

import DijixIpfsPinningPlugin from '../src';

const fakeIpfsHash = 'fake ipfs hash';

fetchMock.mock('*', {});

class MockDijix {
  constructor({ plugins }) {
    this.plugins = plugins;
  }
  async create() {
    await this.plugins[0].ipfsHashAdded(fakeIpfsHash);
    return {};
  }
}

describe('dijixIpfsPinningPlugin', function () {
  const dijixIpfsPinningPlugin = new DijixIpfsPinningPlugin();
  describe('config', function () {
    it('initializes with no (default) config', function () {
      assert.equal(dijixIpfsPinningPlugin.config.endpoint, 'http://localhost:3000');
      assert.ok(typeof dijixIpfsPinningPlugin.config.getPostData === 'function');
      assert.ok(typeof dijixIpfsPinningPlugin.config.dispatchPostData === 'function');
      assert.ok(typeof dijixIpfsPinningPlugin.config.onUploaded === 'undefined');
    });
    it('initializes with config override', function () {
      const plugin = new DijixIpfsPinningPlugin({
        endpoint: 'test',
        getPostData: () => 'same same',
        dispatchPostData: () => 'but different',
      });
      assert.equal(plugin.config.endpoint, 'test');
      assert.equal(plugin.config.getPostData(), 'same same');
      assert.equal(plugin.config.dispatchPostData(), 'but different');
    });
  });
  describe('getPostData', function () {
    it('returns transformed post data', function () {
      assert.deepEqual(dijixIpfsPinningPlugin.config.getPostData('test'), { ipfsHash: 'test' });
    });
  });
  describe('dispatchPostData', function () {
    it('makes a post request by default', function () {
      dijixIpfsPinningPlugin.config.dispatchPostData({ test: 'yep' }, dijixIpfsPinningPlugin.config);
      assert.deepEqual(fetchMock.lastCall(), [
        'http://localhost:3000',
        {
          method: 'POST',
          body: JSON.stringify({ test: 'yep' }),
          headers: { 'Content-Type': 'application/json' },
        },
      ]);
    });
  });
  // mock integration test
  describe('dijix integration', function () {
    it('calls makes the post when called from dijix (defaults)', async function () {
      const mockDijix = new MockDijix({ plugins: [dijixIpfsPinningPlugin] });
      await mockDijix.create();
      assert.deepEqual(fetchMock.lastCall()[1].body, JSON.stringify({ ipfsHash: fakeIpfsHash }));
    });
    it('hooks in correctly (with dispatchPostData)', async function () {
      const plugin = new DijixIpfsPinningPlugin({
        getPostData: () => new Promise(resolve => setTimeout(() => resolve({ test: true }), 20)),
        dispatchPostData: body => fetch('testUrl', { body }),
      });
      const mockDijix = new MockDijix({ plugins: [plugin] });
      await mockDijix.create();
      assert.deepEqual(fetchMock.lastCall(), ['testUrl', { body: { test: true } }]);
    });
    it('hooks in correctly (without dispatchPostData)', async function () {
      const plugin = new DijixIpfsPinningPlugin({
        endpoint: 'testUrl2',
        getPostData: () => new Promise(resolve => setTimeout(() => resolve({ test: true }), 20)),
      });
      const mockDijix = new MockDijix({ plugins: [plugin] });
      await mockDijix.create();
      assert.deepEqual(fetchMock.lastCall(), [
        'testUrl2',
        {
          method: 'POST',
          body: JSON.stringify({ test: true }),
          headers: { 'Content-Type': 'application/json' },
        },
      ]);
    });
  });
});
