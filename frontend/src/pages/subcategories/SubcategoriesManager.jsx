import { useEffect, useMemo, useState } from 'react'
import MenuAdm from '../../components/menu-adm/MenuAdm'
import styles from './SubcategoriesManager.Styles'

export default function SubcategoriesManager() {
    const [subcategories, setSubcategories] = useState([])
    const [categories, setCategories] = useState([])
    const [editingId, setEditingId] = useState(null)
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const [searchTerm, setSearchTerm] = useState('')
    const [categoryFilter, setCategoryFilter] = useState('')
    const [sortConfig, setSortConfig] = useState({
        key: 'id',
        direction: 'desc'
    })

    const [formData, setFormData] = useState({
        name: '',
        category_id: ''
    })

    useEffect(() => {
        loadSubcategories()
        loadCategories()
    }, [])

    async function loadSubcategories() {
        try {
            const response = await fetch('http://localhost:3000/subcategories')
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error loading subcategories')
            }

            const list = data.subcategories || data
            setSubcategories(list)
        } catch (error) {
            setMessage(error.message)
        }
    }

    async function loadCategories() {
        try {
            const response = await fetch('http://localhost:3000/categories')
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error loading categories')
            }

            const list = Array.isArray(data) ? data : data.categories || []
            const onlyActive = list.filter((category) => category.activated === true)
            setCategories(onlyActive)
        } catch (error) {
            setMessage(error.message)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)
        setMessage('')

        try {
            const url = editingId
                ? `http://localhost:3000/subcategories/${editingId}`
                : 'http://localhost:3000/subcategories'

            const method = editingId ? 'PUT' : 'POST'

            const payload = {
                name: formData.name,
                category_id: Number(formData.category_id)
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error saving subcategory')
            }

            setMessage(
                editingId
                    ? 'Subcategory updated successfully!'
                    : 'Subcategory created successfully!'
            )

            resetForm()
            loadSubcategories()
        } catch (error) {
            setMessage(error.message)
        } finally {
            setLoading(false)
        }
    }

    function handleEdit(subcategory) {
        setEditingId(subcategory.id)
        setFormData({
            name: subcategory.name || '',
            category_id: subcategory.category_id || ''
        })
        setMessage('')
    }

    function resetForm() {
        setEditingId(null)
        setFormData({
            name: '',
            category_id: ''
        })
    }

    async function handleDelete(id) {
        const confirmed = window.confirm('Do you really want to delete this subcategory?')
        if (!confirmed) return

        try {
            const response = await fetch(`http://localhost:3000/subcategories/${id}`, {
                method: 'DELETE'
            })

            const contentType = response.headers.get('content-type') || ''

            let data = null

            if (contentType.includes('application/json')) {
                data = await response.json()
            } else {
                const text = await response.text()
                throw new Error(
                    text?.includes('<!DOCTYPE')
                        ? 'A rota DELETE /subcategories/:id não existe no backend.'
                        : text || 'Error deleting subcategory'
                )
            }

            if (!response.ok) {
                throw new Error(data.message || 'Error deleting subcategory')
            }

            setMessage('Subcategory deleted successfully!')
            loadSubcategories()

            if (editingId === id) {
                resetForm()
            }
        } catch (error) {
            setMessage(error.message)
        }
    }
    async function handleDeactivate(id) {
        const confirmed = window.confirm('Do you really want to deactivate this subcategory?')
        if (!confirmed) return

        try {
            const response = await fetch(`http://localhost:3000/subcategories/${id}/deactivate`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const contentType = response.headers.get('content-type') || ''

            let data = null

            if (contentType.includes('application/json')) {
                data = await response.json()
            } else {
                const text = await response.text()
                throw new Error(
                    text?.includes('<!DOCTYPE')
                        ? 'A rota PATCH /subcategories/:id/deactivate não existe no backend.'
                        : text || 'Error deactivating subcategory'
                )
            }

            if (!response.ok) {
                throw new Error(data.message || 'Error deactivating subcategory')
            }

            setMessage('Subcategory deactivated successfully!')
            loadSubcategories()

            if (editingId === id) {
                resetForm()
            }
        } catch (error) {
            setMessage(error.message)
        }
    }

    function getCategoryName(categoryId) {
        const category = categories.find((item) => item.id === categoryId)
        return category ? category.name : '-'
    }

    function handleSort(key) {
        setSortConfig((prev) => {
            if (prev.key === key) {
                return {
                    key,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc'
                }
            }

            let defaultDirection = 'asc'

            if (key === 'id') {
                defaultDirection = 'desc'
            }

            return {
                key,
                direction: defaultDirection
            }
        })
    }

    function getSortIndicator(columnKey) {
        if (sortConfig.key !== columnKey) return '↕'
        return sortConfig.direction === 'asc' ? '↑' : '↓'
    }

    const processedSubcategories = useMemo(() => {
        let filtered = [...subcategories]

        if (searchTerm.trim()) {
            filtered = filtered.filter((subcategory) =>
                subcategory.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if (categoryFilter) {
            filtered = filtered.filter(
                (subcategory) => String(subcategory.category_id) === String(categoryFilter)
            )
        }

        filtered.sort((a, b) => {
            let valueA
            let valueB

            switch (sortConfig.key) {
                case 'id':
                    valueA = a.id
                    valueB = b.id
                    break

                case 'name':
                    valueA = a.name?.toLowerCase() || ''
                    valueB = b.name?.toLowerCase() || ''
                    break

                case 'category':
                    valueA = getCategoryName(a.category_id).toLowerCase()
                    valueB = getCategoryName(b.category_id).toLowerCase()
                    break

                case 'status':
                    valueA = a.activated ? 'active' : 'inactive'
                    valueB = b.activated ? 'active' : 'inactive'
                    break

                default:
                    valueA = a.id
                    valueB = b.id
            }

            if (valueA < valueB) {
                return sortConfig.direction === 'asc' ? -1 : 1
            }

            if (valueA > valueB) {
                return sortConfig.direction === 'asc' ? 1 : -1
            }

            return 0
        })

        return filtered
    }, [subcategories, searchTerm, categoryFilter, sortConfig, categories])
    async function handleDeactivate(id) {
        const confirmed = window.confirm('Do you really want to deactivate this subcategory?')
        if (!confirmed) return

        try {
            const response = await fetch(`http://localhost:3000/subcategories/${id}/deactivate`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const contentType = response.headers.get('content-type') || ''
            let data = null

            if (contentType.includes('application/json')) {
                data = await response.json()
            } else {
                const text = await response.text()
                throw new Error(
                    text?.includes('<!DOCTYPE')
                        ? 'A rota PATCH /subcategories/:id/deactivate não existe no backend.'
                        : text || 'Error deactivating subcategory'
                )
            }

            if (!response.ok) {
                throw new Error(data.message || 'Error deactivating subcategory')
            }

            setMessage('Subcategory deactivated successfully!')
            loadSubcategories()

            if (editingId === id) {
                resetForm()
            }
        } catch (error) {
            setMessage(error.message)
        }
    }

    async function handleDelete(id) {
        const confirmed = window.confirm('Do you really want to delete this subcategory?')
        if (!confirmed) return

        try {
            const response = await fetch(`http://localhost:3000/subcategories/${id}`, {
                method: 'DELETE'
            })

            const contentType = response.headers.get('content-type') || ''
            let data = null

            if (contentType.includes('application/json')) {
                data = await response.json()
            } else {
                const text = await response.text()
                throw new Error(
                    text?.includes('<!DOCTYPE')
                        ? 'A rota DELETE /subcategories/:id não existe no backend.'
                        : text || 'Error deleting subcategory'
                )
            }

            if (!response.ok) {
                throw new Error(data.message || 'Error deleting subcategory')
            }

            setMessage('Subcategory deleted successfully!')
            loadSubcategories()

            if (editingId === id) {
                resetForm()
            }
        } catch (error) {
            setMessage(error.message)
        }
    }
    async function handleActivate(id) {
        const confirmed = window.confirm('Do you want to activate this subcategory?')
        if (!confirmed) return

        try {
            const response = await fetch(`http://localhost:3000/subcategories/${id}/activate`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Error activating subcategory')
            }

            setMessage('Subcategory activated successfully!')
            loadSubcategories()
        } catch (error) {
            setMessage(error.message)
        }
    }

    return (
        <div style={styles.container}>
            <MenuAdm />

            <div style={styles.card}>
                <h1 style={styles.title}>Subcategories Manager</h1>

                {message && <p style={styles.message}>{message}</p>}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Subcategory name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />

                    <select
                        name="category_id"
                        value={formData.category_id}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <div style={styles.buttonRow}>
                        <button type="submit" style={styles.button} disabled={loading}>
                            {loading
                                ? 'Saving...'
                                : editingId
                                    ? 'Update Subcategory'
                                    : 'Add Subcategory'}
                        </button>

                        {editingId && (
                            <button type="button" style={styles.yellowButton} onClick={resetForm}>
                                Cancel
                            </button>
                        )}
                    </div>
                </form>

                <div style={styles.filtersRow}>
                    <input
                        type="text"
                        placeholder="Search subcategory"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={styles.input}
                    />

                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        style={styles.input}
                    >
                        <option value="">Todos</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>

                    <button
                        type="button"
                        style={styles.clearFilterButton}
                        onClick={() => {
                            setSearchTerm('')
                            setCategoryFilter('')
                            setSortConfig({ key: 'id', direction: 'desc' })
                        }}
                    >
                        Clear filters
                    </button>
                </div>

                <table style={styles.table}>
                    <thead>
                        <tr>
                            <th style={styles.sortableTh} onClick={() => handleSort('id')}>
                                <span style={styles.thContent}>
                                    ID <span style={styles.sortIcon}>{getSortIndicator('id')}</span>
                                </span>
                            </th>

                            <th style={styles.sortableTh} onClick={() => handleSort('name')}>
                                <span style={styles.thContent}>
                                    Subcategory <span style={styles.sortIcon}>{getSortIndicator('name')}</span>
                                </span>
                            </th>

                            <th style={styles.sortableTh} onClick={() => handleSort('category')}>
                                <span style={styles.thContent}>
                                    Category <span style={styles.sortIcon}>{getSortIndicator('category')}</span>
                                </span>
                            </th>

                            <th style={styles.sortableTh} onClick={() => handleSort('status')}>
                                <span style={styles.thContent}>
                                    Status <span style={styles.sortIcon}>{getSortIndicator('status')}</span>
                                </span>
                            </th>

                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {processedSubcategories.map((subcategory) => (
                            <tr key={subcategory.id}>
                                <td style={styles.td}>{subcategory.id}</td>
                                <td style={styles.td}>{subcategory.name}</td>
                                <td style={styles.td}>{getCategoryName(subcategory.category_id)}</td>
                                <td style={styles.td}>
                                    {subcategory.activated ? 'Active' : 'Inactive'}
                                </td>
                                <td style={styles.td}>
                                    <div style={styles.actions}>
                                        <button
                                            type="button"
                                            style={styles.button}
                                            onClick={() => handleEdit(subcategory)}
                                        >
                                            Edit
                                        </button>

                                        {subcategory.activated ? (
                                            <button
                                                type="button"
                                                style={styles.redButton}
                                                onClick={() => handleDeactivate(subcategory.id)}
                                            >
                                                Deactivate
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                style={styles.greenButton}
                                                onClick={() => handleActivate(subcategory.id)}
                                            >
                                                Activate
                                            </button>
                                        )}

                                        <button
                                            type="button"
                                            style={styles.redButton}
                                            onClick={() => handleDelete(subcategory.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}

                        {processedSubcategories.length === 0 && (
                            <tr>
                                <td colSpan="5" style={styles.emptyState}>
                                    No subcategories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
