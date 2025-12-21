import Nav from "./nav"
const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-muted">
      {/* header */}
       <Nav />
      {/* main */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>
      {/* footer */}
      <footer className="border-t backdrop-blur supports-[backdrop-filter]:bg-background/60 py-12">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p className="hover:cursor-not-allowed">Made with 💗 by satyam Dubey</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout