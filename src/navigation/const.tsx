export enum RouteNameLogin {
  login = "Login",
  register = "Register",
  resetPassword = "Reset"
}
export enum RouteNameMain {
  record = "Record",
  login = "Login",
  tab = "Tab",
  register = "Register",
  setting = "Setting",
  storageInspect = "StorageInspect",
  modalScanner = "Scanner",
  tabOne = "TabOne",
  modalGenerateData = "ModalDataResult",
  modalDetail = "Detail",
  modalResult = "Result",
  profile = "Profile",
}

enum TabOne {
  ToolBar = "What",
  TabBarIcon = "history",
}

enum TabTwo {
  ToolBar = "anchor",
  TabBarIcon = "anchor",
}

export const IconSetting = {
  TabOne,
  TabTwo
}
export const TabNavigationScreenOptions = {
  tabBarActiveTintColor: "yellow",
  headerShown: true
}
