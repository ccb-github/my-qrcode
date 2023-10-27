import i18n from "i18next"
import { initReactI18next } from "react-i18next"
// This patch from https://github.com/i18next/react-i18next/issues/1587
declare module "i18next" {
  /**
   * @description This interface need to be used because of the declare merge
   */
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface CustomTypeOptions {
    returnNull: false
  }
}

const resources = {
  en: { translation: require("../../assets/translation/en") },
  ch: { translation: require("../../assets/translation/ch") },
}

i18n
  .use(initReactI18next)
  .init(
    {
      resources,
      // language to use if translations in user language are not available
      fallbackLng: "ch",
      returnNull: false,
      compatibilityJSON: "v3",
      interpolation: {
        escapeValue: false, // not needed for react!!
      },
      fallbackNS: "common",
    },
    () => {},
  )
  .catch((error) => {
    console.error(error)
  })

export default i18n
