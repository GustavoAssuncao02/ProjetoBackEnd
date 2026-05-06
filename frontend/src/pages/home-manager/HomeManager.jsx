import { useEffect, useMemo, useState } from 'react'
import MenuAdm from '../../components/menu-adm/MenuAdm'
import {
  HOME_SECTION_OPTIONS,
  loadHomeSettings,
  resetHomeSettings,
  saveHomeSettings
} from '../../config/homeSettings'
import { getImageUrl } from '../../utils/catalogImages'
import styles from './homeManager.styles'

function getCategoryId(product) {
  return String(product.category_id || product.categories?.id || '')
}

function getSectionLabel(sectionId) {
  return (
    HOME_SECTION_OPTIONS.find((section) => section.id === sectionId)?.label || sectionId
  )
}

function reorderSections(sections) {
  return sections.map((section, index) => ({
    ...section,
    order: index + 1
  }))
}

function createImageOptions(products, variants) {
  const productsById = products.reduce((acc, product) => {
    acc[String(product.id)] = product
    return acc
  }, {})

  return variants.flatMap((variant) => {
    const product = productsById[String(variant.product_id)]

    if (!product || !variant.product_images?.length) {
      return []
    }

    return variant.product_images
      .map((image) => ({
        imageUrl: getImageUrl(image.image_url),
        color: image.color || variant.color || ''
      }))
      .filter((image) => image.imageUrl)
      .map((image) => ({
        id: `${variant.id}-${image.imageUrl}`,
        url: image.imageUrl,
        productName: product.name,
        categoryId: getCategoryId(product),
        color: image.color
      }))
  })
}

