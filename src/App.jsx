import { useRef } from "react";
import SceneManager from "./components/SceneManager";
import MusicController from "./components/MusicController";
import HeartIntroScene from "./scenes/HeartIntroScene";
import CakeCutScene from "./scenes/CakeCutScene";
import LockScene from "./scenes/LockScene";
import MemoriesScene from "./scenes/MemoriesScene";
import SpecialMemoryVideoScene from "./scenes/SpecialMemoryVideoScene";
import GalleryScene from "./scenes/GalleryScene";
import FunnyScene from "./scenes/FunnyScene";
import LittleThingsScene from "./scenes/LittleThingsScene";
import LetterEnvelopeScene from "./scenes/LetterEnvelopeScene";
import HeartTreeScene from "./scenes/HeartTreeScene";

const SCENES = [
  { id: "heart-intro", Component: HeartIntroScene, transition: "fade" },
  { id: "cake", Component: CakeCutScene, transition: "fade" },
  { id: "lock", Component: LockScene, transition: "particles" },
  { id: "memories", Component: MemoriesScene, transition: "scrapbook" },
  { id: "special-video", Component: SpecialMemoryVideoScene, transition: "slowFade" },
  { id: "gallery", Component: GalleryScene, transition: "particles" },
  { id: "funny", Component: FunnyScene, transition: "heart" },
  { id: "little-things", Component: LittleThingsScene, transition: "heart" },
  { id: "letter", Component: LetterEnvelopeScene, transition: "scrapbook" },
  { id: "tree", Component: HeartTreeScene, transition: "slowFade" },
];

export default function App() {
  const musicRef = useRef(null);
  return (
    <div className="app-root">
      <div className="app-stage">
        <MusicController ref={musicRef} />
        <SceneManager scenes={SCENES} sharedProps={{ musicRef }} />
      </div>
    </div>
  );
}
