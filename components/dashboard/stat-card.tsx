export function StatCard({
  label,
  value
}: {
  label: string;
  value: string | number;
}) {
  return (
    <div className="card p-6">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-4 text-4xl font-black text-slate-950">{value}</p>
    </div>
  );
}
