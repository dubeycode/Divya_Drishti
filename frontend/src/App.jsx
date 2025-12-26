import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "./content/theme-provider"
import Layout from "./components/layout"
import ThumbnailDashboard from "./pages/thumbnail_dashboard"
import ThumbnailName from "./pages/thumbnailName"
import ThumbnailSearch from "./pages/thumbnail_search"
import ThumbnailOutput from "./pages/thumbnail_output"



function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark">
        <Layout>
          <Routes>
            <Route path="/" element={<ThumbnailDashboard />} />
            <Route path="/thumbnail/" element={<ThumbnailName />} />
            <Route path="/thumbnail/output" element={<ThumbnailOutput />} />
            <Route path="/thumbnail/search" element={<ThumbnailSearch />} />
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter >
  )
}

export default App