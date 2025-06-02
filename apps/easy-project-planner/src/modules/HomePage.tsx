import React, { useState } from 'react';
import { GanttChart } from '../modules/GanttChart';
import { TaskLegend } from '../modules/TaskLegend';
import { ImportExport } from '../modules/ImportExport';
import { PlannerControl } from '../modules/PlannerControls';
import { computeTaskDates } from '../common/utils/gantt.utils';
import { defaultTasks } from '../data/consts/task.const';

export const HomePage = () => {
  const [tasks, setTasks] = useState(defaultTasks);
  const [startDate, setStartDate] = useState<Date>(new Date('2025-04-01'));
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [maxDevelopers, setMaxDevelopers] = useState<number>(1);

  const updatedTasks = computeTaskDates(tasks, {
    startDate,
    deadline,
    maxDevelopers,
  });

  const config = { startDate, deadline, maxDevelopers };

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-4">
        Easy IT Project – Planificateur technique
      </h1>

      <PlannerControl
        tasks={tasks}
        onOptimize={(newConfig) => {
          setStartDate(newConfig.startDate);
          setDeadline(newConfig.deadline);
          setMaxDevelopers(newConfig.maxDevelopers || 1);
        }}
      />

      <ImportExport tasks={updatedTasks} setTasks={setTasks} config={config} />

      <GanttChart tasks={updatedTasks} />

      <TaskLegend />
    </div>
  );
};
