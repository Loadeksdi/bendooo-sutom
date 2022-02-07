<script context="module">
    export async function load({ params }) {
        const uid = params.slug;
        return {
            props : {
                uid
            }
        }
    }
</script>

<script>
    import { update, ref, onValue} from 'firebase/database';
    import {db} from '../../lib/firebase'
    import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Textfield from '@smui/textfield';
    import Button, {Label} from '@smui/button';
    import List, { Item, Subheader, Text } from '@smui/list';

    export let uid;
    const roomRef = ref(db, `rooms/${uid}`);

    let roomData;
    onValue(roomRef, (snapshot) => {
        roomData = snapshot.val();
    });

    let open = true;
    let nickname = "";
    let playersNumber = 4;
    let gridsNumber = 3;
    let wordsLength = 6;

    const startGame = () => {

    }

    const joinRoom = async () => {
        if (nickname === ""){
            return;
        }
        const updatedData = {};
        if (roomData?.players){
            updatedData.players = [...roomData.players, nickname];
        }
        else {
            updatedData.owner = nickname;
            updatedData.players = [nickname];
        }
        await update(roomRef, updatedData);
    }
</script>

<svelte:head>
    <title>Le Bendooo - Sutom - Salle d'attente</title>
</svelte:head>

<main>
    <header>
        <h1>
            Grille {roomData?.roomName}
        </h1>
    </header>
    <Dialog
            bind:open
            scrimClickAction=""
            escapeKeyAction=""
            aria-labelledby="mandatory-title"
            aria-describedby="mandatory-content"
    >
        <Title id="mandatory-title">Rejoindre une partie</Title>
        <Content id="mandatory-content">
            Entre ton pseudo pour rejoindre la partie
        </Content>
        <Textfield class="nickname" variant="outlined" label="Ton pseudo de bg" bind:value={nickname}/>
        <Actions>
            <Button on:click={joinRoom}>
                <Label>Ça part !</Label>
            </Button>
        </Actions>
    </Dialog>
    <div class="container">
        <section>
            <Subheader>Joueurs {roomData?.players?.length ? roomData?.players?.length: 0}/{playersNumber}</Subheader>
            <List class="list">
                {#if roomData?.players}
                    {#each roomData?.players as player}
                        <Item>
                            <Text>{player}</Text>
                        </Item>
                    {/each}
                {/if}
            </List>
        </section>
            <section>
                <Subheader>Options de la partie</Subheader>
                {#if roomData && roomData.players && roomData.players.length && nickname === roomData?.players[0]}
                    <Textfield bind:value={playersNumber} label="Nombre de joueurs" type="number" min=2 max=10 />
                    <Textfield bind:value={gridsNumber} label="Nombre de grilles" type="number" min=1 max=5 />
                    <Textfield bind:value={wordsLength} label="Taille des mots" type="number" min=4 max="12"/>
                    <Button on:click={startGame} disabled={playersNumber !== roomData?.players.length}>Démarrer la partie</Button>
                {:else }
                    <Text>Nombre de joueurs : {playersNumber}</Text>
                    <Text>Nombre de grilles : {gridsNumber}</Text>
                    <Text>Taille des mots : {wordsLength}</Text>
                {/if}
            </section>
    </div>
</main>


<style>

    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        flex: 1;
    }

    h1 {
        width: 100%;
    }

    section :global(.list) {
        border-left: 1px solid #E5D4ED;
    }

    .container {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-around;
        align-content: flex-start;
        align-items: flex-start;
    }

    section {
        flex: 0 1 auto;
    }

</style>
