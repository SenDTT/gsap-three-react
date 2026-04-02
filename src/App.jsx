import { NavLink, Routes, Route, Navigate } from 'react-router-dom'
import Header from './ui/header.jsx'
import Footer from './ui/footer.jsx'
import MergeMeshesView from './ui/contents/MergedMeshesView.jsx'
import WebsiteView from './ui/contents/WebsiteView.jsx'
import TorusknotView from './ui/contents/TorusknotView.jsx'
import BoxView from './ui/contents/BoxView.jsx'
import WordsCloudView from './ui/contents/WordsCloudView.jsx'
import StudioView from './ui/contents/StudioView.jsx'

const navStyle = ({ isActive }) => ({
  color: isActive ? '#ff6b00' : '#aaa',
  textDecoration: 'none',
})

export default function App() {
  return (
    <main style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header />

      <nav style={{ display: 'flex', gap: '1rem', padding: '0.5rem 1rem', background: '#1a1a1a', flexWrap: 'wrap', flexShrink: 0 }}>
        <NavLink to="/merged-meshes" style={navStyle}>Merged Meshes</NavLink>
        <NavLink to="/torusknot" style={navStyle}>Torusknot</NavLink>
        <NavLink to="/box" style={navStyle}>Box</NavLink>
        <NavLink to="/words-cloud" style={navStyle}>Words Cloud</NavLink>
        <NavLink to="/studio" style={navStyle}>Studio</NavLink>
        <NavLink to="/website" style={navStyle}>Website</NavLink>
      </nav>

      <div style={{ flex: 1, overflow: 'hidden' }}>
      <Routes>
        <Route path="/" element={<Navigate to="/merged-meshes" replace />} />
        <Route path="/merged-meshes" element={<MergeMeshesView />} />
        <Route path="/torusknot" element={<TorusknotView />} />
        <Route path="/box" element={<BoxView />} />
        <Route path="/words-cloud" element={<WordsCloudView />} />
        <Route path="/studio" element={<StudioView />} />
        <Route path="/website" element={<WebsiteView />} />
      </Routes>
      </div>

      <Footer />
    </main>
  )
}
