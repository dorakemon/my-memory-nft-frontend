import React from "react";

import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface LoadingProps extends ButtonProps {
  loading: boolean;
  disable: boolean;
}

const LoadingButton: React.FC<LoadingProps & ButtonProps> = (props) => {
  const { children, onClick, color, variant, loading, disable } = props;

  if (disable) {
    return (
      <Button color={color} variant={variant} disabled={true}>
        {children}
      </Button>
    );
  } else if (loading) {
    return (
      <Button
        color={color}
        variant={variant}
        disableElevation={true}
        disableRipple={true}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onClick={onClick}
      >
        <CircularProgress size={25} style={{ color: "#fff" }} />
      </Button>
    );
  } else {
    return (
      <Button color={color} variant={variant} onClick={onClick}>
        {children}
      </Button>
    );
  }
};

export default LoadingButton;
