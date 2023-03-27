<script lang="ts">
    export let label: string;
</script>

<div class="list-header">
    <div class="label" id="list-header">
        {label}
    </div>
    <div class="button">
        <i class="bi bi-collection"></i>
    </div>
    <div class="button">
        <i class="bi bi-pencil"></i>
    </div>
</div>

<style lang="scss">
    @import '/src/lib/static/vars.scss';
    .list-header {
		display: flex;
		align-items: center;
		height: $tab-size;
		background-color: $gray-c;
		margin-left: calc($list-item-size / 4);
		font-weight: bold;
        .label {
            flex-grow: 1;
        }
        .button {
            display: flex;
            width: $tab-size;
            height: $tab-size;
            align-items: center;
            justify-content: center;
            &:hover {
                background-color: $gray-d;
		    }
	    }
	}
</style>