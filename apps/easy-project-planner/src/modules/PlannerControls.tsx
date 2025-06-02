import React, { useState } from 'react';
import { Config } from '../data/models/config.m';
import {
  computeFastestPossiblePlan,
  getMaxParallelTasks,
  isFeasible,
} from '../common/utils/gantt.utils';
import { Task } from '../data/models/task.m';

interface PlannerControlsProps {
  tasks: Task[];
  onOptimize: (config: Config) => void;
}

export const PlannerControl: React.FC<PlannerControlsProps> = ({
  tasks,
  onOptimize,
}) => {
  const [startDate, setStartDate] = useState<Date>(new Date('2025-04-01'));
  const [deadline, setDeadline] = useState<Date | undefined>();
  const [maxDevelopers, setMaxDevelopers] = useState<number>(1);
  const [feasible, setFeasible] = useState<boolean | null>(null);

  const fastestPlan = computeFastestPossiblePlan(tasks);
  const minDeadlineDate = fastestPlan.endDate.toISOString().split('T')[0];
  const maxDevsPossible = getMaxParallelTasks(tasks);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const config = { startDate, deadline, maxDevelopers };
    const ok = isFeasible(tasks, config);
    setFeasible(ok);
    onOptimize(config);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <h3 className="font-bold mb-2">Options d'optimisation</h3>

      <label>
        Date de début :
        <input
          type="date"
          value={startDate.toISOString().split('T')[0]}
          onChange={(e) => setStartDate(new Date(e.target.value))}
          min={fastestPlan.startDate.toISOString().split('T')[0]}
        />
      </label>

      <label>
        Définir une deadline :
        <input
          type="date"
          value={deadline?.toISOString().split('T')[0] || ''}
          onChange={(e) =>
            setDeadline(e.target.value ? new Date(e.target.value) : undefined)
          }
          min={minDeadlineDate}
        />
      </label>

      <label>
        Nombre de développeurs :
        <input
          type="number"
          min="1"
          max={maxDevsPossible}
          value={maxDevelopers}
          onChange={(e) => setMaxDevelopers(parseInt(e.target.value))}
        />
      </label>

      <button type="submit">Calculer le planning</button>
      {!feasible && feasible !== null && (
        <p style={{ color: 'red' }}>⚠️ Ce paramétrage n’est pas réalisable.</p>
      )}
    </form>
  );
};
