"use client";

import { useCallback, useEffect, useState } from 'react';
import styles from './VideoPlayer.module.css';
import { player, clpp, initializeClpp } from './prestoplay.js';

export default function VideoPlayer({ }) {
  const [initialized, setInitialized] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoUrl, setVideoUrl] = useState('https://demo.cf.castlabs.com/media/TOS/abr/Manifest_clean_sizes.mpd');
  const [progress, setProgress] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState(null);

  const onVideoRef = useCallback((ref) => {
    if (ref) {
      initializeClpp(ref).then(() => setInitialized(true))
    }
  }, []);

  useEffect(() => {
    if (initialized && videoUrl) {
      player.load(videoUrl)
        .then(() => setError(null))
        .catch(setError)
    }
  }, [videoUrl, initialized])

  useEffect(() => {
    if (!initialized) return;

    const setBuffering = () => {
      setIsBuffering(true);
    };

    const setNotBuffering = () => {
      setIsBuffering(false);
    };

    const handleTimeUpdate = () => {
      setProgress(player.getPosition() / player.getDuration() * 100);
    };

    player.addEventListener('timeupdate', handleTimeUpdate);
    player.on(clpp.events.BUFFERING_STARTED, setBuffering);
    player.on(clpp.events.BUFFERING_ENDED, setNotBuffering);

    return () => {
      player.removeEventListener('timeupdate', handleTimeUpdate);
      player.off(clpp.events.BUFFERING_STARTED, setBuffering);
      player.off(clpp.events.BUFFERING_ENDED, setNotBuffering);
    };
  }, [initialized])

  const handlePlayPause = () => {
    if (!initialized) return;

    if (isPlaying) {
      player.pause();
      setIsPlaying(false);
    } else {
      player.play();
      setIsPlaying(true);
    }
  };

  const handleSeek = (e) => {
    if (!initialized) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const seekPosition = (e.clientX - rect.left) / rect.width; // in [0, 1]
    const seekTime = seekPosition * player.getDuration();
    player.seek(seekTime);
  };

  return (
    <div>
      <div className={styles.root}>
        <div className={styles.container}>
          <div className={styles.videoContainer}>
            <video
              ref={onVideoRef}
              className={styles.video}
            >
              Your browser does not support the video tag.
            </video>
            {isBuffering && (
              <div className={styles.spinnerOverlay}>
                <div className={styles.spinner}></div>
              </div>
            )}
          </div>
        </div>
        <div className={styles.progressContainer} onClick={handleSeek}>
          <div
            className={styles.progressBar}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className={styles.controls}>
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Enter video URL"
            className={styles.input}
            disabled={!player}
          />
          <button onClick={handlePlayPause} className={styles.button} disabled={!player}>
            {isPlaying ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {error && (
        <div className={styles.errorMessage}>
          Failed to load (code {error.code})
        </div>
      )}
    </div>
  );
}
