import { AppBar, Stack, Toolbar, Typography } from "@mui/material";
import logo from "../../assets/icons/cubes.svg";
import { LogoLink } from "./header.styled";
import { MenuListComposition } from "../menu-list";

export function Header() {

  return (
    <AppBar sx={{backgroundColor: "#a3c8ff", md: 3}}>
      <Toolbar sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <LogoLink href="/">
        <img src={logo} srcSet={logo} alt="Games board" />
        <Typography sx={{ fontSize: "20px", color: "#151274" }}>Games&nbsp;board</Typography>
      </LogoLink>
      <Stack direction="row" sx={{display: "flex", alignItems:  "center", gap: 4 }}>
        <Typography component="a" href="/" sx={{color: "#151724", fontWeight: 700, cursor: "pointer", display: {sm: 'block', xs: 'none'}}}>HOME</Typography>
        <MenuListComposition />
      </Stack>
      </Toolbar>
    </AppBar>
  )
}

export default Header;