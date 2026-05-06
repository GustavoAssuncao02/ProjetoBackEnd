// Home.Styles.js — ORIUN OUTLET
// Estética: editorial de moda urbana — escuro, dourado, tipografia bold

const COLORS = {
  bg: '#0D0D0D',
  surface: '#161616',
  surfaceAlt: '#1E1E1E',
  border: '#2A2A2A',
  gold: '#C9A84C',
  goldLight: '#E0C060',
  goldMuted: 'rgba(201,168,76,0.15)',
  white: '#F5F5F0',
  whiteOff: '#BBBBB5',
  textMuted: '#777770',
}

const styles = {
  /* ─── HEADER ─────────────────────────────────────────────── */
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    height: '72px',
    background: COLORS.bg,
    borderBottom: `1px solid ${COLORS.border}`,
    position: 'sticky',
    top: 0,
    zIndex: 100,
    gap: '24px',
  },

  brandGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    textDecoration: 'none',
    flexShrink: 0,
  },

  brandLogoLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },

  brandLogo: {
    width: '40px',
    height: '40px',
    borderRadius: '4px',
    objectFit: 'cover',
  },

  brandNameLink: {
    fontFamily: '"Bebas Neue", "Anton", "Impact", sans-serif',
    fontSize: '22px',
    letterSpacing: '0.12em',
    color: COLORS.white,
    textDecoration: 'none',
    lineHeight: 1,
  },

  searchForm: {
    display: 'flex',
    alignItems: 'center',
    background: COLORS.surface,
    border: `1px solid ${COLORS.border}`,
    borderRadius: '4px',
    overflow: 'hidden',
    transition: 'border-color 0.2s',
  },

  search: {
    background: 'transparent',
    border: 'none',
    outline: 'none',
    padding: '10px 16px',
    color: COLORS.white,
    fontSize: '13px',
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    letterSpacing: '0.03em',
    caretColor: COLORS.gold,
  },

  nav: {
    display: 'flex',
    alignItems: 'center',
    gap: '28px',
    flexShrink: 0,
  },

  navItem: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    fontSize: '12px',
    fontWeight: '600',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: COLORS.whiteOff,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },

  cartLink: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    color: COLORS.whiteOff,
    textDecoration: 'none',
    transition: 'color 0.2s',
  },

  cartIcon: {
    display: 'block',
    width: '22px',
    height: '22px',
  },

  cartBadge: {
    position: 'absolute',
    top: '-6px',
    right: '-8px',
    background: COLORS.gold,
    color: COLORS.bg,
    fontSize: '10px',
    fontWeight: '700',
    fontFamily: '"DM Sans", sans-serif',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  },

  /* ─── INFO BAR ────────────────────────────────────────────── */
  infoBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '48px',
    background: COLORS.gold,
    padding: '10px 40px',
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    fontSize: '11px',
    fontWeight: '700',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: COLORS.bg,
  },

  /* ─── HERO ────────────────────────────────────────────────── */
  hero: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: 'calc(100vh - 72px - 40px)',
    background: COLORS.bg,
    overflow: 'hidden',
  },

  heroLeft: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '80px 60px',
    flex: '0 0 420px',
    borderRight: `1px solid ${COLORS.border}`,
  },

  heroText: {
    fontFamily: '"Bebas Neue", "Anton", "Impact", sans-serif',
    fontSize: 'clamp(72px, 9vw, 120px)',
    lineHeight: '0.9',
    letterSpacing: '-0.02em',
    color: COLORS.white,
    whiteSpace: 'pre-line',
    position: 'relative',
  },

  heroRight: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    background: COLORS.surfaceAlt,
  },

  heroImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    objectPosition: 'center top',
    display: 'block',
    filter: 'grayscale(20%) contrast(1.05)',
  },

  /* ─── SECTION TITLE ───────────────────────────────────────── */
  sectionTitle: {
    fontFamily: '"Bebas Neue", "Anton", "Impact", sans-serif',
    fontSize: 'clamp(36px, 5vw, 56px)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: COLORS.white,
    padding: '64px 40px 32px',
    borderBottom: `1px solid ${COLORS.border}`,
    lineHeight: 1,
  },

  /* ─── PRODUCT HIGHLIGHTS ──────────────────────────────────── */
  highlights: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '1px',
    background: COLORS.border,
    margin: '0',
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    background: COLORS.bg,
    textDecoration: 'none',
    overflow: 'hidden',
    transition: 'background 0.25s',
  },

  cardImageWrap: {
    position: 'relative',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    background: COLORS.surfaceAlt,
  },

  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    filter: 'grayscale(15%)',
  },

  cardImageFallback: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: COLORS.textMuted,
    fontSize: '12px',
    fontFamily: '"DM Sans", sans-serif',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },

  cardTitle: {
    padding: '20px 24px 24px',
    fontFamily: '"Bebas Neue", "Anton", "Impact", sans-serif',
    fontSize: '24px',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: COLORS.white,
    borderTop: `1px solid ${COLORS.border}`,
    transition: 'color 0.2s',
  },
}

export default styles