import { hasInvalidInput } from "./validate";

export const toggleButtonState = (
  inputList,
  buttonElement,
  { inactiveButtonClass }
) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute("disabled", "disabled");
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute("disabled", "disabled");
  }
};
