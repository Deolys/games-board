import styled from '@emotion/styled';
import { Button, Paper } from '@mui/material';

export const ColorButton = styled(Button)({
  margin: 1,
  width: 100,
  height: 100,
});

export const GameBoard = styled(Paper)({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 100px)',
  gap: 2,
  alignItems: 'center',
  justifyContent: 'center',
  padding: 30,
});