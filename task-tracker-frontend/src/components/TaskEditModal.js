import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { FiX, FiSave } from 'react-icons/fi';

const PRIORITIES = [
  { value: 'low', label: 'Düşük' },
  { value: 'medium', label: 'Orta' },
  { value: 'high', label: 'Yüksek' },
  { value: 'urgent', label: 'Acil' }
];

const CATEGORIES = [
  { value: 'work', label: 'İş' },
  { value: 'personal', label: 'Kişisel' },
  { value: 'shopping', label: 'Alışveriş' },
  { value: 'health', label: 'Sağlık' },
  { value: 'education', label: 'Eğitim' },
  { value: 'other', label: 'Diğer' }
];

function TaskEditModal({ task, onUpdate, onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'other',
    due_date: null,
    completed: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category: task.category || 'other',
        due_date: task.due_date ? new Date(task.due_date) : null,
        completed: task.completed || false
      });
    }
  }, [task]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleDateChange = (date) => {
    setFormData(prev => ({
      ...prev,
      due_date: date
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    
    try {
      const submitData = {
        ...formData,
        due_date: formData.due_date ? formData.due_date.toISOString() : null
      };
      
      await onUpdate(submitData);
    } catch (error) {
      console.error('Görev güncelleme hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="modal-backdrop" 
      onClick={handleBackdropClick}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px'
      }}
    >
      <div 
        className="modal-content"
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '30px',
          width: '100%',
          maxWidth: '500px',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ margin: 0, color: '#1f2937' }}>Görevi Düzenle</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              borderRadius: '6px',
              color: '#6b7280'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f3f4f6'}
            onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}
          >
            <FiX size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="edit-title">Görev Başlığı *</label>
            <input
              type="text"
              id="edit-title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-input"
              placeholder="Görev başlığını girin..."
              required
              maxLength={200}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-description">Açıklama</label>
            <textarea
              id="edit-description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="form-input form-textarea"
              placeholder="Görev açıklamasını girin..."
              maxLength={1000}
              rows={3}
            />
          </div>

          <div className="form-group">
            <label htmlFor="edit-priority">Öncelik</label>
            <select
              id="edit-priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
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
            <label htmlFor="edit-category">Kategori</label>
            <select
              id="edit-category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="form-select"
            >
              {CATEGORIES.map(category => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Bitiş Tarihi</label>
            <DatePicker
              selected={formData.due_date}
              onChange={handleDateChange}
              className="form-input"
              placeholderText="Bitiş tarihi seçin..."
              dateFormat="dd/MM/yyyy"
              minDate={new Date()}
              isClearable
              showYearDropdown
              showMonthDropdown
              dropdownMode="select"
            />
          </div>

          <div className="form-group">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="completed"
                checked={formData.completed}
                onChange={handleChange}
                style={{ width: 'auto' }}
              />
              Görev tamamlandı
            </label>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '30px' }}>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={isSubmitting || !formData.title.trim()}
              style={{ flex: 1 }}
            >
              <FiSave />
              {isSubmitting ? 'Güncelleniyor...' : 'Güncelle'}
            </button>
            
            <button 
              type="button"
              onClick={onClose}
              className="btn"
              style={{ 
                flex: 1,
                background: '#e5e7eb',
                color: '#374151'
              }}
            >
              İptal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TaskEditModal;
