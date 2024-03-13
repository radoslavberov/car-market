import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App.tsx';
import { TooltipProvider } from '@/components/ui/Tooltip';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/Toaster';
import { toast } from '@/hooks/toast.hook.ts';

// Styles
import '@/styles/globals.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapProvider } from 'react-map-gl';

// Create query client
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			staleTime: 1000 * 60, // 1 minute
			retry: 2, // Retries queries 2 times before failing
		},
	},
	queryCache: new QueryCache({
		onError: (error, query) => {

			// Show error only if given by query
			if (query.meta?.errorMessage) {
				toast({
					title: 'Възникна грешка',
					description: query.meta.errorMessage as string,
					variant: 'destructive',
				});
			}
		},
	}),
});

// Render app
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<MapProvider>
			<TooltipProvider delayDuration={100} skipDelayDuration={500}>
				<QueryClientProvider client={queryClient}>
					<Router>
						<App />
					</Router>
				</QueryClientProvider>
			</TooltipProvider>
			<Toaster />
		</MapProvider>
	</React.StrictMode>,
);
