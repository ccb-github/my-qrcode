import LoginScreen from "../screens/login/LoginScreen"

test("renders correctly", () => {
  const tree = renderer.create(<LoginScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
