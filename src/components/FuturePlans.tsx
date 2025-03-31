
import React from 'react';
import { futurePlans } from '@/lib/data';
import { BookOpen } from 'lucide-react';

const FuturePlans: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planejado': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Em andamento': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Realizado': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="love-section">
      <h2 className="section-title flex items-center justify-center gap-2">
        <BookOpen size={20} className="text-love-500" />
        Planos para o Futuro
      </h2>
      
      <div className="space-y-4">
        {futurePlans.map((plan) => (
          <div key={plan.id} className="love-card hover:shadow-md transition-shadow">
            <div className="flex items-start gap-3">
              <div className="bg-love-100 p-2 rounded-lg">
                <plan.icon size={18} className="text-love-600" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-love-800">{plan.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${getStatusColor(plan.status)}`}>
                    {plan.status}
                  </span>
                </div>
                <p className="text-sm text-love-600">{plan.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FuturePlans;
