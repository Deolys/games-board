import styled from "@emotion/styled";
import { Box } from "@mui/material";

export const GameArea=styled(Box)({
  width: '400px',
  height: '400px',
  margin: '20px auto',
  position: 'relative',
  border: '2px solid #000',
});

export const SnakeDot=styled(Box)({
  width: '20px',
  height: '20px',
  backgroundColor: 'green',
  position: 'absolute',
});