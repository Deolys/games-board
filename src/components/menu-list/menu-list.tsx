import { Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export function MenuListComposition() {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          sx={{color: "#151724", fontWeight: 700, fontSize: 16}}
        >
          Games
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                  >
                    <Link to="/rock-paper-scissors">
                    <MenuItem onClick={handleClose}>
                      Rock-Paper-Scissors
                    </MenuItem>
                    </Link>
                    <Link to="/snake">
                    <MenuItem onClick={handleClose}>
                      Snake
                    </MenuItem>
                    </Link>
                    <Link to="/simon-says">
                    <MenuItem onClick={handleClose}>
                      Simon Says
                    </MenuItem>
                    </Link>
                    <Link to="/tic-tac-toe">
                    <MenuItem onClick={handleClose}>
                      Tic-Tac-Toe
                    </MenuItem>
                    </Link>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
  );
}

export default MenuListComposition;