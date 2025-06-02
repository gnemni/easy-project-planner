import React, { useState } from 'react';
import * as XLSX from 'xlsx';

import { RawTask } from '../data/models/raw-task.m';
import { parseExcelTask } from '../data/services/taskParser';
import { exportToExcel } from '../common/utils/export.utils';
import { Config } from '../data/models/config.m';
import { Task } from '../data/models/task.m';

interface ImportExportProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  config: Config; // ← On reçoit la configuration
}

export const ImportExport: React.FC<ImportExportProps> = ({
  tasks,
  setTasks,
  config,
}) => {
  const [fileName, setFileName] = useState<string>('');

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: 'binary' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json<RawTask>(ws);

      const parsedTasks = data.map(parseExcelTask);
      setTasks(parsedTasks);
      setFileName(file.name);
    };
    reader.readAsBinaryString(file);
  };

  const handleExport = () => {
    exportToExcel(tasks, config); // ← Maintenant, on a accès à config
  };

  return (
    <div className="mb-5">
      <h3 className="font-bold mb-2">Importer / Exporter</h3>
      <input type="file" accept=".xlsx" onChange={handleImport} />
      {fileName && <p>Fichier chargé : {fileName}</p>}
      <button onClick={handleExport}>
        Exporter vers Excel (avec planning)
      </button>
    </div>
  );
};
