import Toast from "react-native-toast-message";

const successToast = ({
  message,
  duration = 2000,
  position = "top",
}) => {
  Toast.show({
    type: "success",
    text1: message,
    position,
    visibilityTime: duration,
  });
};

const errorToast = ({
  message,
  duration = 2000,
  position = "top",
}) => {
  Toast.show({
    type: "error",
    text1: message,
    position,
    visibilityTime: duration,
  });
};

const warningToast = ({
  message,
  duration = 2000,
  position = "top",
}) => {
  Toast.show({
    type: "info",
    text1: message,
    position,
    visibilityTime: duration,
  });
};

export { errorToast, successToast, warningToast };

