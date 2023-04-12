<script lang="ts">
    import { page } from "$app/stores";

    export let route: string;
    export let label: string;  
    export let expanded: boolean;

</script>

<a class="tab" class:selected={$page.url.pathname.includes(route)} href={route}>
    <div class="tab-icon">
        <div class="tab-icon-inner">
            <slot></slot>
        </div>
    </div>
    <div class="tab-label" class:expanded={expanded}>
        {label}
    </div>
</a>

<style lang="scss">
    
    @import "/static/vars.scss";
    .tab {
        position: relative;
        left: 1px;
        z-index: 1;
		display: flex;
		flex-direction: row;
		align-items: center;
		height: calc($tab-size - 1px);
		transition: background-color 0.15s ease;
        border: 1px solid transparent;
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
            border-color: $border-color;
            border-right: none;
            font-weight: bold;
            
        }
        &:hover {
            border-color: $border-color;
            background-color: $gray-d;
        }
    }
    a {
        color: $text-color;
        text-decoration: none;
    }
	
</style>