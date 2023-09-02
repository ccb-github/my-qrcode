import i18n from "i18next";
import { initReactI18next } from "react-i18next";
//This patch from https://github.com/i18next/react-i18next/issues/1587
declare module 'i18next' {
  interface CustomTypeOptions {
    returnNull: false;
  }
}
let loadLanguageState = false;
// // const isHermes = () => !global.HermesInternal;
// //IIFE to load the library
// (async function loadTranslateAsync() {
const resources = {
		en: { translation: require("../../assets/translation/en") },
		ch: { translation: require("../../assets/translation/ch") },
}

  
  i18n.use(initReactI18next).init({
    resources: resources,
    //language to use if translations in user language are not available
    fallbackLng: "ch",
    returnNull: false,
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false, // not needed for react!!
    },
    fallbackNS: "common"
  }, () => {});
// } catch (e) {
//   // We might want to provide this error information to an error reporting service
//   console.error(e);
// } finally {
//   loadLanguageState = true;
// }

export default i18n;
