<script>
	import '../app.css';
	import Fa from 'svelte-fa/src/fa.svelte'
	import { faTwitter, faGithub, faDiscord } from '@fortawesome/free-brands-svg-icons'
</script>

<main>
	<slot />
</main>

<footer>
	<p>
		<a target="_blank" href="https://twitter.com/voidembracer99"><Fa icon={faTwitter} size="3x"/></a>
		<a target="_blank" href="https://github.com/Loadeksdi"><Fa icon={faGithub} size="3x"/></a>
		<a target="_blank" href="https://discord.com/invite/JhMNMYJ"><Fa icon={faDiscord} size="3x"/></a>
	</p>
</footer>

<style>
	main {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 1rem;
		width: 100%;
		max-width: 1024px;
		margin: 0 auto;
		box-sizing: border-box;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40px;
	}

	footer a {
		font-weight: bold;
	}

	footer a:nth-of-type(2) {
		margin: 0 3em;
	}

	@media (min-width: 480px) {
		footer {
			padding: 40px 0;
		}
	}
</style>
