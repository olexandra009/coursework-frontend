<template>
    <span>Events List</span>
</template>

<script>
    export default {
        name: "EventsList",
        data() {
            return {
                events:[{
                    id: 0,
                    name: "string",
                    description: "string",
                    startDate: "2021-02-27T17:50:44.560Z",
                    endDate: "2021-02-27T17:50:44.560Z",
                    edited: true,
                    showAuthor: true,
                    authorId: 12,
                    organizationId: 1,
                    organizationName: 'Organization',
                    authorName: 'Last First Last',
                    multimedias: []
                },
                ]
            }
        }
    }
</script>

<style scoped>

</style>