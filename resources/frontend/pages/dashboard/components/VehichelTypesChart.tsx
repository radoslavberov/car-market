import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { QUERY_KEY } from '@/data/constants';
import { DashboardStats } from '@/types/index';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

export const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<Card className="bg-white bg-opacity-80 dark:bg-black">
				<CardHeader>
					<p className="font-semibold text-base">{label}</p>
				</CardHeader>
				<CardContent>
					{payload.map((pld: any, index: number) => (
						<p key={index} className="pb-2 text-sm">
							<span className="font-bold">{new Intl.NumberFormat('en-US').format(pld.value)}</span> {payload.length > 1 ? "автомобили" : "автомобил"}
						</p>
					))}
				</CardContent>
			</Card>
		);
	}

	return null;
};

export function VehichelTypesChart() {
	const stats = useQueryClient().getQueryData<DashboardStats>([QUERY_KEY.stats]);

	const data = useMemo(() => {
		if (stats)
			return stats.advertisementsCountByCategory
				.filter((i: any) => {
					return i.name?.toLowerCase().match(/джип|ван|кабрио|седан|хечбек|комби/gi)?.length > 0;
				})
				.map((i) => ({
					name: i.name,
					total: i.count,
				}))
				.sort((a: any, b: any) => a.total - b.total);
	}, [stats]);

	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => new Intl.NumberFormat('en-US').format(value)}
				/>
				<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
				<Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}
