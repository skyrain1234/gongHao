import { STORAGE_BASE_URL } from "../api";

const isExternalOrSpecial = (url) => {
  if (!url) return true;
  // 絕對網址 or 協議相對
  if (/^(https?:)?\/\//i.test(url)) return true;
  // 特殊 scheme / anchor
  if (/^(data:|blob:|mailto:|tel:|javascript:)/i.test(url)) return true;
  if (url.startsWith("#")) return true;
  return false;
};

export const getStorageFileUrl = (path) => {
  if (!path) return "";
  // ✅ 外部網址不要補
  if (isExternalOrSpecial(path)) return path;
  return `${STORAGE_BASE_URL}${path}`;
};

export const absolutizeContentUrls = (html) => {
  if (!html) return "";

  // img: 只補相對路徑
  html = html.replace(/<img[^>]+src="([^"]+)"/gi, (match, path) => {
    if (isExternalOrSpecial(path)) return match;
    return match.replace(path, getStorageFileUrl(path));
  });

  // a: 只補相對路徑（外部連結不動，FB 才不會被改壞）
  html = html.replace(/<a[^>]+href="([^"]+)"/gi, (match, path) => {
    if (isExternalOrSpecial(path)) return match;
    return match.replace(path, getStorageFileUrl(path));
  });

  return html;
};
