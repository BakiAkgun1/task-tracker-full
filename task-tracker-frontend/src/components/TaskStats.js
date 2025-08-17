import React from 'react';
import { FiCheckCircle, FiClock, FiList } from 'react-icons/fi';

function TaskStats({ stats }) {
  if (!stats) return null;

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3 className="stat-total">{stats.total}</h3>
        <p>
          <FiList style={{ marginRight: '4px' }} />
          Toplam Görev
        </p>
      </div>
      
      <div className="stat-card">
        <h3 className="stat-completed">{stats.completed}</h3>
        <p>
          <FiCheckCircle style={{ marginRight: '4px' }} />
          Tamamlanan
        </p>
      </div>
      
      <div className="stat-card">
        <h3 className="stat-pending">{stats.pending}</h3>
        <p>
          <FiClock style={{ marginRight: '4px' }} />
          Bekleyen
        </p>
      </div>
      
      <div className="stat-card">
        <h3 style={{ color: completionRate >= 80 ? '#10b981' : completionRate >= 50 ? '#f59e0b' : '#ef4444' }}>
          %{completionRate}
        </h3>
        <p>Tamamlanma Oranı</p>
      </div>
    </div>
  );
}

export default TaskStats;
