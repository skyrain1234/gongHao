let _resolve;
let _ready = false;

const _readyPromise = new Promise(res => (_resolve = res));

export function markGsapReady() {
  if (!_ready) {
    _ready = true;
    _resolve && _resolve();
  }
  console.log(_ready);
  
}

export function waitForGsapReady() {
  return _ready ? Promise.resolve() : _readyPromise;
}
