import styles from './Home.Styles'

export default function MainHeader() {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>ORIUN OUTLET</div>

      <input
        type="text"
        placeholder="Digite aqui para pesquisar"
        style={styles.search}
      />

      <nav style={styles.nav}>
        <span style={styles.navItem}>Destaque</span>
        <span style={styles.navItem}>Novidades</span>
        <span style={styles.navItem}>Categorias</span>
      </nav>
    </header>
  )
}