import { Alert, Fade, Grow, Slide, Snackbar } from "@mui/material";

const SnackBar = ({
  isOpen,
  transition,
  name,
  message,
  type,
  severity,
  onClose,
  props,
}) => {
  const transitionComponent = () => {
    switch (transition) {
      case "fade":
        return Fade;
      case "slide":
        return Slide;
      case "grow":
        return Grow;
      default:
        return Fade;
    }
  };

  const renderSnack = () => {
    if (type === "alert") {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isOpen}
          TransitionComponent={transitionComponent()}
          autoHideDuration={5000}
          onClose={onClose}
          {...props}
        >
          <Alert severity={severity} sx={{ width: "100%" }} onClose={onClose}>
            {message}
          </Alert>
        </Snackbar>
      );
    } else {
      return (
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          open={isOpen}
          TransitionComponent={transitionComponent()}
          key={name}
          autoHideDuration={5000}
          message={message}
          onClose={onClose}
          {...props}
        />
      );
    }
  };
  return renderSnack();
};
export default SnackBar;
