<template>
    <div>
        <b-table show-empty
                 stacked="md"
                 :items="informationList"
                 :fields="informationFieldList"
                 :current-page="currentPage"
                 :per-page="perPage">
            <template slot="is_approve" slot-scope="row">
                <span v-if="row.item.is_approve" class="badge badge-success">{{row.label.status_label}}</span>
                <span v-else class="badge badge-secondary">{{row.item.status_label}} </span>

            </template>
            <template slot="actions" slot-scope="row">
                <button type="button" class="btn btn-warning" @click="Edit(row.item)">Edit</button>
                <button type="button" class="btn btn-danger" @click="Remove(row.item)">Delete</button>
            </template>
        </b-table>

    </div>
</template>

<script>
    import InformationService from '../services/information'

    export default {
        name: "informationTableComponent",
        props: {
            isReload: {
                type: Boolean,
                default: function () {
                    return false
                }
            }
        },
        watch: {
            isReload: async function (is_reload) {
                if (is_reload) {
                    await this.GetInformation()
                }
            }
        },
        created: async function () {
            await this.GetInformation();
        },
        methods: {
            GetInformation: async function () {
                try {
                    this.informationList = await InformationService.getInformationList();
                    this.$log.debug(this.informationList)
                } catch (e) {
                    alert(JSON.stringify(e))
                }
            },
            Edit(item) {
                this.$emit('action-update', item)
            },
            Remove: async function(item){
                try {
                    await InformationService.removeInformation(item.id);
                    await this.GetInformation()
                }catch (e) {
                    alert(e)
                }
            }
        },
        data: () => ({
            informationList: [],
            currentPage: 1,
            perPage: 5,
            informationFieldList: [
                {
                    key: 'name', label: 'Name Project', sortable: false
                },
                {
                    key: 'plan_label', label: 'Plan (project of year)', sortable: false
                },
                {
                    key: 'budget', label: 'Budget of project', sortable: true, 'class': 'text-center'
                },
                {
                    key: 'budget_year_label', label: 'Budget of year', sortable: true, 'class': 'text-center'
                },
                {
                    key: 'is_approve', label: 'Approve status', sortable: false, 'class': 'text-center'
                },
                {
                    key: 'actions', label: 'Action'
                }
            ],
        }),
    }
</script>

<style scoped>

</style>