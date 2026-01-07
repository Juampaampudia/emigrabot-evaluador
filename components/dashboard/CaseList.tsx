import React from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { Search, Filter, MoreHorizontal, Eye, FileEdit } from 'lucide-react';
import { Case } from '../../types';

const cases: Case[] = [
  { id: 1, client: 'Ahmed Benali', type: 'Arraigo Social', status: 'En Proceso', viability: 85, date: '2h' },
  { id: 2, client: 'Elena Volkov', type: 'Reagrupación', status: 'Revisión', viability: 92, date: '5h' },
  { id: 3, client: 'John Smith', type: 'Nómada Digital', status: 'Pendiente', viability: 45, date: '1d' },
  { id: 4, client: 'Maria Garcia', type: 'Nacionalidad', status: 'Completado', viability: 98, date: '2d' },
];

export const CaseList: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-2 gap-4">
        <h3 className="font-bold text-lg">Casos Recientes</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
            <input 
              placeholder="Buscar..." 
              className="pl-8 h-9 w-full sm:w-[200px] rounded-md border border-gray-200 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="p-2 border rounded-md hover:bg-gray-50 text-gray-600"><Filter size={16}/></button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-4 py-3 rounded-l-md">Cliente</th>
                <th className="px-4 py-3">Tipo</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Viabilidad</th>
                <th className="px-4 py-3 rounded-r-md text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cases.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition cursor-pointer group">
                  <td className="px-4 py-3 font-medium text-gray-900 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                      {c.client.split(' ').map(n => n[0]).join('').substring(0,2)}
                    </div>
                    {c.client}
                  </td>
                  <td className="px-4 py-3 text-gray-600">{c.type}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${c.status === 'Completado' ? 'bg-green-100 text-green-700' : 
                        c.status === 'En Proceso' ? 'bg-blue-100 text-blue-700' :
                        c.status === 'Pendiente' ? 'bg-gray-100 text-gray-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${c.viability > 80 ? 'bg-green-500' : c.viability > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} 
                          style={{ width: `${c.viability}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-500">{c.viability}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><Eye size={16} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><FileEdit size={16} /></button>
                      <button className="p-1 hover:bg-gray-200 rounded text-gray-500"><MoreHorizontal size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};