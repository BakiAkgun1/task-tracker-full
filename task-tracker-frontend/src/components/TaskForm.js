import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FiPlus } from 'react-icons/fi';

const PRIORITIES = [
  { value: 'low', label: 'Düşük', color: '#10b981' },
  { value: 'medium', label: 'Orta', color: '#f59e0b' },
  { value: 'high', label: 'Yüksek', color: '#ef4444' },
  { value: 'urgent', label: 'Acil', color: '#dc2626' }
];

const CATEGORIES = [
  { value: 'work', label: 'İş' },
  { value: 'personal', label: 'Kişisel' },
  { value: 'shopping', label: 'Alışveriş' },
  { value: 'health', label: 'Sağlık' },
  { value: 'education', label: 'Eğitim' },
  { value: 'other', label: 'Diğer' }
];

function TaskForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: 'other',
    due_date: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
      
      await onSubmit(submitData);
      
      // Form'u temizle
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'other',
        due_date: null
      });
    } catch (error) {
      console.error('Form gönderme hatası:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="task-form">
      <h2>Yeni Görev Ekle</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Görev Başlığı *</label>
          <input
            type="text"
            id="title"
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
          <label htmlFor="description">Açıklama</label>
          <textarea
            id="description"
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
          <label htmlFor="priority">Öncelik</label>
          <select
            id="priority"
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
          <label htmlFor="category">Kategori</label>
          <select
            id="category"
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

        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting || !formData.title.trim()}
        >
          <FiPlus />
          {isSubmitting ? 'Ekleniyor...' : 'Görev Ekle'}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
