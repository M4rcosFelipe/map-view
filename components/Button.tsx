import { Container } from "./Button.styles";

interface ButtonProps {
  children: any;
  onClick: (e: any) => void;
  color: string;
  fontColor: string;
}

function Button({ color, fontColor, children, onClick }: ButtonProps) {
  return (
    <Container onClick={onClick} color={color} fontColor={fontColor}>
      {children}
    </Container>
  );
}
export default Button;
