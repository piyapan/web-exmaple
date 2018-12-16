<template>
    <div class="login-box">
        <div class="login-box-body">
            <p class="login-box-msg">Sign in to start your session</p>
            <div class="form-group has-feedback">
                <input type="text" class="form-control" placeholder="Username" v-model="username">
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="Password" v-model="password">
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div v-if="is_not_authentication" class="alert alert-danger" role="alert">
                Username and password is not correct.
            </div>
            <div class="col-xs-4">
                <button type="submit" class="btn btn-primary btn-block btn-flat" @click="login">Sign In</button>
            </div>
        </div>
    </div>
</template>

<script>
    import authentication from '../services/authentication'
    export default {
        name: "Authentication",
        create: function(){
           this.toAction();
        },
        methods: {
            toAction(){
                if(localStorage.getItem('_user')){
                    this.$router.push({name: 'home'})
                }
            },
            login: async function () {
                try {
                    await authentication.login(this.username, this.password);
                    this.$store.commit('Authentication', true);
                    localStorage.setItem('_user', JSON.stringify({username: 'User example'}));
                    this.toAction();
                } catch (e) {
                    this.$store.commit('Authentication', false);
                    this.is_not_authentication = true;
                }
            }
        },
        data: () => {
            return {
                is_not_authentication: false,
                username: null,
                password: null,
            }
        },
    }
</script>

<style scoped>

</style>