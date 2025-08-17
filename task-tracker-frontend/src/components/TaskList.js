import React, { useState } from 'react';
import { FiCheck, FiX, FiEdit3, FiCalendar, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import TaskEditModal from './TaskEditModal';

const PRIORITY_LABELS = {
  low: 'Düşük',
  medium: 'Orta', 
  high: 'Yüksek',
  urgent: 'Acil'
};

const CATEGORY_LABELS = {
  work: 'İş',
  personal: 'Kişisel',
  shopping: 'Alışveriş',
  health: 'Sağlık',
  education: 'Eğitim',
  other: 'Diğer'
};

function TaskList({ tasks, loading, onToggleComplete, onUpdate, onDelete }) {
  const [editingTask, setEditingTask] = useState(null);

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd MMM yyyy', { locale: tr });
    } catch {
      return 'Geçersiz tarih';
    }
  };

  const isOverdue = (dueDateString) => {
    if (!dueDateString) return false;
    return new Date(dueDateString) < new Date();
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleUpdate = async (taskData) => {
    if (editingTask) {
      await onUpdate(editingTask.id, taskData);
      setEditingTask(null);
    }
  };

  if (loading) {
    return (
      <div className="task-list">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Görevler yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="task-list">
        <div className="empty-state">
          <FiCheck size={64} />
          <h3>Henüz görev yok</h3>
          <p>İlk görevinizi ekleyerek başlayın!</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="task-list">
        <h3>Görevler ({tasks.length})</h3>
        
        {tasks.map(task => (
          <div key={task.id} className="task-item">
            <div className="task-header">
              <div>
                <div className={`task-title ${task.completed ? 'completed' : ''}`}>
                  {task.title}
                </div>
                {task.description && (
                  <div className="task-description">
                    {task.description}
                  </div>
                )}
              </div>
            </div>

            <div className="task-meta">
              <span className={`task-badge priority-${task.priority}`}>
                {PRIORITY_LABELS[task.priority]}
              </span>
              
              <span className={`task-badge category-${task.category}`}>
                {CATEGORY_LABELS[task.category]}
              </span>

              {task.due_date && (
                <span className={`task-date ${isOverdue(task.due_date) && !task.completed ? 'overdue' : ''}`}>
                  <FiCalendar size={14} style={{ marginRight: '4px' }} />
                  {formatDate(task.due_date)}
                  {isOverdue(task.due_date) && !task.completed && ' (Gecikmiş)'}
                </span>
              )}

              <span className="task-date">
                <FiClock size={14} style={{ marginRight: '4px' }} />
                {formatDate(task.created_at)}
              </span>
            </div>

            <div className="task-actions">
              <button
                onClick={() => onToggleComplete(task.id)}
                className={`btn btn-sm ${task.completed ? 'btn-warning' : 'btn-success'}`}
                title={task.completed ? 'Tamamlanmamış olarak işaretle' : 'Tamamlandı olarak işaretle'}
              >
                <FiCheck />
                {task.completed ? 'Geri Al' : 'Tamamla'}
              </button>

              <button
                onClick={() => handleEdit(task)}
                className="btn btn-sm btn-warning"
                title="Görevi düzenle"
              >
                <FiEdit3 />
                Düzenle
              </button>

              <button
                onClick={() => onDelete(task.id)}
                className="btn btn-sm btn-danger"
                title="Görevi sil"
              >
                <FiX />
                Sil
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onUpdate={handleUpdate}
          onClose={() => setEditingTask(null)}
        />
      )}
    </>
  );
}

export default TaskList;
