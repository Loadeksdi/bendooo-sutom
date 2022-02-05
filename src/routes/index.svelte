<script>
	export const prerender = true;
	import {db} from '../lib/firebase'
	import {ref, set} from 'firebase/database';
	import Button from '@smui/button'
	import Textfield from '@smui/textfield';
	import { v4 as uuidv4 } from "uuid";
	import {goto} from '$app/navigation';

	let roomName = "";

	const createRoom = async () => {
		const roomId = uuidv4();

		await set(ref(db, 'rooms/' + roomId), {
			roomName,
			started: false
		});

		goto(`/room/${roomId}`);

	}
</script>

<svelte:head>
	<title>Le Bendooo - Sutom</title>
</svelte:head>

<main>
	<header>
		<h1>
			Le Sutom du Bendooo
		</h1>
	</header>

	<div class="form">
		<Textfield class="room-name" variant="outlined" label="Nom de la partie" bind:value={roomName}/>
		<div class="buttons">
			<Button disabled={roomName === ""} on:click={createRoom}>Créer une partie</Button>
			<Button disabled={roomName === ""}>Rejoindre une partie</Button>
		</div>
	</div>
</main>

<style>

	main {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		margin-bottom: 17.5%;
	}

	.form {
		margin-top: 20%;
	}

	.form :global(.room-name) {
		display: block;
		width: 100%;
	}

	.buttons {
		margin-top: 1em;
	}

	h1 {
		width: 100%;
	}

</style>
