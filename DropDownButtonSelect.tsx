import React from "react";
import styled from "styled-components";
import { Button as BaseButton } from "@mui/base/Button";
import { Menu, MenuItem } from "@mui/material";

const ButtonStyles = styled(BaseButton)(
  ({ theme, fullWidth, $customColor }) => {
    const { spacing } = theme;
    return {
      fontSize: "1rem",
      display: "flex",
      width: fullWidth ? "100%" : "fit-content",
      lineHeight: 1.5,
      padding: spacing(1, 2),
      border: "unset",
      boxShadow: "0 2px 1px 1px rgba(45, 45, 60, 0.2)",
      borderRadius: "5px",
      backgroundColor: $customColor ? $customColor : "blue",
      color: "white",
      "&:hover": {
        backgroundColor: $customColor ? $customColor  + 70 : "blue" + 70,
        color: "white",
      },
    };
  }
);

const MenuStyles = styled(Menu)(({ theme, color }) => {
  const { spacing } = theme;
  return {
    "& .MuiPaper-root": {
      backgroundColor: color ? color : "white",
      marginTop: theme.spacing(1),
      minWidth: 120,
      borderRadius: 2,
      boxShadow: "0 1px 4px #494949",
      "& .MuiMenuItem-root": {
        backgroundColor: color ? color : "black",
        color: "white",
        "&:hover": {
          backgroundColor: "white",
          color: "black",
        },
      },
      "&::before": {
        content: '""',
        display: "block",
        position: "absolute",
        top: spacing(0),
        right: spacing(2),
        width: 10,
        height: 10,
        backgroundColor: "black",
        transform: "translateY(-50%) rotate(45deg)",
        zIndex: 0,
      },
    },
  };
});

interface Props {
  label: string;
  customColor: string;
  options: Array<{
    action: () => void;
    name: string;
  }>;
  fullWidth: boolean;
  name: string;
}

function DropDownButtonSelect({
  name,
  label,
  options,
  fullWidth = true,
  customColor,
  ...props
}: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
 
  return (
    <div>
      <ButtonStyles
        id="buttonMenu-select"
        aria-controls={open ? "menu-select" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        fullWidth={fullWidth}
        onClick={handleOpen}
        $customColor={customColor}
        {...props}
      >
        {label ? label : null}
      </ButtonStyles>
      <MenuStyles
        id="menu-select"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ onClick: handleClose }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        color={customColor}
      >
        {options?.map(({ action, name }, index: number) => (
          <MenuItem
            key={name}
            onClick={() => {
              action();
              setAnchorEl(null);
            }}
          >
            {name}
          </MenuItem>
        ))}
      </MenuStyles>
    </div>
  );
}

export default DropDownButtonSelect;
