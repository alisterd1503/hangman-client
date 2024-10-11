import { Slider, styled } from '@mui/material';
import slider from '../../images/slider.png'
import circle from '../../images/circle.png'

export const CustomSlider = styled(Slider)({
    height: 8,
    
    '& .MuiSlider-thumb': {
      opacity: 0.8,
      backgroundImage: `url(${circle})`,
      backgroundSize: 'contain',   // Ensure the image fits properly
      backgroundRepeat: 'no-repeat',
      borderRadius: '50%',         // Ensure it's fully circular
      height: 30,                  // Set the size of the thumb to match the circle image
      width: 30,                   // Ensure width and height are the same
      backgroundColor: 'transparent',
      border: 'none',
      '&:hover': {
        boxShadow: 'none',
      }
    },
  
    '& .MuiSlider-rail': {
      backgroundImage: `url(${slider})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      borderRadius: 4,
      height: 100, 
      backgroundColor: 'transparent',
      border: 'none'
    },
  
    '& .MuiSlider-track': {
      backgroundColor: 'transparent',
      border: 'none'
    },
  });
  