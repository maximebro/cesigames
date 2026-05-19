<template>
    <v-container fluid class="d-flex align-center justify-center ga-12" style="min-height: calc(100vh - 64px);">
        <v-btn class="geochieurs" variant="flat" prepend-icon="mdi-card-multiple" size="x-large" to="/counter">
            <span class="mb-0">GEO <span class="suffix">CHIEURS</span></span>
        </v-btn>

        <v-btn class="geoclicker" variant="flat" prepend-icon="mdi-cursor-default-click" size="x-large" disabled>
            <span class="mb-0">GEO <span class="suffix">CLICKER</span></span>
        </v-btn>
    </v-container>
</template>


<script setup lang="ts">

</script>


<style scoped>
.geochieurs span {
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
}

.geochieurs span .suffix {
    color: #E8FF47;
}

.geoclicker span {
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1;
}

.geoclicker span .suffix {
    color: #E8FF47;
}
</style>
