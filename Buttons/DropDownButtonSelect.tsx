import React from "react";
import styled from "styled-components";
import { Button, Menu, MenuItem } from "@mui/material";

const ButtonStyles = styled(Button)(({ theme, fullWidth }) => {
  return {
    "&.MuiButton-root": {
      width: fullWidth ? "100%" : "fit-content",
      display: "flex",
      "&:hover": {
        backgroundColor: "white",
        color: "black",
      },
    },
  };
});

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
        backgroundColor: color ? color : "white",
        color: "black",
        "&:hover": {
          backgroundColor:  "black",
          color: "white",
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
        zIndex: 0, //O zIndex significa sobreposição, ou seja organiza o elemento entre, na frente ou atrás de um elemento
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
