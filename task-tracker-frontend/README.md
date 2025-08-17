# 🎨 Task Tracker Frontend - React

Modern React 18 tabanlı kullanıcı arayüzü. Responsive tasarım, real-time güncellemeler ve kullanıcı dostu deneyim.

## ✨ Özellikler

- **React 18**: Modern hooks ve concurrent features
- **Responsive Design**: Mobil-first yaklaşım
- **Real-time Updates**: Anında veri senkronizasyonu
- **Modern UI/UX**: Gradient backgrounds ve smooth animations
- **Toast Notifications**: Kullanıcı bildirimleri
- **Modal Editing**: Inline düzenleme deneyimi
- **Advanced Filtering**: Çoklu filtre desteği
- **Date Picker**: Kolay tarih seçimi
- **Statistics Dashboard**: Görsel veri analizi

## 🛠 Teknolojiler

### Core
- **React 18.2.0** - UI library
- **Axios 1.6.0** - HTTP client
- **React Scripts 5.0.1** - Build tools

### UI Components
- **React Icons 4.12.0** - Icon library
- **React DatePicker 4.25.0** - Date selection
- **React Toastify 9.1.3** - Notifications
- **React Select 5.8.0** - Advanced dropdowns

### Utilities
- **date-fns 2.30.0** - Date formatting
- **CSS3** - Modern styling with Flexbox/Grid

## 🎨 UI Bileşenleri

### Ana Bileşenler
```
src/
├── App.js                    # Ana uygulama container
├── components/
│   ├── TaskForm.js          # Görev oluşturma formu
│   ├── TaskList.js          # Görev listesi
│   ├── TaskFilters.js       # Filtreleme bileşeni
│   ├── TaskStats.js         # İstatistik dashboard
│   └── TaskEditModal.js     # Düzenleme modalı
├── index.css                # Global stiller
└── index.js                 # Uygulama giriş noktası
```

## 🎯 Bileşen Detayları

### TaskForm
Yeni görev oluşturma formu:
```jsx
<TaskForm onSubmit={createTask} />
```

**Özellikler:**
- Validasyon ile form kontrolü
- Öncelik ve kategori seçimi
- Bitiş tarihi seçici
- Real-time validation
- Loading states

### TaskList
Görev listesi ve yönetimi:
```jsx
<TaskList
  tasks={tasks}
  loading={loading}
  onToggleComplete={toggleTask}
  onUpdate={updateTask}
  onDelete={deleteTask}
/>
```

**Özellikler:**
- Sonsuz scroll desteği
- Bulk operations
- Drag & drop sıralama
- Context menu
- Keyboard shortcuts

### TaskFilters
Gelişmiş filtreleme sistemi:
```jsx
<TaskFilters
  filters={filters}
  onFilterChange={handleFilterChange}
/>
```

**Filtre Türleri:**
- Durum: Tümü / Tamamlanan / Bekleyen
- Öncelik: Düşük / Orta / Yüksek / Acil
- Kategori: İş / Kişisel / Alışveriş / Sağlık / Eğitim / Diğer
- Arama: Başlık ve açıklama araması

### TaskStats
İstatistik dashboard'u:
```jsx
<TaskStats stats={stats} />
```

**Metrikler:**
- Toplam görev sayısı
- Tamamlanan görev sayısı
- Bekleyen görev sayısı
- Tamamlanma yüzdesi
- Öncelik dağılımı
- Kategori dağılımı

## 🎨 Tasarım Sistemi

### Renk Paleti
```css
/* Ana Renkler */
--primary: #3b82f6;      /* Mavi */
--success: #10b981;      /* Yeşil */
--warning: #f59e0b;      /* Turuncu */
--danger: #ef4444;       /* Kırmızı */

/* Öncelik Renkleri */
--priority-low: #10b981;     /* Yeşil */
--priority-medium: #f59e0b;  /* Turuncu */
--priority-high: #ef4444;    /* Kırmızı */
--priority-urgent: #dc2626;  /* Koyu Kırmızı */

/* Kategori Renkleri */
--category-work: #1e40af;       /* Koyu Mavi */
--category-personal: #5b21b6;   /* Mor */
--category-shopping: #166534;   /* Koyu Yeşil */
--category-health: #dc2626;     /* Kırmızı */
--category-education: #d97706;  /* Turuncu */
--category-other: #374151;      /* Gri */
```

### Typography
```css
/* Font Ailesi */
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;

/* Font Boyutları */
--text-xs: 0.75rem;    /* 12px */
--text-sm: 0.875rem;   /* 14px */
--text-base: 1rem;     /* 16px */
--text-lg: 1.125rem;   /* 18px */
--text-xl: 1.25rem;    /* 20px */
--text-2xl: 1.5rem;    /* 24px */
--text-3xl: 1.875rem;  /* 30px */
```

### Spacing
```css
/* Margin & Padding */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
```

## 📱 Responsive Design

### Breakpoints
```css
/* Mobile First */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Layout Adaptasyonu
- **Mobile (< 768px)**: Single column, stacked layout
- **Tablet (768px - 1024px)**: Two column, sidebar collapse
- **Desktop (> 1024px)**: Multi-column, full sidebar

## 🔧 State Management

### React Hooks Kullanımı
```jsx
// Ana state
const [tasks, setTasks] = useState([]);
const [stats, setStats] = useState(null);
const [loading, setLoading] = useState(true);
const [filters, setFilters] = useState({
  completed: null,
  priority: null,
  category: null,
  search: ''
});

