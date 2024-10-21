import { Slider, styled } from '@mui/material';
import slider from '../images/slider.png'
import circle from '../images/circle.png'

export const CustomSlider = styled(Slider)({
    height: 8,
    
    '& .MuiSlider-thumb': {
      opacity: 0.9,
      backgroundImage: `url(${circle})`,
      backgroundSize: 'contain',
      backgroundRepeat: 'no-repeat',
      borderRadius: '50%',         
      height: 20,                  
      width: 20,              
      backgroundColor: 'transparent',
      border: 'none',
      '&:hover': {
        boxShadow: 'none',
      }
    },
  
    '& .MuiSlider-rail': {
      opacity: 0.7,
      backgroundImage: `url(${slider})`,
      backgroundSize: 'cover', 
      backgroundRepeat: 'no-repeat',
      borderRadius: 4,
      height: 50, 
      backgroundColor: 'transparent',
      border: 'none'
    },
  
    '& .MuiSlider-track': {
      backgroundColor: 'transparent',
      border: 'none'
    },
  });
  