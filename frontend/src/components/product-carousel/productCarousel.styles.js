// productCarousel.styles.js — ORIUN OUTLET
// Consistente com Home.Styles.js: escuro, dourado, editorial de moda

const COLORS = {
  bg: '#0D0D0D',
  surface: '#161616',
  surfaceAlt: '#1E1E1E',
  border: '#2A2A2A',
  gold: '#C9A84C',
  goldLight: '#E0C060',
  white: '#F5F5F0',
  whiteOff: '#BBBBB5',
  textMuted: '#777770',
  strikethrough: '#555550',
}

const styles = {
  /* ─── SEÇÃO WRAPPER ───────────────────────────────────────── */
  section: {
    background: COLORS.bg,
    padding: '64px 0 80px',
    borderTop: `1px solid ${COLORS.border}`,
  },

  /* ─── HEADER ─────────────────────────────────────────────── */
  header: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: '0 40px 32px',
    borderBottom: `1px solid ${COLORS.border}`,
    marginBottom: '40px',
  },

  title: {
    fontFamily: '"Bebas Neue", "Anton", "Impact", sans-serif',
    fontSize: 'clamp(32px, 4vw, 48px)',
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    color: COLORS.white,
    margin: 0,
    lineHeight: 1,
  },

  subtitle: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    fontSize: '13px',
    color: COLORS.textMuted,
    letterSpacing: '0.04em',
    margin: '8px 0 0',
  },

  /* ─── CAROUSEL AREA ───────────────────────────────────────── */
  carouselArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    padding: '0 40px',
  },

  arrowButton: {
    flexShrink: 0,
    width: '44px',
    height: '44px',
    background: 'transparent',
    border: `1px solid ${COLORS.border}`,
    color: COLORS.whiteOff,
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'border-color 0.2s, color 0.2s, background 0.2s',
    borderRadius: '2px',
    fontFamily: '"DM Sans", sans-serif',
  },

  viewport: {
    flex: 1,
    overflow: 'hidden',
    margin: '0 16px',
  },

  track: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '1px',
    background: COLORS.border,
  },

  /* ─── CARD ────────────────────────────────────────────────── */
  link: {
    textDecoration: 'none',
    display: 'block',
    background: COLORS.bg,
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    background: COLORS.bg,
    overflow: 'hidden',
    cursor: 'pointer',
  },

  imageWrap: {
    position: 'relative',
    aspectRatio: '3 / 4',
    overflow: 'hidden',
    background: COLORS.surfaceAlt,
  },

  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
    transition: 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
    filter: 'grayscale(15%)',
  },

  noImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    color: COLORS.textMuted,
    fontSize: '11px',
    fontFamily: '"DM Sans", sans-serif',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },

  /* ─── INFO ────────────────────────────────────────────────── */
  info: {
    padding: '16px 20px 20px',
    borderTop: `1px solid ${COLORS.border}`,
    background: COLORS.bg,
    transition: 'background 0.2s',
  },

  name: {
    fontFamily: '"DM Sans", "Helvetica Neue", sans-serif',
    fontSize: '13px',
    fontWeight: '600',
    letterSpacing: '0.04em',
    color: COLORS.whiteOff,
    margin: '0 0 8px',
    lineHeight: 1.4,
    textTransform: 'uppercase',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
  },

  price: {
    fontFamily: '"Bebas Neue", "Anton", sans-serif',
    fontSize: '20px',
    letterSpacing: '0.06em',
    color: COLORS.gold,
    margin: 0,
    lineHeight: 1,
  },

  oldPrice: {
    textDecoration: 'line-through',
    color: COLORS.strikethrough,
    fontSize: '14px',
    fontFamily: '"DM Sans", sans-serif',
    fontWeight: '400',
    letterSpacing: '0.02em',
  },

  /* ─── MENSAGEM DE ERRO ────────────────────────────────────── */
  message: {
    padding: '40px',
    fontFamily: '"DM Sans", sans-serif',
    fontSize: '13px',
    color: COLORS.textMuted,
    textAlign: 'center',
    letterSpacing: '0.04em',
  },
}

export default styles