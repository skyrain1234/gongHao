// src/utils/parseTaiwanAddress.js

/**
 * 將「台/臺」正規化（預設把「台」→「臺」）
 * @param {string} str
 * @param {'臺'|'台'|null} prefer
 * @returns {string}
 */
export function normalizeTaiVariants(str, prefer = '臺') {
  if (!str) return str;
  if (prefer === '臺') return str.replace(/台/g, '臺');
  if (prefer === '台') return str.replace(/臺/g, '台');
  return str; // 不處理
}

/**
 * 嘗試從字串開頭或結尾擷取郵遞區號（3 或 5 碼）
 * - 支援：「408台中市…」「408  台中市…」「40877 台中市…」
 * - 支援結尾純數字：「…街 408」或「…街 40877」
 * @param {string} s
 * @returns {{postalCode?: string, rest: string}}
 */
function extractPostalCode(s) {
  if (!s) return { rest: '' };
  let str = s.trim().replace(/[()\uFF08\uFF09]/g, ''); // 去除中/全形括號
  // 開頭
  let m = str.match(/^\s*(\d{3}(?:\d{2})?)[\s,，-]*(.+)$/);
  if (m) return { postalCode: m[1], rest: m[2].trim() };
  // 結尾（避免誤抓門牌，僅接受純 3 或 5 碼的尾字）
  m = str.match(/^(.+?)\s+(\d{3}(?:\d{2})?)\s*$/);
  if (m) return { postalCode: m[2], rest: m[1].trim() };
  return { rest: str };
}

/**
 * 拆解台灣地址字串為 region/locality/street
 * @param {string} full 原始地址
 * @param {{ preferTai?: '臺'|'台'|null }} [options]
 * @returns {{
 *  raw: string,
 *  postalCode?: string,
 *  addressRegion?: string,
 *  addressLocality?: string,
 *  streetAddress?: string,
 *  normalized: { addressRegion?: string, addressLocality?: string },
 * }}
 */
export function parseTaiwanAddress(full, options = {}) {
  const preferTai = options.preferTai ?? '臺';
  if (!full || typeof full !== 'string') {
    return { raw: full ?? '', normalized: {} };
  }

  // 前處理：擷取郵遞區號、統一空白
  const { postalCode, rest } = extractPostalCode(full);
  const text = rest.replace(/\s+/g, '').trim(); // 台灣地址通常不靠空白分段，先去空白

  // 主規則：region 以「縣/市」結尾，locality 以「區/鎮/鄉/市」結尾，其餘為 street
  let region, locality, street;
  let m =
    text.match(/^(?<region>.+?[縣市])(?<locality>.+?(?:區|鎮|鄉|市))(?<street>.*)$/);

  if (m && m.groups) {
    region = m.groups.region;
    locality = m.groups.locality;
    street = m.groups.street;
  } else {
    // 後備：只有縣/市 + 其餘
    m = text.match(/^(?<region>.+?[縣市])(?<street>.+)$/);
    if (m && m.groups) {
      region = m.groups.region;
      street = m.groups.street;
    } else {
      // 仍無法匹配：全部當作 street
      street = text;
    }
  }

  // 正規化台/臺（僅針對區域兩段）
  const normRegion = region ? normalizeTaiVariants(region, preferTai) : undefined;
  const normLocality = locality ? normalizeTaiVariants(locality, preferTai) : undefined;

  return {
    raw: full,
    postalCode,
    addressRegion: region,
    addressLocality: locality,
    streetAddress: street,
    normalized: {
      addressRegion: normRegion,
      addressLocality: normLocality,
    },
  };
}

/**
 * 轉成 JSON-LD 的 PostalAddress 物件
 * @param {ReturnType<typeof parseTaiwanAddress>} parsed
 * @param {{ countryCode?: string }} [opts]
 */
export function toPostalAddress(parsed, opts = {}) {
  const countryCode = opts.countryCode ?? 'TW';
  const obj = {
    '@type': 'PostalAddress',
    addressCountry: countryCode,
  };
  if (parsed.streetAddress) obj.streetAddress = parsed.streetAddress;
  if (parsed.addressLocality) obj.addressLocality = parsed.addressLocality;
  if (parsed.addressRegion) obj.addressRegion = parsed.addressRegion;
  if (parsed.postalCode) obj.postalCode = parsed.postalCode;
  return obj;
}

export default parseTaiwanAddress;
