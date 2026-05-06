import homeSections from './HomeSections'

export const HOME_SETTINGS_STORAGE_KEY = 'oriun_home_settings_v1'
export const HOME_SETTINGS_EVENT = 'oriun-home-settings-updated'

export const HOME_SECTION_OPTIONS = [
  { id: 'main-header', label: 'Cabecalho' },
  { id: 'info-bar', label: 'Barra de informacoes' },
  { id: 'hero-banner', label: 'Banner principal' },
  { id: 'product-highlights', label: 'Tres categorias de produtos' },
  { id: 'product-carousel', label: 'Carrossel de produtos' },
  { id: 'location-title', label: 'Titulo de localizacao' }
]

const defaultFeaturedSlots = Array.from({ length: 3 }, (_, index) => ({
  id: `featured-category-${index + 1}`,
  enabled: true,
  categoryId: '',
  title: '',
  imageUrl: ''
}))

export const defaultHomeSettings = {
  sections: homeSections.map((section, index) => ({
    id: section.id,
    order: Number(section.order || index + 1),
    visible: section.visible !== false
  })),
  featuredCategories: {
    maxItems: 3,
    slots: defaultFeaturedSlots
  }
}

function normalizeSections(sections) {
  const savedSectionsById = (Array.isArray(sections) ? sections : []).reduce((acc, section) => {
    if (section?.id) {
      acc[section.id] = section
    }

    return acc
  }, {})

  return HOME_SECTION_OPTIONS.map((option, index) => {
    const defaultSection =
      defaultHomeSettings.sections.find((section) => section.id === option.id) || {}
    const savedSection = savedSectionsById[option.id] || {}

    return {
      id: option.id,
      order: Number(savedSection.order || defaultSection.order || index + 1),
      visible:
        typeof savedSection.visible === 'boolean'
          ? savedSection.visible
          : defaultSection.visible !== false
    }
  }).sort((a, b) => a.order - b.order)
}

function normalizeFeaturedSlots(slots) {
  const savedSlots = Array.isArray(slots) ? slots : []

  return defaultFeaturedSlots.map((defaultSlot, index) => {
    const savedSlot = savedSlots[index] || {}

    return {
      ...defaultSlot,
      ...savedSlot,
      id: savedSlot.id || defaultSlot.id,
      categoryId: savedSlot.categoryId ? String(savedSlot.categoryId) : '',
      title: savedSlot.title || '',
      imageUrl: savedSlot.imageUrl || savedSlot.image_url || '',
      enabled: savedSlot.enabled !== false
    }
  })
}

export function normalizeHomeSettings(settings = {}) {
  return {
    sections: normalizeSections(settings.sections),
    featuredCategories: {
      maxItems: 3,
      slots: normalizeFeaturedSlots(settings.featuredCategories?.slots)
    }
  }
}

export function loadHomeSettings() {
  if (typeof window === 'undefined') {
    return normalizeHomeSettings(defaultHomeSettings)
  }

  try {
    const savedSettings = window.localStorage.getItem(HOME_SETTINGS_STORAGE_KEY)

    if (!savedSettings) {
      return normalizeHomeSettings(defaultHomeSettings)
    }

    return normalizeHomeSettings(JSON.parse(savedSettings))
  } catch {
    return normalizeHomeSettings(defaultHomeSettings)
  }
}

export function saveHomeSettings(settings) {
  const normalizedSettings = normalizeHomeSettings(settings)

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(
      HOME_SETTINGS_STORAGE_KEY,
      JSON.stringify(normalizedSettings)
    )
    window.dispatchEvent(
      new CustomEvent(HOME_SETTINGS_EVENT, {
        detail: normalizedSettings
      })
    )
  }

  return normalizedSettings
}

export function resetHomeSettings() {
  const normalizedSettings = normalizeHomeSettings(defaultHomeSettings)

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(HOME_SETTINGS_STORAGE_KEY)
    window.dispatchEvent(
      new CustomEvent(HOME_SETTINGS_EVENT, {
        detail: normalizedSettings
      })
    )
  }

  return normalizedSettings
}
