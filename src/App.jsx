import Header from './ui/header.jsx'
import Footer from './ui/footer.jsx'
import TorusknotView from './ui/contents/TorusknotView.jsx'
// import BoxView from './ui/contents/BoxView.jsx'

export default function App() {
  return (
    <main>
      <Header />

      {/* begin content */}
      
      <TorusknotView />

      {/* <BoxView /> */}

      {/* end content */}

      <Footer />
    </main>
  )
}
