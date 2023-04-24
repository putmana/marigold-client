<script lang="ts">
    import { goto } from "$app/navigation";
    import InfoBanner from "$lib/components/misc/info-banner.svelte";
    import { register, type RegisterReciept } from "$lib/scripts/api/auth/api-register";
    import { auditRegister, registerIssue } from "$lib/scripts/audit/auth/audit-register";


    let issues: Issue[] = [];

    let username = "alkesta";
    let email = "adam.putman@outlook.com";
    let password = "Tagetes11!";
    let confirmPassword = "Tagetes11!";

    $: genericIssues = issues.filter(issue => 
        issue.category === registerIssue.generic
    )

    $: usernameIssues = issues.filter(issue => 
        issue.category === registerIssue.username
    )

    $: emailIssues = issues.filter(issue => 
        issue.category === registerIssue.email
    )

    $: passwordIssues = issues.filter(issue => 
        issue.category === registerIssue.password
    )

    $: confirmPasswordIssues = issues.filter(issue => 
        issue.category === registerIssue.confirmPassword
    )

    $: issues = auditRegister(username, email, password, confirmPassword)
    $: issues = issues;

    async function handleSubmit() {
        if (issues.length === 0) {
            await register(username, email, password).then((response: RegisterReciept) => {
                if (response.success) {
                    goto('/auth/login')
                } else {
                    issues = [
                        ...issues,
                        ...response.issues ?? []
                    ]
                    console.log(issues)
                }
                
            }).catch(issues => {
                
            })
        }
    }

    
</script>

<div class="banners">
    {#each genericIssues as issue}
        <InfoBanner message={issue.message} style="error"/>
    {/each}
</div>

<div class="watermark">
    <div class="logo">
        <i class="bi bi-flower1"></i>
    </div>
    <div class="text">
        register
    </div>
</div>
<form on:submit|preventDefault={handleSubmit}>
    <div class="input">
        <input class="input-text" class:issue={usernameIssues.length > 0 && username.length > 0} type="username" placeholder="username" bind:value={username} maxlength=32>
        <div class="warning">
            {#if username.length > 0}
                {#each usernameIssues as issue}
                    <p>{issue.message}</p>
                {/each}
            {/if}
        </div>
    </div>
    <div class="input">
        <input class="input-text" class:issue={emailIssues.length > 0 && email.length > 0 } type="email" placeholder="email address" bind:value={email}>
        {#if email.length > 0}
            <div class="warning">
                {#each emailIssues as issue}
                    <p>{issue.message}</p>
                {/each}
            </div>
        {/if}
    </div>
    <div class="input">
        <input class="input-text" class:issue={(passwordIssues.length > 0 || confirmPasswordIssues.length > 0) && password.length > 0} type="password" placeholder="password" bind:value={password} maxlength=200>
        {#if password.length > 0}
            <div class="warning">
                {#each confirmPasswordIssues as issue}
                    <p>{issue.message}</p>
                {/each}
                {#if passwordIssues.length > 0}
                    <p>Password must contain:</p>
                {/if}
            </div>
            <div class="helper">
                {#each passwordIssues as issue}
                    <p>{issue.message}</p>
                {/each}
            </div>
        {/if}
    </div>
    <div class="input">
        <input class="input-text" class:issue={confirmPasswordIssues.length > 0} type="password" placeholder="confirm password" bind:value={confirmPassword}>
        <div class="warning">
            {#each confirmPasswordIssues as issue}
                <p>{issue.message}</p>
            {/each}
        </div>
    </div>
    <div class="input">
        <input class="btn-primary" type="submit" value="REGISTER" disabled={issues.length > 0}>
    </div>
    <div class="subtitle">
        Have an account?
        <a href="/auth/login">Log in</a>
    </div>
</form>

<style lang="scss">
    @import '../style.scss';
</style>