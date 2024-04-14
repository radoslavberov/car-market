import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { intlFormat } from 'date-fns';
import { QUERY_KEY } from '@/data/constants';

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
							<span className="font-bold">{new Intl.NumberFormat('en-US').format(pld.value)}</span> нови обяви
						</p>
					))}
				</CardContent>
			</Card>
		);
	}

	return null;
};

export function VehichelCountChart() {
	const stats = useQueryClient().getQueryData<any>([QUERY_KEY.stats]);

	const data = useMemo(() => {
		// Array with last 7 days
		const lastWeek = Array.from({ length: 7 }, (_, i) => {
			const date = new Date();
			date.setDate(date.getDate() - i);
			return date.toISOString().split('T')[0];
		}).reverse();

        // Fill last 7 days with data from API
		return lastWeek.map((day) => {
			const dayStats = stats?.advertisementsCountLastWeek.find((i: any) => i.date === day);
			return {
				name: intlFormat(new Date(day)),
				total: dayStats?.count || 0,
			};
		});
	}, [stats]);

	return (
		<ResponsiveContainer width="100%" height={350}>
			<BarChart data={data}>
				<XAxis
					dataKey="name"
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
				/>
				<YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => new Intl.NumberFormat('en-US').format(value)} />
				<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
				<Bar dataKey="total" fill="#1dbbfa" radius={[4, 4, 0, 0]} />
			</BarChart>
		</ResponsiveContainer>
	);
}
