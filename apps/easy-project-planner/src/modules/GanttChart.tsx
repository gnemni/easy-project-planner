import React, { useEffect, useState } from 'react';
import '../assets/frappe-gantt.css';
import { Task } from '../data/models/task.m';
import Gantt from 'frappe-gantt';

export interface FrappeGanttTask {
  id: string;
  name: string;
  start: string;
  end: string;
  progress?: number;
  dependencies?: string;
}

interface GanttChartProps {
  tasks: Task[];
}

export const GanttChart: React.FC<GanttChartProps> = ({ tasks }) => {
  const [ganttTasks, setGanttTasks] = useState<Gantt.Task[]>([]);

  useEffect(() => {
    const formatted = tasks.map((task) => ({
      id: `task-${task.id}`,
      name: task.name,
      start: task.startDate?.toISOString().split('T')[0] || '',
      end: task.endDate?.toISOString().split('T')[0] || '',
      progress: 30,
      dependencies: task.dependencies.join(',') || '',
    }));
    setGanttTasks(formatted);
  }, [tasks]);

  useEffect(() => {
    if (ganttTasks.length === 0) return;

    const ganttOptions: Gantt.Options = {
      on_date_change: (task: Gantt.Task, start: Date, end: Date) => {
        console.log('Date changée:', task, start, end);
      },
      view_mode: 'Day',
      language: 'fr',
    };

    const gantt = new Gantt('#gantt', ganttTasks, ganttOptions);

    return () => {
      // Nettoyage si nécessaire
    };
  }, [ganttTasks]);

  return (
    <div className="w-full mt-5">
      <h3 className="font-bold mb-2">Diagramme de Gantt</h3>
      <div id="gantt" style={{ width: '100%', height: '600px' }}></div>
    </div>
  );
};
