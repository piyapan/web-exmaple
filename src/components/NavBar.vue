<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01"
                aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
            <a class="navbar-brand" href="#">Admin</a>
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
            </ul>
            <ul class="nav justify-content-end">
                <li class="nav-item active">
                    <a class="nav-link" @click="logout">Logout</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    import authentication from '../services/authentication'
    export default {
        name: "NavBar",
        methods: {
            logout: async function () {
                try {
                    await authentication.logout();
                    this.$router.push({name: 'authentication'})
                }catch (e) {
                    alert(JSON.stringify(e))
                }
            }
        },
    }
</script>

<style scoped>

</style>