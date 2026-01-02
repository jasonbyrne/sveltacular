export async function copyToClipboard(text: string): Promise<boolean> {
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch (err) {
		console.error('Failed to copy text:', err);
		return false;
	}
}

export function useCopyState(duration = 2000) {
	let copied = $state(false);
	let timeoutId: ReturnType<typeof setTimeout> | null = null;

	function setCopied() {
		copied = true;
		if (timeoutId) clearTimeout(timeoutId);
		timeoutId = setTimeout(() => {
			copied = false;
		}, duration);
	}

	return {
		get copied() {
			return copied;
		},
		setCopied
	};
}

