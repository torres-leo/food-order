import { useEffect } from 'react';

export const useDebounce = (effect: Function, delay: number, deps: string[]) => {
	useEffect(() => {
		const handler = setTimeout(() => effect(), delay);

		return () => clearTimeout(handler);
	}, [...(deps || []), delay]);
};
