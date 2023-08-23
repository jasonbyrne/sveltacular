![Sveltacular](https://raw.githubusercontent.com/jasonbyrne/sveltacular/main/static/sveltacular.png)

Sveltacular is TypeScript and SASS based component library for Svelte, with no other dependencies.

Why did I create it when there are other options? Well, mainly because the best options out there were based on Tailwind. And, no disrespect to those who love it, but I didn't want to use Tailwind. So since I didn't find what I was loooking for, I made my own.

## Run Storybook

I don't have great documentation for now, but you can browse all of the available components by running Storybook locally. Check out the repo and then run this command:

```bash
npm run storybook
```

## Usage

Install it in your project

```bash
npm i sveltacular
```

Then use it like this:

```html
<script lang="ts">
	import { Button } from 'sveltacular';
</script>

<button>Hello World</button>
```
