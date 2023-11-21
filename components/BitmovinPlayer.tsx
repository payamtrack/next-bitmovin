"use client";

import React, { useEffect, useRef, useState } from "react";
import { Player, PlayerAPI } from "bitmovin-player/modules/bitmovinplayer-core";
import EngineBitmovinModule from "bitmovin-player/modules/bitmovinplayer-engine-bitmovin";
import EngineNativeModule from "bitmovin-player/modules/bitmovinplayer-engine-native";
import MseRendererModule from "bitmovin-player/modules/bitmovinplayer-mserenderer";
import HlsModule from "bitmovin-player/modules/bitmovinplayer-hls";
import DashModule from "bitmovin-player/modules/bitmovinplayer-dash";
import AbrModule from "bitmovin-player/modules/bitmovinplayer-abr";
import XmlModule from "bitmovin-player/modules/bitmovinplayer-xml";
import ContainerTSModule from "bitmovin-player/modules/bitmovinplayer-container-ts";
import ContainerMp4Module from "bitmovin-player/modules/bitmovinplayer-container-mp4";
import SubtitlesModule from "bitmovin-player/modules/bitmovinplayer-subtitles";
import SubtitlesCEA608Module from "bitmovin-player/modules/bitmovinplayer-subtitles-cea608";
// import PolyfillModule from 'bitmovin-player/modules/bitmovinplayer-polyfill'
import DrmModule from "bitmovin-player/modules/bitmovinplayer-drm";
import ThumbnailModule from "bitmovin-player/modules/bitmovinplayer-thumbnail";
import SubtitlesWebVTT from "bitmovin-player/modules/bitmovinplayer-subtitles-vtt";
import StyleModule from "bitmovin-player/modules/bitmovinplayer-style";
import { UIFactory } from "bitmovin-player-ui";
import "bitmovin-player-ui/dist/css/bitmovinplayer-ui.css";

function BitmovinPlayer() {
  const [player, setPlayer] = useState<PlayerAPI | null>(null);

  const playerConfig = {
    key: "YOUR KEY HERE",
  };

  const playerSource = {
    dash: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/mpds/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.mpd",
    hls: "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
    poster:
      "https://bitdash-a.akamaihd.net/content/MI201109210084_1/poster.jpg",
  };
  const playerDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function setupPlayer() {
      Player.addModule(EngineBitmovinModule);
      Player.addModule(EngineNativeModule);
      Player.addModule(MseRendererModule);
      Player.addModule(HlsModule);
      Player.addModule(XmlModule);
      Player.addModule(DashModule);
      Player.addModule(AbrModule);
      Player.addModule(ContainerTSModule);
      Player.addModule(ContainerMp4Module);
      Player.addModule(SubtitlesModule);
      Player.addModule(SubtitlesCEA608Module);
      // Player.addModule(PolyfillModule)
      Player.addModule(DrmModule);
      Player.addModule(ThumbnailModule);
      Player.addModule(SubtitlesWebVTT);
      Player.addModule(StyleModule);

      if (playerDiv.current) {
        const playerInstance = new Player(playerDiv.current, playerConfig);
        UIFactory.buildDefaultUI(playerInstance);
        playerInstance.load(playerSource).then(
          () => {
            setPlayer(playerInstance);
            console.log("Successfully loaded source");
          },
          () => {
            console.log("Error while loading source");
          }
        );
      }
    }

    setupPlayer();

    return () => {
      function destroyPlayer() {
        if (player != null) {
          player.destroy();
          setPlayer(null);
        }
      }

      destroyPlayer();
    };
  }, []);

  return <div id="player" ref={playerDiv} />;
}

export default BitmovinPlayer;
