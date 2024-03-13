import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from 'recharts';

export const CustomTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		return (
			<Card className="bg-white bg-opacity-80 dark:bg-black">
				<CardHeader>
					Възрастова група: <span className="font-semibold text-base">{label}</span>
				</CardHeader>
				<CardContent>
					{payload.map((pld: any, index: number) => (
						<p key={index} className="pb-2 text-sm">
							<span className="font-bold">{new Intl.NumberFormat('en-US').format(pld.value)}</span>{' '}
							{pld.name === 'men' ? 'Мъже' : 'Жени'}
						</p>
					))}
				</CardContent>
			</Card>
		);
	}

	return null;
};

export function PopulationChart({ data }: { data: any }) {
	return (
		<ResponsiveContainer width="100%" height={350}>
			<AreaChart data={data}>
				<CartesianGrid strokeDasharray="3 3" stroke="#888888" />
				<XAxis dataKey="age" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
				<YAxis
					stroke="#888888"
					fontSize={12}
					tickLine={false}
					axisLine={false}
					tickFormatter={(value) => new Intl.NumberFormat('en-US').format(value)}
				/>
				<Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
				<Area type="monotone" dataKey="women" fill="rgb(190 24 93)" />
				<Area type="monotone" dataKey="men" fill="rgb(29 78 216)" />
			</AreaChart>
		</ResponsiveContainer>
	);
}
