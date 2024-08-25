const IS_DEV = process.env.APP_VARIANT === "development"
export default {
  name: IS_DEV ? "DevMyqrcode" : "Myqrcode",
  slug: "start-with-managed",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  splash: {
    image: "./assets/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  assetBundlePatterns: ["**/*"],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    package: "com.bioexpo.startwithmanaged",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    eas: {
      projectId: "e843ee88-0ffa-40b6-a7bb-fe4697837606",
    },
  },
  sdkVersion: "50.0.0",
  runtimeVersion: {
    policy: "sdkVersion",
  },
  updates: {
    url: "https://u.expo.dev/e843ee88-0ffa-40b6-a7bb-fe4697837606",
  },
}
