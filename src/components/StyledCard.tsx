import { Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface CustomCardProps {
    title: string;
    children: ReactNode;
    padding?: string;
    marginBottom?: string;
    fontSize?: string;
    width?: string
}

const primaryColor = "#F0E5CF"
const secondaryColor = "#F7F6F2"

const CustomCard: React.FC<CustomCardProps> = ({ title, children, padding, marginBottom, fontSize, width}) => {
    return (
        <div>
            <Stack
                direction="column"
                spacing={0}
                sx={{
                    justifyContent: "center",
                    alignItems: "center",
                    border: "dashed black 8px", 
                    borderStyle: "dashed", 
                    borderRadius: "10px", 
                    backgroundColor: primaryColor,
                    width: width ? width : "100%",
                    marginBottom: marginBottom ? marginBottom : "0px"
                }}
            >
                <Typography 
                    variant="h3" 
                    style={{ 
                        paddingTop: "5px", 
                        paddingBottom: "5px", 
                        borderBottom:"solid black 5px", 
                        width: "100%", 
                        height: "100%",
                        fontWeight: "bold", 
                        fontFamily: "'Indie Flower', cursive", 
                        backgroundColor: secondaryColor, 
                        textAlign: "center",
                        fontSize: fontSize ? fontSize : "3.5rem"
                    }}
                >
                    {title}
                </Typography>
                <Stack
                    direction="column"
                    spacing={2}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                        padding: padding ? padding : '30px'
                    }}
                >
                    {children}
                </Stack>
            </Stack>





        </div>
    );
  };

export default CustomCard;