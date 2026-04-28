import styles from './Home.Styles'

export default function MainHeader() {
  return (
    <header style={styles.header}>
      <a href="/" style={styles.logo}>
        ORIUN OUTLET
      </a>

      <input
        type="text"
        placeholder="Digite aqui para pesquisar"
        style={styles.search}
      />

      <nav style={styles.nav}>
        <a href="#destaque" style={styles.navItem}>
          Destaque
        </a>

        <a href="#novidades" style={styles.navItem}>
          Novidades
        </a>

        <a href="#categorias" style={styles.navItem}>
          Categorias
        </a>

        <a href="/login" style={styles.navItem}>
          Login / Registro
        </a>

        <a href="/carrinho" style={styles.cartLink} aria-label="Carrinho">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.cartIcon}
          >
            <path
              d="M7 18C5.9 18 5.01 18.9 5.01 20C5.01 21.1 5.9 22 7 22C8.1 22 9 21.1 9 20C9 18.9 8.1 18 7 18ZM17 18C15.9 18 15.01 18.9 15.01 20C15.01 21.1 15.9 22 17 22C18.1 22 19 21.1 19 20C19 18.9 18.1 18 17 18ZM7.17 14.75C6.42 14.75 5.76 14.33 5.43 13.68L2 6.59V5H4.31L7.28 11.25H14.53L17.28 6.25H19.56L16.05 12.61C15.7 13.25 15.03 13.65 14.3 13.65H7.53L6.43 15.65H19V17.65H7C5.9 17.65 5 16.75 5 15.65C5 15.31 5.09 14.97 5.25 14.68L6.6 12.24L3.62 6H2V4H5L8.18 10.75H14.52L17.28 5.75C17.63 5.1 18.3 4.7 19.03 4.7H21V6.7H19.3L16.3 12.15C15.95 12.79 15.28 13.19 14.55 13.19H7.68L7.17 14.75Z"
              fill="currentColor"
            />
          </svg>
        </a>
      </nav>
    </header>
  )
}