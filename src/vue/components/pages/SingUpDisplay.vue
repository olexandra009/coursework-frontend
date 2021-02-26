<template>
    <div>
            <b-form class="m-auto  col-md-4">
                <div>
                    <label for="input-live">Name:</label>
                    <b-form-input
                            id="input-live"
                            v-model="name"
                            :state="nameState"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter your name"
                            trim
                    />
                </div>
            </b-form>
    </div>
</template>

<script>

    export default {
        name: "SingUpDisplay",
        computed: {
            nameState() {
                return this.name.length > 2 ? true : false
            }
        },
        data() {
            return {
                name: ''
            }
        }
    }
</script>

<style scoped>

</style>