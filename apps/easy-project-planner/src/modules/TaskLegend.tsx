import React from 'react';

export const taskColors: Record<string, string> = {
  Dev: '#636EFA',
  Infra: '#EF553B',
  Recette: '#00CC96',
  Risque: '#AB63FA',
  Bouchonnage: '#FFA15A',
};

export const TaskLegend: React.FC = () => {
  return (
    <div className="mt-5">
      <h4>Légende</h4>
      {Object.entries(taskColors).map(([type, color]) => (
        <div
          key={type}
          style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}
        >
          <span
            style={{
              width: 15,
              height: 15,
              backgroundColor: color,
              marginRight: 5,
            }}
          ></span>
          {type}
        </div>
      ))}
    </div>
  );
};
