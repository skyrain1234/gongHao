export const BOOT_HASH = window.location.hash || '';
export const HAS_BOOT_HASH = !!BOOT_HASH;

// 匯入本檔時就把 hash 拿掉，避免瀏覽器原生先跳
if (HAS_BOOT_HASH) {
  history.replaceState(null, '', window.location.pathname + window.location.search);
}
