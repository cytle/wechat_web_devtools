; (function (window) {
  const str = `
interface FrameRequestCallback {
    (time: number): void;
}
declare function cancelAnimationFrame(handle: number): void;
declare function requestAnimationFrame(callback: FrameRequestCallback): number;  
`; window.API = window.API || {};
  const API = window.API;
if (API.LibWaEs6) {
  API.LibWaEs6 += str;
} else {
  API.LibWaEs6 = str;
}
})(window);

