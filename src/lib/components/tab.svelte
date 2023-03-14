<script lang="ts">
    export let id: string;
    export let label: string;  
    export let expanded: boolean;  
    export let current: string;
</script>

<a class="tab" class:selected={current === id} on:click={() => (current = id)} href="/{id}">
    <div class="tab-icon">
        <div class="tab-icon-inner">
            <slot></slot>
        </div>
    </div>
    <div class="tab-label" class:expanded={expanded} >
        {label}
    </div>
</a>

<style lang="scss">
    
    @import "../../static/vars.scss";
    .tab {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: $tab-size;
		transition: background-color 0.15s ease;
		.tab-icon {
			display: flex;
			justify-content: center;
			align-items: center;
			width: $tab-size;
			.tab-icon-inner {
				text-align: center;
				width: $tab-size;
			}
		}
		.tab-label {
            opacity: 0%;
			padding-left: 10px;
            &.expanded {
                opacity: 100%;
            }
		}
	    &.selected {
            background-color: $gray-c;
            font-weight: bold;
        }
        &:hover {
            background-color: $gray-d;
        }
    }
    a {
        color: $text-color;
        text-decoration: none;
    }
	
</style>