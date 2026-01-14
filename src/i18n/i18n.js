import { createI18n } from "vue-i18n";

// zh-TW
import zhTW_common from "./locales/zh-TW/common.json";
import zhTW_nav from "./locales/zh-TW/nav.json";
import zhTW_contact from "./locales/zh-TW/contact.json";
import zhTW_about from "./locales/zh-TW/about.json";
import zhTW_index from "./locales/zh-TW/index.json";
import zhTW_footer from "./locales/zh-TW/footer.json";
import zhTW_product from "./locales/zh-TW/product.json";
import zhTW_qa from "./locales/zh-TW/qa.json";
import zhTW_project from "./locales/zh-TW/project.json";
import zhTW_hardware from "./locales/zh-TW/hardware.json";
import zhTW_webDesign from "./locales/zh-TW/webDesign.json";

// en
import en_common from "./locales/en/common.json";
import en_nav from "./locales/en/nav.json";
import en_contact from "./locales/en/contact.json";
import en_about from "./locales/en/about.json";
import en_index from "./locales/en/index.json";
import en_footer from "./locales/en/footer.json";
import en_product from "./locales/en/product.json";
import en_qa from "./locales/en/qa.json";
import en_project from "./locales/en/project.json";
import en_hardware from "./locales/en/hardware.json";
import en_webDesign from "./locales/en/webDesign.json";

const messages = {
	'zh-TW': {
		common: zhTW_common,
		nav: zhTW_nav,
		contact: zhTW_contact,
		about: zhTW_about,
		index: zhTW_index,
		footer:zhTW_footer,
		product:zhTW_product,
		qa:zhTW_qa,
		project:zhTW_project,
		hardware:zhTW_hardware,
		webDesign:zhTW_webDesign,
	},
	'en': {
		common: en_common,
		nav: en_nav,
		contact: en_contact,
		about: en_about,
		index: en_index,
		footer:en_footer,
		product:en_product,
		qa:en_qa,
		project:en_project,
		hardware:en_hardware,
		webDesign:en_webDesign,
	},
};

//設定現有語系
export const SUPPORTED_LOCALES = ["zh-TW", "en"];
export const DEFAULT_LOCALE = "zh-TW";

export const i18n = createI18n({
	legacy: false, // you must set `false`, to use Composition API
	locale: localStorage.getItem("locale") || DEFAULT_LOCALE, //預設語系
	fallbackLocale: "en", //備用語系
	messages,
});

// 正規化
export const LOCALE_REGEX = SUPPORTED_LOCALES.map((l) =>
	l.replace("-", "\\-")
).join("|");
