import React from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';

const PRIORITIES = [
  { value: '', label: 'Tüm Öncelikler' },
  { value: 'low', label: 'Düşük' },
  { value: 'medium', label: 'Orta' },
  { value: 'high', label: 'Yüksek' },
  { value: 'urgent', label: 'Acil' }
];

const CATEGORIES = [
  { value: '', label: 'Tüm Kategoriler' },
  { value: 'work', label: 'İş' },
  { value: 'personal', label: 'Kişisel' },
  { value: 'shopping', label: 'Alışveriş' },
  { value: 'health', label: 'Sağlık' },
  { value: 'education', label: 'Eğitim' },
  { value: 'other', label: 'Diğer' }
];

const COMPLETION_STATUS = [
  { value: '', label: 'Tüm Görevler' },
  { value: 'false', label: 'Tamamlanmamış' },
  { value: 'true', label: 'Tamamlanmış' }
];

function TaskFilters({ filters, onFilterChange }) {
  const handleFilterChange = (filterName, value) => {
    const newValue = value === '' ? null : value;
    onFilterChange({ [filterName]: newValue });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    onFilterChange({ search: value });
  };

  const clearAllFilters = () => {
    onFilterChange({
      completed: null,
      priority: null,
      category: null,
      search: ''
    });
  };

  const hasActiveFilters = filters.completed !== null || 
                          filters.priority !== null || 
                          filters.category !== null || 
                          filters.search !== '';

  return (
    <div className="filters">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3>
          <FiFilter style={{ marginRight: '8px' }} />
          Filtreler
        </h3>
        {hasActiveFilters && (
          <button 
            onClick={clearAllFilters}
            className="btn btn-sm"
            style={{ background: '#e5e7eb', color: '#374151' }}
          >
            Filtreleri Temizle
          </button>
        )}
      </div>

      <div className="search-box">
        <div style={{ position: 'relative' }}>
          <FiSearch 
            style={{ 
              position: 'absolute', 
              left: '12px', 
              top: '50%', 
              transform: 'translateY(-50%)',
              color: '#6b7280',
              zIndex: 1
            }} 
          />
          <input
            type="text"
            placeholder="Görev başlığı veya açıklamasında ara..."
            value={filters.search || ''}
            onChange={handleSearchChange}
            className="form-input"
            style={{ paddingLeft: '40px' }}
          />
        </div>
      </div>

      <div className="filter-row">
        <div className="form-group">
          <label>Durum</label>
          <select
            value={filters.completed === null ? '' : filters.completed.toString()}
            onChange={(e) => handleFilterChange('completed', e.target.value)}
            className="form-select"
          >
            {COMPLETION_STATUS.map(status => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Öncelik</label>
          <select
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            className="form-select"
          >
            {PRIORITIES.map(priority => (
              <option key={priority.value} value={priority.value}>
                {priority.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Kategori</label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="form-select"
          >
            {CATEGORIES.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default TaskFilters;
