import click from '../../sounds/click.mp3'

export const clickSound = () => {
    const audio = new Audio(click);
    audio.play();
};