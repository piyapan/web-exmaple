<template>
    <div>
        <nav-bar></nav-bar>
        <div class="container">
            <div class="row">
                <div class="col align-self-center">
                    <information-create-component :information.sync="information" :isReload.sync="isReload"></information-create-component>
                </div>
            </div>
            <div>
                <information-table-component :isReload.sync="isReload" @action-update="update"></information-table-component>
            </div>
        </div>
    </div>
</template>
<script>
    // @ is an alias to /src
    import NavBar from '@/components/NavBar.vue';
    import InformationCreateComponent from '@/components/InformationCreateComponent.vue';
    import informationTableComponent from '@/components/informationTableComponent.vue';

    export default {
        name: 'home',
        components: {NavBar, InformationCreateComponent, informationTableComponent},
        data: () => ({
            isReload: false,
            information: {
                name: "",
                industry_target: 0,
                budget: null,
                integrated_plan: null,
                budget_year: null,
                plan: null,
                policy: null,
            }
        }),
        methods:{
            update: function (item) {
                this.$log.debug(item);
                this.information = item;
            }
        },
    }
</script>
