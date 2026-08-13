export function getPasswordInputType(isVisible: boolean): "password" | "text" {
  return isVisible ? "text" : "password";
}
