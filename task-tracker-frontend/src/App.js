import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilters from './components/TaskFilters';
import TaskStats from './components/TaskStats';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

function App() {
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
  const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
  });

  // Hata yönetimi
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      const message = error.response?.data?.detail || 'Bir hata oluştu';
      toast.error(message);
      console.error('API Error:', error);
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    fetchTasks();
    fetchStats();
  }, [filters]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      
      // Filtreleri ekle
      if (filters.completed !== null) params.completed = filters.completed;
      if (filters.priority) params.priority = filters.priority;
      if (filters.category) params.category = filters.category;
      if (filters.search) params.search = filters.search;
      
      const response = await api.get('/tasks/', { params });
      setTasks(response.data);
    } catch (error) {
      console.error('Görevler yüklenemedi:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get('/tasks/stats/summary');
      setStats(response.data);
    } catch (error) {
      console.error('İstatistikler yüklenemedi:', error);
    }
  };

  const createTask = async (taskData) => {
    try {
      await api.post('/tasks/', taskData);
      toast.success('Görev başarıyla oluşturuldu!');
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Görev oluşturulamadı:', error);
    }
  };

  const updateTask = async (taskId, taskData) => {
    try {
      await api.put(`/tasks/${taskId}`, taskData);
      toast.success('Görev güncellendi!');
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Görev güncellenemedi:', error);
    }
  };

  const toggleTaskCompletion = async (taskId) => {
    try {
      await api.patch(`/tasks/${taskId}/toggle`);
      toast.success('Görev durumu değiştirildi!');
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Görev durumu değiştirilemedi:', error);
    }
  };

  const deleteTask = async (taskId) => {
    if (!window.confirm('Bu görevi silmek istediğinizden emin misiniz?')) {
      return;
    }
    
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success('Görev silindi!');
      fetchTasks();
      fetchStats();
    } catch (error) {
      console.error('Görev silinemedi:', error);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      ...newFilters
    }));
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Görev Takip Sistemi</h1>
        <p>Görevlerinizi organize edin ve takip edin</p>
      </div>

      {stats && <TaskStats stats={stats} />}

      <div className="main-content">
        <div>
          <TaskForm onSubmit={createTask} />
        </div>
        
        <div>
          <TaskFilters 
            filters={filters}
            onFilterChange={handleFilterChange}
          />
          
          <TaskList
            tasks={tasks}
            loading={loading}
            onToggleComplete={toggleTaskCompletion}
            onUpdate={updateTask}
            onDelete={deleteTask}
          />
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;