export default function HomeManager() {
  const [settings, setSettings] = useState(() => loadHomeSettings())
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [variants, setVariants] = useState([])
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')
  const [savedRecently, setSavedRecently] = useState(false)

  useEffect(() => {
    if (!savedRecently) {
      return
    }

    const timer = window.setTimeout(() => {
      setSavedRecently(false)
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [savedRecently])

  useEffect(() => {
    async function loadCatalog() {
      try {
        const [categoriesResponse, productsResponse, variantsResponse] = await Promise.all([
          fetch('http://localhost:3000/categories'),
          fetch('http://localhost:3000/products'),
          fetch('http://localhost:3000/variants')
        ])

        const [categoriesData, productsData, variantsData] = await Promise.all([
          categoriesResponse.json(),
          productsResponse.json(),
          variantsResponse.json()
        ])

        if (!categoriesResponse.ok || !productsResponse.ok || !variantsResponse.ok) {
          throw new Error('Erro ao carregar catalogo da tela principal')
        }

        setCategories(Array.isArray(categoriesData) ? categoriesData : [])
        setProducts(Array.isArray(productsData) ? productsData : [])
        setVariants(Array.isArray(variantsData) ? variantsData : [])
      } catch (error) {
        setMessageType('error')
        setMessage(error.message)
      }
    }

    loadCatalog()
  }, [])

  const orderedSections = useMemo(() => {
    return [...settings.sections].sort((a, b) => a.order - b.order)
  }, [settings.sections])

  const activeCategories = useMemo(() => {
    return categories
      .filter((category) => category.activated !== false)
      .sort((a, b) => (a.name || '').localeCompare(b.name || ''))
  }, [categories])

  const imageOptions = useMemo(() => {
    return createImageOptions(products, variants)
  }, [products, variants])

  function getCategoryName(categoryId) {
    return (
      activeCategories.find((category) => String(category.id) === String(categoryId))?.name ||
      ''
    )
  }

  function getImageOptionsForCategory(categoryId) {
    if (!categoryId) {
      return []
    }

    return imageOptions.filter((imageOption) => imageOption.categoryId === String(categoryId))
  }

  function updateSection(sectionId, patch) {
    setSettings((prev) => ({
      ...prev,
      sections: prev.sections.map((section) =>
        section.id === sectionId ? { ...section, ...patch } : section
      )
    }))
  }

  function moveSection(sectionId, direction) {
    setSettings((prev) => {
      const nextSections = [...prev.sections].sort((a, b) => a.order - b.order)
      const currentIndex = nextSections.findIndex((section) => section.id === sectionId)
      const nextIndex = currentIndex + direction

      if (currentIndex < 0 || nextIndex < 0 || nextIndex >= nextSections.length) {
        return prev
      }

      const currentSection = nextSections[currentIndex]
      nextSections[currentIndex] = nextSections[nextIndex]
      nextSections[nextIndex] = currentSection

      return {
        ...prev,
        sections: reorderSections(nextSections)
      }
    })
  }

  function updateSlot(slotIndex, patch) {
    setSettings((prev) => ({
      ...prev,
      featuredCategories: {
        ...prev.featuredCategories,
        slots: prev.featuredCategories.slots.map((slot, index) =>
          index === slotIndex ? { ...slot, ...patch } : slot
        )
      }
    }))
  }

  function handleCategoryChange(slotIndex, categoryId) {
    updateSlot(slotIndex, {
      categoryId,
      imageUrl: '',
      title: ''
    })
  }

  function handleSave() {
    const savedSettings = saveHomeSettings(settings)
    setSettings(savedSettings)
    setMessageType('success')
    setMessage('Tela salva com sucesso.')
    setSavedRecently(true)
  }

  function handleReset() {
    const confirmed = window.confirm('Restaurar a configuracao padrao da tela principal?')

    if (!confirmed) {
      return
    }

    setSettings(resetHomeSettings())
    setMessageType('success')
    setMessage('Configuracao padrao restaurada.')
  }

  return (
    <div style={styles.container}>
      <MenuAdm />

      <main style={styles.card}>
        <h1 style={styles.title}>Gerenciar Tela principal</h1>
        <p style={styles.subtitle}>
          Altere a ordem dos blocos da Home e escolha as tres categorias de produtos
          com as imagens que devem aparecer no destaque.
        </p>

        {message && (
          <p
            role="status"
            style={{
              ...styles.message,
              ...(messageType === 'error' ? styles.messageError : styles.messageSuccess)
            }}
          >
            {message}
          </p>
        )}

        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <h2 style={styles.panelTitle}>Ordem dos componentes</h2>
              <p style={styles.panelText}>
                Use subir e descer para reorganizar a tela principal. Itens invisiveis
                ficam salvos, mas nao aparecem na Home.
              </p>
            </div>
          </div>

          <div style={styles.sectionList}>
            {orderedSections.map((section, index) => {
              const isFirst = index === 0
              const isLast = index === orderedSections.length - 1

              return (
                <div key={section.id} style={styles.sectionRow}>
                  <span style={styles.orderNumber}>{index + 1}</span>
                  <p style={styles.sectionName}>{getSectionLabel(section.id)}</p>

                  <label style={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={section.visible}
                      onChange={(e) =>
                        updateSection(section.id, { visible: e.target.checked })
                      }
                      style={styles.checkbox}
                    />
                    Visivel
                  </label>

                  <div style={styles.rowActions}>
                    <button
                      type="button"
                      onClick={() => moveSection(section.id, -1)}
                      disabled={isFirst}
                      style={{
                        ...styles.smallButton,
                        ...(isFirst ? styles.disabledButton : {})
                      }}
                    >
                      Subir
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(section.id, 1)}
                      disabled={isLast}
                      style={{
                        ...styles.smallButton,
                        ...(isLast ? styles.disabledButton : {})
                      }}
                    >
                      Descer
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <h2 style={styles.panelTitle}>Tres categorias de produtos</h2>
              <p style={styles.panelText}>
                Se uma imagem nao for escolhida, a Home usa uma foto aleatoria dos produtos
                daquela categoria.
              </p>
            </div>
          </div>

          <div style={styles.slotsGrid}>
            {settings.featuredCategories.slots.map((slot, slotIndex) => {
              const categoryImages = getImageOptionsForCategory(slot.categoryId)
              const selectedCategoryName = getCategoryName(slot.categoryId)

              return (
                <article key={slot.id} style={styles.slotBox}>
                  <div style={styles.slotHeader}>
                    <h3 style={styles.slotTitle}>Destaque {slotIndex + 1}</h3>
                    <label style={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={slot.enabled}
                        onChange={(e) =>
                          updateSlot(slotIndex, { enabled: e.target.checked })
                        }
                        style={styles.checkbox}
                      />
                      Ativo
                    </label>
                  </div>

                  <label style={styles.field}>
                    <span style={styles.label}>Categoria</span>
                    <select
                      value={slot.categoryId}
                      onChange={(e) => handleCategoryChange(slotIndex, e.target.value)}
                      style={styles.input}
                    >
                      <option value="">Selecionar categoria</option>
                      {activeCategories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={styles.field}>
                    <span style={styles.label}>Titulo exibido</span>
                    <input
                      type="text"
                      value={slot.title}
                      onChange={(e) => updateSlot(slotIndex, { title: e.target.value })}
                      placeholder={selectedCategoryName || 'Usa o nome da categoria'}
                      style={styles.input}
                    />
                  </label>

                  <div style={styles.field}>
                    <span style={styles.label}>Foto</span>

                    {!slot.categoryId ? (
                      <div style={styles.emptyState}>Selecione uma categoria primeiro.</div>
                    ) : categoryImages.length === 0 ? (
                      <div style={styles.emptyState}>
                        Nenhuma imagem encontrada para essa categoria.
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => updateSlot(slotIndex, { imageUrl: '' })}
                          style={styles.secondaryButton}
                        >
                          Usar foto aleatoria
                        </button>

                        <div style={styles.imageGrid}>
                          {categoryImages.map((imageOption) => (
                            <button
                              key={imageOption.id}
                              type="button"
                              onClick={() =>
                                updateSlot(slotIndex, { imageUrl: imageOption.url })
                              }
                              style={{
                                ...styles.imageOption,
                                ...(slot.imageUrl === imageOption.url
                                  ? styles.imageOptionSelected
                                  : {})
                              }}
                            >
                              <img
                                src={imageOption.url}
                                alt={imageOption.productName}
                                style={styles.imageThumb}
                                referrerPolicy="no-referrer"
                              />
                              <span style={styles.imageName}>
                                {imageOption.productName}
                                {imageOption.color ? ` - ${imageOption.color}` : ''}
                              </span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </section>

        <div style={styles.footerActions}>
          <button type="button" style={styles.dangerButton} onClick={handleReset}>
            Restaurar padrao
          </button>

          <button type="button" style={styles.primaryButton} onClick={handleSave}>
            {savedRecently ? 'Tela salva com sucesso' : 'Salvar tela principal'}
          </button>
        </div>
      </main>
    </div>
  )
}
