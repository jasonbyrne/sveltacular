<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
    import Toaster from './toaster.svelte';
    import Notice from '../notice/notice.svelte';

    let toast: { title: string; message: string }[] = [
        { title: 'Notice Message 1', message: 'Notice Message' },
        { title: 'Notice Message 2', message: 'Notice Message' },
    ];
    
    let messageCount = toast.length;

    const addToast = () => {
        toast = [
            ...toast,
            { title: `Notice Message ${messageCount + 1}`, message: 'Notice Message' }
        ];
        messageCount++;
    };

    setInterval(() => {
        addToast();
        setTimeout(() => addToast(), 1000);
    }, 3000);
</script>

<Meta title="Generic/Toaster" component={Toaster} />

<Story name="Default">
	<Toaster>
        {#each toast as { title, message }, i}
            <Notice title={title} dismissMilliseconds={5000} dismissable={true}>Notice Message</Notice>
        {/each}
    </Toaster>
</Story>
