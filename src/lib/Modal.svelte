<script>
export let open = false;
</script>

{#if open == true}
<div class="modal">
    <div class="modal-content">
        <slot />
    </div>
</div>
{/if}

<style>
    .modal {
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        background-color: rgb(0,0,0);
        background-color: rgba(0,0,0,0.4);
    }

    .modal-content {
        background-color: #ffffff;
        margin: 3em;
        padding: 1em;
        border: 1px solid #888;
        width: 5rem;
    }
</style>