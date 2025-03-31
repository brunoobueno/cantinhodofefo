
import React, { useState, useEffect } from 'react';
import { futurePlans as initialFuturePlans } from '@/lib/data';
import { BookOpen, Plane, MapPin, Bookmark, Plus, Edit2, Trash2, X, Save, Check } from 'lucide-react';
import emailjs from '@emailjs/browser';

// Constantes do EmailJS
const EMAILJS_SERVICE_ID = 'service_11ghiem';
const EMAILJS_TEMPLATE_ID = 'template_l2f1s8t';
const EMAILJS_PUBLIC_KEY = 'vTWRhTf7Kh_33jAIc';
const EMAIL_RECIPIENT = 'ironboy318@gmail.com';

// Chave para o localStorage
const PLANS_STORAGE_KEY = 'love-future-plans';

// Interface para o tipo de plano
interface Plan {
  id: number;
  title: string;
  description: string;
  status: string;
  icon: string;
}

const FuturePlans: React.FC = () => {
  // Estado para os planos
  const [plans, setPlans] = useState<Plan[]>([]);
  
  // Estado para o formulário de novo plano
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  // Estados para o formulário
  const [formTitle, setFormTitle] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formStatus, setFormStatus] = useState('Planejado');
  const [formIcon, setFormIcon] = useState('Plane');
  
  // Mapeamento de strings de ícones para componentes
  const iconComponents = {
    Plane,
    MapPin,
    BookOpen,
    Bookmark
  };

  // Carregar planos do localStorage ao iniciar
  useEffect(() => {
    const savedPlans = localStorage.getItem(PLANS_STORAGE_KEY);
    if (savedPlans) {
      setPlans(JSON.parse(savedPlans));
    } else {
      setPlans(initialFuturePlans.map(plan => ({
        ...plan,
        icon: plan.icon.name // Salva apenas o nome do ícone como string
      })));
    }
  }, []);

  // Salvar planos no localStorage quando mudam
  useEffect(() => {
    if (plans.length > 0) {
      localStorage.setItem(PLANS_STORAGE_KEY, JSON.stringify(plans));
    }
  }, [plans]);

  // Função para enviar email de notificação
  const sendEmailNotification = (actionType: string, plan: Plan) => {
    const templateParams = {
      to_email: EMAIL_RECIPIENT,
      action_type: actionType,
      action_type_lower: actionType.toLowerCase(), // Para estilização CSS
      plan_title: plan.title,
      plan_description: plan.description,
      plan_status: plan.status,
      date: new Date().toLocaleString('pt-BR'),
    };

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
      .then((response) => {
        console.log('EMAIL ENVIADO!', response.status, response.text);
      })
      .catch((err) => {
        console.error('ERRO AO ENVIAR EMAIL:', err);
      });
  };

  // Adicionar um novo plano
  const handleAddPlan = () => {
    // Criar novo plano
    const newPlan = {
      id: Date.now(), // ID único baseado no timestamp
      title: formTitle,
      description: formDescription,
      status: formStatus,
      icon: formIcon
    };
    
    const updatedPlans = [...plans, newPlan];
    setPlans(updatedPlans);
    
    // Enviar notificação por email
    sendEmailNotification('Adicionado', newPlan);
    
    // Resetar formulário
    resetForm();
  };

  // Atualizar um plano existente
  const handleUpdatePlan = () => {
    if (editingId === null) return;
    
    const updatedPlans = plans.map(plan => {
      if (plan.id === editingId) {
        const updatedPlan = {
          ...plan,
          title: formTitle,
          description: formDescription,
          status: formStatus,
          icon: formIcon
        };
        
        // Enviar notificação por email
        sendEmailNotification('Atualizado', updatedPlan);
        
        return updatedPlan;
      }
      return plan;
    });
    
    setPlans(updatedPlans);
    resetForm();
  };

  // Excluir um plano
  const handleDeletePlan = (planId: number) => {
    // Encontrar o plano para a notificação
    const planToDelete = plans.find(plan => plan.id === planId);
    
    if (planToDelete) {
      sendEmailNotification('Excluído', planToDelete);
    }
    
    const updatedPlans = plans.filter(plan => plan.id !== planId);
    setPlans(updatedPlans);
  };

  // Iniciar a edição de um plano
  const startEditing = (plan: Plan) => {
    setEditingId(plan.id);
    setFormTitle(plan.title);
    setFormDescription(plan.description);
    setFormStatus(plan.status);
    setFormIcon(plan.icon);
    setShowForm(true);
  };

  // Resetar o formulário
  const resetForm = () => {
    setFormTitle('');
    setFormDescription('');
    setFormStatus('Planejado');
    setFormIcon('Plane');
    setShowForm(false);
    setEditingId(null);
  };

  // Função para obter a cor de status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planejado': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Em andamento': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Realizado': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  // Renderizar o ícone com base na string do ícone
  const renderIcon = (iconName: string) => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents] || Bookmark;
    return <IconComponent size={18} className="text-love-600" />;
  };

  return (
    <div className="love-section">
      <h2 className="section-title flex items-center justify-center gap-2">
        <BookOpen size={20} className="text-love-500" />
        Planos para o Futuro
      </h2>
      
      {/* Botão para adicionar novo plano */}
      {!showForm && (
        <button 
          onClick={() => setShowForm(true)} 
          className="mb-4 flex items-center gap-1 mx-auto py-2 px-4 bg-love-100 text-love-700 rounded-md hover:bg-love-200 transition-colors"
        >
          <Plus size={16} />
          Adicionar Novo Plano
        </button>
      )}
      
      {/* Formulário para adicionar/editar plano */}
      {showForm && (
        <div className="love-card mb-6 animate-fade-in">
          <h3 className="font-medium text-love-800 mb-3">
            {editingId !== null ? 'Editar Plano' : 'Novo Plano'}
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-love-600 mb-1">Título</label>
              <input
                type="text"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-love-300"
                placeholder="Título do plano"
              />
            </div>
            
            <div>
              <label className="block text-sm text-love-600 mb-1">Descrição</label>
              <textarea
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-love-300"
                placeholder="Descrição do plano"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm text-love-600 mb-1">Status</label>
                <select
                  value={formStatus}
                  onChange={(e) => setFormStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-love-300"
                >
                  <option value="Planejado">Planejado</option>
                  <option value="Em andamento">Em andamento</option>
                  <option value="Realizado">Realizado</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm text-love-600 mb-1">Ícone</label>
                <select
                  value={formIcon}
                  onChange={(e) => setFormIcon(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-love-300"
                >
                  <option value="Plane">Avião</option>
                  <option value="MapPin">Local</option>
                  <option value="BookOpen">Livro</option>
                  <option value="Bookmark">Marcador</option>
                </select>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={resetForm}
                className="px-3 py-1 flex items-center gap-1 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
                Cancelar
              </button>
              
              <button
                onClick={editingId !== null ? handleUpdatePlan : handleAddPlan}
                disabled={!formTitle.trim()}
                className={`px-4 py-1 rounded-md flex items-center gap-1 ${
                  formTitle.trim() ? 'bg-love-500 text-white hover:bg-love-600' : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {editingId !== null ? (
                  <>
                    <Save size={16} />
                    Salvar
                  </>
                ) : (
                  <>
                    <Plus size={16} />
                    Adicionar
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Lista de planos */}
      <div className="space-y-4">
        {plans.length === 0 ? (
          <p className="text-center text-love-600 py-4">Nenhum plano registrado ainda.</p>
        ) : (
          plans.map((plan) => (
            <div key={plan.id} className="love-card hover:shadow-md transition-shadow">
              <div className="flex items-start gap-3">
                <div className="bg-love-100 p-2 rounded-lg">
                  {renderIcon(plan.icon)}
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
                
                {/* Botões de ação */}
                <div className="flex gap-1">
                  <button 
                    onClick={() => startEditing(plan)} 
                    className="p-1 text-love-500 hover:text-love-700"
                    title="Editar"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button 
                    onClick={() => handleDeletePlan(plan.id)} 
                    className="p-1 text-love-500 hover:text-love-700"
                    title="Excluir"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FuturePlans;
