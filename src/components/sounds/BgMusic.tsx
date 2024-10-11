import { useEffect, useRef } from 'react';
import music from '../../bg-music.mp3'

type BgMusicProps = {
    volume: number;
    mute: boolean;
};

export function BgMusic({ volume, mute }: BgMusicProps) {

    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio(music);

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
        // Update the mute state and play audio if unmuted
        if (audioRef.current) {
            audioRef.current.muted = mute;
            if (!mute) {
                audioRef.current.play().catch((error) => {
                    console.error('Failed to play audio:', error);
                });
            }
        }
    }, [mute]);

    return null;
}
