<script lang="ts">
	import { Meta, Story } from '@storybook/addon-svelte-csf';
	import Notice from './notice.svelte';
	import CheckIcon from '$src/lib/icons/check-icon.svelte';
</script>

<Meta title="Generic/Notice" component={Notice} />

<Story name="Standard">
	<Notice title="Notice Title">Notice Message</Notice>
</Story>

<Story name="With Icon">
	<Notice title="Notice Title">
		<div slot="icon">
			<CheckIcon />
		</div>
		Notice Message
	</Notice>
</Story>

<Story name="Without Title">
	<Notice>Notice Message</Notice>
</Story>

<Story name="Success">
	<Notice title="Notice Title" style="success">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Error">
	<Notice title="Notice Title" style="error">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Outline">
	<Notice title="Notice Title" style="outline">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Attention">
	<Notice title="Notice Title" style="attention">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Info">
	<Notice title="Notice Title" style="info">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Extra Large">
	<Notice title="Notice Title" size="xl">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Large">
	<Notice title="Notice Title" size="lg">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Medium">
	<Notice title="Notice Title" size="md">
		<div slot="icon">
			<CheckIcon />
		</div>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt quibusdam molestiae sit, nesciunt
		maxime illo assumenda accusantium aut tempora voluptatibus quisquam odit dolores quia voluptatum
		eos quos, ad provident modi!
	</Notice>
</Story>

<Story name="Small">
	<Notice title="Notice Title" size="sm">
		<div slot="icon">
			<CheckIcon />
		</div>
		Just a small alert message.
	</Notice>
</Story>

<Story name="Dissmissable">
	<Notice title="New Post Saved" style="success" size="md" dismissable>
		<div slot="icon">
			<CheckIcon />
		</div>
		Your change have been saved.
	</Notice>
</Story>


<Story name="Auto Dismiss">
	<Notice title="New Post Saved" style="success" size="md" dismissable dismissMilliseconds={2000}>
		<div slot="icon">
			<CheckIcon />
		</div>
		Your change have been saved.
	</Notice>
</Story>
