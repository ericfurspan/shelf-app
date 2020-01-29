import React from 'react';
import UIButton from '@material-ui/core/Button';
import { styled } from '@material-ui/styles';

const StyledButton = styled(UIButton)({
  border: 0,
  borderRadius: 3,
  height: 42,
  padding: '0 24px',
});

const Button = (props) => {
  const { color, size, variant, type, disabled, onClick, className, text, icon } = props;

  return (
    <StyledButton
      variant={variant || "contained"}
      color={color}
      size={size}
      type={type}
      disabled={disabled}
      onClick={e => onClick && onClick(e)}
      className={Array.isArray(className) ? className.join(' ') : className}
    >
      {text}
      {icon}
    </StyledButton>
  );
};

export default Button;
