import React, { useState, useRef } from 'react';
import { TextField, Box, styled } from '@mui/material';

const StyledTextField = styled(TextField)(({ theme,dark }) => ({
  '& .MuiOutlinedInput-root': {
    width: '50px',
    height: '50px',
    backgroundColor: dark ? 'none' : '#ffffff',
    '& input': {
      textAlign: 'center',
      fontSize: '1.2rem',
      fontWeight: 'bold',
      padding: '12px',
      color: dark ? '#ffffff' : '#000000',
    },
    '& fieldset': {
      borderColor: dark ? '#424242' : 'rgba(0, 0, 0, 0.23)',
    },
    '&:hover fieldset': {
      borderColor: dark ? '#3399FF' : '#3399FF',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#3399FF',
      borderWidth: '2px',
    },
  },
}));

const OTPInput = ({ length = 6, value = '', onChange, onComplete, separator,dark=false }) => {
  const inputRefs = useRef(new Array(length).fill(null));

  const focusInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    if (targetInput) targetInput.focus();
  };

  const selectInput = (targetIndex) => {
    const targetInput = inputRefs.current[targetIndex];
    if (targetInput) targetInput.select();
  };

  const handleKeyDown = (event, currentIndex) => {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case ' ':
        event.preventDefault();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      case 'ArrowRight':
        event.preventDefault();
        if (currentIndex < length - 1) {
          focusInput(currentIndex + 1);
          selectInput(currentIndex + 1);
        }
        break;
      case 'Delete':
        event.preventDefault();
        onChange((prevOtp) => {
          const otpArray = prevOtp.split('');
          otpArray[currentIndex] = '';
          return otpArray.join('');
        });
        break;
      case 'Backspace':
        event.preventDefault();
        onChange((prevOtp) => {
          const otpArray = prevOtp.split('');
          otpArray[currentIndex] = '';
          return otpArray.join('');
        });
        if (currentIndex > 0) {
          focusInput(currentIndex - 1);
          selectInput(currentIndex - 1);
        }
        break;
      default:
        break;
    }
  };

  const handleChange = (event, currentIndex) => {
    const currentValue = event.target.value;
    
    // Only allow single digits
    if (currentValue.length > 1) return;
    
    // Only allow numbers
    if (currentValue && !/^\d$/.test(currentValue)) return;

    onChange((prev) => {
      const otpArray = prev.split('');
      while (otpArray.length < length) otpArray.push('');
      otpArray[currentIndex] = currentValue;
      const newOtp = otpArray.join('');
      
      // Check if OTP is complete and call onComplete
      if (newOtp.replace(/\s/g, '').length === length && onComplete) {
        onComplete(newOtp.replace(/\s/g, ''));
      }
      
      return newOtp;
    });

    // Auto-focus next input
    if (currentValue && currentIndex < length - 1) {
      focusInput(currentIndex + 1);
    }
  };

  const handleClick = (event, currentIndex) => {
    selectInput(currentIndex);
  };

  const handlePaste = (event, currentIndex) => {
    event.preventDefault();
    const clipboardData = event.clipboardData;

    if (clipboardData.types.includes('text/plain')) {
      let pastedText = clipboardData.getData('text/plain');
      pastedText = pastedText.replace(/\D/g, ''); // Remove non-digits
      pastedText = pastedText.substring(0, length); // Limit to length

      onChange(pastedText.padEnd(length, ''));

      // Check if pasted OTP is complete and call onComplete
      if (pastedText.length === length && onComplete) {
        onComplete(pastedText);
      }

      // Focus the last filled input or next empty one
      const focusIndex = Math.min(pastedText.length, length - 1);
      setTimeout(() => focusInput(focusIndex), 0);
    }
  };

  // Ensure value has the right length
  const paddedValue = value.padEnd(length, '');

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
      {new Array(length).fill(null).map((_, index) => (
        <React.Fragment key={index}>
          <StyledTextField
            inputRef={(el) => {
              inputRefs.current[index] = el;
            }}
            variant="outlined"
            dark={dark}
            size="small"
            value={paddedValue[index] || ''}
            onChange={(event) => handleChange(event, index)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            onClick={(event) => handleClick(event, index)}
            onPaste={(event) => handlePaste(event, index)}
            inputProps={{
              maxLength: 1,
              'aria-label': `Digit ${index + 1} of OTP`,
            }}
            autoFocus={index === 0}
          />
          {index === length - 1 ? null : separator}
        </React.Fragment>
      ))}
    </Box>
  );
};

export default OTPInput;