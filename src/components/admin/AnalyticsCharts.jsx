import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const pieColors = ['#18a874', '#ffbb3f', '#3e6470', '#7addbd'];

function EmptyState() {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-slate-200 bg-slate-50 p-6 text-center text-slate-500">
      لا توجد بيانات كافية لعرض التحليلات بعد.
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="glass-panel p-5">
      <h3 className="mb-4 text-xl font-extrabold text-ink-900">{title}</h3>
      {children}
    </div>
  );
}

export default function AnalyticsCharts({ charts }) {
  if (!charts) {
    return <EmptyState />;
  }

  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <ChartCard title="توزيع الجنس">
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={charts.gender} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                {charts.gender.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <ChartCard title="توزيع الدخل">
        <div className="h-72">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={charts.income} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90}>
                {charts.income.map((entry, index) => (
                  <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </ChartCard>

      <div className="xl:col-span-2">
        <ChartCard title="توزيع درجات المعرفة">
          <div className="h-80">
            <ResponsiveContainer>
              <BarChart data={charts.knowledgeDistribution}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="score" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#18a874" radius={[14, 14, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>
    </div>
  );
}