// API çağrıları
useEffect(() => {
  fetchTasks();
  fetchStats();
}, [filters]);
```

### Context API (Gelecek)
```jsx
// TaskContext.js
const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  // Global state management
};
```

## 🌐 API Entegrasyonu

### Axios Configuration
```javascript
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8000',
  timeout: 10000,
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.detail || 'Bir hata oluştu';
    toast.error(message);
    return Promise.reject(error);
  }
);
```

### API Methods
```javascript
// CRUD Operations
const createTask = async (taskData) => {
  const response = await api.post('/tasks/', taskData);
  return response.data;
};

const fetchTasks = async (filters = {}) => {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== null && value !== '') {
      params.append(key, value);
    }
  });
  
  const response = await api.get(`/tasks/?${params}`);
  return response.data;
};
```

## 🎭 Animasyonlar

### CSS Transitions
```css
/* Button hover effects */
.btn {
  transition: all 0.2s ease;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Card hover effects */
.task-item {
  transition: background-color 0.2s ease;
}

.task-item:hover {
  background-color: #f9fafb;
}
```

### Loading States
```jsx
// Loading spinner
const LoadingSpinner = () => (
  <div className="loading">
    <div className="loading-spinner"></div>
    <p>Görevler yükleniyor...</p>
  </div>
);

// Skeleton loading
const TaskSkeleton = () => (
  <div className="task-skeleton">
    <div className="skeleton-line"></div>
    <div className="skeleton-line short"></div>
  </div>
);
```

## 🚀 Performance Optimizations

### React Optimizations
```jsx
// Memoization
const TaskList = React.memo(({ tasks, onUpdate, onDelete }) => {
  // Component logic
});

// Callback memoization
const handleTaskUpdate = useCallback((taskId, updates) => {
  // Update logic
}, []);

// Effect dependencies
useEffect(() => {
  fetchTasks();
}, [filters]); // Sadece filters değiştiğinde çalış
```

### Bundle Optimization
```javascript
// Code splitting
const TaskEditModal = lazy(() => import('./TaskEditModal'));

// Conditional loading
{showModal && (
  <Suspense fallback={<div>Loading...</div>}>
    <TaskEditModal />
  </Suspense>
)}
```

## 🧪 Testing

### Component Testing
```jsx
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from './TaskForm';

test('creates new task', async () => {
  const onSubmit = jest.fn();
  render(<TaskForm onSubmit={onSubmit} />);
  
  fireEvent.change(screen.getByLabelText('Görev Başlığı'), {
    target: { value: 'Test Task' }
  });
  
  fireEvent.click(screen.getByText('Görev Ekle'));
  
  expect(onSubmit).toHaveBeenCalledWith({
    title: 'Test Task',
    // ...
  });
});
```

## 🐳 Docker Build

### Multi-stage Build
```dockerfile
# Development stage
FROM node:20-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]

# Production stage
FROM nginx:alpine AS production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🔧 Environment Configuration

### Environment Variables
```bash
# .env
REACT_APP_API_URL=http://localhost:8000
REACT_APP_VERSION=2.0.0
REACT_APP_ENVIRONMENT=development

# .env.production
REACT_APP_API_URL=https://api.yourdomain.com
REACT_APP_VERSION=2.0.0
REACT_APP_ENVIRONMENT=production
```

### Build Scripts
```json
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "build:prod": "npm run build && serve -s build"
  }
}
```

## 📊 Bundle Analysis

### Analyzing Bundle Size
```bash
# Bundle analyzer
npm install --save-dev webpack-bundle-analyzer
npm run build
npx webpack-bundle-analyzer build/static/js/*.js
```

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **Bundle Size**: < 2MB

## 🎯 Accessibility

### ARIA Labels
```jsx
<button
  aria-label="Görevi tamamlandı olarak işaretle"
  onClick={() => onToggleComplete(task.id)}
>
  <FiCheck />
</button>
```

### Keyboard Navigation
```jsx
const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleSubmit();
  } else if (e.key === 'Escape') {
    handleCancel();
  }
};
```

## 🐛 Error Boundaries

### Error Handling
```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Bir şeyler yanlış gitti.</h1>;
    }
    return this.props.children;
  }
}
```

## 📋 Changelog

### v2.0.0 (2024-12-19)
- ✅ Modern React 18 upgrade
- ✅ Component-based architecture
- ✅ Advanced filtering system
- ✅ Statistics dashboard
- ✅ Modal editing
- ✅ Toast notifications
- ✅ Responsive design
- ✅ Performance optimizations

### v1.0.0 (2024-12-18)
- ✅ Basic task management
- ✅ Simple UI
- ✅ CRUD operations

---

## 🤝 Katkıda Bulunma

1. UI/UX iyileştirmeleri için pull request açın
2. Component testleri ekleyin
3. Accessibility standartlarına uyun
4. Performance metrics'i koruyun

## 🎨 Design System

Figma dosyası: [Task Tracker Design System](https://figma.com/...)

## 📞 Frontend Desteği

Frontend ile ilgili sorularınız için:
- GitHub Issues: Bug reports
- Discussions: Feature requests