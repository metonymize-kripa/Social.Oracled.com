<script>
// The params prop contains values matched from the URL
export let params = {}
</script>
    
    
<h2>Hi there!</h2>

<p>
    Your route is:
    <b>{params.symbol}</b>
    <b>{#if params.cmd}{params.cmd}{/if}</b>
</p>
