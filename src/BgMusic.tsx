import { useEffect, useRef } from 'react';

type BgMusicProps = {
    volume: number;
    mute: boolean;
};

export function BgMusic({ volume, mute }: BgMusicProps) {

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('../bg-music.mp3');

        // Set initial volume and mute state
        if (audioRef.current) {
            audioRef.current.volume = volume;
            audioRef.current.muted = mute;
            audioRef.current.loop = true;
            audioRef.current.play();
        }

        // Cleanup function
        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current.src = '';
                audioRef.current.load();
            }
        };
    }, []);

    useEffect(() => {
        // Update the volume when it changes
        if (audioRef.current) {
            audioRef.current.volume = volume*0.01;
        }
    }, [volume]);

    useEffect(() => {
        // Update the mute state when it changes
        if (audioRef.current) {
            audioRef.current.muted = mute;
        }
    }, [mute]);

    return null;
}
