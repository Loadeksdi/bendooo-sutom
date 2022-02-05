<script context="module">
    export async function load({ params, fetch, session, stuff }) {
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
    <title>Le Bendooo - Waiting Room</title>
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
    <section>
        <Subheader>Players</Subheader>
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

</style>
