import { Header } from "../../components/header";
import { Link } from "react-router-dom";
import TotoroImg from '../../assets/images/pngwing.com.png';
import RockPaperScissorsImg from '../../assets/images/r-p-s.jpg';
import SnakeImg from '../../assets/icons/snake-game.svg';
import SimonImg from '../../assets/images/simon.png';
import TicTacToeImg from '../../assets/images/tic-tac-toe.png';
import { GameBox, ImageBox, StyledBox, SubstractBox } from "./main.styled";

export function MainPage() {
  return (
    <>
      <Header />
      <StyledBox>
      <SubstractBox maxWidth='sm'>
          <Link to="/rock-paper-scissors">
          <GameBox imgurl={RockPaperScissorsImg} width="52%" height="20vh" top="3%" left="4%" />
          </Link>
          <Link to="/snake">
          <GameBox imgurl={SnakeImg} width="32%" height="32vh" top="16%" right="4%" />
          </Link>
          <ImageBox  sx={{ pointerEvents: 'none' }}>
            <img src={TotoroImg} alt="Totoro" />
          </ImageBox>
          <Link to="/simon-says">
          <GameBox imgurl={SimonImg} width="28%" height="18vh" bottom="4%" left="30%" />
          </Link>
          <Link to="/tic-tac-toe">
          <GameBox imgurl={TicTacToeImg} width="32%" height="18vh" bottom="4%" right="4%" />
          </Link>
      </SubstractBox>
      </StyledBox>
    </>
  )
}

export default MainPage;