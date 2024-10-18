import { Stack, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

interface CustomCardProps {
    title: string;
    children: ReactNode;
    padding?: string;
    marginBottom?: string;
    paddingBottom?: string;
}

const primaryColor = "#F0E5CF"
const secondaryColor = "#F7F6F2"

const CustomCard: React.FC<CustomCardProps> = ({ title, children, padding, marginBottom, paddingBottom }) => {
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
                    width: "100%",
                    marginBottom: marginBottom ? marginBottom : "0px"
                }}
            >
                <Typography 
                    variant="h3" 
                    style={{ 
                        paddingTop: "5px", 
                        paddingBottom: paddingBottom ? paddingBottom : "5px", 
                        borderBottom:"solid black 5px", 
                        width: "100%", 
                        height: "50px",
                        fontWeight: "bold", 
                        fontFamily: "'Indie Flower', cursive", 
                        backgroundColor: secondaryColor, 
                        textAlign: "center"
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