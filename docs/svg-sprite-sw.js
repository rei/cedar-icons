console.log('HELLO WORLD');

self.onmessage = event => {
  console.log('HERE', event);
  // try {
  //   self.postMessage({
  //     id: event.data.id,
  //     result: actions[event.data.action](event.data)
  //   });
  // }
  // catch (e) {
  //   self.postMessage({
  //     id: event.data.id,
  //     error: e.message
  //   });
  // }
};
