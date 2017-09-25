# Dijix Pinning plugin

### Plugin to post IPFS hash to an endpoint whenever Dijix uploads to IPFS

This plugin lets you pass some data to a HTTP endpoint (such as for pinning)

```javascript
const dijix = new Dijix({
  plugins: [
    new DijixIpfsPinningPlugin({
      log: false, // enable to console log IPFS hashes as they are pinned
      endpoint: 'http://somewhere', // optional, defaults to http://localhost:3000
      getPostData: (ipfsHash, config) => {
        // optional, return a promise, resolving to serialized object containing data that is posted to the endpoint
      },
      dispatchPostData: ({ ipfsHash }, config) => {
        // optional custom logic, returning a promise, for posting the message (here you could call fetch)
      }
    }),
  ],
});
```
