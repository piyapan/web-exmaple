<template>
    <div>
        <b-form-group id="fieldsetHorizontal"
                      :label-cols="2"
                      breakpoint="md"
                      label="Name Project"
                      label-for="inputHorizontal">
            <b-form-input id="inputHorizontal" placeholder="Enter your project name" v-model="information.name"></b-form-input>
        </b-form-group>
        <b-form-group id="budget"
                      :label-cols="2"
                      breakpoint="md"
                      label="Budget of Project"
                      label-for="budget">
            <b-form-input id="budget" placeholder="Enter your budget of project" v-model="information.budget"></b-form-input>
        </b-form-group>
        <b-form-group
                id="plan"
                label="Plan of year"
                :label-cols="2"
                breakpoint="md">
            <b-form-select
                    required
                    v-model="information.plan"
                    id="plan"
                    :options="planList"
                    class="mb-3">
                <template slot="first">
                    <option :value="null" disabled>-- Please select an plan --</option>
                </template>
            </b-form-select>
        </b-form-group>
        <b-form-group
                id="integrate"
                label="Integrate plan"
                :label-cols="2"
                breakpoint="md">
            <b-form-select
                    id="integrate"
                    v-model="information.integrated_plan"
                    :options="integratePlanList"
                    required
                    class="mb-3">
                <template slot="first">
                    <option :value="null" disabled>-- Please select an integrate --</option>
                </template>
            </b-form-select>
        </b-form-group>
        <b-form-group
                id="budget"
                label="Budget of year"
                :label-cols="2"
                breakpoint="md">
            <b-form-select
                    id="budget"
                    v-model="information.budget_year"
                    :options="budgetYearList"
                    required
                    class="mb-3">
                <template slot="first">
                    <option :value="null" disabled>-- Please select a budget plan --</option>
                </template>
            </b-form-select>
        </b-form-group>
        <b-form-group
                id="policy"
                label="Policy"
                :label-cols="2"
                breakpoint="md">
            <b-form-select
                    id="policy"
                    v-model="information.policy"
                    :options="policyList"
                    required
                    class="mb-3">
                <template slot="first">
                    <option :value="null" disabled>-- Please select a policy --</option>
                </template>
            </b-form-select>
        </b-form-group>
        <div class="row ">
            <div class="col-md-3">
                <b-button type="submit" variant="primary" @click="save">Save</b-button>
            </div>
            <div class="col-md-3">
                <b-button type="reset" variant="danger" @click="clear">Reset</b-button>
            </div>
        </div>
    </div>
</template>
<script>
    import planService from '../services/plan';
    import integrateService from '../services/integrated_plan';
    import budgetService from '../services/budget';
    import policyService from '../services/policy';
    import informationService from '../services/information';

    export default {
        name: "InformationCreateComponent",
        props: {
            is_update: {
                type: Boolean,
                default() {
                    return false
                }
            },
            information: {
                type: Object,
                default: function () {
                    return {
                        name: "",
                        industry_target: 0,
                        budget: null,
                        integrated_plan: null,
                        budget_year: null,
                        plan: null,
                        policy: null,
                    }
                }
            },
        },
        created: async function () {
            await this.getSelected()
        },
        methods: {
            getSelected: async function () {
                try {
                    this.planList = await planService.getPlanList();
                    this.integratePlanList = await integrateService.geIntegrateList();
                    this.budgetYearList = await budgetService.getBudgetList();
                    this.policyList = await policyService.getPolicyList();

                    this.planList = this.mapFieldSelect(this.planList, {value: 'id', text: 'name'});
                    this.budgetYearList = this.mapFieldSelect(this.budgetYearList, {value: 'id', text: 'name'});
                    this.policyList = this.mapFieldSelect(this.policyList, {value: 'id', text: 'name'});
                    this.integratePlanList = this.mapFieldSelect(this.integratePlanList, {value: 'id', text: 'name'});

                } catch (e) {
                    alert(JSON.stringify(e))
                }
            },
            mapFieldSelect: function (Items, fields = {}) {
                return Items.map(function (item) {
                    return {
                        value: item[fields.value],
                        text: item[fields.text]
                    }
                })
            },
            save: async function () {
                try {
                    if (Object.keys(this.information).includes('id')) {
                        let id = this.information.id;
                        delete this.information.id;
                        await informationService.updateInformation(id, this.information)
                    } else
                        await informationService.addInformationList(this.information);
                    this.clear();
                    this.$emit('update:isReload', true)
                } catch (e) {
                    this.$log.debug(e)
                }
            },
            clear: async function () {
                for (let _key of Object.keys(this.information)) {
                    this.information[_key] = null
                }
            }
        },
        data: function () {
            return {
                planList: [],
                budgetYearList: [],
                policyList: [],
                integratePlanList: [],

            }
        }
    }
</script>

<style scoped>

</style>