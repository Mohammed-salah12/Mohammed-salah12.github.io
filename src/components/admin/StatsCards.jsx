import { BarChart3, BrainCircuit, ShieldCheck, Users } from 'lucide-react';

const cards = [
  {
    key: 'totalResponses',
    label: 'إجمالي الردود',
    icon: Users,
  },
  {
    key: 'averageKnowledgeScore',
    label: 'متوسط المعرفة',
    icon: BrainCircuit,
    suffix: '%',
  },
  {
    key: 'practitionerCount',
    label: 'عدد الممارسين',
    icon: ShieldCheck,
  },
  {
    key: 'exposedCount',
    label: 'لديهم تعامل مع الليزر',
    icon: BarChart3,
  },
];

export default function StatsCards({ summary }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        const value = summary?.[card.key] ?? 0;

        return (
          <div key={card.key} className="glass-panel p-5">
            <div className="mb-4 flex items-center justify-between">
              <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-sm font-bold text-slate-500">{card.label}</span>
            </div>
            <p className="text-3xl font-extrabold text-ink-900">
              {value}
              {card.suffix || ''}
            </p>
          </div>
        );
      })}
    </div>
  );
}
