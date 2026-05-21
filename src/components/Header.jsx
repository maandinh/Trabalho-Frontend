import "./Header.css"

function Header() {
  return (
    <header className="header">
      <div className="logo">
        <h1>MeuSite</h1>
      </div>

      <nav className="nav">
        <a href="/">Home</a>
        <a href="/sobre">Sobre</a>
        <a href="/contato">Contato</a>
      </nav>
    </header>
  )
}

export default Header;