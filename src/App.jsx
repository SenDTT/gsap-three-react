import Header from './ui/header.jsx'
import Footer from './ui/footer.jsx'
// import TorusknotView from './ui/contents/TorusknotView.jsx'
import StudioView from './ui/contents/StudioView.jsx'
import { useMemo } from 'react'
import { KeyboardControls } from '@react-three/drei'
// import WordsCloudView from './ui/contents/WordsCloudView.jsx'
// import BoxView from './ui/contents/BoxView.jsx'

export default function App() {
  const map = useMemo(() => [
    { name: "forward", keys: ['ArrowUp', 'KeyW'] },
    { name: "back", keys: ['ArrowDown', 'KeyS'] },
    { name: "left", keys: ['ArrowLeft', 'KeyA'] },
    { name: "right", keys: ['ArrowRight', 'KeyD'] },
    { name: "jump", keys: ['Space'] },
  ], []);

  return (
    <main>
      <Header />

      {/* begin content */}
      
      {/* <TorusknotView /> */}

      {/* <BoxView /> */}

      <KeyboardControls map={map}>
        <StudioView />
      </KeyboardControls>

      {/* <WordsCloudView /> */}

      {/* end content */}

      <Footer />
    </main>
  )
}
